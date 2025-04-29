import { getClientByEmail } from "../../routes/get/getClientByEmail.js";
import { getAutoCompleteEmail } from "../../routes/get/getAutoCompleteEmail.js";

const email = document.getElementById("email");
const suggestionBox = document.getElementById('suggestions');
const localMessage = document.getElementById("response-data-message");

email.addEventListener('input', async (e) => {
    localMessage.innerHTML = '';
    suggestionBox.innerHTML = '';

    const emailPrefix = e.target.value;
    const suggestions = await getAutoCompleteEmail(emailPrefix);

    if (!emailPrefix || suggestions.length === 0) {
        return;
    }

    suggestions.forEach(email => {
        const div = document.createElement("div");

        div.classList.add("suggestion-item");
        div.textContent = email;

        div.addEventListener("click", () => {
            e.target.value = email;
            suggestionBox.innerHTML = '';
        });

        suggestionBox.appendChild(div);
    });
});

window.renderOrdersClientByEmail = async function() {
    suggestionBox.innerHTML = ''

    const tbody = document.getElementById("orders-parameters-values");
    const emailValue = email.value;

    // Limpa a tabela antes de adicionar novos dados
    tbody.innerHTML = "";
    localMessage.innerHTML = "";

    try {
        const response = await getClientByEmail(emailValue);

        if (!response.orders) {
            localMessage.innerHTML = "Usuario com esse Email nao existe";
            return;
        }

        if (response.orders.length === 0) {
            localMessage.innerHTML = "Nenhum pedido encontrado para o cliente com email: " + emailValue;
            return;
        }

        response.orders.forEach(order => {
            const trOrder = document.createElement('tr');

            const tdId = document.createElement('td');
            tdId.textContent = order.id;

            const tdDateBegin = document.createElement('td');
            tdDateBegin.textContent = order.dateBegin;

            const tdDateFinish = document.createElement('td');
            tdDateFinish.textContent = order.dateFinish;

            const tdActivities = document.createElement('td');
            const btnShowActivities = document.createElement('button');
            btnShowActivities.textContent = "Ver Atividades";
            btnShowActivities.onclick = () => toggleActivities(order.id);
            tdActivities.appendChild(btnShowActivities);

            const tdValorTotal = document.createElement('td');
            tdValorTotal.textContent = "R$ " + order.valorTotal;

            trOrder.appendChild(tdId);
            trOrder.appendChild(tdDateBegin);
            trOrder.appendChild(tdDateFinish);
            trOrder.appendChild(tdActivities);
            trOrder.appendChild(tdValorTotal);

            tbody.appendChild(trOrder);

            // Linha escondida para as atividades
            const trActivities = document.createElement('tr');
            trActivities.id = `activities-order-${order.id}`;
            trActivities.style.display = "none";

            const tdActivitiesContainer = document.createElement('td');
            tdActivitiesContainer.colSpan = 5; // ocupa toda a linha

            // Cria uma tabela interna
            const activitiesTable = document.createElement('table');
            activitiesTable.style.width = "100%";
            activitiesTable.border = "1";

            const thead = document.createElement('thead');
            thead.innerHTML = `
                <tr>
                    <th>Trabalho</th>
                    <th>Roupa</th>
                    <th>Preco</th>
                </tr>
            `;

            const tbodyActivities = document.createElement('tbody');
            order.activities.forEach(activity => {
                const trAct = document.createElement('tr');

                const tdTrabalho = document.createElement('td');
                tdTrabalho.textContent = activity.trabalho;

                const tdRoupa = document.createElement('td');
                tdRoupa.textContent = activity.roupa;

                const tdPreco = document.createElement('td');
                tdPreco.textContent = "R$ " + activity.preco;

                trAct.appendChild(tdTrabalho);
                trAct.appendChild(tdRoupa);
                trAct.appendChild(tdPreco);

                tbodyActivities.appendChild(trAct);
            });

            activitiesTable.appendChild(thead);
            activitiesTable.appendChild(tbodyActivities);
            tdActivitiesContainer.appendChild(activitiesTable);
            trActivities.appendChild(tdActivitiesContainer);

            tbody.appendChild(trActivities);
        });

        localMessage.innerHTML = "Busca do Cliente concluída com sucesso!<br>" + response.toString();
        
    } catch (error) {
        console.error(error);
        localMessage.innerHTML = "Erro ao buscar os dados do cliente. Por favor, tente novamente.";
    }
}

// Função para expandir ou esconder a tabela de atividades
function toggleActivities(orderId) {
    const tr = document.getElementById(`activities-order-${orderId}`);
    if (tr.style.display === "none") {
        tr.style.display = "table-row";
    } else {
        tr.style.display = "none";
    }
}



