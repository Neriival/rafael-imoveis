/* =========================================
   TIPO DE NEGÓCIO SELECIONADO
========================================= */

let negocioSelecionado = "comprar";


/* =========================================
   INICIAR A BUSCA
========================================= */

function iniciarBusca() {

    const botoesNegocio =
        document.querySelectorAll(".botao-negocio");

    const botaoBuscar =
        document.getElementById("botao-buscar");

    const botaoVerTodos =
        document.getElementById("ver-todos");

    const campoTipo =
        document.getElementById("tipo-imovel");

    const campoBairro =
        document.getElementById("localizacao");

    const campoQuartos =
        document.getElementById("quartos");


    /* Verificar se os elementos existem */
    if (
        botoesNegocio.length === 0 ||
        !botaoBuscar ||
        !campoTipo ||
        !campoBairro ||
        !campoQuartos
    ) {

        console.log(
            "Os elementos da busca não foram encontrados."
        );

        return;

    }


    /* =====================================
       COMPRAR OU ALUGAR
    ===================================== */

    botoesNegocio.forEach(function (botao) {

        botao.addEventListener(
            "click",
            function () {

                /* Remover a classe de todos */
                botoesNegocio.forEach(
                    function (item) {

                        item.classList.remove("ativo");

                    }
                );


                /* Ativar o botão clicado */
                botao.classList.add("ativo");


                /* Guardar o tipo de negócio */
                negocioSelecionado =
                    botao.dataset.negocio;

            }
        );

    });


    /* =====================================
       REALIZAR A BUSCA
    ===================================== */

    botaoBuscar.addEventListener(
        "click",
        function () {

            const tipoSelecionado =
                campoTipo.value;

            const bairroSelecionado =
                campoBairro.value;

            const quartosSelecionados =
                campoQuartos.value;


            /* Filtrar os imóveis */
            const imoveisFiltrados =
                imoveis.filter(
                    function (imovel) {

                        /*
                            Verificar se é compra
                            ou aluguel.
                        */

                        const correspondeNegocio =

                            imovel.negocio ===
                            negocioSelecionado;


                        /*
                            Verificar o tipo do imóvel.
                        */

                        const correspondeTipo =

                            tipoSelecionado === "todos" ||

                            imovel.tipo ===
                            tipoSelecionado;


                        /*
                            Verificar o bairro.
                        */

                        const correspondeBairro =

                            bairroSelecionado === "todas" ||

                            imovel.bairro ===
                            bairroSelecionado;


                        /*
                            Verificar os quartos.
                        */

                        let correspondeQuartos = true;


                        if (
                            quartosSelecionados !== "todos"
                        ) {

                            const quantidadeQuartos =
                                Number(
                                    quartosSelecionados
                                );


                            /*
                                Ao escolher 4, serão
                                mostrados imóveis com
                                quatro quartos ou mais.
                            */

                            if (quantidadeQuartos === 4) {

                                correspondeQuartos =

                                    imovel.quartos >= 4;

                            } else {

                                correspondeQuartos =

                                    imovel.quartos ===
                                    quantidadeQuartos;

                            }

                        }


                        /*
                            O imóvel precisa passar
                            por todos os filtros.
                        */

                        return (

                            correspondeNegocio &&

                            correspondeTipo &&

                            correspondeBairro &&

                            correspondeQuartos

                        );

                    }
                );


            /* Mostrar os resultados */
            exibirImoveis(imoveisFiltrados);


            /* Ir até os imóveis */
            document
                .getElementById("imoveis")
                .scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

        }
    );


    /* =====================================
       LIMPAR TODOS OS FILTROS
    ===================================== */

    if (botaoVerTodos) {

        botaoVerTodos.addEventListener(
            "click",
            function () {

                /* Voltar os campos ao padrão */
                campoTipo.value = "todos";

                campoBairro.value = "todas";

                campoQuartos.value = "todos";


                /* Voltar para Comprar */
                negocioSelecionado = "comprar";


                /* Atualizar os botões */
                botoesNegocio.forEach(
                    function (botao) {

                        const botaoComprar =

                            botao.dataset.negocio ===
                            "comprar";


                        botao.classList.toggle(
                            "ativo",
                            botaoComprar
                        );

                    }
                );


                /* Mostrar todos os imóveis */
                exibirImoveis(imoveis);

            }
        );

    }

}