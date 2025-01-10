import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import SwapForm from './components/SwapForm'

const App = () => {
    const [prices, setPrices] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const { data } = await axios.get(
                    'https://interview.switcheo.com/prices.json'
                )
                const uniquePrices = Array.from(
                    new Map(
                        data.map((item: any) => [item.currency, item])
                    ).values()
                )
                setPrices(uniquePrices)
            } catch (error) {
                console.error('Error fetching prices', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPrices()
    }, [])

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <Header />
            <div className="w-full max-w-lg p-4">
                {loading ? (
                    <div className="text-xl text-blue-500">Loading...</div>
                ) : (
                    <SwapForm prices={prices} />
                )}
            </div>
        </div>
    )
}

export default App
