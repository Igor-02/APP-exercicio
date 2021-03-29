const listaEx = document.getElementById('listaEx');
const btnConfirmar = document.getElementById('btnConfirmar');
const editNomeTreino = document.getElementById('editNomeTreino');

let idEditTreino = JSON.parse(localStorage.getItem('editTreino'));
let usuariosEditTreino = JSON.parse(localStorage.getItem('usuarios'));
let sessaoEditTreino = JSON.parse(localStorage.getItem('sessao'));

let treinos = usuariosEditTreino[sessaoEditTreino].treinos;
let exercicios = usuariosEditTreino[sessaoEditTreino].exercicios;

if(!idEditTreino){
  location.href = './perfil.html';
}

preencherListaEditTreino();

listaEx.addEventListener('click', e => {
  if (e.target.classList.contains('exSelecionado')) {
    e.target.classList.remove('exSelecionado');
  } else {
    e.target.classList.add('exSelecionado');
  }
});

btnConfirmar.addEventListener('click', atualizarTreino);

function preencherListaEditTreino() {
  let treinoSelecionado;

  for (let x = 0; x < treinos.length; x++) {
    if (treinos[x].id == idEditTreino) {
      treinoSelecionado = treinos[x];
    }
  }

  editNomeTreino.value = treinoSelecionado.nome;

  let bateu = false;
  let classes = '';

  for (let x = 0; x < exercicios.length; x++) {
    classes = 'col-12 itemLista';
    if (treinoSelecionado.exercicios.length > 0) {
      for (let y = 0; y < treinoSelecionado.exercicios.length; y++) {
        if (treinoSelecionado.exercicios[y] == exercicios[x].id) {
          classes += ' exSelecionado';
          break;
        }
      }
    }
      listaEx.innerHTML += `
      <div id="${exercicios[x].id}" class="${classes}">${exercicios[x].nome}</div>
      `;
  }
}

function atualizarTreino() {
  let selecionados = [];

  const lista = document.querySelectorAll('.itemLista');

  for (let x = 0; x < lista.length; x++) {
    if (lista[x].classList.contains('exSelecionado')) {
      selecionados.push(lista[x].id);
    }
  }

  let treinoSelecionado;

  for (let x = 0; x < treinos.length; x++) {
    if (treinos[x].id == idEditTreino) {
      treinoSelecionado = treinos[x];
    }
  }

  treinoSelecionado.nome = editNomeTreino.value;
  treinoSelecionado.exercicios = selecionados;

  for (let x = 0; x < treinos.length; x++) {
    if (treinos[x].id == treinoSelecionado.id) {
      treinos[x] = treinoSelecionado;
      usuariosEditTreino[sessaoEditTreino].treinos = treinos;
      break;
    }
  }

  localStorage.setItem('usuarios', JSON.stringify(usuariosEditTreino));
  alert('Treino atualizado com Sucesso!');
  location.href = './perfil.html';
}