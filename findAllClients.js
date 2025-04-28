import  { allClients } from "./routes/get/getAllClients.js";

async function renderClientes() {
    const tbody = document.querySelector('#clientes-table tbody');
    tbody.innerHTML = ''; // limpa o conteúdo antes

    allClients.forEach(cliente => {
      const tr = document.createElement('tr');

      const tdNome = document.createElement('td');
      tdNome.textContent = cliente.name;

      const tdEmail = document.createElement('td');
      tdEmail.textContent = cliente.email;

      tr.appendChild(tdNome);
      tr.appendChild(tdEmail);

      tbody.appendChild(tr);
    });
}

renderClientes();

