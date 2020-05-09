function createTodoItem(title, description, date, priority) {
    return new TodoItem(title, description, date, priority)
}

function TodoItem(title, description, date, priority){
    console.log(title, description, date, priority)

    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
}

export {createTodoItem}