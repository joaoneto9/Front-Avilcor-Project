import { getClientByEmail } from "../../routes/get/getClientByEmail.js";
import { getAutoCompleteEmail } from "../../routes/get/getAutoCompleteEmail.js";
import { showTablesOrdersActivities } from "../order/createTableOrder.js";

const email = document.getElementById("email");

email.value = localStorage.getItem("ultimoEmail");

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

window.renderOrdersClientByEmail = async function () {
    suggestionBox.innerHTML = ''

    const tbody = document.getElementById("orders-parameters-values");
    const emailValue = email.value;

    localStorage.setItem("ultimoEmail", emailValue); // set do ulitmo email utilizado

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
            showTablesOrdersActivities(order, tbody); // passa o tbody e a order como parametro
            // const tbody = document.getElementById("orders-parameters-values"); -> tbody
        });

        localMessage.innerHTML = "Busca do Cliente concluída com sucesso!<br>" + response.toString();

    } catch (error) {
        console.error(error);
        localMessage.innerHTML = "Erro ao buscar os dados do cliente. Por favor, tente novamente.";
    }
}



