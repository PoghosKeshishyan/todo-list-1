while (true) {
    const password = prompt('Enter your password \nPass: 1111');

    if (password === '1111') {
        break;
    }
}

// SELECTORS
const form = document.querySelector('form');
const todoInput = document.querySelector('form #addTodo');
const addTodoBtn = document.querySelector('form #addTodoBtn');
const searchBlock = document.querySelector('#searchBlock');
const searchInput = document.querySelector('#searchBlock #searchInput');
const allHr = document.querySelectorAll('hr');
const todoList = document.querySelector('#todoList');
const removeAll = document.querySelector('#removeAll');
const seacrhBtn = document.querySelector('#seacrhBtn');
const array = [];

// EVENT LISTENERS & FUNCTIONS
document.addEventListener('DOMContentLoaded', () => {
    const todosInLocal = JSON.parse(localStorage.getItem('todos'));

    todosInLocal.forEach(el => {
        array.push(el);

        const todo = document.createElement('div');
        todo.classList.add('todo');
        if (el.done) todo.classList.add('active');

        const text = document.createElement('span');
        text.classList.add('text');
        text.innerText = el.value;
        todo.appendChild(text);

        const icons = document.createElement('div');
        icons.classList.add('icons');
        icons.innerHTML = '<i class="fa-solid fa-check"></i>';
        icons.innerHTML += '<i class="fa-solid fa-trash"></i>';
        todo.appendChild(icons);

        todoList.appendChild(todo);
    })

    const todos = document.querySelectorAll('.todo');

    if (todos.length) {
        removeAll.style.display = 'inline-block';
        seacrhBtn.style.display = 'inline-block';
        allHr.forEach(hr => hr.style.display = 'block');
    }
});

addTodoBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if (!todoInput.value.trim()) {
        addTodoBtn.blur();
        return;
    }

    const todo = document.createElement('div');
    todo.classList.add('todo');

    const text = document.createElement('span');
    text.classList.add('text');
    text.innerText = todoInput.value;
    todo.appendChild(text);

    const icons = document.createElement('div');
    icons.classList.add('icons');
    icons.innerHTML = '<i class="fa-solid fa-check"></i>';
    icons.innerHTML += '<i class="fa-solid fa-trash"></i>';
    todo.appendChild(icons);

    todoList.appendChild(todo);

    let object = {
        id: Date.now(),
        value: todoInput.value,
        done: false
    }

    saveInLocalStorage(object);
    array.push(object);
    todoInput.value = '';
    todoInput.blur();
    addTodoBtn.blur();
    removeAll.style.display = 'inline-block';
    seacrhBtn.style.display = 'inline-block';
    allHr.forEach(hr => hr.style.display = 'block');
});

todoList.addEventListener('click', (event) => {
    const parent = event.target.parentElement.parentElement;

    if (event.target.classList[1] == 'fa-check') {
        for (let i = 0; i < array.length; i++) {
            if (parent.children[0].innerText == array[i].value) {
                parent.classList.toggle('active');
                array[i].done = !array[i].done;
                editFromLocalStorage(array[i].id);
            }
        }
    }

    if (event.target.classList[1] == 'fa-trash') {
        if (confirm('Вы действительно хотите удалить эту заметку?')) {
            for (let i = 0; i < array.length; i++) {
                if (parent.children[0].innerText == array[i].value) {
                    removeFromLocalStorage(array[i].id);
                    array.splice(i, 1);
                    parent.remove();
                }
            }
        }
    }

    const todos = document.querySelectorAll('.todo');

    if (!todos.length) {
        removeAll.style.display = 'none';
        seacrhBtn.style.display = 'none';
        allHr.forEach(hr => hr.style.display = 'none');
    }
});

removeAll.addEventListener('click', () => {
    if (confirm('Вы действительно хотите удалить все заметки?')) {
        const todos = document.querySelectorAll('.todo');

        todos.forEach(todo => {
            for (let i = 0; i < array.length; i++) {
                removeFromLocalStorage(array[i].id);
                array.splice(i, 1);
                todo.remove();
            }
        })

        todoInput.value = '';
        removeAll.style.display = 'none';
        seacrhBtn.style.display = 'none';
        allHr.forEach(hr => hr.style.display = 'none');
    }
});

seacrhBtn.addEventListener('click', () => {
    form.style.display = 'none';
    searchBlock.style.display = 'flex';
    searchInput.focus();
})

searchBlock.addEventListener('click', (e) => {
    if (e.target.classList[0] == 'fa-solid') {
        form.style.display = 'block';
        searchBlock.style.display = 'none';
        searchInput.value = null;

        const todos = document.querySelectorAll('.todo');
        todos.forEach(todo => todo.style.display = 'flex');
    }
})

searchInput.addEventListener('input', () => {
    const todos = document.querySelectorAll('.todo');

    todos.forEach(todo => {
        if (todo.innerText.includes(searchInput.value)) {
            todo.style.display = 'flex';
        } else {
            todo.style.display = 'none';
        }
    })
})

//Local Storage
function saveInLocalStorage(object) {
    let todos = [];

    if (localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(object);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function editFromLocalStorage(object_id) {
    let todos = JSON.parse(localStorage.getItem('todos'));

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == object_id) {
            todos[i].done = !todos[i].done;
        };
    }

    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeFromLocalStorage(object_id) {
    let todos = JSON.parse(localStorage.getItem('todos'));

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == object_id) {
            todos.splice(i, 1);
        }
    }

    localStorage.setItem('todos', JSON.stringify(todos));
}