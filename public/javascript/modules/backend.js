import { Cookie } from "./cookies.js";

export class Backend {

    static hostname() {
        return document.location.protocol
    }

    static async products(filter, text, sort) {
        let data = await Backend.fetch("/produkte", { "text": text, "filter": filter, "sort": sort });

        return Array.from(await data)
    }

    static async bookmarksOfUser() {

        let data = await Backend.fetch('/merkliste', { "user_token": Cookie.get('user_token'), "user_id": Cookie.get('user_id') })

        return Array.from(await data);
    }

    static async productsOfUser() {

        let data = await Backend.fetch('/eigene_produkte', { "user_token": Cookie.get('user_token'), "user_id": Cookie.get('user_id') })

        return Array.from(data);
    }

    static async signIn(mail, password) {
        let data = await Backend.fetch('/signin', { "mail": mail, "password": password })

        Cookie.set('user_token', data.accessToken, 30);
        Cookie.set('user_refresh', data.refreshToken, 30)
        Cookie.set('user_id', data.uuid)
    
        window.open(document.location.protocol + '/account.html', '_self')
    }
    
    static async signUp(mail, password) {
        let data = await Backend.fetch('/signin', { "mail": mail, "password": password })
        
        Cookie.set('user_token', data.accessToken, 30);
        Cookie.set('user_refresh', data.refreshToken, 30)
        Cookie.set('user_id', data.uuid)
    
        window.open(document.location.protocol + '/account.html', '_self')
    }

    static async fetch(href, body) {
        let response = await fetch(Backend.hostname() + href, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
        // Zeige den Fehler in der Konsole.
        if (!response.ok) {

            if (response.status == 403) {
                let query = new URLSearchParams()
                query.set('reason', '403 Forbidden')
                window.open(document.location.protocol + '/sign.html', '_self')
            } 

            console.error(`Fehler ${response.status}: ${response.statusText}`);
        }
        // Gebe die Antwort als Array zurück.
        return await response.json();
    }
}