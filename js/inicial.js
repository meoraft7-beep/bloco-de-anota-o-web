// Inicializa o storage de usuários
if (!localStorage.getItem('usuarios')) {
    localStorage.setItem('usuarios', JSON.stringify([]));
}

// Função de cadastro
function cadastrar() {
    const usuario = document.getElementById('usuarioInput').value.trim();
    const senha = document.getElementById('senhaInput').value;
    const loginStatus = document.getElementById('loginStatus');

    if (!usuario || !senha) {
        loginStatus.innerHTML = "Digite usuário e senha!";
        loginStatus.style.color = "red";
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios'));

    if (usuarios.find(u => u.usuario === usuario)) {
        loginStatus.innerHTML = "Usuário já existe!";
        loginStatus.style.color = "red";
        return;
    }

    usuarios.push({ usuario, senha, notas: [], tarefas: [] });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    loginStatus.innerHTML = "Cadastro realizado com sucesso!";
    loginStatus.style.color = "green";

    document.getElementById('usuarioInput').value = "";
    document.getElementById('senhaInput').value = "";
}

// Função de login
function login() {
    const usuario = document.getElementById('usuarioInput').value.trim();
    const senha = document.getElementById('senhaInput').value;
    const loginStatus = document.getElementById('loginStatus');

    if (!usuario || !senha) {
        loginStatus.innerHTML = "Digite usuário e senha!";
        loginStatus.style.color = "red";
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    const usuarioValido = usuarios.find(u => u.usuario === usuario && u.senha === senha);

    if (usuarioValido) {
        localStorage.setItem('usuarioLogado', usuario);
        loginStatus.innerHTML = `Bem-vindo, ${usuario}!`;
        loginStatus.style.color = "green";
        carregarMenu();
    } else {
        loginStatus.innerHTML = "Usuário ou senha incorretos!";
        loginStatus.style.color = "red";
    }
}

// Logout
function logout() {
    localStorage.removeItem('usuarioLogado');
    document.getElementById('loginStatus').innerHTML = "Desconectado!";
    document.getElementById('Bloco').value = "";
    document.getElementById('notesList').innerHTML = "";
    document.getElementById('tasksList').innerHTML = "";
}

// Função auxiliar: pega usuário logado
function getUsuarioLogado() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) return null;
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    return usuarios.find(u => u.usuario === usuarioLogado);
}

// Salvar nota
function salvarNota() {
    let usuario = getUsuarioLogado();
    if (!usuario) {
        alert("Faça login para salvar notas!");
        return;
    }

    const areaTexto = document.getElementById('Bloco');
    const status = document.getElementById('Status');
    const notaNova = areaTexto.value.trim();

    if (!notaNova) {
        alert("Digite algo para salvar!");
        return;
    }

    usuario.notas.push(notaNova);

    atualizarUsuario(usuario);

    status.innerHTML = "Nota salva!";
    areaTexto.value = "";

    carregarMenu();
}

// Salvar tarefa
function salvarTarefa() {
    let usuario = getUsuarioLogado();
    if (!usuario) {
        alert("Faça login para salvar tarefas!");
        return;
    }

    const areaTexto = document.getElementById('Bloco');
    const status = document.getElementById('Status');
    const tarefaNova = areaTexto.value.trim();

    if (!tarefaNova) {
        alert("Digite algo para salvar!");
        return;
    }

    usuario.tarefas.push(tarefaNova);

    atualizarUsuario(usuario);

    status.innerHTML = "Tarefa salva!";
    areaTexto.value = "";

    carregarMenu();
}

// Atualiza os dados do usuário no localStorage
function atualizarUsuario(usuarioAtualizado) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    usuarios = usuarios.map(u => u.usuario === usuarioAtualizado.usuario ? usuarioAtualizado : u);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Menu
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => menu.classList.toggle("hidden"));

// Carrega notas e tarefas do usuário logado
function carregarMenu() {
    const usuario = getUsuarioLogado();
    if (!usuario) return;

    const notesList = document.getElementById("notesList");
    const tasksList = document.getElementById("tasksList");
    notesList.innerHTML = "";
    tasksList.innerHTML = "";

    // Notas
    if (usuario.notas.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Nenhuma nota salva";
        notesList.appendChild(li);
    } else {
        usuario.notas.forEach((nota, index) => {
            const li = document.createElement("li");
            const span = document.createElement("span");
            span.textContent = nota;
            span.style.cursor = "pointer";
            span.addEventListener("click", () => {
                document.getElementById('Bloco').value = nota;
                document.getElementById('Status').innerHTML = `Nota ${index+1} aberta`;
                menu.classList.add("hidden");
            });

            const btnDel = document.createElement("button");
            btnDel.textContent = "❌";
            btnDel.style.marginLeft = "10px";
            btnDel.addEventListener("click", () => {
                usuario.notas.splice(index, 1);
                atualizarUsuario(usuario);
                carregarMenu();
            });

            li.appendChild(span);
            li.appendChild(btnDel);
            notesList.appendChild(li);
        });
    }

    // Tarefas
    if (usuario.tarefas.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Nenhuma tarefa salva";
        tasksList.appendChild(li);
    } else {
        usuario.tarefas.forEach((tarefa, index) => {
            const li = document.createElement("li");
            const span = document.createElement("span");
            span.textContent = tarefa;
            span.style.cursor = "pointer";
            span.addEventListener("click", () => {
                document.getElementById('Bloco').value = tarefa;
                document.getElementById('Status').innerHTML = `Tarefa ${index+1} aberta`;
                menu.classList.add("hidden");
            });

            const btnDel = document.createElement("button");
            btnDel.textContent = "❌";
            btnDel.style.marginLeft = "10px";
            btnDel.addEventListener("click", () => {
                usuario.tarefas.splice(index, 1);
                atualizarUsuario(usuario);
                carregarMenu();
            });

            li.appendChild(span);
            li.appendChild(btnDel);
            tasksList.appendChild(li);
        });
    }
}

// Carrega menu se usuário já estiver logado
document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
        carregarMenu();
        document.getElementById('loginStatus').innerHTML = `Bem-vindo, ${usuarioLogado}!`;
        document.getElementById('loginStatus').style.color = "green";
    }
});
