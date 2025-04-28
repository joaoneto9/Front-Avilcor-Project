import { Client } from "./client.js"

fetch('http://localhost:8080/clients')
.then(response => response.json)
.then(data => {
    const clients = data.map(c => new Client(c.name, c.email, c.orders));
    renderClientes(clients);
})
.catch(error => {
    console.log('Erro ao buscar clientes:', error);
});


function renderClientes(clientes) {
    const tbody = document.querySelector('#clientes-table tbody');
    tbody.innerHTML = ''; // limpa o conteúdo antes

    clientes.forEach(cliente => {
      const tr = document.createElement('tr');

      const tdNome = document.createElement('td');
      tdNome.textContent = cliente.nome;

      const tdEmail = document.createElement('td');
      tdEmail.textContent = cliente.email;

      tr.appendChild(tdNome);
      tr.appendChild(tdEmail);

      tbody.appendChild(tr);
    });
}

