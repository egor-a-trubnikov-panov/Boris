class UserDataStorage {
    constructor() {
        var key = '__localStorageTest';
        try {
            localStorage.setItem(key, key);
            localStorage.removeItem(key);
            this._storage = localStorage;
        } catch (e) {
            this._storage = {};
        }
    }

    getValue(key) {
        var value = this._storage[key];
        return value === undefined ? undefined : JSON.parse(value);
    }

    setValue(key, value) {
        this._storage[key] = JSON.stringify(value);
    }
}
export default UserDataStorage;
