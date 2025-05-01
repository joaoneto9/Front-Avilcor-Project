// Função para expandir ou esconder a tabela de atividades
export function toggleActivities(orderId) {
    const tr = document.getElementById(`activities-order-${orderId}`);
    if (tr.style.display === "none") {
        tr.style.display = "table-row";
    } else {
        tr.style.display = "none";
    }
}

export function showTablesOrdersActivities(order, tbody) {
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
                    <th>Id</th>
                    <th>Trabalho</th>
                    <th>Roupa</th>
                    <th>Preco</th>
                </tr>
            `;

    const tbodyActivities = document.createElement('tbody');
    order.activities.forEach(activity => {
        const trAct = document.createElement('tr');

        const tdIdActivity = document.createElement('td');
        tdIdActivity.textContent = activity.id;

        const tdTrabalho = document.createElement('td');
        tdTrabalho.textContent = activity.trabalho;

        const tdRoupa = document.createElement('td');
        tdRoupa.textContent = activity.roupa;

        const tdPreco = document.createElement('td');
        tdPreco.textContent = "R$ " + activity.preco;

        trAct.appendChild(tdIdActivity);
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
}