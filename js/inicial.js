let indiceEmEdicao = null;

// Garante que tudo só rode após o HTML carregar
document.addEventListener("DOMContentLoaded", () => {
  const btnSalvar = document.getElementById("btnSalvar");

  if (btnSalvar) {
    btnSalvar.addEventListener("click", salvarNota);
  } // o javascript está funcional?

  carregarNotas();
});

// ===== Salvar nota =====
function salvarNota() {
  const tituloInput = document.querySelector(".nota-titulo");
  const textarea = document.querySelector("textarea");

  const titulo = tituloInput.value.trim();
  const conteudo = textarea.value.trim();

  if (!titulo && !conteudo) return;

  let notas = JSON.parse(localStorage.getItem("notas")) || [];

  if (indiceEmEdicao !== null) {
    notas[indiceEmEdicao] = { titulo, conteudo };
    indiceEmEdicao = null;
  } else {
    notas.push({ titulo, conteudo });
  }

  localStorage.setItem("notas", JSON.stringify(notas));

  tituloInput.value = "";
  textarea.value = "";

  carregarNotas(); // Atualiza a lista imediatamente
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

// ===== Editar nota =====
function editarNota(index) {
  let notas = JSON.parse(localStorage.getItem("notas")) || [];

  document.querySelector(".nota-titulo").value = notas[index].titulo;
  document.querySelector("textarea").value = notas[index].conteudo;

  indiceEmEdicao = index;

  window.scrollTo({ top: 0, behavior: "smooth" });
}
