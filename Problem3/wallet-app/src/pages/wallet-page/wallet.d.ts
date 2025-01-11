export interface IWalletBalance {
    currency: string
    amount: number
    blockchain: string
}

export interface IFormattedWalletBalance extends IWalletBalance {
    priority: number
    formatted: string
}
