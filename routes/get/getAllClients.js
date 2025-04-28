import { Client } from "../../client.js";

async function getAllClients() {
    const client = {
        name: name,
        
    }
    return fetch('http://localhost:8080/clients')  // Faz a requisição
        .then(async response => {
            const data = await response.json();  // Aguarda a conversão da resposta para JSON
            const clients = data.map(c => new Client(c.name, c.email, c.orders));  // Mapeia para a classe Client
            return clients;  // Retorna o array de clientes
        })
        .catch(error => {
            console.log('Erro ao buscar clientes:', error);  // Trata qualquer erro
            return [];  // Retorna um array vazio em caso de erro
        });
}

export const allClients = await getAllClients();  // Agora 'await' está corretamente dentro de uma função async