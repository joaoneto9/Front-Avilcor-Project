import { postSaveClient } from "../../routes/post/postClient.js";

document.addEventListener("DOMContentLoaded", function() {
    const btnSalvar = document.getElementById('btnSalvar');
    const mensagem = document.getElementById('mensagem');

    // Adiciona o evento de clique no botão "Salvar"
    btnSalvar.addEventListener('click', function() {
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;

        // Chama a função que faz a requisição POST
        const response = postSaveClient(nome, email);

        // Exibe a resposta (mensagem) no h3
        response.then((data) => {
            mensagem.innerHTML = `Cliente ${data.name} cadastrado com sucesso!`;
            mensagem.style.color = 'green';
        }).catch((error) => {
            mensagem.innerHTML = 'Erro ao cadastrar cliente!';
            mensagem.style.color = 'red';
        });
    });
});