import { showTablesOrdersActivities } from "./createTableOrder.js";
import { getOrderById } from "../../routes/get/getOrderById.js";

const localMessage = document.getElementById("response-data-message");
const button = document.getElementById("query");

button.addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const order = await getOrderById(id);
    const tbody = document.getElementById("orders-parameters-values"); 
    tbody.innerHTML = "";
    
    if (!order || typeof order === "string") {
        localMessage.innerHTML = "Erro: " + order;
        return;
      }

    showTablesOrdersActivities(order, tbody);
    localMessage.innerHTML = "Pedido encontrada do cliente com email:<br><br>" + "Email: " + order.clientEmail;
});