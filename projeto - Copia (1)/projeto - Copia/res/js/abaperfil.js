let sessaoPerfil = JSON.parse(localStorage.getItem('sessao'));
if (!sessaoPerfil) {
  location.href = './index.html';
}

let usuarios = JSON.parse(localStorage.getItem('usuarios'));

const tabPerfil = document.getElementById('navPerfilTab');
const tabEx = document.getElementById('navExerciciosTab');
const tabTreinos = document.getElementById('navTreinosTab');
const navPerfil = document.getElementById('navPerfil');
const navExercicios = document.getElementById('navExercicios');
const navTreinos = document.getElementById('navTreinos');

const nome = document.getElementById('nome-perfil');
const idade = document.getElementById('idade-perfil');
const peso = document.getElementById('peso-perfil');
const altura = document.getElementById('alt-perfil');
const btnPeso = document.getElementById('atualizarPeso');
const btnSair = document.getElementById('sair');
const btnExcluir = document.getElementById('btnExcluir');
const btnHome = document.querySelector('.home');

zerarVariaveis();
preencherPerfil();
gerarGrafico();
setIMC();
irTab();

function preencherPerfil() {
  nome.innerHTML = usuarios[sessaoPerfil].nome;
  idade.innerHTML = usuarios[sessaoPerfil].idade + ' Anos';
  peso.innerHTML = usuarios[sessaoPerfil].peso[usuarios[sessaoPerfil].peso.length - 1].y + 'Kg';
  altura.innerHTML = ((usuarios[sessaoPerfil].altura) / 100).toFixed(2) + ' m';
}

btnPeso.addEventListener('click', lerPeso);
btnSair.addEventListener('click', sair)
btnExcluir.addEventListener('click', excluirUltimo);

document.getElementById('nav-tab').addEventListener('click', (e) => {
  switch (e.target.id) {
    case 'navPerfilTab':
      localStorage.setItem('tabAtiva', JSON.stringify('navPerfilTab'));
      break;
    case 'navExerciciosTab':
      localStorage.setItem('tabAtiva', JSON.stringify('navExerciciosTab'));
      break;
    case 'navTreinosTab':
      localStorage.setItem('tabAtiva', JSON.stringify('navTreinosTab'));
      break;
    default:
      break;
  }
});

btnHome.addEventListener('click', () => {
  localStorage.setItem('tabAtiva', JSON.stringify('navPerfilTab'));
  irTab();
});

function gerarGrafico() {
  chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: false,
    theme: "light2",
    title: {
      text: "Meu Peso"
    },
    axisY: {
      includeZero: false
    },
    data: [{
      type: "line",
      indexLabelFontSize: 16,
      dataPoints: usuarios[sessaoPerfil].peso
    }]
  });
  desenharGrafico();
}

function desenharGrafico() {
  if (usuarios[sessaoPerfil].peso.length == 1) {
    btnExcluir.disabled = true;
  } else if (usuarios[sessaoPerfil].peso.length > 1) {
    btnExcluir.disabled = false;
  }
  chart.render();
}

function irTab() {
  switch (JSON.parse(localStorage.getItem('tabAtiva'))) {
    case 'navPerfilTab':
      if (tabEx.classList.contains('active') || tabTreinos.classList.contains('active')) {
        fecharTab(tabEx, navExercicios);
        fecharTab(tabTreinos, navTreinos);
        abrirTab(tabPerfil, navPerfil);
      }
      break;
    case 'navExerciciosTab':
      if (tabPerfil.classList.contains('active') || tabTreinos.classList.contains('active')) {
        fecharTab(tabPerfil, navPerfil);
        fecharTab(tabTreinos, navTreinos);
        abrirTab(tabEx, navExercicios);
      }
      break;
    case 'navTreinosTab':
      if (tabPerfil.classList.contains('active') || tabEx.classList.contains('active')) {
        fecharTab(tabPerfil, navPerfil);
        fecharTab(tabEx, navExercicios);
        abrirTab(tabTreinos, navTreinos);
      }
      break;
    default:
      break;
  }
}

function fecharTab(tab, nav) {
  tab.classList.remove('active');
  tab.setAttribute('aria-selected', 'false');
  nav.classList.remove('active', 'show');
}

function abrirTab(tab, nav) {
  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
  nav.classList.add('active', 'show');
}

function zerarVariaveis() {
  localStorage.setItem('exSelecionado', JSON.stringify(''));
  localStorage.setItem('treinoSelecionado', JSON.stringify(''));
  localStorage.setItem('editEx', JSON.stringify(''));
  localStorage.setItem('editTreino', JSON.stringify(''));
}

function lerPeso() {
  let pesoPrompt = prompt('Digite seu novo peso em Kg!');

  if(pesoPrompt == null || pesoPrompt == ''){
    return;
  } else if(isNaN(parseFloat(pesoPrompt))){
    lerPeso();
  } else{
    if(pesoPrompt.includes(',')){
      pesoPrompt = pesoPrompt.replace(/,/g , '.');
    }
    pesoPrompt = parseFloat(pesoPrompt);
    pesoPrompt = parseFloat(pesoPrompt.toFixed(1));

    usuarios[sessaoPerfil].peso.push({ y: pesoPrompt });
    let usuarioAtualizado = JSON.parse(localStorage.getItem('usuarios'));
    usuarioAtualizado[sessaoPerfil] = usuarios[sessaoPerfil];
    localStorage.setItem('usuarios', JSON.stringify(usuarioAtualizado));

    peso.innerHTML = pesoPrompt + 'Kg';
    desenharGrafico();
    setIMC();
  }
}

function excluirUltimo() {
  if (usuarios[sessaoPerfil].peso.length <= 1) {
    return;
  } else {
    usuarios[sessaoPerfil].peso.pop();
    usuarios[sessaoPerfil] = usuarios[sessaoPerfil];
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    peso.innerHTML = usuarios[sessaoPerfil].peso[usuarios[sessaoPerfil].peso.length - 1].y + 'Kg';
    desenharGrafico();
  }
  setIMC();
}

function calcIMC() {
  let peso = usuarios[sessaoPerfil].peso[usuarios[sessaoPerfil].peso.length - 1].y;
  let altura = usuarios[sessaoPerfil].altura / 100;
  let imc = (peso / (altura * altura)).toFixed(2);
  return parseFloat(imc);
}

function setIMC() {
  let tabelaIMC = document.querySelectorAll('.colIMC');
  for (let x = 0; x < tabelaIMC.length; x++) {
    tabelaIMC[x].innerHTML = '';
  }

  if (calcIMC() < 18.5) {
    tabelaIMC[0].innerHTML = 'x';
  } else if (calcIMC() >= 18.5 && calcIMC() <= 24.9) {
    tabelaIMC[1].innerHTML = 'x';
  } else if (calcIMC() >= 25 && calcIMC() <= 29.9) {
    tabelaIMC[2].innerHTML = 'x';
  } else if (calcIMC() >= 30 && calcIMC() <= 39.9) {
    tabelaIMC[3].innerHTML = 'x';
  } else {
    tabelaIMC[4].innerHTML = 'x';
  }
}

function sair() {
  if (confirm('Deseja realmente sair?')) {
    localStorage.setItem('sessao', JSON.stringify(''));
    localStorage.setItem('tabAtiva', JSON.stringify(''));
    zerarVariaveis();
    location.href = './index.html';
  }
}