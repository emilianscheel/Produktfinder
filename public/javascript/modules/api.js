import { Produkt } from "./produkt.js";

export class Backend {

    constructor() {

    }

    static hostname() {
        return "http://" + document.location.host
    }

    static async fetchProdukte(filter, searchtext, sort) {
        // Erstelle eine Anfrage für die Produkte
        let response = await fetch(Backend.hostname() + "/produkte", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "searchtext": searchtext, "filter": filter, "sort": sort })
        });
        // Zeige den Fehler in der Konsole.
        if (!response.ok) {
            console.log((Error(`Fehler ${response.status}: ${response.statusText}`)));
        }
        // Gebe die Produkte als Array zurück.
        return Array.from(await response.json());
    }

    async fetchMerkliste(cookies) {
        // Erstelle eine Anfrage für die Merkliste.
        let response = await fetch(Backend.hostname() + "/merkliste", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "accessToken": cookies.tokens.accessToken, "uuid": cookies.user_uuid })
        })
        // Zeige den Fehler in der Konsole.
        if (!response.ok) {
            console.log((Error(`Fehler ${response.status}: ${response.statusText}`)));
        }
        // Gebe die Produkte als Array zurück.
        return Array.from(await response.json());
    }

    async fetchEigeneProdukte(cookies) {
        // Erstelle eine Anfrage für die eigenen Produkte.
        let response = await fetch(Backend.hostname() + "/eigene_produkte", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "accessToken": cookies.tokens.accessToken, "uuid": cookies.user_uuid })
        });
        // Zeige den Fehler in der Konsole.
        if (!response.ok) {
            console.log((Error(`Fehler ${response.status}: ${response.statusText}`)));
        }
        // Gebe die Produkte als Array zurück.
        return Array.from(await response.json());
    }
}