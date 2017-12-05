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
        this.paymentId ='';
    }
    address: string;
    allAvailableBalance: boolean;
    amount: number;
    paymentId?: string;
}