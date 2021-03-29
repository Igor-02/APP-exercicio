if(JSON.parse(localStorage.getItem('exSelecionado')) == ''){
  location.href = './perfil.html';
}

const nomeEx = document.getElementById('nomeEx');
const descEx = document.getElementById('descEx');
const exAtual = JSON.parse(localStorage.getItem('exSelecionado'));
const btnDescansar = document.getElementById('btnDescansar');
const btnFinalizarEx = document.getElementById('btnFinalizarEx');
const barra = document.getElementById('barra');
const btnVoltar = document.getElementById('btnVoltar');

let usuarios = JSON.parse(localStorage.getItem('usuarios'));
let sessaoPerfil = JSON.parse(localStorage.getItem('sessao'));
let exSelecionado;

document.addEventListener('DOMContentLoaded', () => {
  buscarEx();
  preencherInfoEx();
});

btnDescansar.addEventListener('click', descansar);

btnFinalizarEx.addEventListener('click', finalizarEx);

btnVoltar.addEventListener('click', () => {
  if(JSON.parse(localStorage.getItem('treinoSelecionado')) == ''){
    location.href = './perfil.html';
  }else{
    location.href = './treino.html';
  }
})

function buscarEx() {
  for (let x = 0; x < usuarios[sessaoPerfil].exercicios.length; x++) {
    if (exAtual == usuarios[sessaoPerfil].exercicios[x].id) {
      exSelecionado = usuarios[sessaoPerfil].exercicios[x];
    }
  }
}

function preencherInfoEx() {
  nomeEx.innerText = exSelecionado.nome;
  descEx.innerText = exSelecionado.descricao;
}

function descansar() {
  if (!btnDescansar.disabled) {
    btnDescansar.disabled = true;
    let tempo = exSelecionado.descanso;
    let intervalo = 200;
    let passo = (intervalo / 10) / tempo;
    let count = 100;
    let timer = setInterval(() => {
      barra.style.width = `${count}%`;
      count -= passo;
      if (count <= 0) {
        clearInterval(timer);
        barra.style.width = '0%';
        setTimeout(() => {
          barra.style.width = '100%';
          btnDescansar.disabled = false;
        }, 2000);
      }
    }, intervalo);
  }
}

function finalizarEx() {
  localStorage.setItem('exSelecionado', JSON.stringify(''));
  if(JSON.parse(localStorage.getItem('treinoSelecionado')) == ''){
    location.href = './perfil.html';
  }else{
    location.href = './treino.html';
  }
}