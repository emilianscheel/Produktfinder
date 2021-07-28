require('dotenv').config();
const minProd = require('../Manage-Products/min.js');
const minAuth = require('../Manage-Authentication/min.js');




function ladeGespeicherteProdukte(user_uuid) {
    // Lade die Nutzer.
    let Nutzer = minAuth.ladeNutzer();
    // Suche den aktuellen Nutzer mithilfe der mitgegebenen Nutzer-UUID.
    let user = Nutzer.find(user => {
        return user.uuid == user_uuid
    });
    // Falls der Nutzer nicht existiert, gebe das zurück.
    if (user == null) { console.log("Nutzer existiert nicht."); return }
    // Lade die Produkte.
    let produkte = minProd.ladeProdukte();
    let nProdukte = []
    // Füge die Produkte hinzu, die bei den gespeicherten mit ihrer UUID verlinkt sind.
    produkte.forEach(produkt => {
        if (user.gespeicherte_produkte.some(produktLink => produktLink.uuid == produkt.uuid)) {
            nProdukte.push(produkt);
        }
    });
    // Gebe die ausgewählten Produkte für den Nutzer zurück.
    return nProdukte
}


function ladeEigeneProdukte(user_uuid) {
    // Lade die Nutzer.
    let Nutzer = minAuth.ladeNutzer();
    // Suche den aktuellen Nutzer mithilfe der mitgegebenen Nutzer-UUID.
    let user = Nutzer.find(user => {
        return user.uuid == user_uuid
    });
    // Falls der Nutzer nicht existiert, gebe das zurück.
    if (user == null) { console.log("Nutzer existiert nicht."); return }
    // Lade die Produkte.
    let produkte = minProd.ladeProdukte();
    let nProdukte = []
    // Füge die Produkte hinzu, die bei den gespeicherten mit ihrer UUID verlinkt sind.
    produkte.forEach(produkt => {
        if (user.eigene_produkte.some(produktLink => produktLink.uuid == produkt.uuid)) {
            nProdukte.push(produkt);
        }
    });
    // Gebe die ausgewählten Produkte für den Nutzer zurück.
    return nProdukte
}


function minimiereSuchtext(produkte, suchText) {
    let nProdukte = []
    // Filtere die Produkte aus, dessen Name nicht im Suchtext vorkommen.
    produkte.forEach(produkt => {
        let produkt_name = produkt.name.toUpperCase()
        let suchtext     = suchText.toUpperCase()
        if (produkt_name.includes(suchtext)) {
            nProdukte.push(produkt)
        }
    });
    // Gebe die Produkte gefiltert durch den Suchtext zurück.
    return nProdukte;
}

function minimiereFilter(produkte, filter) {
    let nProdukte = []
    // Falls die Tags vom Produkt alle bei den Filtern ausgewählt sind, füge das Produkt hinzu.
    produkte.forEach(produkt => {
        if (vergleiche(produkt['tags'], filter)) {
            nProdukte.push(produkt)
        }
    });
    // Gebe die Produkte gefiltert duch die Filter zurück.
    return nProdukte
}

function vergleiche(filter1, filter2) {
    // Prüfe, ob der 1. Filter alle 2. Filter enthält.
    return filter2.every(filter2 => {
        return filter1.some(filter1 => {
            return filter1.compare(filter2.json);
        })
    });
}

function sortiere(produkte, sortierung) {
    // Sortiere die Produkte nach dem Attribut.
    produkte.sort((a,b) => (a[sortierung.attribute] > b[sortierung.attribute]) ? 1 : ((b[sortierung.attribute] > a[sortierung.attribute]) ? -1 : 0))
    // Falls die Sortierung absteigend ist, drehe das Array um.
    if (sortierung.direction == "descending") {
        produkte.reverse()
    }
    // Gebe die sortierten Produkte zurück.
    return produkte
}

Object.prototype.compare = function compare(object) {
    currentKeys = Object.keys(this);
    return currentKeys.every((key) => {
        return this[key] == object[key];
    })
}





module.exports = {
    ladeGespeicherteProdukte,
    ladeEigeneProdukte,
    minimiereSuchtext,
    minimiereFilter,
    sortiere
}