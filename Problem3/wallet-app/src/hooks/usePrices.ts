import { useState, useEffect } from 'react'

const mockPrices = {
    ETH: 2000,
    OSMO: 1.5,
    ZIL: 0.05
}

export const usePrices = () => {
    const [prices, setPrices] = useState<Record<string, number>>({})

    useEffect(() => {
        // Simulate an API call
        setTimeout(() => {
            setPrices(mockPrices)
        }, 500)
    }, [])

    return prices
}
