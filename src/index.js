import {createTodoList} from './ToDoList/todoList'
import {createTodoItem} from "./ToDoList/todoItem";
import $ from 'jquery'
import {storage} from './localStorage'
import {todoListSerializer} from "./ToDoList/todoListSerializer";
import {todoListRenderer} from "./ToDoList/todoListRenderer";
import {tabBarRenderer} from "./TabBar/tabBarRenderer";
import {createTabBar} from "./TabBar/tabBar";
import {createTabBarItem} from "./TabBar/tabBarItem";

// VARIABLES
let todoLists = []
let tabBar = createTabBar()

// FUNCTIONS

function saveLists() {
    console.log("Saving: " + todoLists)
    let storageString = todoListSerializer.serialize(todoLists)
    console.log(storageString)
    storage.save("lists", storageString)
}

function handleLoad(string) {
    todoLists = todoListSerializer.deserialize(string)
    console.log(string, todoLists.length)
    todoLists = todoLists.length !== 0 ? todoLists : [createTodoList("New")]
}

function addNewTab(event, data){
    console.log("Add new tab in index called...!")
    todoLists.push(createTodoList("New"))
    tabBar.addTab(createTabBarItem(todoLists[todoLists.length-1].getTitle()))
    tabBarRenderer.render(tabBar)
    saveLists()
}

function switchToTab(event, data){
    todoListRenderer.render(todoLists[data])
}

function removeTab(event, data){
    let index = data[0]
    let tabItem = data[1]
    todoLists = todoLists.filter((value, _index) => {return _index !== index})
    tabBar.removeTab(tabItem)
    tabBarRenderer.render(tabBar)
    saveLists()
}

function updateTitle(event, data) {
    console.log("Label changed", data)
    let index = data[0]
    let title = data[1]
    todoLists[index].setTitle(title)

    let tab = tabBar.getTab(index)
    tab.setLabel(title)
    tabBar.setTab(index, tab)
    saveLists()
}

// INIT
$( document ).ready(function() {

    if(storage.isLocalStorageAvailable()){
        console.log("local storage available")
        storage.printStorageContent()
    }

    storage.load("lists", handleLoad);

    todoLists.forEach( (list) => {
        tabBar.addTab(createTabBarItem(list.getTitle()))
    } )

    tabBarRenderer.addObserver("NEW_CLK", addNewTab)
    tabBarRenderer.addObserver("TAB_CLK", switchToTab)
    tabBarRenderer.addObserver("REM_CLK", removeTab)
    tabBarRenderer.addObserver("EDIT", updateTitle)

    todoListRenderer.addObserver("UPDATE", saveLists)

    tabBarRenderer.render(tabBar)
    todoListRenderer.render(todoLists[0])
});