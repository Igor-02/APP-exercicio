let checkSessao = JSON.parse(localStorage.getItem('sessao'));
let checkUsuarios = JSON.parse(localStorage.getItem('usuarios'));
let checkExSelecionado = JSON.parse(localStorage.getItem('exSelecionado'));
let checkTreinoSelecionado = JSON.parse(localStorage.getItem('treinoSelecionado'));
let checkEditEx = JSON.parse(localStorage.getItem('editEx'));
let checkEditTreino = JSON.parse(localStorage.getItem('editTreino'));
let checkTabAtiva = JSON.parse(localStorage.getItem('tabAtiva'));

if(checkSessao == null) {
  localStorage.setItem('sessao', JSON.stringify(''));
}

if(checkUsuarios == null) {
  localStorage.setItem('usuarios', JSON.stringify({}));
}

if(checkExSelecionado == null) {
  localStorage.setItem('exSelecionado', JSON.stringify(''));
}

if(checkTreinoSelecionado == null) {
  localStorage.setItem('treinoSelecionado', JSON.stringify(''));
}

if(checkEditEx == null) {
  localStorage.setItem('editEx', JSON.stringify(''));
}

if(checkEditTreino == null) {
  localStorage.setItem('editTreino', JSON.stringify(''));
}

if(checkTabAtiva == null) {
  localStorage.setItem('tabAtiva', JSON.stringify(''));
}

if(location.pathname == '/login.html' && checkSessao in checkUsuarios){
  location.href = './perfil.html';
}

if(location.pathname == '/cadastro.html' && checkSessao in checkUsuarios){
  location.href = './perfil.html';
}

if((!checkSessao || checkSessao == '') && (!location.pathname.includes('/index.html') && !location.pathname.includes('/login.html') && !location.pathname.includes('/cadastro.html'))){
  location.href = './index.html';
}