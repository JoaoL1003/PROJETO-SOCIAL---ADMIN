function mostrarCadastro(tipo) {
    // Mostrar os formulários
    document.getElementById("cadastro-livros").style.display = (tipo === "livros") ? "block" : "none";
    document.getElementById("cadastro-individuos").style.display = (tipo === "individuos") ? "block" : "none";
    document.getElementById("cadastro-dados").style.display = (tipo === "dados") ? "block" : "none";

    // Selecionar todos os botões
    const botoes = document.querySelectorAll('.link-redicionamento');

    // Remover classe ativa de todos os botões
    botoes.forEach(botao => botao.classList.remove('ativo'));

    // Adicionar classe ativa ao botão clicado
    if (tipo === 'livros') {
        botoes[0].classList.add('ativo');
    } else if (tipo === 'individuos') {
        botoes[1].classList.add('ativo');
    } else if (tipo === 'dados') {
        botoes[2].classList.add('ativo');
    }

    // Agora vamos tratar a troca das imagens
    // Para cada sub-div, esconder a img alternativa e mostrar a img padrão
    const subDivs = document.querySelectorAll('.sub-div-links-cadastro');

    subDivs.forEach((div, index) => {
        const imgAlt = div.querySelector('img[class$="-alternative"]');
        const imgPadrao = div.querySelector('img:not([class$="-alternative"])');

        if (!imgAlt || !imgPadrao) return; // segurança

        // Se o botão na mesma posição está ativo, mostra a img alternativa e esconde a padrão
        if (botoes[index].classList.contains('ativo')) {
            imgAlt.style.display = 'inline';
            imgPadrao.style.display = 'none';
        } else {
            imgAlt.style.display = 'none';
            imgPadrao.style.display = 'inline';
        }
    });
}

window.onload = function () {
    mostrarCadastro('livros');
};


function mostrarFormIndividuo(tipo) {
    // Esconde todos os formulários primeiro
    document.querySelectorAll('.form-individuo').forEach(form => {
        form.style.display = "none";
    });

    // Exibe o formulário correto
    let formSelecionado = document.getElementById(`form-${tipo}`);
    if (formSelecionado) {
        formSelecionado.style.display = "block";
    }
    // Exibe ou oculta o botão "SALVAR" conforme necessário
    let botaoSalvar = document.querySelector('.div-button-submit');
    botaoSalvar.style.display = (formSelecionado && formSelecionado.style.display === "block") ? "block" : "none";
}

//Função Sobre Dados
function mostrarFormDados(tipo) {
    // Esconde todos os formulários primeiro
    document.querySelectorAll('.cadastro-dados').forEach(form => {
        form.style.display = "none";
    });

    // Exibe o formulário correto
    let formSelecionado = document.getElementById(`form-${tipo}`);
    if (formSelecionado) {
        formSelecionado.style.display = "block";
    }
    // Exibe ou oculta o botão "SALVAR" conforme necessário
    let botaoSalvar = document.querySelector('.div-button-submit');
    botaoSalvar.style.display = (formSelecionado && formSelecionado.style.display === "block") ? "block" : "none";
}


//BARA LATERAL
// Seleciona todos os ícones do menu
const icons = document.querySelectorAll('.menu-icon');
const sidebar = document.querySelector('.barra_lateral');

let lastHoveredLI = null; // Armazena o último item com hover "travado"

// Percorre todos os ícones do menu
icons.forEach(icon => {
    const defaultSrc = icon.getAttribute('data-default'); // Ícone padrão
    const hoverSrc = icon.getAttribute('data-hover');     // Ícone ao passar o mouse
    const li = icon.closest('li');                        // Item da lista pai

    // Quando o mouse entra no item
    li.addEventListener('mouseenter', () => {
        // Troca o ícone para o "hover"
        icon.src = hoverSrc;

        // Remove o hover travado do item anterior (se houver)
        if (lastHoveredLI && lastHoveredLI !== li) {
            lastHoveredLI.classList.remove('hover-lock');
            const lastIcon = lastHoveredLI.querySelector('.menu-icon');
            if (lastIcon) {
                lastIcon.src = lastIcon.getAttribute('data-default');
            }
        }

        // Aplica o hover "travado" no item atual
        li.classList.add('hover-lock');
        lastHoveredLI = li;
    });

    // Ao sair do item, não faz nada — o efeito continua travado
    li.addEventListener('mouseleave', () => {
        // Intencionalmente vazio: mantém o ícone alterado
    });
});

// Quando o mouse entra na barra lateral (como um todo), reseta o estado
sidebar.addEventListener('mouseenter', () => {
    if (lastHoveredLI) {
        lastHoveredLI.classList.remove('hover-lock');
        const lastIcon = lastHoveredLI.querySelector('.menu-icon');
        if (lastIcon) {
            lastIcon.src = lastIcon.getAttribute('data-default');
        }
        lastHoveredLI = null;
    }
});