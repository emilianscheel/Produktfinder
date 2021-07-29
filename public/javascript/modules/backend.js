export class Backend {

    static hostname() {
        return document.location.protocol
    }

    static async products(filter, text, sort) {
        let data = await fetch("/produkte", { "searchtext": text, "filter": filter, "sort": sort });

        return Array.from(await data.json())
    }

    static async bookmarksOfUser() {
        let query = new URLSearchParams(document.location.search);

        let data = await Backend.fetch('/merkliste', { "accessToken": query.get('accessToken'), "uuid": query.get('refreshToken') })

        return Array.from(await data.json());
    }

    static async productsOfUser() {
        let query = new URLSearchParams(document.location.search);

        let data = await Backend.fetch('/eigene_produkte', { "accessToken": query.get('accessToken'), "uuid": query.get('refreshToken') })

        return Array.from(await data.json());
    }

    static async signIn(mail, password) {
        let data = await Backend.fetch('/signin', { "mail": mail, "password": password })

        let query = new URLSearchParams()
        query.set('accessToken', data.accessToken)
        query.set('refreshToken', data.refreshToken)
        query.set('uuid', data.uuid)
    
        window.open(document.location.protocol + '/account.html' + '?' + query.toString())
    }
    
    static async signUp(mail, password) {
        let data = await Backend.fetch('/signin', { "mail": mail, "password": password })

        let query = new URLSearchParams()
        query.set('accessToken', data.accessToken)
        query.set('refreshToken', data.refreshToken)
        query.set('uuid', data.uuid)
    
        window.open(document.location.protocol + '/account.html' + '?' + query.toString())
    }

    static async fetch(href, body) {
        let response = await fetch(Backend.hostname() + href, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
        // Zeige den Fehler in der Konsole.
        if (!response.ok) {
            console.error(`Fehler ${response.status}: ${response.statusText}`);
        }
        // Gebe die Antwort als Array zurück.
        return await response.json();
    }
}