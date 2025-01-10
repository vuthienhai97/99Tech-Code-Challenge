import { useState, useEffect } from 'react'
import Select from './Select'

interface SwapFormProps {
    prices: any[]
}

const SwapForm = ({ prices }: SwapFormProps) => {
    const [fromCurrency, setFromCurrency] = useState<string>('')
    const [toCurrency, setToCurrency] = useState<string>('')
    const [amount, setAmount] = useState<string>('')
    const [exchangeRate, setExchangeRate] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (fromCurrency && toCurrency) {
            const fromPrice = prices.find(
                (price) => price.currency === fromCurrency
            )?.price
            const toPrice = prices.find(
                (price) => price.currency === toCurrency
            )?.price

            if (fromPrice && toPrice) {
                setExchangeRate(toPrice / fromPrice)
            }
        }
    }, [fromCurrency, toCurrency, prices])

    const handleSwap = () => {
        if (
            !fromCurrency ||
            !toCurrency ||
            !amount ||
            isNaN(Number(amount)) ||
            Number(amount) <= 0
        )
            return
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            alert(
                `Successfully swapped ${amount} ${fromCurrency} to ${toCurrency}`
            )
        }, 1000)
    }

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg space-y-4">
            <Select
                options={prices.map((price) => price.currency)}
                value={fromCurrency}
                onChange={setFromCurrency}
                label="From Currency"
            />
            <Select
                options={prices.map((price) => price.currency)}
                value={toCurrency}
                onChange={setToCurrency}
                label="To Currency"
            />
            <input
                type="number"
                className="border p-3 rounded w-full"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <div className="text-center text-lg">
                {exchangeRate > 0 && (
                    <span>
                        1 {fromCurrency} = {exchangeRate.toFixed(4)}{' '}
                        {toCurrency}
                    </span>
                )}
            </div>
            <button
                onClick={handleSwap}
                className="bg-blue-500 text-white p-3 rounded w-full disabled:bg-gray-400"
                disabled={loading}
            >
                {loading ? 'Swapping...' : 'Swap'}
            </button>
        </div>
    )
}

export default SwapForm
