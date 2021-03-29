const nomeEx = document.getElementById('nomeEx');
const descEx = document.getElementById('descEx');
const descanso = document.getElementById('descanso');
const btnConfirmaNovoEx = document.getElementById('btnConfirmaNovoEx');

let perfilSessao = JSON.parse(localStorage.getItem('sessao'));
let usuarios = JSON.parse(localStorage.getItem('usuarios'));

btnConfirmaNovoEx.addEventListener('click', cadNovoEx);

function cadNovoEx() {
  if(nomeEx.value == '' || descEx.value == '' || descanso.value == ''){
    alert('Preencha todos os Campos!');
    return;
  }

  let novoEx = {
    id: uuid.v4(),
    nome: nomeEx.value,
    descricao: descEx.value,
    descanso: parseInt(descanso.value)
  };

  usuarios[perfilSessao].exercicios.push(novoEx);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert('Exercicio cadastrado com Sucesso!');
  location.href = './perfil.html';
}