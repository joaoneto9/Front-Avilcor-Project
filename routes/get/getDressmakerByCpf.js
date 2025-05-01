export async function getDressmakerByCpf(cpf) {
    return await fetch("http://localhost:8080/dressmakers/" + cpf)
    .then(async response => {

        if (!response.ok) {
            return response.message;
        }

        return await response.json();
    })
    .catch(error => {
        return "falha ao buscar costureira.";
    }) 
    
}