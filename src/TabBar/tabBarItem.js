function createTabBarItem(label) {
    return new TabBarItem(label)
}

function TabBarItem(label){
    let _label = label;
    let _isActive = false
    let _isEditable = false

    function getLabel() {
        return _label
    }

    function setLabel(label){
        _label = label
    }

    function isActive() {
        return _isActive
    }

    function setActive(active){
        _isActive = active
    }

    function isEditable() {
        return _isEditable
    }

    function setEditable(editable){
        _isEditable = editable
    }

    return{getLabel, setLabel, isActive, setActive, isEditable, setEditable}
}

export {createTabBarItem}