import {createTodoList} from './todoList'
import {createTodoItem} from "./todoItem";
import $ from 'jquery'
import {storage} from './localStorage'
import {todoListSerializer} from "./todoListSerializer";

// VARIABLES
let todoLists = undefined

// FUNCTIONS

function generateListTabButton(todoList) {
    let div = $('<div>')

    let button = $('<button/>',
        {
            text: todoList.getTitle(),
            "class": "TabButton title",
            click: (e) => {
                render(todoList)
            }
        });

    let remButton = $('<button/>',
        {
            text: "x",
            "class": "TabButton rem",
            click: (e) => {
                todoLists = todoLists.filter( (value => {
                    return value != todoList
                }))

                if(todoLists.length === 0){
                    todoLists.push(createTodoList("List"))
                }

                render(todoLists[todoLists.length-1])
                saveLists()
            }
        });

    div.append(remButton)
    div.append(button)

    return div;
}

function generateNewTabButton() {
    let button = $('<button/>',
        {
            text: "+",
            "class": "TabButton new",
            click: (event) => {
                todoLists.push(createTodoList("List"))
                render(todoLists[todoLists.length-1])
            }
        });
    return button;
}

function render(activeTodoList){
    console.log("rendering page...")
    let listDOM = $("div.ToDoList")
    listDOM.empty()

    let tabBar = $("div.ListTabs")
    tabBar.empty()

    todoLists.forEach((todoList, index) => {
        let tabButton = generateListTabButton(todoList)
        if(todoList === activeTodoList){
            tabButton.addClass("active")
        }
        tabBar.append(tabButton)
    })

    let newTabButton = generateNewTabButton()
    tabBar.append(newTabButton)

    activeTodoList.getList().forEach(
        (value, index) => {

            let item = generateToDoItemDOM(activeTodoList, value, index);
            listDOM.append(item)
        })

    let newItemRow = generateNewItemRowDOM(activeTodoList)
    listDOM.append(newItemRow)

}

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
                saveLists()
                render(todoList)
            }
        });

    remButtonDiv.append(remButton)
    item.append(remButtonDiv)
    return item;
}

function generateNewItemRowDOM(todoList){
    let item = $("<div>").addClass("ToDoItem")

    item.append($('<input id="inTitle" placeholder="Title"/>'))
    item.append($('<input id="inDesc" placeholder="Description"/>'))
    item.append($('<input id="inDate" placeholder="Date"/>'))
    item.append($('<input id="inPrio" placeholder="Prio"/>'))

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
                saveLists()
                render(todoList)
            }
        });

    addButtonDiv.append(addButton)
    item.append(addButtonDiv)

    return item
}

function saveLists() {
    let storageString = todoListSerializer.serialize(todoLists)
    storage.save("lists", storageString)
}

function handleLoad(string) {
    todoLists = todoListSerializer.deserialize(string)
    todoLists = todoLists ? todoLists : [createTodoList("List")]
}

// INIT
$( document ).ready(function() {

    if(storage.isLocalStorageAvailable()){
        console.log("local storage available")
        storage.printStorageContent()
    }

    storage.load("lists", handleLoad);

    render(todoLists[0])
});