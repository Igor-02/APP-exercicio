/////////////////////////////////////////////////////////////////
// EXERCICIOS //
/////////////////////////////////////////////////////////////////
const listaExercicios = document.getElementById('listaExercicios');

preencherListaEx();

listaExercicios.addEventListener('click', (e) => {
  if (e.target.classList.contains('deleteIcon')) {
    if (confirm('Tem certeza que deseja deletar o exercício?')) {
      let id = e.target.parentElement.parentElement.id;
      deleteEx(id);
    } else {
      return;
    }
  } else if (e.target.classList.contains('editIcon')) {
    localStorage.setItem('editEx', JSON.stringify(e.target.parentElement.parentElement.id));
    location.href = './editex.html';

  } else if (e.target.classList.contains('colNome')) {
    localStorage.setItem('exSelecionado', JSON.stringify(e.target.parentElement.id));
    location.href = './exercicio.html';
  } else if (e.target.tagName == 'DIV') {
    localStorage.setItem('exSelecionado', JSON.stringify(e.target.id));
    location.href = './exercicio.html';
  }
});


function preencherListaEx() {
  if (usuarios[sessaoPerfil].exercicios.length == 0) {
    listaExercicios.innerHTML = `<h6 class="p-2 text-center">Você ainda não possui exercicios cadastrados!</h6>`;
    return;
  }
  for (let x = 0; x < usuarios[sessaoPerfil].exercicios.length; x++) {
    listaExercicios.innerHTML += `
    <div id="${usuarios[sessaoPerfil].exercicios[x].id}" class="row itemLista">
      <div class="colNome treino">
        ${usuarios[sessaoPerfil].exercicios[x].nome}
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

function deleteEx(id) {
  for (let x = 0; x < usuarios[sessaoPerfil].exercicios.length; x++) {
    if (id == usuarios[sessaoPerfil].exercicios[x].id) {
      usuarios[sessaoPerfil].exercicios.splice(x, 1);
    }
  }
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  document.getElementById(id).remove();
}