const nomeTreino = document.getElementById('nomeTreino');
const btnFimTreino = document.getElementById('btnFimTreino');
const listaExTreino = document.getElementById('listaExTreino');

let usuariosTreino = JSON.parse(localStorage.getItem('usuarios'));
let sessaoPerfil = JSON.parse(localStorage.getItem('sessao'));
let treinoAtual = JSON.parse(localStorage.getItem('treinoSelecionado'));

let treino = {
  nome: getTreino().nome,
  lista: getTreino().exercicios,
  exs: []
}

getExercicios();
preencherPagina();

function getTreino() {
  let treinos = usuariosTreino[sessaoPerfil].treinos;

  for(let x = 0; x < treinos.length; x++){
    if(treinoAtual == treinos[x].id){
      return treinos[x];
    }
  }
}

function getExercicios() {
  let exercicios = usuariosTreino[sessaoPerfil].exercicios;

  for(let x = 0; x < treino.lista.length; x++){
    let idEx = treino.lista[x];
    for(let y = 0; y < exercicios.length; y++){
      let exCompleto = exercicios[y];
      if(idEx == exercicios[y].id){
        treino.exs.push(exCompleto);
        break;
      }
    }

  }
  delete treino.lista;
}

function preencherPagina(){
  nomeTreino.innerHTML = treino.nome;

  for(let x = 0; x < treino.exs.length; x++){
    listaExTreino.innerHTML += `
    <li id="${treino.exs[x].id}" class="list-group-item">${treino.exs[x].nome}</li>
    `;
  }
}