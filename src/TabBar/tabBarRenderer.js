import $ from "jquery";
import {createTodoList} from "../ToDoList/todoList";

export let tabBarRenderer = (function() {

    let observers = []

    function generateListTabButton(tabItem, index) {
        let tabBarDiv = $('<div>')

        let tabDiv = $('<div/>',
            {
                "class": "TabButton container",
                click: (e) => {
                    //console.log("Click on div")
                    //fireEvent("TAB_CLK", index)
                }
            });


        let labelField = $('<input>',
            {
                value: tabItem.getLabel(),
                click: (e) => {
                    console.log("Click on label")
                    fireEvent("TAB_CLK", index)
                },
                "class" : "TabLabel"
            }
        ).change( (event) => {
            fireEvent("EDIT", [index, event.target.value])
        })

        let remButton = $('<button/>',
            {
                text: "x",
                "class": "TabButton rem",
                click: (e) => {
                    fireEvent("REM_CLK", [index, tabItem])
                    /*
                    todoLists = todoLists.filter( (value => {
                        return value != todoList
                    }))

                    if(todoLists.length === 0){
                        todoLists.push(createTodoList("List"))
                    }

                    render(todoLists[todoLists.length-1])
                    saveLists()
                    */
                }
            });

        tabDiv.append(remButton)
        tabDiv.append(labelField)

        tabBarDiv.append(tabDiv)

        return tabBarDiv;
    }

    function generateNewTabButton() {
        let button = $('<button/>',
            {
                text: "+",
                "class": "TabButton new",
                click: (event) => {
                    fireEvent("NEW_CLK")
                }
            });
        return button;
    }

    function render(tabBar){
        let tabBarDiv = $("div.ListTabs")
        tabBarDiv.empty()

        tabBar.getTabs().forEach((tab, index) => {
            let tabButton = generateListTabButton(tab, index)
            if(tab.isActive){
                tabButton.addClass("active")
            }
            tabBarDiv.append(tabButton)
        })
        let newTabButton = generateNewTabButton()
        tabBarDiv.append(newTabButton)
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

    return {render, addObserver}
}())