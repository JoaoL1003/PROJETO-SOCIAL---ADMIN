const livros = [
  { nome: 'Dom Casmurro', genero: 'Romance', autor: 'Machado de Assis', alugado: false },
  { nome: 'O Pequeno Príncipe', genero: 'Fábula', autor: 'Antoine de Saint-Exupéry', alugado: true },
  { nome: '1984', genero: 'Distopia', autor: 'George Orwell', alugado: true },
  { nome: 'Cem Anos de Solidão', genero: 'Realismo Mágico', autor: 'Gabriel García Márquez', alugado: false },
  { nome: 'O Senhor dos Anéis', genero: 'Fantasia', autor: 'J.R.R. Tolkien', alugado: true },
  { nome: 'A Revolução dos Bichos', genero: 'Sátira', autor: 'George Orwell', alugado: false },
  { nome: 'A Metamorfose', genero: 'Ficção Existencial', autor: 'Franz Kafka', alugado: false },
  { nome: 'O Morro dos Ventos Uivantes', genero: 'Romance Gótico', autor: 'Emily Brontë', alugado: true },
  { nome: 'O Hobbit', genero: 'Fantasia', autor: 'J.R.R. Tolkien', alugado: true },
  { nome: 'Crime e Castigo', genero: 'Romance Psicológico', autor: 'Fiódor Dostoiévski', alugado: true },
  { nome: 'Dom Quixote', genero: 'Clássico', autor: 'Miguel de Cervantes', alugado: true },
  { nome: 'A Guerra dos Mundos', genero: 'Ficção Científica', autor: 'H.G. Wells', alugado: false }
];

let livrosFiltrados = [...livros];
let livroEmEdicao = null;

function filtrarLivros() {
  const filtro = document.getElementById('filtro').value.toLowerCase();
  const filtroGenero = document.getElementById('filtroGenero').value.toLowerCase();

  livrosFiltrados = livros.filter(livro => {
    const camposCombinam =
      livro.nome.toLowerCase().includes(filtro) ||
      livro.genero.toLowerCase().includes(filtro) ||
      livro.autor.toLowerCase().includes(filtro);

    const generoValido = filtroGenero === "" || livro.genero.toLowerCase().includes(filtroGenero);

    return camposCombinam && generoValido;
  });

  renderizarTabela();
}

function renderizarTabela() {
  const tabelaBody = document.getElementById('tabela-body');
  tabelaBody.innerHTML = '';

  livrosFiltrados.forEach(livro => {
    const alugadoIcon = livro.alugado 
  ? '<img src="IMGS/check.png" alt="Alugado" class="alugado-icon">' 
  : '<img src="IMGS/error.png" alt="Não Alugado" class="alugado-icon">'; 

    const linha = `
      <tr>
        <td>${livro.nome}</td>
        <td>${livro.genero}</td>
        <td>${livro.autor}</td>
        <td class="col-alugado">${alugadoIcon}</td>
        <td>
          <img 
            class="edit-icon" 
            src="IMGS/editor-user.png" 
            title="Editar" 
            alt="Editar" 
            onclick="editarLivro('${livro.nome}')"
          >
        </td>
      </tr>
    `;
    tabelaBody.innerHTML += linha;
  });
}

function editarLivro(nome) {
  livroEmEdicao = livrosFiltrados.find(livro => livro.nome === nome);

  document.getElementById('edit-nome').value = livroEmEdicao.nome;
  document.getElementById('edit-genero').value = livroEmEdicao.genero;
  document.getElementById('edit-autor').value = livroEmEdicao.autor;

  document.getElementById('edit-card').style.display = 'flex';
}

function fecharCard() {
  document.getElementById('edit-card').style.display = 'none';
}

function salvarEdicoes() {
  const novoNome = document.getElementById('edit-nome').value;
  const novoGenero = document.getElementById('edit-genero').value;
  const novoAutor = document.getElementById('edit-autor').value;

  livroEmEdicao.nome = novoNome;
  livroEmEdicao.genero = novoGenero;
  livroEmEdicao.autor = novoAutor;

  renderizarTabela();
  fecharCard();
}

renderizarTabela();
