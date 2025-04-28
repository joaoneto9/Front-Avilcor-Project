export async function postSaveClient(name, email) { 
    const client = {
        name: name,
        email: email
    };
    const response = await fetch('http://localhost:8080/clients/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
    })

    if (!response.ok)
        throw new Error("Erro: " + response.status);

    return await response.json();
}