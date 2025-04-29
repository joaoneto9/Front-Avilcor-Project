export async function getAutoCompleteEmail(email) {
    return await fetch("http://localhost:8080/clients/autocomplete/" + email)
    .then(async response => {

        if (!response.ok) {
            throw new Error("Erro ao buscar dados do servidor");
        }

        const data = await response.json();
        return data; // lista de emails
    })
    .catch(error => {
        console.log("erro ao buscar email" + error)
        return [];    
    })
}
