    let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo');

    let ToDoList = [];
    
    if (localStorage.getItem('todo')){
        ToDoList = JSON.parse(localStorage.getItem('todo'));
        displayMessages();
    }

    addButton.addEventListener('click', function(){
        
        let newToDo = {
            todo: addMessage.value,
            checked: false,
            important: false
        }
        
        ToDoList.push(newToDo);
        displayMessages();
        localStorage.setItem('todo', JSON.stringify(ToDoList));
    });

    function displayMessages() {
        let  displayMessage = '';
        ToDoList.forEach(function(item, i){
            displayMessage += `
            <li>
                <input type='checkbox' id='item_${i}'  ${item.checked ? 'checked': ''} >
                <label for='item_${i}' class = "${item.important ? 'important' : ''}" >${item.todo}</label>

            </li>
            `;
            todo.innerHTML = displayMessage; 
        });
    };

    todo.addEventListener('change', function(event){
       let valueLabel = todo.querySelector('[for = '+ event.target.getAttribute('id') + ']').innerHTML;
       
            ToDoList.forEach(function(item){
                if (item.todo === valueLabel ) {
                        item.checked = !item.checked;
                        localStorage.setItem('todo', JSON.stringify(ToDoList));
                };
            });
    });

todo.addEventListener('contextmenu', function(event){
    event.preventDefault();
    ToDoList.forEach(function(item, i){
        if (item.todo === event.target.innerHTML){
            if (event.ctrlKey){
                ToDoList.splice(i,1);
            }
            else{
                item.important = !item.important;
            }
            
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(ToDoList));
        }
    });
});