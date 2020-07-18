// Fetch existing todos from localStorage
const getSavedTodos = () => {
    todosJSON = localStorage.getItem('todos')
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        return []
    }    
}

// Save todos to localStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Remove todos from the array
const removeTodo = (id) => {
    const index = todos.findIndex((todo) => todo.id === id)
    if (index > -1) {
        todos.splice(index, 1)
    }
}

// Toggle the todos.completed when the checkbox is toggled
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed
    }
}

// Get the DOM elements for list summary
const generateSummaryDOM = (todos) => {
    const text = document.createElement('h2')
    text.classList.add('list-title')
    todos.length === 1 ? text.textContent = `You have 1 todo left` : text.textContent = `You have ${todos.length} todos left`    
    document.querySelector('#todos').appendChild(text)
}

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    // Create the elements
    const div = document.createElement('label')
    const containerEl = document.createElement('div')
    const span = document.createElement('span')
    const input = document.createElement('input')
    const button = document.createElement('button')

    //Configuring the elements
    span.textContent = todo.text
    button.textContent = 'remove'
    button.classList.add('button', 'button--text')
    button.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    input.setAttribute('type', 'checkbox')
    input.checked = todo.completed
    input.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    div.classList.add('list-item')
    containerEl.classList.add('list-item__container')

    // Append the elements to the div
    containerEl.appendChild(input)
    containerEl.appendChild(span)
    div.appendChild(containerEl)
    div.appendChild(button)
    
    document.querySelector('#todos').appendChild(div)
}

// Render application todos based on filters
const renderTodos = (todos, filters) => {

    const incompletedTodos = todos.filter((todo) => !todo.completed)

    const filteredTodos = todos.filter((todo) => {
        const textMatch = todo.text.toLowerCase().includes(filters.textFilter.toLowerCase())

        if (filters.hideCompleted) {
            return textMatch && !todo.completed
        } else {
            return textMatch
        }
    })

    document.querySelector('#todos').innerHTML = ''
    
    generateSummaryDOM(incompletedTodos)
    
    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            generateTodoDOM(todo)
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'There are no to-dos to show'
        document.querySelector('#todos').appendChild(messageEl)

    }
    
}