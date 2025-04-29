import { Client } from "../../classes/client.js";

export async function getClientByEmail(email) {
    return await fetch('http://localhost:8080/clients/' + email)
    .then(async response => {
        const data = await response.json();
        const client = new Client(data.name, data.email, data.orders);
        return client;
    });
}

