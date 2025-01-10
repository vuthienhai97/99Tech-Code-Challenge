import './App.css'
import useFetchPrices from './hooks/useFetchPrices'
import ExchangeForm from './components/ExchangeForm'

const App = () => {
    const { prices, loading } = useFetchPrices()

    if (loading) {
        return (
            <div className="text-center mt-20 text-xl">Loading prices...</div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <ExchangeForm prices={prices} />
        </div>
    )
}

export default App
