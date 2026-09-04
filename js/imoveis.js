/* =========================================
   DADOS DOS IMÓVEIS
========================================= */

const imoveis = [

    {
        id: 1,
        negocio: "comprar",
        tipo: "apartamento",
        etiqueta: "Destaque",

        titulo: "Apartamento com vista para o mar",

        localizacao: "Canto do Forte, Praia Grande",
        bairro: "canto-do-forte",

        preco: "R$ 1.280.000",

        quartos: 3,
        banheiros: 3,
        vagas: 2,
        area: "132 m²",

        descricao:
            "Apartamento de alto padrão com varanda gourmet, ambientes integrados e uma vista privilegiada para o mar.",

        imagens: [
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",

            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",

            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85",

            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85"
        ]
    },


    {
        id: 2,
        negocio: "comprar",
        tipo: "apartamento",
        etiqueta: "Oportunidade",

        titulo: "Apartamento próximo à praia",

        localizacao: "Vila Caiçara, Praia Grande",
        bairro: "caicara",

        preco: "R$ 495.000",

        quartos: 2,
        banheiros: 2,
        vagas: 1,
        area: "78 m²",

        descricao:
            "Apartamento bem distribuído, iluminado e localizado próximo à praia e ao comércio da região.",

        imagens: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",

            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",

            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85",

            "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1400&q=85"
        ]
    },


    {
        id: 3,
        negocio: "comprar",
        tipo: "casa",
        etiqueta: "Exclusivo",

        titulo: "Casa térrea com área gourmet",

        localizacao: "Vila Tupi, Praia Grande",
        bairro: "tupi",

        preco: "R$ 890.000",

        quartos: 3,
        banheiros: 3,
        vagas: 4,
        area: "184 m²",

        descricao:
            "Casa térrea espaçosa com área gourmet, quintal e ambientes planejados para reunir toda a família.",

        imagens: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",

            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=85",

            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",

            "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1400&q=85"
        ]
    },


    {
        id: 4,
        negocio: "alugar",
        tipo: "apartamento",
        etiqueta: "Para alugar",

        titulo: "Apartamento mobiliado com dois quartos",

        localizacao: "Guilhermina, Praia Grande",
        bairro: "guilhermina",

        preco: "R$ 3.200/mês",

        quartos: 2,
        banheiros: 2,
        vagas: 1,
        area: "82 m²",

        descricao:
            "Apartamento mobiliado e pronto para morar, com varanda, cozinha planejada e excelente localização.",

        imagens: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=85",

            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=85",

            "https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=1400&q=85",

            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=85"
        ]
    },


        {
        id: 5,
        negocio: "alugar",
        tipo: "apartamento",
        etiqueta: "Para alugar",

        titulo: "Apartamento mobiliado com dois quartos",

        localizacao: "Samambaia, Praia Grande",
        bairro: "samambaia",

        preco: "R$ 7.200/mês",

        quartos: 2,
        banheiros: 2,
        vagas: 1,
        area: "82 m²",

        descricao:
            "Apartamento mobiliado e pronto para morar, com varanda, cozinha planejada e excelente localização.",

        imagens: [
            
        ]
    }

];


/* =========================================
   EXIBIR OS IMÓVEIS
========================================= */

function exibirImoveis(lista) {

    const listaImoveis =
        document.getElementById("lista-imoveis");

    const quantidadeImoveis =
        document.getElementById("quantidade-imoveis");


    if (!listaImoveis) {

        console.log(
            "A seção de imóveis ainda não foi carregada."
        );

        return;

    }


    /* Atualizar a quantidade */
    if (quantidadeImoveis) {

        if (lista.length === 1) {

            quantidadeImoveis.textContent =
                "1 imóvel encontrado";

        } else {

            quantidadeImoveis.textContent =
                `${lista.length} imóveis encontrados`;

        }

    }


    /* Limpar os cards anteriores */
    listaImoveis.innerHTML = "";


    /* Nenhum resultado */
    if (lista.length === 0) {

        listaImoveis.innerHTML = `

            <div class="nenhum-imovel">

                <h3>
                    Nenhum imóvel encontrado
                </h3>

                <p>
                    Tente alterar os filtros da pesquisa.
                </p>

            </div>

        `;

        return;

    }


    /* Criar os cards */
    lista.forEach(function (imovel) {

        const card =
            document.createElement("article");


        card.classList.add("card-imovel");

        card.dataset.id = imovel.id;

        card.setAttribute("tabindex", "0");

        card.setAttribute(
            "aria-label",
            `Abrir detalhes de ${imovel.titulo}`
        );


        card.innerHTML = `

            <div class="card-imagem">

                <img
                    src="${imovel.imagens[0]}"
                    alt="${imovel.titulo}"
                    loading="lazy"
                    decoding="async"
                >

                <span class="etiqueta-imovel">
                    ${imovel.etiqueta}
                </span>

                <span class="tipo-imovel-card">
                    ${imovel.tipo}
                </span>

            </div>


            <div class="card-conteudo">

                <p class="card-localizacao">
                    📍 ${imovel.localizacao}
                </p>

                <h3>
                    ${imovel.titulo}
                </h3>


                <div class="card-caracteristicas">

                    <span>
                        🛏️ ${imovel.quartos} quartos
                    </span>

                    <span>
                        🚿 ${imovel.banheiros}
                    </span>

                    <span>
                        🚗 ${imovel.vagas}
                    </span>

                    <span>
                        📐 ${imovel.area}
                    </span>

                </div>


                <div class="card-preco">

                    <strong>
                        ${imovel.preco}
                    </strong>

                    <button
                        type="button"
                        aria-label="Ver detalhes do imóvel"
                    >
                        →
                    </button>

                </div>

            </div>

        `;


        /* Abrir o modal clicando no card */
        card.addEventListener(
            "click",
            function () {

                abrirModalImovel(imovel.id);

            }
        );


        /* Abrir com a tecla Enter */
        card.addEventListener(
            "keydown",
            function (evento) {

                if (evento.key === "Enter") {

                    abrirModalImovel(imovel.id);

                }

            }
        );


    /* Verificar se a imagem carregou */
const imagemCard =
    card.querySelector(".card-imagem img");


imagemCard.addEventListener(
    "error",
    function () {

        /*
            Evita um ciclo caso a própria
            imagem padrão tenha algum erro.
        */

        imagemCard.onerror = null;


        /* Mostrar a imagem padrão */
        imagemCard.src =
            "imagens/imovel-sem-foto.svg";

    }
);
        

        listaImoveis.appendChild(card);

    });

}


/* =========================================
   INICIAR OS IMÓVEIS
========================================= */

function iniciarImoveis() {

    exibirImoveis(imoveis);

}