import { IUser } from "./types";

export default {
    user: function(): IUser {
        return {
            name: localStorage.getItem('name') || '',
            email: localStorage.getItem('email') || ''
        };
    },
    login: function(parameters: IUser) {
        localStorage.setItem('isAuthed', 'true');
        localStorage.setItem('name', parameters.name);
        localStorage.setItem('email', parameters.email);
    },
    logout: function() {
        localStorage.removeItem('isAuthed');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
    },
    isAuthed: function() {
        return (localStorage.getItem('isAuthed') === 'true');
    }
}