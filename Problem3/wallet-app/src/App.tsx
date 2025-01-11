import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WalletPage from './pages/wallet-page/WalletPage.tsx'

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WalletPage />} />
            </Routes>
        </Router>
    )
}

export default App
