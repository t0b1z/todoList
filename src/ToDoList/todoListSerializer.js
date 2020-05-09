import {createTodoList} from './todoList'
import {createTodoItem} from "./todoItem";

export let todoListSerializer = (function() {

    function serialize(todoLists){
        console.log("Serialize. ", todoLists, todoLists[0].getTitle())
        let string = ""

        todoLists.forEach((todoList) => {
            string += todoList.getTitle() + "="
            todoList.getList().forEach( (value, index) => {
                string += value.title + ","
                string += value.description + ","
                string += value.date + ","
                string += value.priority + ";"
            })
            if(todoList !== todoLists[todoLists.length-1])
                string += ":"
        })

        return string;
    }

    function deserialize(string){
        let todoLists = []
        let lists = string.split(":")

        if(string === "")
            return todoLists

        lists.forEach((list) => {
            console.log("List",list)
            let title = list.split("=")[0]
            let items = list.split("=")[1].split(";")
            let todoList = createTodoList(title)
            items.forEach(
                (item) => {
                    let chunks = item.split(",")
                    if(chunks.length === 4){
                        todoList.addTodoItem(createTodoItem(chunks[0], chunks[1], chunks[2], chunks[3]))
                    }
                }
            )
            todoLists.push(todoList)
        })
        return todoLists
    }

    return {serialize, deserialize}
}())