import React, { useMemo } from 'react'
import styles from './WalletPage.module.css'
import { useWalletBalances } from '../../hooks/useWalletBalances'
import { usePrices } from '../../hooks/usePrices'
import WalletRow from './components/WalletRow'
import Box, { BoxProps } from '@mui/material/Box'
import { IWalletBalance } from './wallet'

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props
    const balances = useWalletBalances()
    const prices = usePrices()

    const getPriority = (blockchain: string): number => {
        const priorities: Record<string, number> = {
            Osmosis: 100,
            Ethereum: 50,
            Arbitrum: 30,
            Zilliqa: 20,
            Neo: 20
        }
        return priorities[blockchain] ?? -99
    }

    const sortedBalances = useMemo(() => {
        return balances
            .filter(
                (balance: IWalletBalance) =>
                    balance.amount > 0 && getPriority(balance.blockchain) > -99
            )
            .sort((lhs: IWalletBalance, rhs: IWalletBalance) => {
                return getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
            })
    }, [balances])

    const formattedBalances = useMemo(() => {
        return sortedBalances.map((balance) => ({
            ...balance,
            formatted: balance.amount.toFixed(2)
        }))
    }, [sortedBalances])

    const rows = useMemo(() => {
        return formattedBalances.map((balance, index) => {
            const usdValue = prices[balance.currency] * balance.amount
            return (
                <WalletRow
                    className={styles.row}
                    key={`${balance.currency}-${balance.blockchain}`} // Avoid using index as key
                    amount={balance.amount}
                    usdValue={usdValue}
                    formattedAmount={balance.formatted}
                />
            )
        })
    }, [formattedBalances, prices])

    return <Box {...rest}>{rows}</Box>
}

export default WalletPage
