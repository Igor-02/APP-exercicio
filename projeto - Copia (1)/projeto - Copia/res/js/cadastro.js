checarStorage();

const campoNome = document.getElementById('nome');
const campoUsuario = document.getElementById('usu');
const campoIdade = document.getElementById('idade');
const campoSexo = document.getElementById('sexo');
const campoAltura = document.getElementById('altura');
const campoPeso = document.getElementById('peso');
const campoPw = document.getElementById('pw');
const campoPw2 = document.getElementById('pw2');

let checkUsuario = false;
let checkSenha = false;
let checkCampos = false;
let checkAltura = false;

const btnConfirmar = document.getElementById('btnConfirmar');
let usuarios = JSON.parse(localStorage.getItem('usuarios'));

btnConfirmar.addEventListener('click', cadastrarUsuario);

function cadastrarUsuario() {
  let nome = campoNome.value;
  let usuario = campoUsuario.value;
  let idade = parseInt(campoIdade.value);
  let sexo = campoSexo.value;
  let altura = parseInt(campoAltura.value);
  let peso = parseFloat(parseFloat(campoPeso.value).toFixed(1));
  let senha = campoPw.value;
  let senha2 = campoPw2.value;

  checarCampos();
  if (checkCampos) {
    checarUsuario(usuario);
    checarSenha(senha, senha2);
    checarAltura();
  }


  if (checkCampos && checkUsuario && checkSenha && checkAltura) {
    usuarios[usuario] = {
      id: uuid.v4(),
      nome: nome,
      usuario: usuario,
      idade: idade,
      sexo: sexo,
      altura: altura,
      peso: [{ y: peso }],
      exercicios: [],
      treinos: [],
      senha: senha
    }

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    limparCampos();
    alert('Você foi cadastrado com sucesso!');
    location.href = './login.html';
  }
}

function checarUsuario(nomeDeUsuario) {
  if (campoUsuario.value.includes(' ')) {
    alert('Não são permitidos espaços no nome de usuário');
    campoUsuario.focus();
  } else {
    if (nomeDeUsuario in usuarios) {
      // mostrarMsg(`Usuário ${nomeDeUsuario} já existe!`, 'danger');
      toggleInvalid(campoUsuario, 'on');
      campoUsuario.focus();
      checkUsuario = false;
    } else {
      toggleInvalid(campoUsuario, 'off');
      if(campoUsuario.value !== ''){}
      if(!campoUsuario.classList.contains('is-valid')){
        campoUsuario.classList.add('is-valid');
      }
      checkUsuario = true;
    }
  }
}

function checarSenha(pw, pw2) {
  if (pw === pw2) {
    toggleInvalid(campoPw2, 'off');
    checkSenha = true;
  } else if (pw !== pw2) {
    toggleInvalid(campoPw2, 'on');
    checkSenha = false;
  }
}

function checarStorage() {
  if (!localStorage.getItem('usuarios')) {
    localStorage.setItem('usuarios', JSON.stringify({}));
  } else {

  }

  if (!localStorage.getItem('sessao')) {
    localStorage.setItem('sessao', JSON.stringify(''));
  } else {
  }
}

function checarCampos() {
  if (campoNome.value == '' || campoUsuario.value == '' || campoSexo.value == 'n' || campoAltura.value == '' || campoPeso.value == '' || campoPw.value == '' || campoPw2.value == '') {
    alert('Preencha todos os campos!');
    checkCampos = false;
    campoUsuario.classList.remove('is-valid');
    campoUsuario.classList.remove('is-invalid');
    campoPw2.classList.remove('is-invalid');
  } else {
    checkCampos = true;
  }
}

function checarAltura() {
  let altura = campoAltura.value;
  if(altura.includes(',') || altura.includes('.') || campoAltura.value == ''){
    alert('Campo de Altura inválido, use Centímetros por favor!');
    toggleInvalid(campoAltura, 'on');
    campoAltura.value = '';
    campoAltura.focus();
  }else{
    toggleInvalid(campoAltura, 'off');
    checkAltura = true;
  }
}

function limparCampos() {
  campoNome.value = '';
  campoUsuario.value = '';
  campoSexo.value = 'n';
  campoAltura.value = '';
  campoPeso.value = '';
  campoPw.value = '';
  campoPw2.value = '';
  campoIdade.value = '';
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