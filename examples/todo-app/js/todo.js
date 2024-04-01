function get_todos(){
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');

    if(todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}

function add(){ //add new item to array


    var task = document.getElementById('task').value;
    var todos = get_todos();

    todos.push(task);
    console.log('adding item from array, value: '+task)

    localStorage.setItem('todo', JSON.stringify(todos));
    document.getElementById('task').value = '';
    show();

    return false;
}

function remove(key){ //remove item from array

    
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');

    todos = JSON.parse(todos_str);
    console.log('removing item from array, key: '+key)
    console.log('removing value: '+todos[key])

    todos.splice(key, 1); //remove particular key-pair via splice
    localStorage.setItem('todo', JSON.stringify(todos));
    show();

    

    return false;
}

function show(){ //get current todos and display
    var todos = get_todos();

    console.log('*********** TODOS ARRAY ****************')
    console.log(todos)

    var html = '<ul>';
    for (var i = 0; i < todos.length; i++){
        html += '<li>' + todos[i] + '&nbsp;<button onclick="remove('+i+')" class="remove" id="' +i+ '">&nbsp;X&nbsp;</button></li>';
    };
    html += '</ul>';
    document.getElementById('todos').innerHTML = html;
}

document.getElementById('add').addEventListener('click', add);

show();