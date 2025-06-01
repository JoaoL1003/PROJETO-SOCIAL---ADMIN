// =============================
// Lista de Alunos (Dados Base)
// =============================
const alunos = [
  { nome: 'Ana Clara', turma: 'INFORMÁTICA', serie: '1º Ano' },
  { nome: 'Bruno Lima', turma: 'ENFERMAGEM', serie: '2º Ano' },
  { nome: 'Carlos Souza', turma: 'FINANÇAS', serie: '3º Ano' },
  { nome: 'Daniela Costa', turma: 'ESTÉTICA', serie: '1º Ano' },
  { nome: 'Eduardo Melo', turma: 'ENFERMAGEM', serie: '2º Ano' },
  { nome: 'Fernanda Dias', turma: 'FINANÇAS', serie: '3º Ano' },
  { nome: 'Gabriel Rocha', turma: 'INFORMÁTICA', serie: '1º Ano' },
  { nome: 'Helena Alves', turma: 'ENFERMAGEM', serie: '2º Ano' },
  { nome: 'Isabela Martins', turma: 'FINANÇAS', serie: '3º Ano' },
  { nome: 'João Pedro', turma: 'ADMINISTRAÇÃO', serie: '1º Ano' },
  { nome: 'Laura Fernandes', turma: 'ENFERMAGEM', serie: '2º Ano' },
  { nome: 'Marcos Vinícius', turma: 'FINANÇAS', serie: '3º Ano' }
];

// =============================
// Variáveis de Estado
// =============================
let alunosFiltrados = [...alunos]; // Lista filtrada de alunos (inicialmente todos)
let alunoEmEdicao = null;          // Aluno atualmente em edição

// =============================
// Função de Filtro de Alunos
// =============================
function filtrarAlunos() {
  const filtro = document.getElementById('filtro').value.toLowerCase();         // Texto digitado na barra de pesquisa
  const filtroCurso = document.getElementById('filtroCurso').value.toLowerCase(); // Curso selecionado no filtro

  // Aplica os filtros sobre a lista de alunos
  alunosFiltrados = alunos.filter(aluno => {
    const nomeOuTurmaOuSerie =
      aluno.nome.toLowerCase().includes(filtro) ||
      aluno.turma.toLowerCase().includes(filtro) ||
      aluno.serie.toLowerCase().includes(filtro);

    const cursoValido = filtroCurso === "" || aluno.turma.toLowerCase().includes(filtroCurso);

    return nomeOuTurmaOuSerie && cursoValido;
  });

  renderizarTabela(); // Atualiza a tabela com os resultados filtrados
}

// =============================
// Renderiza a Tabela HTML
// =============================
function renderizarTabela() {
  const tabelaBody = document.getElementById('tabela-body');
  tabelaBody.innerHTML = ''; // Limpa o conteúdo anterior

  alunosFiltrados.forEach(aluno => {
    const linha = `
      <tr>
        <td>${aluno.nome}</td>
        <td>${aluno.turma}</td>
        <td>${aluno.serie}</td>
        <td>
          <img 
            class="edit-icon" 
            src="IMGS/editor-user.png" 
            title="Editar" 
            alt="Editar" 
            onclick="editarAluno('${aluno.nome}')"
          >
        </td>
      </tr>
    `;
    tabelaBody.innerHTML += linha;
  });
}

// =============================
// Editar um Aluno
// =============================
function editarAluno(nome) {
  alunoEmEdicao = alunosFiltrados.find(aluno => aluno.nome === nome);

  // Preenche os campos do formulário de edição
  document.getElementById('edit-nome').value = alunoEmEdicao.nome;
  document.getElementById('edit-turma').value = alunoEmEdicao.turma;
  document.getElementById('edit-serie').value = alunoEmEdicao.serie;

  // Exibe o card de edição
  document.getElementById('edit-card').style.display = 'flex';
}

// =============================
// Fechar o Card de Edição
// =============================
function fecharCard() {
  document.getElementById('edit-card').style.display = 'none';
}

// =============================
// Salvar Alterações
// =============================
function salvarEdicoes() {
  const novoNome = document.getElementById('edit-nome').value;
  const novaTurma = document.getElementById('edit-turma').value;
  const novaSerie = document.getElementById('edit-serie').value;

  // Atualiza os dados do aluno em edição
  alunoEmEdicao.nome = novoNome;
  alunoEmEdicao.turma = novaTurma;
  alunoEmEdicao.serie = novaSerie;

  renderizarTabela(); // Re-renderiza a tabela
  fecharCard();       // Fecha o card de edição
}

// =============================
// Inicializa a Tabela ao Carregar
// =============================
renderizarTabela();


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