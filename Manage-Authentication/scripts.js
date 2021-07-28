require('dotenv').config();
const uuid = require('uuid');
const bcr  = require('bcrypt');
const jwt  = require("jsonwebtoken");
const minProd = require("../Manage-Products/min.js");
const minAuth = require("../Manage-Authentication/min.js");


var refreshTokens = []


function signIn(request, response, next) {
    // Authetifiziere den Nutzer mit den mitgegebenen Daten
    var Nutzer = minAuth.ladeNutzer();
    // Überprüfe, ob der Nuzter schon existiert.
    let ExistierenderNutzer = Nutzer.find(user => user.mail == request.body.mail)
    if (ExistierenderNutzer == null) { return response.status(404).send('Nutzer konnte nicht gefunden werden.') }
    try {
        // Falls das Passwort übereinstimmt, sende „Success“ und den ACCESS_TOKEN sowie den REFRESH_TOKEN
        if (bcr.compare(request.body.password, ExistierenderNutzer.password)) {
            // Generiere einen ACCESS_TOKEN und einen REFRESH_TOKEN
            const accessToken = generateAccessToken(ExistierenderNutzer)
            const refreshToken = jwt.sign(ExistierenderNutzer, process.env.REFRESH_TOKEN_SECRET)
            // Füge den REFRESH_TOKEN zu der Liste hinzu und gebe beide zurück
            refreshTokens.push(refreshToken)
            response.json({
                "tokens": { 
                    "accessToken": accessToken, 
                    "refreshToken": refreshToken 
                },
                "uuid": ExistierenderNutzer.uuid })
            // Sende Status 200: „Ok“ zurück.
            response.status(200)
        } else {
            // Sende Status 405: „Not Allowed“ zurück.
            response.status(405).send()
        }
    } catch (error) {
        // Falls der Fehler ungleich ‘null‘ ist, zeige den Fehler.
        if (error != null) throw error
        // Sende den Status: „Internal Server error“.
        response.status(500).send()
    }
    next();
}

async function signUp(request, response, next) {
    // Authetifiziere den Nutzer mit den mitgegebenen Daten
    var Nutzer = minAuth.ladeNutzer();
    // Überprüfe, ob der Nuzter schon existiert.
    let ExistierenderNutzer = Nutzer.find(user => user.mail == request.body.mail);
    // Sende Status 409: „Nutzer existier bereits“ zurück.
    if (ExistierenderNutzer != null) { response.status(409).send("Nutzer existiert bereits."); return }

    let hashedPassword = await bcr.hash(request.body.password, 10);
    let NeuerNutzer = { 
        "name": request.body.mail, 
        "password": hashedPassword, 
        "uuid": uuid.v4(),
        "gemerkte_produkte": [],
        "eigene_produkte": []
    }
    // Füge den neuen Nutzer hinzu.
    Nutzer.push(NeuerNutzer)
    // Speicher die Nutzer.
    minAuth.speicherNutzer(Nutzer);
    // Sende Status 201: „Created“ zurück.
    response.status(201);
    response.json(Nutzer);
    next();
}

function logOut(request, response, next) {
    // Falls der REFRESH_TOKEN existiert, lösche ihn aus der Liste
    refreshTokens = refreshTokens.filter(token => token !== request.body.token)
    // Sende Status 204: „No content“ zurück
    response.status(204).send()
    next();
}

function token(request, response, next) {
    // Lade den REFRESH_TOKEN aus dem mitgegebenen Daten
    const refreshToken = request.body.token
    // Falls der REFRESH_TOKEN gleich ‘null‘ ist, sende Status 401: „Unauthorized“ zurück.  
    if (refreshToken == null) return response.sendStatus(401)
    // Falls der REFRESH_TOKEN sich nicht in der Liste befindet, sende Status 403: „Forbidden“ zurück.
    if (!refreshTokens.includes(refreshToken)) return response.sendStatus(403)
    // Überprüfe, ob der REFRESH_TOKEN noch gültig ist, wenn nicht, sende Status 403: „Forbidden“ zurück.
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        // Falls es einen Fehler gibt, sende Status 403: „Forbidden“ zurück.
        if (error) return response.sendStatus(403)
        // Erstelle einen neuen ACCESS_TOKEN.
        const accessToken = generateAccessToken({ mail: user.mail })
        // Gebe den neuen ACCESS_TOKEN zurück.
        response.json({ "accessToken": accessToken, "refreshToken": refreshToken });
        next();
    })
}

function authentifiziere(request, response, next) {
    // Lade den ACCESS_TOKEN aus dem Request-Body.
    const token = request.body.accessToken
    // Überprüfe, ob der TOKEN gleich ‘null‘ ist, wenn ja, sende Status 401: „Unauthorized“ zurück
    if (token == null) return response.sendStatus(401)
    // Überprüfe, ob der TOKEN noch gültig ist, wenn nicht sende Status 403: „Forbidden“ 
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) return response.status(403).send()
        request.user = user
        next()
    })
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '500s' })
}


module.exports = {
    signIn,
    signUp,
    logOut,
    token,
    authentifiziere
}
