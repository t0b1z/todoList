import $ from "jquery";
import {createTodoItem} from "./todoItem";

export let todoListRenderer = (function() {

    let observers = []

    function generateToDoItemDOM(todoList, value, index) {
        let item = $("<div>").addClass("ToDoItem")

        item.append($('<div>' + value.title + '</div>'))
        item.append($('<div>' + value.description + '</div>'))
        item.append($('<div>' + value.date + '</div>'))
        item.append($('<div>' + value.priority + '</div>'))

        let remButtonDiv = $('<div>')
        let remButton = $('<button/>',
            {
                text: 'x',
                "class": "RemoveButton",
                click: () => {
                    todoList.removeTodoItem(index)
                    fireEvent("UPDATE")
                    render(todoList)
                }
            });

        remButtonDiv.append(remButton)
        item.append(remButtonDiv)
        return item;
    }

    function generateNewItemRowDOM(todoList){
        let item = $("<div>").addClass("ToDoItem")

        item.append($("<div>").append($('<input id="inTitle" placeholder="Title"/>')))
        item.append($("<div>").append($('<input id="inDesc" placeholder="Description"/>')))
        item.append($("<div>").append($('<input id="inDate" placeholder="Date"/>')))
        item.append($("<div>").append($('<input id="inPrio" placeholder="Prio"/>')))

        let addButtonDiv = $('<div>')
        let addButton = $('<button/>',
            {
                text: '+',
                "class": "AddNewButton",
                click: () => {
                    let title = document.getElementById("inTitle").value
                    let desc = document.getElementById("inDesc").value
                    let date = document.getElementById("inDate").value
                    let prio = document.getElementById("inPrio").value
                    let item = createTodoItem(title, desc, date, prio)
                    todoList.addTodoItem(item)
                    fireEvent("UPDATE")
                    render(todoList)
                }
            });

        addButtonDiv.append(addButton)
        item.append(addButtonDiv)

        return item
    }

    function addObserver(event, observerFn){
        observers.push([event, observerFn])
    }

    function fireEvent(event, data = ""){
        console.log("FIRE", event, data)
        observers.forEach((item) => {
            let _event = item[0]
            let observerFn = item[1]

            if(_event == event){
                observerFn(event, data)
            }
        })
    }

    function render(todoList){
        console.log("rendering page...")
        let listDOM = $("div.ToDoList")
        listDOM.empty()

        todoList.getList().forEach(
            (value, index) => {

                let item = generateToDoItemDOM(todoList, value, index);
                listDOM.append(item)
            })

        let newItemRow = generateNewItemRowDOM(todoList)
        listDOM.append(newItemRow)
    }

    return {render, addObserver, fireEvent}
}())