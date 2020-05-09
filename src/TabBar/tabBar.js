function createTabBar(){
    return new TabBar()
}

function TabBar() {

    let tabs = []

    function addTab(item){
        tabs.push(item)
    }

    function removeTab(item){
        tabs = tabs.filter( (_item) => {
            return _item !== item
        })
    }

    function getTabs(){
        return tabs;
    }

    return{addTab, removeTab, getTabs}
}

export {createTabBar}