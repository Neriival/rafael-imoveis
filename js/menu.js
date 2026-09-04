/* =========================================
   INICIAR O MENU MOBILE
========================================= */

function iniciarMenu() {

    const botaoMenu =
        document.getElementById("botao-menu");

    const menu =
        document.getElementById("menu");


    if (!botaoMenu || !menu) {

        console.log(
            "Os elementos do menu não foram encontrados."
        );

        return;
    }


    /* Abrir e fechar o menu */
    botaoMenu.addEventListener("click", function () {

        const menuEstaAberto =
            menu.classList.toggle("aberto");


        botaoMenu.classList.toggle(
            "ativo",
            menuEstaAberto
        );


        botaoMenu.setAttribute(
            "aria-expanded",
            menuEstaAberto
        );


        if (menuEstaAberto) {

            botaoMenu.setAttribute(
                "aria-label",
                "Fechar menu"
            );

        } else {

            botaoMenu.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        }

    });


    /* Fechar depois de clicar em um link */
    const linksMenu =
        menu.querySelectorAll("a");


    linksMenu.forEach(function (link) {

        link.addEventListener("click", function () {

            menu.classList.remove("aberto");

            botaoMenu.classList.remove("ativo");

            botaoMenu.setAttribute(
                "aria-expanded",
                "false"
            );

            botaoMenu.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        });

    });

}