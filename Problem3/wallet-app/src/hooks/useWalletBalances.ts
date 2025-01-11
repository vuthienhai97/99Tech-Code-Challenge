import { useState, useEffect } from 'react'
import { IWalletBalance } from '../pages/wallet-page/wallet'

const mockBalances: IWalletBalance[] = [
    { currency: 'ETH', amount: 5, blockchain: 'Ethereum' },
    { currency: 'OSMO', amount: 10, blockchain: 'Osmosis' },
    { currency: 'ZIL', amount: 0, blockchain: 'Zilliqa' }
]

export const useWalletBalances = () => {
    const [balances, setBalances] = useState<IWalletBalance[]>([])

    useEffect(() => {
        setTimeout(() => {
            setBalances(mockBalances)
        }, 500)
    }, [])

    return balances
}
