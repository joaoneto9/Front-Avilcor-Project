export async function getOrderById(id) {
    return await fetch("http://localhost:8080/orders/" + id)
    .then(async response => {
        if (!response.ok) 
            throw new Error("Pedido não encontrado");
        return await response.json();
    })
    .catch(error => {
        return "error getting Order: " + error.message;
    })
    
}