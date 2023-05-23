export interface CustodyWallets {
    message: any
    wallets: Wallet[]
}


export interface Wallet {
    name: string
    type:number
    assets: Asset[]
}



export interface Asset {
    name: string
    symbol: string
    transactions: Transaction[]
}
export interface Transaction {
    date: string
    type: string
    transactionId: any
    receivedQuantity: string
    receivedCurrency: string
    receivedCostBasisUSD: string
    receivedWallet: ReceivedWallet
    receivedAddress: string
    receivedTag: string
    receivedComment: string
    sentQuantity: string
    sentCurrency: string
    sentCostBasisUSD: string
    sentWallet: SentWallet
    sentAddress: string
    sentTag: string
    sentComment: string
    feeAmount: string
    feeCurrency: string
    realizedReturnUSD: string
    ignored: string
}



export interface ReceivedWallet {
    walletName: string
    walletToken: string
}



export interface SentWallet {
    walletName: string
    walletToken: string
}