import { useState, useEffect } from 'react'
import axios from 'axios'

type TokenPrice = {
    currency: string
    price: number
}

const useFetchPrices = () => {
    const [prices, setPrices] = useState<TokenPrice[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const { data } = await axios.get<TokenPrice[]>(
                    'https://interview.switcheo.com/prices.json'
                )
                const uniqueTokens = Array.from(
                    new Map(data.map((item) => [item.currency, item])).values()
                )
                setPrices(uniqueTokens)
            } catch (error) {
                console.error('Error fetching prices:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPrices()
    }, [])

    return { prices, loading }
}

export default useFetchPrices
