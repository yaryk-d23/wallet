export class Wallet {
    constructor(){
        this.wallets = [];
        this.transactions = [];
        this.balance = new Balance();
    }
    wallets: any[];
    transactions: any[];
    balance: Balance;
}

export class Balance {
    constructor(){
        this.address = '';
        this.available = 0;
        this.blockIndex = 0;
        this.locked = 0;
    }
    address: string;
    available: number;
    blockIndex: number;
    locked: number;
}

export class SendRequest {
    constructor(){
        this.address = '';
        this.allAvailableBalance = false;
        this.amount = 0;
       this.paymentId = null;
    }
    address: string;
    allAvailableBalance: boolean;
    amount: number;
    paymentId?: string;
}

export class ReceiveRequest {
    constructor(){
        this.address = '';
        this.label = '';
        this.amount = null;
        this.paymentId = null;
        this.message = '';
    }
    address: string;
    label?: string;
    amount: number;
    paymentId?: string;
    message?: string;
}

export class Fee {
    constructor(){
        this.baseFee = 0;
        this.additionalFeeCoefficient = 0;
        this.address = null;
        this.comment = null;
    }
    baseFee: number;
    additionalFeeCoefficient: number;
    address: string;
    comment?: string;
}

export class GiftRequest{
    constructor(){
        this.allAvailableBalance = false;
        this.amount = 0;
        this.paymentId = null;
        this.GiftExpiriedDate = '';
        this.GiftExpiriedTime = '';
    }
    allAvailableBalance: boolean;
    amount: number;
    paymentId?: string;
    GiftExpiriedDate: string;
    GiftExpiriedTime?: string;
}

export class Gift{
    additionalFee?: number;
    amount: number;
    expiration?: string;
    fee?: number;
    paymentId?: string;
    transactionInfo?: TransactionInfo;
    url?: string;
}

export class TransactionInfo {
    message?: string;
    status?: string;
    transactionHash?: string;
}

export class ExpirationTime {
    constructor(){
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.status = '';
    }
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    status: string;
}