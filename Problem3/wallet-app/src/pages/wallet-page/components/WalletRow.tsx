import React from 'react'

interface WalletRowProps {
    amount: number
    usdValue: number
    formattedAmount: string
    className: string
}

const WalletRow: React.FC<WalletRowProps> = ({
    amount,
    usdValue,
    formattedAmount,
    className
}) => {
    return (
        <div className={className}>
            <span>Amount: {amount}</span>
            <span>Amount formatted: {formattedAmount}</span>
            <span>USD Value: ${usdValue.toFixed(2)}</span>
        </div>
    )
}

export default WalletRow
