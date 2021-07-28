require('dotenv').config();
const fs = require('fs');




function ladeNutzer() {
    // Lade die Nutzer aus der Datenbank.
    let savedData = fs.readFileSync(__dirname + process.env.JSON_DATABASE_NAME);
    return JSON.parse(savedData);
}

function speicherNutzer(users) {
    // Speichere die Nutzer in der Datenbank.
    fs.writeFileSync(__dirname + process.env.JSON_DATABASE_NAME, JSON.stringify(users, null, 4));
}



module.exports = {
    ladeNutzer, 
    speicherNutzer
}