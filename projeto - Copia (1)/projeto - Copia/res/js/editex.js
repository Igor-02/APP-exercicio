const editNomeEx = document.getElementById('editNomeEx');
const editDescricaoEx = document.getElementById('editDescricaoEx');
const editDescansoEx = document.getElementById('editDescansoEx');
const btnConfirmarEdit = document.getElementById('btnConfirmarEdit');

let usuarios = JSON.parse(localStorage.getItem('usuarios'));
let sessaoPerfil = JSON.parse(localStorage.getItem('sessao'));
let idEdit = JSON.parse(localStorage.getItem('editEx'));

if(!idEdit){
  location.href = './perfil.html';
}

let exercicio = buscarEx();

preencherForm();

btnConfirmarEdit.addEventListener('click', atualizarEx);

function preencherForm() {
  editNomeEx.value = exercicio.nome;
  editDescricaoEx.innerHTML = exercicio.descricao;
  editDescansoEx.value = exercicio.descanso;
}

function buscarEx() {
  let exs = usuarios[sessaoPerfil].exercicios;
  for(let x = 0; x < exs.length; x++){
    if(exs[x].id == idEdit){
      return exs[x];
    }
  }
}

function atualizarEx(){
  exercicio.nome = editNomeEx.value;
  exercicio.descricao = editDescricaoEx.value;
  exercicio.descanso = parseFloat(editDescansoEx.value);

  let exs = usuarios[sessaoPerfil].exercicios;
  for(let x = 0; x < exs.length; x++){
    if(exs[x].id == idEdit){
      exs[x] = exercicio;
      break;
    }
  }

  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  localStorage.setItem('editEx', JSON.stringify(''));

  alert('Exercício atualizado com sucesso!');
  location.href = './perfil.html';
}