import { JSONCookie } from "../modules/cookies.js";
import { uuidv4 } from "../modules/document.js";

export class Filter {

    constructor(json) {
        this.json = json;
    }

    build() {
        let id = uuidv4();
        let _this = this;

        var item = $('<li></li>')
        item.addClass('filter')
        item.attr('id', id)
        item.text(this.json['title'])

        item.on('click', function () {
            Filter.addFilter(_this);
        })
        return item;
    }

    buildSelected() {
        let id = `${this.json['category']}---${this.json['title']}`.replace(' ', '_')

        var item = $('<li></li>')
        item.addClass('filter')
        item.attr('id', id)

        var title = $('<a></a>')
        title.text(this.json['title'])

        var category = $('<a></a>')
        category.text(this.json['category'])

        item.append(title)
        item.append(category)

        item.on('click', function() {
            Filter.removeFilter(id);
        });
        return item;
    }

    static addFilter(filter) {
        $('#selected-filter').append(filter.buildSelected());
        JSONCookie.append('selected-filter', filter);
        Filter.reloadAll();
    }

    static removeFilter(filter) {
        $('#' + filter).remove();
        JSONCookie.remove('selected-filter', filter);
        Filter.reloadAll();
    }

    static reloadAll() {
        window.location.reload();
        $('#filter-anzahl').text(`Anzahl: ${$('#filter-liste').children().length}`)
    }
}