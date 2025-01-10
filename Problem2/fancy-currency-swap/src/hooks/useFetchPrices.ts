import axios from 'axios'

const fetchPrices = async () => {
    try {
        const { data } = await axios.get(
            'https://interview.switcheo.com/prices.json'
        )
        const uniquePrices = Array.from(
            new Map(data.map((item: any) => [item.currency, item])).values()
        )
        return uniquePrices
    } catch (error) {
        console.error('Error fetching prices', error)
    }
}

export default fetchPrices
