require('dotenv').config();
const fs = require('fs');

function ladeProdukte() {
    // Lade die Produkte aus der Datenbank.
    let savedData = fs.readFileSync(__dirname + process.env.JSON_DATABASE_NAME);
    return JSON.parse(savedData);
}

function speicherProdukte(produkte) {
    // Speichere die Produkte in der Datenbank.
    fs.writeFileSync(__dirname + process.env.JSON_DATABASE_NAME, JSON.stringify(produkte, null, 4));
}

module.exports = {
    ladeProdukte,
    speicherProdukte
}