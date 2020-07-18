let todos = getSavedTodos()

const filters = {
    textFilter: '',
    hideCompleted: false
}


document.querySelector('#filter-text').addEventListener('input', (e) => {
    filters.textFilter = e.target.value
    renderTodos(todos, filters)
})

renderTodos(todos, filters)

document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.todoText.value.trim()
    if (text.length > 0) {
        todos.push({
            text,
            completed: false,
            id: uuidv4()
        })
        saveTodos(todos)
        renderTodos(todos, filters)
        e.target.elements.todoText.value = ''
    } else return    
})

document.querySelector('#checkbox').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters) 
})   
 