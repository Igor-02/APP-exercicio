/////////////////////////////////////////////////////////////////
// TREINOS //
/////////////////////////////////////////////////////////////////
const listaTreinos = document.getElementById('listaTreinos');
const btnNovoTreino = document.getElementById('btnNovoTreino');

btnNovoTreino.addEventListener('click', novoTreino);

preencherListaTreinos();

listaTreinos.addEventListener('click', (e) => {
  if (e.target.classList.contains('treino')) {
    localStorage.setItem('treinoSelecionado', JSON.stringify(e.target.parentElement.id));
    location.href = './treino.html';
  }
  if (e.target.classList.contains('deleteIcon')) {
    deleteTreino(e.target.parentElement.parentElement.id);
  }
  if(e.target.classList.contains('editIcon')){
    localStorage.setItem('editTreino', JSON.stringify(e.target.parentElement.parentElement.id));
    location.href = './edittreino.html';
  }
});

function preencherListaTreinos() {
  if (usuarios[sessaoPerfil].treinos.length == 0) {
    listaTreinos.innerHTML = `<h6 class="p-2 text-center">Você ainda não possui treinos cadastrados!</h6>`;
  } else {
    for (let x = 0; x < usuarios[sessaoPerfil].treinos.length; x++) {
      listaTreinos.innerHTML += `
        <div id="${usuarios[sessaoPerfil].treinos[x].id}" class="row itemLista">
          <div class="colNome treino">
            ${usuarios[sessaoPerfil].treinos[x].nome}
          </div>
          <div class="colBotao text-center">
          <i class="far fa-trash-alt deleteIcon"></i>
          </div>
          <div class="colBotao text-center">
          <i class="far fa-edit editIcon"></i>
          </div>
        </div>
      `;
    }
  }
}

function deleteTreino(id) {
  if (confirm('Tem certeza que deseja excluir esse Treino?')) {
    for (let x = 0; x < usuarios[sessaoPerfil].treinos.length; x++) {
      if (id == usuarios[sessaoPerfil].treinos[x].id) {
        usuarios[sessaoPerfil].treinos.splice(x, 1);
      }
    }
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    document.getElementById(id).remove();
  } else {
    return;
  }
}

function novoTreino() {
  if (usuarios[sessaoPerfil].exercicios.length > 0) {
    location.href = './novotreino.html';
  } else {
    alert('Você precisa ter ao menos 1 exercício cadastrado para criar um novo Treino!');
  }
}