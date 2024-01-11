let form = document.querySelector('#form');
let input = document.querySelector('#input');
let submit = document.querySelector('#submit');
let search = document.querySelector('#search');
let bodyContainer = document.querySelector('.body-container');
var holder = document.querySelector('.input');

form.addEventListener('submit', createTodo);

function createTodo(e){

   //PREVENT FROM SUBMITTING TO BROWSER
   e.preventDefault()

   if(input.value !== ''){
   
  //SEND TO LOCAL STORAGE
  if(localStorage.getItem('todoList') === null){
   var todoStorage = [];
   todoStorage.unshift(input.value);
   localStorage.setItem('todoList', JSON.stringify(todoStorage));
  }else{
   var todoStorage = JSON.parse(localStorage.getItem('todoList'));
   todoStorage.unshift(input.value);
   localStorage.setItem('todoList', JSON.stringify(todoStorage));
  }
   
   fetchTodo();

   //ASSIGN VALUE
  
  input.value = '';
   }

}

 //FETCHING TODO'S

 function fetchTodo(){
   bodyContainer.innerHTML = '';

   var todoStorage = JSON.parse(localStorage.getItem('todoList'));

   todoStorage.forEach(function(store){

      // CREATE ELEMENT
      var todo = document.createElement('div');
      var todoInput = document.createElement('input');
      var del = document.createElement('input');
      var edit = document.createElement('input');
   
     //ASSIGN CLASS TO ELEMENT
     todo.classList.add('todo');
     todoInput.classList.add('todo-input');
     del.classList.add('del');
     edit.classList.add('edit');

     //SET ATTRIBUTES
     todoInput.setAttribute('readonly', '');
     del.setAttribute('type', 'button');
     edit.setAttribute('type', 'button');

     //SET VALUES
     del.value = 'Delete';
     edit.value = 'Edit'
   
     //APPEND ELEMENT
     bodyContainer.appendChild(todo);
     todo.appendChild(todoInput);
     todo.appendChild(edit);
     todo.appendChild(del);

     del.onclick = function(){
      for(var i = 0; i < todoStorage.length; i++){
        if(todoInput.value == todoStorage[i]){
          todoStorage.splice(i, 1);

          localStorage.setItem('todoList', JSON.stringify(todoStorage))
          todo.remove()
        }
      }
     }

     edit.onclick = function(){

      if(bodyContainer.querySelector('.edit').classList.contains('change')){
      for(var i = 0; i < todoStorage.length; i++){
         if(holder.value == todoStorage[i]){
           todoStorage.splice(i, 1, todoInput.value);
           localStorage.setItem('todoList', JSON.stringify(todoStorage))
           
         }
       }
       edit.value = 'Edit';
       todoInput.setAttribute('readonly', '');
     }else{
       edit.value = 'Save';
       todoInput.removeAttribute('readonly')
       holder.value = todoInput.value;
     }

     bodyContainer.querySelector('.edit').classList.toggle('change');

   }

     todoInput.value = store;
   
      })
}



search.addEventListener('keyup', searchTodo);

function searchTodo(){
   var todoArray = bodyContainer.querySelectorAll('.todo');
   var text = search.value.toLowerCase();

  Array.from(todoArray).forEach(function(todoArr){

   var todoText = todoArr.firstChild.value.toLowerCase();

   if(todoText.indexOf(text) != -1){
      todoArr.style.display = 'flex';
   }else{
      todoArr.style.display = 'none'
   }

  })
}