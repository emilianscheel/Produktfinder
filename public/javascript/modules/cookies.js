export class Cookies {

    static get() {
        if (document.cookie == '') document.cookie = '{}'
        var cookies = JSON.parse(document.cookie)
        return cookies;
    }

    static set(cookies) {
        document.cookie = JSON.stringify(cookies);
    }

    static setAttr(key, value) {
        var cookies = Cookies.get();
        cookies[key] = value;
        Cookies.set(cookies);
    }

    static attr(key) {
        return Cookies.get()[key]
    }

    static append(key, value) {
        var cookies = Cookies.get();
        if (Array.isArray(cookies[key])) {
            cookies[key].push(value);
        } else {
            var list = [];
            list.push(value)
            cookies[key] = list;
        }
        Cookies.set(cookies)
    }

    static remove(key, value) {
        var cookies = Cookies.get();
        if (Array.isArray(cookies[key])) { 
            cookies[key].splice(cookies[key].indexOf(value), 1);
        }
        Cookies.set(cookies)
    }

    static checkCookies() {
        console.log(Cookies.get())
        // Falls die Cookies schon angenommen oder abgelehnt wurde, verstecke das Cookie-Fenster.
        if (!Cookies.attr('allow_cookies') || Cookies.attr('allow_cookies') == true) {
            $('#cookies').addClass('hidden');
        }
    }
    
    static rejectCookies() {
        Cookies.setAttr('allow_cookies', false)
        // Verstecke das Cookie-Fenster.
        $('#cookies').addClass('hidden');
    }
    
    static allowCookies() {
        Cookies.setAttr('allow_cookies', true)
        // Verstecke das Cookie-Fenster.
        $('#cookies').addClass('hidden');
    }
    
    static isLoggedIn() {
        // Falls in den Cookies Nutzerdaten gespeichert sind, gebe „true“ zurück.
        if (Cookies.attr('user')) { return true } else {
            return false;
        }
    }
}