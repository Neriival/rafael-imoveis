/* =========================================
   CONTROLE DO MODAL
========================================= */

let imovelModalAtual = null;
let fotoModalAtual = 0;

const imagemPadraoModal =
    "imagens/imovel-sem-foto.jpg";


/* =========================================
   PREPARAR AS IMAGENS DO IMÓVEL
========================================= */

function obterImagensDoImovel(imovel) {
    if (
        Array.isArray(imovel.imagens) &&
        imovel.imagens.length > 0
    ) {
        return imovel.imagens.filter(function (imagem) {
            return imagem && imagem.trim() !== "";
        });
    }

    if (imovel.imagem && imovel.imagem.trim() !== "") {
        return [imovel.imagem];
    }

    return [imagemPadraoModal];
}


/* =========================================
   ABRIR A FICHA DO IMÓVEL
========================================= */

function abrirModalImovel(id) {
    imovelModalAtual = imoveis.find(function (imovel) {
        return imovel.id === id;
    });

    if (!imovelModalAtual) {
        console.log("Imóvel não encontrado:", id);
        return;
    }

    /*
        Garante que sempre exista pelo menos uma imagem.
        Caso o imóvel não tenha fotos, aparece a imagem padrão.
    */
    imovelModalAtual.imagens =
        obterImagensDoImovel(imovelModalAtual);

    fotoModalAtual = 0;

    document.getElementById("modal-tipo").textContent =
        imovelModalAtual.tipo || "Imóvel";

    document.getElementById("modal-titulo").textContent =
        imovelModalAtual.titulo || "Imóvel disponível";

    document.getElementById("modal-localizacao").textContent =
        "📍 " +
        (imovelModalAtual.localizacao ||
            "Localização não informada");

    document.getElementById("modal-quartos").textContent =
        "🛏️ " +
        (imovelModalAtual.quartos ?? 0) +
        " quartos";

    document.getElementById("modal-banheiros").textContent =
        "🚿 " +
        (imovelModalAtual.banheiros ?? 0) +
        " banheiros";

    document.getElementById("modal-vagas").textContent =
        "🚗 " +
        (imovelModalAtual.vagas ?? 0) +
        " vagas";

    document.getElementById("modal-area").textContent =
        "📐 " +
        (imovelModalAtual.area ||
            "Área não informada");

    document.getElementById("modal-descricao").textContent =
        imovelModalAtual.descricao ||
        "Entre em contato para receber mais informações sobre este imóvel.";

    document.getElementById("modal-preco").textContent =
        imovelModalAtual.preco ||
        "Consulte o valor";

    const mensagem =
        "Olá! Gostaria de mais informações sobre o imóvel: " +
        imovelModalAtual.titulo +
        ".";

    document.getElementById("modal-whatsapp").href =
        `https://wa.me/${whatsappRafael}?text=${encodeURIComponent(
            mensagem
        )}`;

    criarMiniaturas();
    atualizarFotoModal();

    document
        .getElementById("modal-overlay")
        .classList.add("aberto");

    document.body.style.overflow = "hidden";
}


/* =========================================
   CRIAR AS MINIATURAS
========================================= */

function criarMiniaturas() {
    const areaMiniaturas =
        document.getElementById("modal-miniaturas");

    if (!areaMiniaturas || !imovelModalAtual) {
        return;
    }

    areaMiniaturas.innerHTML = "";

    imovelModalAtual.imagens.forEach(
        function (imagem, indice) {
            const botao =
                document.createElement("button");

            botao.type = "button";
            botao.classList.add("modal-miniatura");

            const miniatura =
                document.createElement("img");

            miniatura.src = imagem;
            miniatura.alt =
                `Foto ${indice + 1} de ` +
                imovelModalAtual.titulo;

            miniatura.loading = "lazy";
            miniatura.decoding = "async";

            /*
                Se a imagem não carregar,
                coloca automaticamente a imagem padrão.
            */
            miniatura.addEventListener(
                "error",
                function () {
                    if (
                        miniatura.src.endsWith(
                            "imovel-sem-foto.jpg"
                        )
                    ) {
                        return;
                    }

                    miniatura.src = imagemPadraoModal;
                }
            );

            botao.appendChild(miniatura);

            botao.addEventListener(
                "click",
                function () {
                    fotoModalAtual = indice;
                    atualizarFotoModal();
                }
            );

            areaMiniaturas.appendChild(botao);
        }
    );
}


/* =========================================
   ATUALIZAR A FOTO PRINCIPAL
========================================= */

function atualizarFotoModal() {
    if (!imovelModalAtual) {
        return;
    }

    const imagemPrincipal =
        document.getElementById("modal-imagem");

    const contador =
        document.getElementById("contador-fotos");

    imagemPrincipal.src =
        imovelModalAtual.imagens[fotoModalAtual];

    /*
        Caso a fotografia esteja com o caminho errado
        ou não exista, será exibida a imagem padrão.
    */
    imagemPrincipal.onerror = function () {
        imagemPrincipal.onerror = null;
        imagemPrincipal.src = imagemPadraoModal;
    };

    contador.textContent =
        `${fotoModalAtual + 1} / ` +
        `${imovelModalAtual.imagens.length}`;

    const miniaturas =
        document.querySelectorAll(".modal-miniatura");

    miniaturas.forEach(
        function (miniatura, indice) {
            miniatura.classList.toggle(
                "ativa",
                indice === fotoModalAtual
            );
        }
    );

    atualizarBotoesDaGaleria();
}


/* =========================================
   CONTROLAR OS BOTÕES DA GALERIA
========================================= */

function atualizarBotoesDaGaleria() {
    const botaoAnterior =
        document.getElementById("foto-anterior");

    const botaoProximo =
        document.getElementById("proxima-foto");

    const possuiVariasFotos =
        imovelModalAtual.imagens.length > 1;

    botaoAnterior.style.display =
        possuiVariasFotos ? "flex" : "none";

    botaoProximo.style.display =
        possuiVariasFotos ? "flex" : "none";
}


/* =========================================
   VOLTAR UMA FOTOGRAFIA
========================================= */

function voltarFotoModal() {
    if (!imovelModalAtual) {
        return;
    }

    fotoModalAtual--;

    if (fotoModalAtual < 0) {
        fotoModalAtual =
            imovelModalAtual.imagens.length - 1;
    }

    atualizarFotoModal();
}


/* =========================================
   AVANÇAR UMA FOTOGRAFIA
========================================= */

function avancarFotoModal() {
    if (!imovelModalAtual) {
        return;
    }

    fotoModalAtual++;

    if (
        fotoModalAtual >=
        imovelModalAtual.imagens.length
    ) {
        fotoModalAtual = 0;
    }

    atualizarFotoModal();
}


/* =========================================
   INICIAR OS CONTROLES DO MODAL
========================================= */

function iniciarModal() {
    const overlay =
        document.getElementById("modal-overlay");

    const botaoFechar =
        document.getElementById("modal-fechar");

    const botaoAnterior =
        document.getElementById("foto-anterior");

    const botaoProximo =
        document.getElementById("proxima-foto");

    if (
        !overlay ||
        !botaoFechar ||
        !botaoAnterior ||
        !botaoProximo
    ) {
        console.log(
            "Os elementos do modal ainda não foram carregados."
        );

        return;
    }

    botaoFechar.addEventListener(
        "click",
        fecharModal
    );

    botaoAnterior.addEventListener(
        "click",
        voltarFotoModal
    );

    botaoProximo.addEventListener(
        "click",
        avancarFotoModal
    );

    overlay.addEventListener(
        "click",
        function (evento) {
            if (evento.target === overlay) {
                fecharModal();
            }
        }
    );

    document.addEventListener(
        "keydown",
        function (evento) {
            const modalAberto =
                overlay.classList.contains("aberto");

            if (!modalAberto) {
                return;
            }

            if (evento.key === "Escape") {
                fecharModal();
            }

            if (evento.key === "ArrowLeft") {
                voltarFotoModal();
            }

            if (evento.key === "ArrowRight") {
                avancarFotoModal();
            }
        }
    );
}


/* =========================================
   FECHAR A FICHA DO IMÓVEL
========================================= */

function fecharModal() {
    const overlay =
        document.getElementById("modal-overlay");

    if (overlay) {
        overlay.classList.remove("aberto");
    }

    document.body.style.overflow = "";
    imovelModalAtual = null;
    fotoModalAtual = 0;
}