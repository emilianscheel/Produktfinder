export class Cookie {

    static set(key, value, expires) {
        const d = new Date();
        d.setTime(d.getTime() + (expires*24*60*60*1000));
        expires = "expires=" + d.toUTCString();
        document.cookie = key + "=" + value + ";" + expires + ";";
    }

    static get(key) {
        let name = key + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }
}

export class JSONCookie extends Cookie {

    static get() {
        let json = super.get('json')
        if (json.isEmpty()) json = '{}';
        return JSON.parse(json);
    }

    static set(cookies) {
        super.set('json', JSON.stringify(cookies), 30);
    }

    static setAttr(key, value) {
        var cookies = JSONCookie.get();
        cookies[key] = value;
        JSONCookie.set(cookies);
    }

    static attr(key) {
        return JSONCookie.get()[key]
    }

    static append(key, value) {
        var cookies = JSONCookie.get();
        if (Array.isArray(cookies[key])) {
            cookies[key].push(value);
        } else {
            var list = [];
            list.push(value)
            cookies[key] = list;
        }
        JSONCookie.set(cookies)
    }

    static remove(key, value) {
        var cookies = JSONCookie.get();
        if (Array.isArray(cookies[key])) { 
            cookies[key].splice(cookies[key].indexOf(value), 1);
        }
        JSONCookie.set(cookies)
    }

    static checkCookies() {
        // Falls die Cookies schon angenommen oder abgelehnt wurde, verstecke das Cookie-Fenster.
        if (JSONCookie.attr('allow_cookies') == true) {
            $('#cookies').addClass('hidden');
        }
    }
    
    static rejectCookies() {
        JSONCookie.setAttr('allow_cookies', false)
        // Verstecke das Cookie-Fenster.
        $('#cookies').addClass('hidden');
    }
    
    static allowCookies() {
        JSONCookie.setAttr('allow_cookies', true)
        // Verstecke das Cookie-Fenster.
        $('#cookies').addClass('hidden');
    }
    
    static isLoggedIn() {
        // Falls in den Cookies Nutzerdaten gespeichert sind, gebe „true“ zurück.
        if (JSONCookie.attr('user')) { return true } else {
            return false;
        }
    }
}