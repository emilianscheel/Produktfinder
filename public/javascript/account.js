


/*--------------------------------------------------------------
>>> ÜBERSICHT DER INHALTE
----------------------------------------------------------------
1. Login und Registrieren
2. Daten abrufen
--------------------------------------------------------------*/

function signIn() {
    
    fetch("http://localhost:1000/signin", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "mail": $('#login-mail').val(), "password": $('#login-password').val() })
    }).then((response) => {

        // Gebe die Json-Daten zurück.
        response.json().then( (data) => {

            addCookie(data.tokens, data.uuid)

            window.open("http://localhost:1000/account.html")

        // Fange den Fehler auf, falls einer zurückgeworfen wird.
        // Gebe ihn mit catchError weiter.
        }).catch((error) => { console.log(error) });

    // Fange den Fehler auf, falls einer zurückgeworfen wird.
    // Gebe ihn mit catchError weiter.
    }).catch ((error) => { console.log(error) });
}

function signUp() {
    
    fetch("http://localhost:1000/signup", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "mail": $('#login-mail').val(), "password": $('#login-password').val() })
    }).then((response) => {

        // Gebe die Json-Daten zurück.
        response.json().then( (data) => {

            addCookie(data.tokens, data.uuid)
        
        // Fange den Fehler auf, falls einer zurückgeworfen wird.
        // Gebe ihn mit catchError weiter.
        }).catch((error) => { console.log(error) });

    // Fange den Fehler auf, falls einer zurückgeworfen wird.
    // Gebe ihn mit catchError weiter.
    }).catch ((error) => { console.log(error) });
}

function addCookie(tokens, uuid) {
    let cookies = JSON.parse(document.cookie);
    cookies.tokens    = tokens;
    cookies.user_uuid = uuid;
    // Speichere die Cookies
    document.cookie = JSON.stringify(cookies);
}