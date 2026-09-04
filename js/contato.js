/* =========================================
   NÚMERO DO WHATSAPP
========================================= */

/*
    Depois substitua pelo telefone verdadeiro
    do Rafael.

    Formato:
    55 + DDD + número

    Não coloque espaços, traços ou parênteses.
*/

const whatsappRafael = "5513991258303";


/* =========================================
   INICIAR OS CONTATOS
========================================= */

function iniciarContato() {

    const formulario =
        document.getElementById("formulario-contato");

    const campoTelefone =
        document.getElementById("telefone");

    const botaoWhatsappFlutuante =
        document.getElementById("whatsapp-flutuante");


    /* =====================================
       WHATSAPP FLUTUANTE
    ===================================== */

    if (botaoWhatsappFlutuante) {

        const mensagemInicial =
            "Olá, Rafael! Gostaria de receber informações sobre os imóveis.";


        botaoWhatsappFlutuante.href =

            `https://wa.me/${whatsappRafael}?text=` +

            encodeURIComponent(mensagemInicial);

    }


    /* =====================================
       VERIFICAR O FORMULÁRIO
    ===================================== */

    if (!formulario || !campoTelefone) {

        console.log(
            "O formulário de contato não foi encontrado."
        );

        return;

    }


    /* Aplicar a máscara do telefone */
    campoTelefone.addEventListener(
        "input",
        formatarTelefone
    );


    /* =====================================
       ENVIAR O FORMULÁRIO
    ===================================== */

    formulario.addEventListener(
        "submit",
        function (evento) {

            /*
                Impedir que a página atualize.
            */

            evento.preventDefault();


            /* Pegar os campos */
            const campoNome =
                document.getElementById("nome");

            const campoInteresse =
                document.getElementById("interesse");

            const campoMensagem =
                document.getElementById("mensagem");


            /* Pegar os valores */
            const nome =
                campoNome.value.trim();

            const telefone =
                campoTelefone.value.trim();

            const interesse =
                campoInteresse.value;

            const mensagem =
                campoMensagem.value.trim();


            /* Validar os campos obrigatórios */
            if (nome === "") {

                alert(
                    "Por favor, informe seu nome."
                );

                campoNome.focus();

                return;

            }


            if (telefone === "") {

                alert(
                    "Por favor, informe seu telefone."
                );

                campoTelefone.focus();

                return;

            }


            /* Retirar símbolos do telefone */
            const telefoneSomenteNumeros =
                telefone.replace(/\D/g, "");


            /* Verificar a quantidade de números */
            if (telefoneSomenteNumeros.length < 10) {

                alert(
                    "Informe um telefone válido com DDD."
                );

                campoTelefone.focus();

                return;

            }


            /* Transformar o interesse em texto */
            const textoInteresse =
                obterTextoInteresse(interesse);


            /* Montar a mensagem */
            let textoWhatsApp =

                `Olá, Rafael! Meu nome é ${nome}.` +

                `\n\nMeu telefone é: ${telefone}.` +

                `\n\nTenho interesse em ${textoInteresse}.`;


            /* Adicionar a mensagem, caso exista */
            if (mensagem !== "") {

                textoWhatsApp +=
                    `\n\nMensagem: ${mensagem}`;

            }


            /* Criar o endereço do WhatsApp */
            const enderecoWhatsApp =

                `https://wa.me/${whatsappRafael}?text=` +

                encodeURIComponent(textoWhatsApp);


            /* Abrir o WhatsApp */
            window.open(
                enderecoWhatsApp,
                "_blank"
            );

        }
    );

}


/* =========================================
   CONVERTER O INTERESSE EM TEXTO
========================================= */

function obterTextoInteresse(interesse) {

    if (interesse === "comprar") {

        return "comprar um imóvel";

    }


    if (interesse === "alugar") {

        return "alugar um imóvel";

    }


    if (interesse === "vender") {

        return "vender meu imóvel";

    }


    if (interesse === "avaliar") {

        return "avaliar meu imóvel";

    }


    return "receber informações sobre imóveis";

}


/* =========================================
   FORMATAR O TELEFONE
========================================= */

function formatarTelefone(evento) {

    /*
        Pegar somente os números digitados.
    */

    let numeros =
        evento.target.value.replace(/\D/g, "");


    /* Limitar em 11 números */
    numeros =
        numeros.substring(0, 11);


    let telefoneFormatado = numeros;


    /*
        Formato para celular:
        (13) 99999-9999
    */

    if (numeros.length === 11) {

        telefoneFormatado =

            `(${numeros.substring(0, 2)}) ` +

            `${numeros.substring(2, 7)}-` +

            numeros.substring(7, 11);

    }


    /*
        Formato para telefone fixo:
        (13) 9999-9999
    */

    else if (numeros.length === 10) {

        telefoneFormatado =

            `(${numeros.substring(0, 2)}) ` +

            `${numeros.substring(2, 6)}-` +

            numeros.substring(6, 10);

    }


    /*
        Formatação durante a digitação.
    */

    else if (numeros.length > 6) {

        telefoneFormatado =

            `(${numeros.substring(0, 2)}) ` +

            `${numeros.substring(2, 7)}-` +

            numeros.substring(7);

    }


    else if (numeros.length > 2) {

        telefoneFormatado =

            `(${numeros.substring(0, 2)}) ` +

            numeros.substring(2);

    }


    else if (numeros.length > 0) {

        telefoneFormatado =
            `(${numeros}`;

    }


    /* Mostrar o telefone formatado */
    evento.target.value =
        telefoneFormatado;

}