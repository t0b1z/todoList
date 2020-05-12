function createTabBar(){
    return new TabBar()
}

function TabBar() {

    let tabs = []

    function addTab(item){
        tabs.push(item)

        console.log("Adding tabs")
        logAllTabs()
    }

    function removeTab(item){
        tabs = tabs.filter( (_item) => {
            return _item !== item
        })
    }

    function getTabs(){
        return tabs;
    }

    function getTab(index){
        return tabs[index]
    }

    function setTab(index, tab){
        console.log("Replacing tab at index", index, tab.getLabel())
        tabs[index] = tab
        logAllTabs()
    }

    function logAllTabs(){
        tabs.forEach((tab, index) => {
            console.log("Tab", index, ":", tab.getLabel())
        })
    }

    return{addTab, removeTab, getTabs, getTab, setTab}
}

export {createTabBar}