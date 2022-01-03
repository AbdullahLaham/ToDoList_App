const form = document.getElementById('form');
const input = document.getElementById('input');
const todoUl = document.getElementById('todos');
const todos =   JSON.parse(localStorage.getItem('todos'));
if (todos) {
    todos.forEach(todo => {
        addToDo(todo);

    });
    
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addToDo();
    updateLS();
});
function addToDo(todo) {
    let todoText = input.value;
    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement('li');
        if (todo && todo.completed) {
            todo.classList.toggle('completed');
        }
        todoEl.innerText = todoText;
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLS();
        })
        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoEl.remove();
            updateLS();
        })
        todoUl.appendChild(todoEl);
        input.value = '';
        updateLS();
    }
}
function updateLS() {
    const notesEl = document.querySelectorAll('li');
    const notes = [];
    notesEl.forEach(noteEl => {
        notes.push({
            text: noteEl.innerText,
            completed: noteEl.classList.contains('completed')
        });
    });
    localStorage.setItem('todos', JSON.stringify(notes));
}