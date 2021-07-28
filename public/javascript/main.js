
/*--------------------------------------------------------------
>>> ÜBERSICHT DER INHALTE
----------------------------------------------------------------

--------------------------------------------------------------*/

import { Backend } from "./modules/api.js";
import { Cookies } from "./modules/cookies.js";
import { FilterKategorie } from "./modules/filter.category.js";
import { Filter } from "./modules/filter.js";
import { MenuFilterKategorie } from "./modules/menu.filter.category.js";
import { MenuFilter } from "./modules/menu.filter.js";
import { Produkt } from "./modules/produkt.js";



export async function ladeProdukte() {
    var produkte = await Backend.fetchProdukte(Cookies.attr('selected-filter'), Cookies.attr('searchtext'), sortierung());

    produkte.forEach(function (produkt) {
        $('#produkt-liste').append(new Produkt(produkt).build());
    });

    $('#produkt-anzahl').text(`Anzahl: ${$('#produkt-liste').children().length}`)
}




/*--------------------------------------------------------------
3. Filter
--------------------------------------------------------------*/

export async function ladeFilter() {
    let produkte = await Backend.fetchProdukte(null, null, sortierung())
    let tags = getTagsWith(produkte, kategorieSuchtext()).unique();
    $('#filter-liste').text('');
            
    tags.forEach((tag) => {
        const FilterIncluded = $('ul.tag-kategorie').some(function() {
            return $(this).attr('category') == tag['category'];
        });

        if (!FilterIncluded) {
            let kategorie = new FilterKategorie(tag['category']);
            $('#filter-liste').append(kategorie.build())
        }

        let filter = new Filter(tag);
        $(`ul.sub-filter[category="${tag['category']}"]`).append(filter.build())
    });

    // Lade die gespeicherten ausgewählten Filter.
    Cookies.attr('selected-filter').forEach((tag) => {
        let filter = new Filter(tag.json);
        $('#selected-filter').append(filter.buildSelected())
    })

    // Setze den Zähler für die Anzahl der ausgewählten Filter.
    $('#filter-anzahl').text(`Anzahl: ${$('#selected-filter').children().length}`)
} 

export function getTagsOf(produkte) {
    var tags = [];
    produkte.forEach((produkt) => {
        produkt['tags'].forEach((tag) => {
            tags.push(tag);
        })
    })
    return tags;
}

export function getTagsWith(produkte, suchtext) {
    var tags = getTagsOf(produkte);
    // Falls kein Suchtext gegeben wurde, gebe alle sog. Tags zurück.
    if (suchtext.isEmpty()) return tags;

    tags = tags.filter((tag) => {
        return tag['name'].toLowerCase().includes(suchText.toLowerCase()) || tag['category'].toLowerCase().includes(suchText.toLowerCase());
    });

    return tags;
}


/*--------------------------------------------------------------
4. Kategorien
--------------------------------------------------------------*/

export async function ladeKategorien() {
    let produkte = await Backend.fetchProdukte(null, null, sortierung())
    var tags = getTagsWith(produkte, kategorieSuchtext()).unique();
    $('#kategorien-liste').text('');
            
    tags.forEach((tag) => {
        const FilterIncluded = $('ul.sub-menu').some(function() {
            return $(this).attr('category') == tag['category'];
        });

        if (!FilterIncluded) {
            let kategorie = new MenuFilterKategorie(tag['category']);
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

export function ladeSuche() {
    $('#suche-produkte').val(Cookies.attr('searchtext'))
}

export function ladeSelectBoxen() {
    $('#attribute-count').val(Cookies.attr('attribute-count'))
    $('#sort-by').val(Cookies.attr('sort-by'))
}


/*--------------------------------------------------------------
6. Einstellungen
--------------------------------------------------------------*/

export function sortierung() {
    let attribute = $('#sort-by').val().split("--")[0]
    let direction = $('#sort-by').val().split("--")[1]
    return { "direction": direction, "attribute": attribute }
}

export function kategorieSuchtext() {
    return $('#suche-kategorien').val();
}