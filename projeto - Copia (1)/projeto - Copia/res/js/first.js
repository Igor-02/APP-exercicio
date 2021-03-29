let usuariosIndex = JSON.parse(localStorage.getItem('usuarios'));

if(JSON.parse(localStorage.getItem('sessao')) in usuariosIndex){
  location.href = './perfil.html';
}else{
  localStorage.setItem('sessao', JSON.stringify(''));
}