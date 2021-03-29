if(JSON.parse(localStorage.getItem('treinoSelecionado')) == ''){
  location.href = './perfil.html';
}

const nomeTreino = document.getElementById('nomeTreino');
const btnFimTreino = document.getElementById('btnFimTreino');
const listaExTreino = document.getElementById('listaExTreino');
const home = document.getElementById('home');

let usuariosTreino = JSON.parse(localStorage.getItem('usuarios'));
let treinoSelecionado = JSON.parse(localStorage.getItem('treinoSelecionado'));
let sessaoPerfil = JSON.parse(localStorage.getItem('sessao'));

document.addEventListener('DOMContentLoaded', () => {
    preencherPaginaTreino();
})

listaExTreino.addEventListener('click', (e) => {
    if(e.target.classList.contains('list-group-item')){
        localStorage.setItem('exSelecionado', JSON.stringify(e.target.id));
        location.href = './exercicio.html';
    }
});

btnFimTreino.addEventListener('click', finalizarTreino);

home.addEventListener('click', () => {
    localStorage.setItem('treinoSelecionado', JSON.stringify(''));
    location.href = './perfil.html';
})

function preencherPaginaTreino() {
  let treinos = usuariosTreino[sessaoPerfil].treinos;
  let exercicios = usuariosTreino[sessaoPerfil].exercicios;

  for (let x = 0; x < treinos.length; x++) {
    if (treinoSelecionado == treinos[x].id) {
      nomeTreino.innerHTML = treinos[x].nome;

      for (let y = 0; y < treinos[x].exercicios.length; y++) {
        let idEx = treinos[x].exercicios[y];

        for (let z = 0; z < exercicios.length; z++) {
          if (idEx == exercicios[z].id) {
            let exSelecionado = exercicios[z];
            listaExTreino.innerHTML += `
            <li id="${exSelecionado.id}" class="list-group-item">${exSelecionado.nome}</li>
            `;
            break;
          }
        }
      }
      break;
    }
  }
}

function finalizarTreino() {
    localStorage.setItem('treinoSelecionado', JSON.stringify(''));
    location.href = './perfil.html';
}

{
  let treino ={
    treino: {},
    exercicios: []
  }

//   pegar treino baseado em id na localStorage

// chegar lista de exercicios e buscar id's contidos no treino obtido acima
//   achar exercicio q bata com o id
//     mandar ex completos para o array de exercicios no novo obj de treino

}