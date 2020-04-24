import api from './api';

class App {
    constructor () {
        this.userList = [];
    }

    async addUsuario(usuario) {
        try {
               this.userList = await api.get(usuario);
        }
        catch (err) {
            console.log('Usuario inexistente. Tente outro');
        }
    }
}

new App();