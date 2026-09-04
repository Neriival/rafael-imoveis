/* =========================================
   CARREGAR AS SEÇÕES DO SITE
========================================= */

async function carregarSecao(id, caminho) {

    try {

        const resposta = await fetch(caminho);

        if (!resposta.ok) {

            throw new Error(
                `Não foi possível carregar: ${caminho}`
            );

        }

        const conteudo = await resposta.text();

        const elemento =
            document.getElementById(id);

        if (!elemento) {

            console.log(
                `Elemento não encontrado: ${id}`
            );

            return;

        }

        elemento.innerHTML = conteudo;

    } catch (erro) {

        console.error(
            "Erro ao carregar a seção:",
            erro
        );

    }

}


/* =========================================
   CARREGAR TODAS AS SEÇÕES
========================================= */

async function carregarTodasAsSecoes() {

    await carregarSecao(
        "header",
        "sections/header.html"
    );

    await carregarSecao(
        "apresentacao",
        "sections/apresentacao.html"
    );

    await carregarSecao(
        "busca",
        "sections/busca.html"
    );

    await carregarSecao(
        "imoveis",
        "sections/imoveis.html"
    );

    await carregarSecao(
        "servicos",
        "sections/servicos.html"
    );

    await carregarSecao(
        "modal-imovel",
        "sections/modal-imovel.html"
    );

    await carregarSecao(
        "contato",
        "sections/contato.html"
    );

    await carregarSecao(
        "footer",
        "sections/footer.html"
    );

    await carregarSecao(
        "whatsapp-flutuante-container",
        "sections/whatsapp-flutuante.html"
    );


    /* Exibir os imóveis */
    iniciarImoveis();

    /* Ativar os filtros */
    iniciarBusca();

    /* Ativar o modal */
    iniciarModal();

    /* Ativar o formulário */
    iniciarContato();

    /* Ativar o menu mobile */
    iniciarMenu();


    console.log(
        "Todas as seções foram carregadas."
    );

}


/* =========================================
   INICIAR O CARREGAMENTO
========================================= */

carregarTodasAsSecoes();