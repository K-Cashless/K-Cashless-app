class User {
    constructor() {
        this._isLoggedIn = false;
        this._id = null;
        this._balance = 0;
        this._kpoints = 0;
        this._notifications = {haveUnread: false, list: []};
        this._history = [];
    }

    get isLoggedIn() {
        return this._isLoggedIn;
    }

    set isLoggedIn(value) {
        this._isLoggedIn = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get balance() {
        return this._balance;
    }

    set balance(value) {
        this._balance = value;
    }

    get kpoints() {
        return this._kpoints;
    }

    set kpoints(value) {
        this._kpoints = value;
    }

    get notifications() {
        return this._notifications;
    }

    set notifications(value) {
        this._notifications = value;
    }

    get history() {
        return this._history;
    }

    set history(value) {
        this._history = value;
    }
}

export let UserStore = new User();
