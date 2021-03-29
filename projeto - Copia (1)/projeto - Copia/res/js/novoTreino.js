const listaEx = document.getElementById('listaEx');
const btnConfirmar = document.getElementById('btnConfirmar');
const nomeTreino = document.getElementById('nomeTreino');

let usuariosNovoTreino = JSON.parse(localStorage.getItem('usuarios'));
let sessaoPerfil = JSON.parse(localStorage.getItem('sessao'));

preencherListaNovoTreino();

// Marca exercicios selecionados na lista
listaEx.addEventListener('click', (e) => {
  if (e.target.classList.contains('exSelecionado')) {
    e.target.classList.remove('exSelecionado');
  } else {
    e.target.classList.add('exSelecionado');
  }
});

btnConfirmar.addEventListener('click', confirmarTreino);

function preencherListaNovoTreino() {
  for(let x = 0; x < usuariosNovoTreino[sessaoPerfil].exercicios.length; x++){
    listaEx.innerHTML += `<div id="${usuariosNovoTreino[sessaoPerfil].exercicios[x].id}" class="d-flex ex list-group-item">${usuariosNovoTreino[sessaoPerfil].exercicios[x].nome}</div>`;
  }
}

function confirmarTreino() {
  let selecionados = [];
  const lista = document.querySelectorAll('.ex');

  for (let x = 0; x < lista.length; x++) {
    if (lista[x].classList.contains('exSelecionado')) {
      selecionados.push(lista[x].id);
    }
  }

  if (nomeTreino.value == '') {
    alert('Dê um nome ao seu novo Treino!');
    return;
  }

  if (selecionados.length == 0) {
    alert('Selecione ao menos 1 exercício da lista!');
    return;
  }

  let novoTreino = {
    id: uuid.v4(),
    nome: nomeTreino.value,
    exercicios: selecionados
  };

  usuariosNovoTreino[sessaoPerfil].treinos.push(novoTreino);
  localStorage.setItem('usuarios', JSON.stringify(usuariosNovoTreino));

  alert('Treino cadastrado com Sucesso!');

  location.href = './perfil.html';
}

