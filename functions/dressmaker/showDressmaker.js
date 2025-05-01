import { getDressmakerByCpf } from "../../routes/get/getDressmakerByCpf.js";

const button = document.getElementById("query");
const localMessage = document.getElementById("response-data-message");
const tbody = document.getElementById("dressmaker-order-activity-values");

button.addEventListener('click', async function () {
    const cpf = document.getElementById("cpf").value.trim();
    tbody.innerHTML = ""; // limpa a tabela

    const dressmaker = await getDressmakerByCpf(cpf);

    if (!dressmaker || typeof dressmaker === "string") {
        localMessage.textContent = dressmaker || "Costureira não encontrada.";
        return;
    }

    localMessage.textContent = "";

    const tr = document.createElement("tr");

    // Coluna ID
    const tdId = document.createElement("td");
    tdId.textContent = dressmaker.id;
    tr.appendChild(tdId);

    // Coluna Nome
    const tdName = document.createElement("td");
    tdName.textContent = dressmaker.name;
    tr.appendChild(tdName);

    // Coluna Quantidade Máxima
    const tdMax = document.createElement("td");
    tdMax.textContent = dressmaker.maxQuantity + " Atividades";
    tr.appendChild(tdMax);

    // Coluna Atividades (botão toggle)
    const tdActivities = document.createElement("td");
    const btn = document.createElement("button");
    btn.textContent = "Ver Atividades";
    btn.addEventListener("click", () => toggleActivities(dressmaker.id));
    tdActivities.appendChild(btn);
    tr.appendChild(tdActivities);

    // Coluna Salário
    const tdSalary = document.createElement("td");
    tdSalary.textContent = `R$${dressmaker.baseSalary.toFixed(2)}`;
    tr.appendChild(tdSalary);

    tbody.appendChild(tr);

    // Linha para a subtabela
    const trActivities = document.createElement("tr");
    trActivities.id = `activities-order-${dressmaker.id}`;
    trActivities.style.display = "none";

    const tdWrapper = document.createElement("td");
    tdWrapper.colSpan = 5;

    if (Array.isArray(dressmaker.ordersActivities) && dressmaker.ordersActivities.length > 0) {
        const subTable = document.createElement("table");
        subTable.style.width = "100%";
        subTable.border = "1";
        subTable.cellPadding = "8";
        subTable.style.marginTop = "10px";

        // Cabeçalho
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        const thOrderId = document.createElement("th");
        thOrderId.textContent = "Pedido ID";
        const thActivityId = document.createElement("th");
        thActivityId.textContent = "Atividade ID";

        headerRow.appendChild(thOrderId);
        headerRow.appendChild(thActivityId);
        thead.appendChild(headerRow);
        subTable.appendChild(thead);

        // Corpo
        const tbodySub = document.createElement("tbody");
        dressmaker.ordersActivities.forEach(act => {
            const row = document.createElement("tr");

            const tdOrderId = document.createElement("td");
            tdOrderId.textContent = act.orderId;

            const tdActivityId = document.createElement("td");
            tdActivityId.textContent = act.activityId;

            row.appendChild(tdOrderId);
            row.appendChild(tdActivityId);
            tbodySub.appendChild(row);
        });

        subTable.appendChild(tbodySub);
        tdWrapper.appendChild(subTable);
    } else {
        tdWrapper.textContent = "Nenhuma atividade encontrada.";
    }

    trActivities.appendChild(tdWrapper);
    tbody.appendChild(trActivities);
});

export function toggleActivities(orderId) {
    const tr = document.getElementById(`activities-order-${orderId}`);
    tr.style.display = tr.style.display === "none" ? "table-row" : "none";
}


