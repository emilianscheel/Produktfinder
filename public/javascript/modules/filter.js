import { Cookies } from "./cookies.js";
import { uuidv4 } from "./uuid.js"

export class Filter {

    constructor(json) {
        this.json = json;
    }

    build() {
        let id = uuidv4();
        let _this = this;

        var item = $('<li></li>')
        item.addClass('tag')
        item.attr('id', id)
        item.text(this.json['name'])

        item.on('click', function () {
            Filter.addFilter(_this);
        })
        return item;
    }

    buildSelected() {
        let id = `${this.json['category']}---${this.json['name']}`.replace(' ', '_')

        var item = $('<li></li>')
        item.addClass('tag')
        item.text(this.json['name'])
        item.attr('id', id)

        item.on('click', function() {
            Filter.removeFilter(id);
        });
        return item;
    }

    static addFilter(filter) {
        $('#selected-filter').append(filter.buildSelected());
        Cookies.append('selected-filter', filter);
        Filter.reloadAll();
    }

    static removeFilter(filter) {
        $('#' + filter).remove();
        Cookies.remove('selected-filter', filter);
        Filter.reloadAll();
    }

    static reloadAll() {
        window.location.reload();
        $('#filter-anzahl').text(`Anzahl: ${$('#filter-liste').children().length}`)
    }
}