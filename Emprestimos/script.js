const livros = [
  { nome: "Dom Casmurro", autor: "Machado de Assis", exemplar: 1, status: "Livre" },
  { nome: "Dom Casmurro", autor: "Machado de Assis", exemplar: 2, status: "Livre" },
  { nome: "Dom Casmurro", autor: "Machado de Assis", exemplar: 3, status: "Livre" },
  { nome: "1984", autor: "George Orwell", exemplar: 1, status: "Livre" },
  { nome: "1984", autor: "George Orwell", exemplar: 2, status: "Livre" },
  { nome: "1984", autor: "George Orwell", exemplar: 3, status: "Livre" },
  { nome: "O Hobbit", autor: "J.R.R. Tolkien", exemplar: 1, status: "Livre" },
  { nome: "O Hobbit", autor: "J.R.R. Tolkien", exemplar: 2, status: "Livre" },
  { nome: "O Cortiço", autor: "Aluísio Azevedo", exemplar: 1, status: "Livre" },
  { nome: "O Cortiço", autor: "Aluísio Azevedo", exemplar: 2, status: "Livre" },
  { nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", exemplar: 1, status: "Livre" },
  { nome: "Harry Potter", autor: "J.K. Rowling", exemplar: 1, status: "Livre" },
  { nome: "Harry Potter", autor: "J.K. Rowling", exemplar: 2, status: "Livre" },
  { nome: "Capitães da Areia", autor: "Jorge Amado", exemplar: 1, status: "Livre" },
  { nome: "Grande Sertão: Veredas", autor: "Guimarães Rosa", exemplar: 1, status: "Livre" },
];

const alunos = [
  { nome: "Ana Clara", curso: "Administração", ano: "1º" },
  { nome: "Bruno Lima", curso: "Estética", ano: "2º" },
  { nome: "Carlos Souza", curso: "Informática", ano: "3º" },
  { nome: "Daniela Costa", curso: "Finanças", ano: "1º" },
  { nome: "Eduardo Melo", curso: "Enfermagem", ano: "2º" },
  { nome: "Fernanda Dias", curso: "Informática", ano: "1º" },
  { nome: "Gabriel Rocha", curso: "Finanças", ano: "3º" },
  { nome: "Helena Alves", curso: "Enfermagem", ano: "3º" },
  { nome: "Isabela Martins", curso: "Estética", ano: "1º" },
  { nome: "João Pedro", curso: "Administração", ano: "1º" },
];

let livroSelecionado = null;
let alunoSelecionado = null;
let alunoEmprestimos = {};
let livroParaRenovar = null;

function filtrarLivros() {
  const termo = document.getElementById("filtro").value.toLowerCase();
  const tbody = document.getElementById("tabela-body");
  tbody.innerHTML = "";

  livros.forEach((livro, index) => {
    if (livro.nome.toLowerCase().includes(termo) || livro.autor.toLowerCase().includes(termo)) {
      const linha = document.createElement("tr");

      let cor = "rgba(38, 167, 55, 0.8)"; // verde
      if (livro.status === "Emprestado") cor = "rgba(245, 156, 0, 0.8)"; // laranja
      if (livro.status === "Atrasado") cor = "rgba(222, 4, 4, 0.8)"; // vermelho

      linha.innerHTML = `
        <td>${livro.nome}</td>
        <td>${livro.autor}</td>
        <td style="background-color: ${cor}; color: white;">${livro.status}</td>
        <td>${livro.exemplar}</td>
        <td>
          ${livro.status === "Livre"
            ? `<img class="edit-icon" src="IMGS/Icons/emprestar.png" onclick="abrirEmprestimo(${index})" title="Emprestar" />`
            : `<img class="edit-icon-RENOVAR" src="IMGS/Icons/renovar.png" onclick="abrirRenovacao(${index})" title="Renovar" />`
          }
        </td>
        <td>
          <img class="edit-icon-SOBRE" src="IMGS/Icons/info.png" onclick="abrirSobre(${index})" title="Informações" />
        </td>
      `;
      tbody.appendChild(linha);
    }
  });
}

// Funções de Empréstimo
function abrirEmprestimo(index) {
  livroSelecionado = index;
  document.getElementById("input-aluno").value = "";
  document.getElementById("btn-confirmar").disabled = true;
  document.getElementById("lista-sugestoes").innerHTML = "";
  document.getElementById("edit-card").style.display = "flex";
}

function fecharCard() {
  document.getElementById("edit-card").style.display = "none";
}

function mostrarSugestoes() {
  const input = document.getElementById("input-aluno");
  const lista = document.getElementById("lista-sugestoes");
  const termo = input.value.toLowerCase();
  lista.innerHTML = "";

  if (!termo) {
    document.getElementById("btn-confirmar").disabled = true;
    return;
  }

  const alunosFiltrados = alunos.filter(aluno => 
    aluno.nome.toLowerCase().includes(termo) && !alunoEmprestimos[aluno.nome]
  );

  alunosFiltrados.forEach(aluno => {
    const item = document.createElement("li");
    item.textContent = aluno.nome;
    item.onclick = () => selecionarAluno(aluno.nome);
    lista.appendChild(item);
  });
}

function selecionarAluno(nome) {
  document.getElementById("input-aluno").value = nome;
  alunoSelecionado = nome;
  document.getElementById("btn-confirmar").disabled = false;
  document.getElementById("lista-sugestoes").innerHTML = "";
}

function confirmarEmprestimo() {
  if (!alunoSelecionado) return;

  livros[livroSelecionado].status = "Emprestado";

  const devolucao = new Date();
  devolucao.setDate(devolucao.getDate() + 7);

  const aluno = alunos.find(a => a.nome === alunoSelecionado);

  alunoEmprestimos[alunoSelecionado] = {
    livro: livros[livroSelecionado],
    curso: aluno?.curso || "Não informado",
    ano: aluno?.ano || "Não informado",
    devolucao: devolucao
  };

  document.getElementById("edit-card").style.display = "none";
  document.getElementById("mensagem-confirmacao").textContent = 
    `${livros[livroSelecionado].nome} emprestado para ${alunoSelecionado} (${aluno.curso} - ${aluno.ano}). Devolução em ${devolucao.toLocaleDateString()}`;
  document.getElementById("modal-confirmacao").style.display = "flex";

  filtrarLivros();
}



// Funções de Renovação
function abrirRenovacao(index) {
  livroParaRenovar = index;
  const livro = livros[index];
  
  for (const nome in alunoEmprestimos) {
    if (alunoEmprestimos[nome].livro === livro) {
      const devolucaoAtual = alunoEmprestimos[nome].devolucao;
      const novaDevolucao = new Date(devolucaoAtual);
      novaDevolucao.setDate(devolucaoAtual.getDate() + 7);
      
      document.getElementById("info-renovacao").innerHTML = `
        <strong>Livro:</strong> ${livro.nome}<br>
        <strong>Aluno:</strong> ${nome}<br>
        <strong>Devolução atual:</strong> ${devolucaoAtual.toLocaleDateString()}<br>
        <strong>Nova devolução:</strong> ${novaDevolucao.toLocaleDateString()}
      `;
      break;
    }
  }
  
  document.getElementById("renovacao-card").style.display = "flex";
}

function fecharRenovacao() {
  document.getElementById("renovacao-card").style.display = "none";
}

function confirmarRenovacao() {
  const livro = livros[livroParaRenovar];

  for (const nome in alunoEmprestimos) {
    if (alunoEmprestimos[nome].livro === livro) {
      // Renova a data de devolução
      alunoEmprestimos[nome].devolucao.setDate(
        alunoEmprestimos[nome].devolucao.getDate() + 7
      );

      const novaData = alunoEmprestimos[nome].devolucao.toLocaleDateString();

      // Busca dados do aluno (curso e série)
      const dadosAluno = alunos.find(a => a.nome === nome);
      const curso = dadosAluno?.curso || "Curso não encontrado";
      const ano = dadosAluno?.ano || "Ano não encontrado";

      // Mensagem estilizada
      document.getElementById("mensagem-confirmacao").innerHTML = `
        <div class="mensagem-formatada">
          <strong>Livro:</strong> ${livro.nome}<br>
          <strong>Aluno:</strong> ${nome}<br>
          <strong>Curso:</strong> ${curso} - ${ano}<br>
          <strong>Nova devolução:</strong> ${novaData}
        </div>
      `;

      fecharRenovacao();
      document.getElementById("modal-confirmacao").style.display = "flex";
      filtrarLivros();
      return;
    }
  }

  alert("Erro: Não foi possível renovar o empréstimo.");
  fecharRenovacao();
}


// Funções de Informações
function abrirSobre(index) {
  const livro = livros[index];
  let mensagemHTML = `
    <div class="mensagem-formatada">
      <strong>Livro:</strong> ${livro.nome}<br>
      <strong>Status:</strong> Disponível
    </div>
  `;

  for (const nome in alunoEmprestimos) {
    if (alunoEmprestimos[nome].livro === livro) {
      const dataDevolucao = alunoEmprestimos[nome].devolucao.toLocaleDateString();

      // Buscar curso e série do aluno
      const dadosAluno = alunos.find(a => a.nome === nome);
      const curso = dadosAluno?.curso || "Curso não encontrado";
      const ano = dadosAluno?.ano || "Ano não encontrado";

      mensagemHTML = `
        <div class="mensagem-formatada">
          <strong>Livro:</strong> ${livro.nome}<br>
          <strong>Aluno:</strong> ${nome}<br>
          <strong>Curso:</strong> ${curso} - ${ano}<br>
          <strong>Devolução prevista:</strong> ${dataDevolucao}
        </div>
      `;
      break;
    }
  }

  document.getElementById("mensagem-sobre").innerHTML = mensagemHTML;
  document.getElementById("sobre-card").style.display = "flex";
}


function fecharSobre() {
  document.getElementById("sobre-card").style.display = "none";
}

function fecharConfirmacao() {
  document.getElementById("modal-confirmacao").style.display = "none";
}

// Inicialização
window.onload = () => {
  filtrarLivros();
  document.getElementById("input-aluno").addEventListener("input", mostrarSugestoes);
};


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