export class Client {
    constructor(name, email, orders) {
        this.name = name;
        this.email = email;
        this.orders = orders;
    }

    toString() {
        return "<br>Nome: " + this.name + "<br>Email: " + this.email; 
    }
}
