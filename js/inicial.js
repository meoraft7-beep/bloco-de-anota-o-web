/let indiceEmEdicao = null;

// ===== Salvar nota =====
function salvarNota() {
  const tituloInput = document.querySelector('.nota-titulo');
  const textarea = document.querySelector('textarea');

  const titulo = tituloInput.value.trim();
  const conteudo = textarea.value.trim();

  if (!titulo && !conteudo) return;

  let notas = JSON.parse(localStorage.getItem("notas")) || [];

  if (indiceEmEdicao !== null) {
    // Atualiza nota existente
    notas[indiceEmEdicao] = { titulo, conteudo };
    indiceEmEdicao = null;
  } else {
    // Cria nova nota
    notas.push({ titulo, conteudo });
  }

  localStorage.setItem("notas", JSON.stringify(notas));

  // Limpa campos
  tituloInput.value = "";
  textarea.value = "";
}

// ===== Carregar notas =====
function carregarNotas() {
  const lista = document.getElementById("listaNotas");
  if (!lista) return;

  let notas = JSON.parse(localStorage.getItem("notas")) || [];
  lista.innerHTML = "";

  if (notas.length === 0) {
    lista.innerHTML = `
      <div class="nota">
        <p style="text-align:center; font-style:italic; color:#666;">
          🌸 Você ainda não criou nenhuma nota.<br>
          Aproveite este espaço para guardar suas ideias! 🌸
        </p>
      </div>
    `;
    return;
  }

  notas.forEach((nota, index) => {
    const div = document.createElement("div");
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

// ===== Apagar nota =====
function apagarNota(index) {
  if (!confirm("Deseja realmente apagar esta nota?")) return;

  let notas = JSON.parse(localStorage.getItem("notas")) || [];
  notas.splice(index, 1);
  localStorage.setItem("notas", JSON.stringify(notas));
  carregarNotas();
}

// ===== Editar nota (mobile-friendly) =====
function editarNota(index) {
  let notas = JSON.parse(localStorage.getItem("notas")) || [];

  document.querySelector('.nota-titulo').value = notas[index].titulo;
  document.querySelector('textarea').value = notas[index].conteudo;

  indiceEmEdicao = index;

  // Scroll suave até o topo (funciona melhor que prompt)
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ===== Inicialização =====
window.addEventListener("load", carregarNotas);
