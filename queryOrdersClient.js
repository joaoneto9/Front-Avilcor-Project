import { getAllOrdersByClientEmail } from "./routes/get/getOrdersClient";

function renderAllOrdersByClientEmail() {

    const email = document.getElementById("email").value;
    const response = getAllOrdersByClientEmail(email);
    
}