import { Order } from "../../Order.js"

export async function getAllOrdersByClientEmail(email) {
    fetch('http://localhost:8080/clients/orders/' + email)
    .then(async response => {
        const data = await response.json();
        const orders = data.map(o => new Order(o.id, o.valorTotal, o.dateBegin, o.dateFinish, o.activities));
        return orders;
    })
    .catch(error => {
        console.log("Ero ao buscar os pedidos do cliente de email: " + email);
        return []; // arrays vazio
    })
}

