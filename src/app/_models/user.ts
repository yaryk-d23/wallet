export class User {
    constructor(model: any){
        this.email = model.email;
        this.username = model.username;
        this.password = model.password;
    }
    email: string;
    username: string;
    password: string;
}
