require('dotenv').config();
const minProd = require('../Manage-Products/min.js');
const minAuth = require('../Manage-Authentication/min.js');




function ladeGespeicherteProdukte(user_id) {

    let user = minAuth.getUserById(user_id);
    // Fehler
    if (!user) return;

    // Lade die Produkte.
    let produkte = minProd.loadProducts();
    let nProdukte = []
    // Füge die Produkte hinzu, die bei den gespeicherten mit ihrer UUID verlinkt sind.
    produkte.forEach(produkt => {
        if (user['bookmarks'].some(produktLink => produktLink['id'] == produkt['id'])) {
            nProdukte.push(produkt);
        }
    });
    // Gebe die ausgewählten Produkte für den Nutzer zurück.
    return nProdukte
}

function speicherGespeicherteProdukte(user_id, products) {

    let user = minAuth.getUserById(user_id);
    // Fehler
    if (!user) return;

    products.forEach(product => {
        user['products'].push(product['id']);
    });

    minAuth.saveUser(user)
}

function ladeEigeneProdukte(user_id) {

    let user = minAuth.getUserById(user_id);
    // Fehler
    if (!user) return;

    // Lade die Produkte.
    let produkte = minProd.loadProducts();
    let nProdukte = []
    // Füge die Produkte hinzu, die bei den gespeicherten mit ihrer UUID verlinkt sind.
    produkte.forEach(produkt => {
        if (user['products'].some(produktLink => produktLink['id'] == produkt['id'])) {
            nProdukte.push(produkt);
        }
    });
    // Gebe die ausgewählten Produkte für den Nutzer zurück.
    return nProdukte
}


function minimiereSuchtext(produkte, text) {
    let nProdukte = []
    // Filtere die Produkte aus, dessen Name nicht im Suchtext vorkommen.
    produkte.forEach((produkt) => {
        if (produkt['title'].toUpperCase().includes(text.toUpperCase())) {
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
        produkt['configurations'].some((configuration) => {
            if (vergleiche(configuration['tags'], filter)) {
                nProdukte.push(produkt)
            }
        })
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
    const attribute = sortierung.split('---')[0]
    const direction = sortierung.split('---')[1]

    console.log(sortierung)

    // Sortiere die Produkte nach dem Attribut.
    produkte.sort((a,b) => (a[attribute] > b[attribute]) ? 1 : ((b[attribute] > a[attribute]) ? -1 : 0))
    // Falls die Sortierung absteigend ist, drehe das Array um.
    if (direction == "descending") {
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
    sortiere,
    speicherGespeicherteProdukte
}