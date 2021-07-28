

/*--------------------------------------------------------------
>>> ÜBERSICHT DER INHALTE
----------------------------------------------------------------
1. Module für Element
2. Module für Array und Objekte
--------------------------------------------------------------*/


/**
 *  Vergleiche zwei Objekte miteinander
 *  @returns {Boolean}
 */
Element.prototype.appendInnerHTML = function (html) {
    this.innerHTML += html;
}

/**
 *  Vergleiche zwei Objekte miteinander
 *  @returns {Boolean}
 */
Element.prototype.load = function (href) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", href, false);
    xmlhttp.send();
    this.innerHTML = xmlhttp.responseText;
    return this;
}




/*--------------------------------------------------------------
2. Module für Array und Objekte
--------------------------------------------------------------*/

/**
 *  Vergleiche zwei Objekte miteinander
 *  @returns {Boolean}
 */
Object.prototype.compare = function (object) {
    let currentKeys = Object.keys(this);
    return currentKeys.every((key) => {
        return this[key] == object[key];
    })
}

/**
 *  Lösche alle doppelten Objekt aus dem Array.
 *  @returns {Array}
 */
Array.prototype.unique = function () {
    var results = []
    this.forEach(object => {
        let ObjectExists = results.some(object1 => {
            return object.compare(object1)
        })
        if (!ObjectExists) {
            results.push(object);
        }
    })
    return results;
}

/** 
 *  Lösche ein Objekt aus dem Array mit mitgegebenem Index.
 *  @param {Number} index 
 *  @returns {Array}
*/
Array.prototype.remove = function (index) {
    this.splice(index, 1);
    return this;
}

/**  
 *  Unterteile das Array in Abschnitte mit mitgegeben Größe.
 *  @param {Number} size
 *  @returns {Array}
 */
Array.prototype.chunk = function (size) {
    var results = [];
    var index   = 0;
    var chunk   = [];
    this.forEach((object, i) => {
        index ++;
        chunk.push(object);
        if (index == size || i == this.length-1) {
            results.push(chunk);
            index = 0;
            chunk = [];
        }
    });
    return results
}

/**  
 *  Leere das Array von Objekten, wie „undefined“, „null“, „NaN“, 0 oder "".
 *  @returns {Array}
 */
Array.prototype.clean = function () {
    return his.filter(object => {
        return (object == undefined || object == null || object == NaN || object == 0 || object == "");
    });
}

/**  
 *  Filter Objekte raus, die nur in einem Array enthalten sind.
 *  @param {Array} array
 *  @returns {Array}
 */
 Array.prototype.difference = function (array) {
    var results = []
    this.forEach(object => {
        let exists = array.find(object1 => {
            return object1.compare(object)
        })
        if (!exists) {
            results.push(object)
        }
    })
    return results
}

/**  
 *  Filter Objekte raus, die nur in einem Array enthalten sind.
 *  @param {Array} array
 *  @returns {Array}
 */
 Array.prototype.differenceBoth = function (array) {
    var results = []
    this.forEach(object => {
        let exists = array.find(object1 => {
            return object1.compare(object)
        })
        if (!exists) {
            results.push(object)
        }
    });
    array.forEach(object => {
        let exists = this.find(object1 => {
            return object1.compare(object)
        })
        if (!exists) {
            results.push(object)
        }
    });
    return results
}

/**  
 *  Filter Objekte raus, die in beiden Array enthalten sind.
 *  @param {Array} array
 *  @returns {Array}
 */
 Array.prototype.same = function (array) {
    var results = []
    this.forEach(object => {
        let exists = array.find(object1 => {
            return object1.compare(object)
        })
        if (exists) {
            results.push(object)
        }
    })
    return results
}


jQuery.fn.some = function(fn, thisArg) {
    var result;
  
    for (var i=0, iLen = this.length; i<iLen; i++) {
  
      if (this.hasOwnProperty(i)) {
  
        if (typeof thisArg == 'undefined') {
          result = fn(this[i], i, this);
  
        } else {
          result = fn.call(thisArg, this[i], i, this);
        }
  
        if (result) return true;
      }  
    }
    return false;
}


  String.prototype.isEmpty = function() {
      return this == "";
  }