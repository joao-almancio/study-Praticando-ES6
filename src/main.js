import api from './api';

class App {
    constructor () {
        this.userList = [];

        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.getElementById('repo-input');
        this.listEl = document.getElementById('repo-list');

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
               let userData = await api.get(usuario);
               let {avatar_url, name, location, html_url} = userData.data;

               this.userList.push( {
                   avatar_url,
                   name,
                   location,
                   html_url,
               });

               this.inputEl.value = '';

               this.render();
        }
        catch (err) {
            console.log(`Usuario "${usuario}" inexistente. Tente otro nome.`);
        }
    }

    render() {
        this.listEl.innerHTML = '';

        this.userList.forEach(item => {
            let liEl = document.createElement('li');

            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', item.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(item.name));

            let textEl = document.createElement('p');
            textEl.appendChild(document.createTextNode(item.location))

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', item.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            liEl.appendChild(imgEl);
            liEl.appendChild(titleEl);
            liEl.appendChild(textEl);
            liEl.appendChild(linkEl);

            this.listEl.appendChild(liEl);
        })
    }
}

new App();
