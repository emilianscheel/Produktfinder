require('dotenv').config();
const fs = require('fs');

function loadProducts() {
    // Lade die Produkte aus der Datenbank.
    let savedData = fs.readFileSync(__dirname + process.env.JSON_DATABASE_NAME);
    return JSON.parse(savedData);
}

function saveProducts(produkte) {
    // Speichere die Produkte in der Datenbank.
    fs.writeFileSync(__dirname + process.env.JSON_DATABASE_NAME, JSON.stringify(produkte, null, 4));
}

function getProductById(id) {
    let products = ladeNutzer();
    return products.find(product => { return product['id'] == id });
}

module.exports = {
    loadProducts,
    saveProducts,
    getProductById
}