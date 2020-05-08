import {createTodoList} from './todoList'
import {createTodoItem} from "./todoItem";

export let todoListSerializer = (function() {

    function serialize(todoLists){
        let string = ""

        todoLists.forEach((todoList) => {
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
        lists.forEach((list) => {
            let items = list.split(";")
            let todoList = createTodoList("List")
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