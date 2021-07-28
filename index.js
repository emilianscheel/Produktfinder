require('dotenv').config();
const exp = require("express");
const https = require('https');
const http = require('http');
const fs = require('fs')
const acc = require("./Manage-Authentication/scripts.js");
const mpr = require("./Manage-Products/scripts.js");
const minProd = require("./Manage-Products/min.js")
const app = exp();

app.use(exp.static(__dirname + process.env.PUBLIC_URL));
app.use(exp.json());



/*------------------------------ 
|- Manage-Authentication
|---- account.js
|- Mangage-Products
|---- scripts.js
|- data.json
|- index.js 
|- packages.json
|- request.rest
|- public
|---- assets
|--------- trash.png
|---- javascript
|--------- account.js
|--------- cookies.js
|--------- modules.js
|--------- product.js
|--------- script.js
|---- stylesheets
|--------- root.css
|--------- elements.css
|---- account.html
|---- footer.html
|---- index.html
------------------------------*/



/*-----------------------------------------------------------------------------------
Gebe die Produkte zurück:
-----------------------------------------------------------------------------------*/
app.post('/produkte', (request, response) => {
    // Lade die Produkte.
    var produkte = minProd.ladeProdukte();
    // Falls Filter mitgegeben wurden, filter mit diesen.
    let filter = request.body['filter']
    if (filter) {
        produkte = mpr.minimiereFilter(produkte, filter)
    }
    // Falls ein Suchtext mitgegeben wurde, filter mit dem Suchtext.
    let suchtext = request.body['searchtext'];
    if (suchtext) {
        produkte = mpr.minimiereSuchtext(produkte, suchtext)
    }
    // Falls eine Sortierung mitgegeben wurde, sortiere die Produkte.
    let sortierung = request.body['sort']
    if (sortierung != undefined) {
        produkte = mpr.sortiere(produkte, sortierung)
    }
    // Gebe die Produkte zurück.
    response.json(produkte);
});

app.get('/produkte', (request, response) => {
    // Lade die Produkte.
    var produkte = minProd.ladeProdukte();
    // Gebe die Produkte zurück.
    response.json(produkte)
});


/*-----------------------------------------------------------------------------------
Login, Registrierung und Accountmanagment:
-----------------------------------------------------------------------------------*/

app.post('/token', acc.token, (request, response) => {
    // Der neue Token wurde übergeben.
})

app.post('/logout', acc.logOut, (request, response) => {
    // Das Ausloggen ist passiert.
});

app.post('/signin', acc.signIn, (request, response) => {
    // Das einloggen ist passiert.
});

app.post('/signup', acc.signUp, acc.signIn, (request, response) => {
    // Das registrieren ist passiert.
});





/*-----------------------------------------------------------------------------------
Nutzer und Produkte
-----------------------------------------------------------------------------------*/

app.post('/merkliste', acc.authentifiziere, (request, response) => {
    let produkte = mpr.ladeGespeicherteProdukte(request.body.uuid)
    response.json(produkte)
});

app.post('/eigene_produkte', acc.authentifiziere, (request, response) => {
    let produkte = mpr.ladeEigeneProdukte(request.body.uuid)
    response.json(produkte)
});










var credentials = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'PRODUKTFINDER'
}

var httpsServer = https.createServer(credentials, app).listen(process.env.HTTPS_PORT, () => {
    console.log(`-> Https-Server läuft auf ${process.env.HTTPS_URL}`);
});
var httpServer = http.createServer(app).listen(process.env.HTTP_PORT, () => {
    console.log(`-> Http-Server läuft auf ${process.env.HTTP_URL}`);
});




