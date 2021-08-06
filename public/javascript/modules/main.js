import { Backend } from "./backend.js";
import { JSONCookie } from "./cookies.js";
import { FilterKategorie } from "../html/filter.category.js";
import { Filter } from "../html/filter.js";
import { MenuFilterKategorie } from "../html/menu.filter.category.js";
import { MenuFilter } from "../html/menu.filter.js";
import { Produkt } from "../html/produkt.js";
import { Slider } from "../html/slider.js";



export async function ladeProdukte() {
    let query = new URLSearchParams(document.location.search)
    var produkte = await Backend.products(JSONCookie.attr('selected-filter'), query.get('text'), query.get('sort'));

    produkte.forEach(function (produkt) {
        $('#produkt-liste').append(new Produkt(produkt).build());
    });
}


/*--------------------------------------------------------------
3. Filter
--------------------------------------------------------------*/

export async function ladeFilter() {
    let query = new URLSearchParams(document.location.search)
    let produkte = await Backend.products(null, query.get('text'), query.get('sort'))
    let tags = Produkt.getTags(produkte).unique();
    $('#filter-liste').text('');
            
    tags.forEach((tag) => {
        if (tag['type'] == 'static') {
            // Erstelle einen neue Filter-Kategorie, falls nötig.
            if ($(`ul.sub-static-filter[category="${tag['category']}"]`).length == 0) {
                let kategorie = new FilterKategorie(tag);
                $('#statische-filter-liste').append(kategorie.build())
            }
            // Erstelle einen neuen Filter
            let filter = new Filter(tag);
            $(`ul.sub-static-filter[category="${tag['category']}"]`).append(filter.build())
            
        } else if (tag['type'] == 'dynamic') {

            // Kein Filter-Item mit der passenden Kategorie existiert.
            if ($(`li.filter-item[category="${tag['category']}"]`).length == 0) {
                let kategorie = new FilterKategorie(tag);
                $('#dynamische-filter-liste').append(kategorie.build())

            // Es existiert ein Filter-Item mit der passenden Kategorie.
            } else {

                for (var slider of $(`li.filter-item[category="${tag['category']}"] div.slider-container`)) {
                    if (parseInt($(slider).attr('min')) > parseInt(tag['min'])) {
                        $(slider).attr('min', tag['min']);
                        var thumbs = $(`div.slider-container[min="${tag['min']}"] input[type="range"]`)
                        for (var thumb of thumbs) {
                            $(thumb).attr('min', tag['min'])
                        }
                        $(thumbs[0]).attr('value', tag['min'])
                    }
                    if (parseInt($(slider).attr('max')) < parseInt(tag['max'])) {
                        $(slider).attr('max', tag['max']);
                        var thumbs = $(`div.slider-container[max="${tag['max']}"] input[type="range"]`)
                        for (var thumb of thumbs) {
                            $(thumb).attr('max', tag['max'])
                        }
                        $(thumbs[1]).attr('value', tag['max'])
                    }
                }
            }
        }
        
    });

    if (JSONCookie.attr('selected-filter')) {
        JSONCookie.attr('selected-filter').forEach((tag) => {
            let filter = new Filter(tag);
            $('#selected-filter').append(filter.buildSelected())
        })  
    }
} 

/*--------------------------------------------------------------
4. Kategorien
--------------------------------------------------------------*/

export async function ladeKategorien(text) {
    let query = new URLSearchParams(document.location.search)
    let produkte = await Backend.products(null, null, query.get('sort'))
    var tags = Produkt.getTags(produkte, text).unique();
    $('#kategorien-liste').text('');
            
    tags.forEach((tag) => {

        if (tag['type'] == 'dynamic') {
            return
        }

        if ($(`ul.sub-menu[category="${tag['category']}"]`).length == 0) {
            let kategorie = new MenuFilterKategorie(tag);
            $('#kategorien-liste').append(kategorie.build())
        }

        let filter = new MenuFilter(tag);
        $(`ul.sub-menu[category="${tag['category']}"]`).append(filter.build())
    });
}

/*--------------------------------------------------------------
5. Merkliste
--------------------------------------------------------------*/

export async function ladeMerkliste() {
    // Lade die Merkliste.
    let produkte = await Backend.fetchMerkliste();
    // Füge jedes Produkt hinzu.
    produkte.forEach(produkt => {
        $('#produkt-merkliste').append(new Produkt(produkt).build());
    });
}

export async function ladeEigeneProdukte() {   
    // Lade die Merkliste.
    let produkte = await Backend.fetchEigeneProdukte();
    // Füge jedes Produkt hinzu.
    produkte.forEach(produkt => {
        $('#eigene-produkte').append(new Produkt(produkt).build());
    });
}

/*--------------------------------------------------------------
6. Einstellungen
--------------------------------------------------------------*/

export function sortierung() {
    let attribute = $('#sort-select').val().split("--")[0]
    let direction = $('#sort-select').val().split("--")[1]
    return { "direction": direction, "attribute": attribute }
}
