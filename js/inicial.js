let indiceEmEdicao = null;

document.addEventListener("DOMContentLoaded", () => {
  const btnSalvar = document.getElementById("btnSalvar");

  if (btnSalvar) {
    btnSalvar.addEventListener("click", salvarNota);
  }

  // Não chamamos carregarNotas() aqui
});

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

  alert("Nota salva com sucesso!"); // Opcional: aviso que salvou
}

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

    const tituloEl = document.createElement("h2");
    tituloEl.textContent = nota.titulo;

    const conteudoEl = document.createElement("p");
    conteudoEl.textContent = nota.conteudo;

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", () => editarNota(index));

    const btnApagar = document.createElement("button");
    btnApagar.textContent = "Apagar";
    btnApagar.addEventListener("click", () => apagarNota(index));

    div.appendChild(tituloEl);
    div.appendChild(conteudoEl);
    div.appendChild(btnEditar);
    div.appendChild(btnApagar);

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
