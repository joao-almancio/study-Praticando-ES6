import api from './api';

class App {
    constructor () {
        this.userList = [];

        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.getElementById('repo-input');

        this.eventHandler();
    }

    eventHandler() {
        this.formEl.onsubmit = event => {
            event.preventDefault();
            this.addUsuario();
        }
    }

    async addUsuario() {
        let usuario = this.inputEl.value;

        if (usuario == 0) {
            return
        }

        try {
               let data = await api.get(usuario);
               this.userList.push(data);

               this.inputEl.value = '';
        }
        catch (err) {
            alert(`Usuario "${usuario}" inexistente. Tente otro nome.`);
        }
    }
}

new App();
