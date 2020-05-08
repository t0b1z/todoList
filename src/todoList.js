function createTodoList(title){
    return new TodoList(title)
}

function TodoList(title){
    let list = []
    this.title = title

    function addTodoItem(todoItem){
        logMsg("Adding item \"" + todoItem.title + "\" to list")
        list.push(todoItem)
    }

    function removeTodoItem(index){
        console.log("Attempting to remove item with index " + index)

        list = list.filter( (value, i) => {
            if(i === index)
                logMsg("Removing item \"" + value.title + "\" from list.")

            return i !== index
        })
        printList()
    }

    function printList() {
        logMsg("Printing Todo-List:")
        list.forEach(value => {
            console.log("\t" + value.title, "-", value.description, "-", value.date, "-", value.priority)
        })
    }

    function getList(){
        return list
    }

    function getTitle(){
        return title
    }

    function setTitle(title){
        this.title = title
    }

    return {addTodoItem, removeTodoItem, printList, getList, getTitle, setTitle}
}


function logMsg(content){
    console.log("TODO-LIST-LOG: " + content)
}

export {createTodoList}