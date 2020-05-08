export let storage = (function() {
    let _storage

    function storageAvailable(type) {
        try {
            _storage = window[type];
            let x = '__storage_test__';
            _storage.setItem(x, x);
            _storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                    // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (_storage && _storage.length !== 0);
        }
    }

    function isLocalStorageAvailable(){
        return storageAvailable('localStorage')
    }

    function load(key, callback) {
        callback(_storage[key] ? _storage[key] : "")
    }

    function clear(){
        _storage.clear()
    }

    function save(key, value) {
        _storage.setItem(key, value)
    }

    function printStorageContent(){
        console.log(_storage)
    }

    return {isLocalStorageAvailable, load, save, clear, printStorageContent}
}())