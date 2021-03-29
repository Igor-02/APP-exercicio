const campoLogin = document.getElementById('campoLogin');
const campoSenha = document.getElementById('campoSenha');
const btnEntrar = document.getElementById('btnEntrar');

let usuarios = JSON.parse(localStorage.getItem('usuarios'));
let sessao = JSON.parse(localStorage.getItem('sessao'));

btnEntrar.addEventListener('click', checarLogin);

document.addEventListener('keypress', e => {
  if(e.key === 'Enter'){
    checarLogin();
  }
});

function checarLogin() {
  if (campoLogin.value == '' || campoSenha.value == '') {
    alert('Preencha todos os campos!');
    return;
  }

  login = campoLogin.value;
  senha = campoSenha.value;

  let encontrado = false;

  if (login in usuarios) {

    encontrado = true;
  } else {

  }

  if (encontrado) {
    toggleInvalid(campoLogin, 'off');
    campoLogin.classList.add('is-valid');
  } else {
    toggleInvalid(campoLogin, 'on');
    alert('Usuario não encontrado!');
    return;
  }

  if (senha == usuarios[login].senha) {
    alert('Logado com Sucesso');
    sessao = usuarios[login].usuario;
    localStorage.setItem('sessao', JSON.stringify(sessao));
    location.href = './perfil.html';
  } else {

    toggleInvalid(campoSenha, 'on');
  }
}

function toggleInvalid(el, state){
  if(state == 'on'){
    if(el.classList.contains('is-invalid')){

    }else{
      el.classList.add('is-invalid');
    }
  }else if(state == 'off'){
    if(el.classList.contains('is-invalid')){
      el.classList.remove('is-invalid');
    }else{

    }
  }
}