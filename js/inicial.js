// Função para salvar nota
function salvarNota() {
  const titulo = document.querySelector('.nota-titulo').value;
  const conteudo = document.querySelector('textarea').value;

  if (!titulo && !conteudo) return; // evita salvar vazio

  // Recupera notas existentes
  let notas = JSON.parse(localStorage.getItem("notas")) || [];

  // Adiciona nova nota como objeto
  notas.push({ titulo, conteudo });

  // Salva no localStorage
  localStorage.setItem("notas", JSON.stringify(notas));

  // Limpa campos
  document.querySelector('.nota-titulo').value = "";
  document.querySelector('textarea').value = "";
}

// Função para carregar notas na página notas.html
function carregarNotas() {
  let lista = document.getElementById("listaNotas");
  if (!lista) return;

  let notas = JSON.parse(localStorage.getItem("notas")) || [];
  lista.innerHTML = "";

  if (notas.length === 0) {
    // Mensagem bonita quando não há notas
    lista.innerHTML = `
      <div class="nota">
        <p style="text-align:center; font-style:italic; color:#666;">
          🌸 Você ainda não criou nenhuma nota.<br>
          Aproveite este espaço para guardar suas ideias mais especiais! 🌸
        </p>
      </div>
    `;
    return;
  }

  notas.forEach((nota, index) => {
    let div = document.createElement("div");
    div.className = "nota";
    div.innerHTML = `
      <h2>${nota.titulo}</h2>
      <p>${nota.conteudo}</p>
      <button onclick="editarNota(${index})">Editar</button>
      <button onclick="apagarNota(${index})">Apagar</button>
    `;
    lista.appendChild(div);
  });
}


// Função para apagar nota
function apagarNota(index) {
  let notas = JSON.parse(localStorage.getItem("notas")) || [];
  notas.splice(index, 1);
  localStorage.setItem("notas", JSON.stringify(notas));
  carregarNotas();
}

// Função para editar nota
function editarNota(index) {
  let notas = JSON.parse(localStorage.getItem("notas")) || [];
  let tituloNovo = prompt("Edite o título:", notas[index].titulo);
  let conteudoNovo = prompt("Edite o conteúdo:", notas[index].conteudo);

  if (tituloNovo !== null && conteudoNovo !== null) {
    notas[index] = { titulo: tituloNovo, conteudo: conteudoNovo };
    localStorage.setItem("notas", JSON.stringify(notas));
    carregarNotas();
  }
}

// Carregar notas automaticamente na página de listagem
window.onload = carregarNotas;

