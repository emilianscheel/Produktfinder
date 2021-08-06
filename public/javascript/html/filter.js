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

        if (this.json['type'] == 'static') {

            item.text(this.json['title'])
            item.on('click', function () {
                Filter.addFilter(_this);
            })

        } else if (this.json['type'] == 'dynamic') {

            var slider = $('<input>')
            slider.attr('type', 'range')
            slider.attr('min', this.json['min'])
            slider.attr('max', this.json['max'])
            slider.val(this.json['min'])

            slider.on('input', function (event) {
                console.log($(this).val())
            })

            item.append(slider)
        }
        
        return item;
    }

    buildSelected() {
        let id = `${this.json['category']}---${this.json['title']}`.replace(' ', '_')

        var item = $('<li></li>')
        item.addClass('filter')
        item.attr('id', id)

        if (this.json['type'] == 'static') {

            var title = $('<a></a>')
            title.text(this.json['title'])

            var category = $('<a></a>')
            category.text(this.json['category'])

            item.append(title)
            item.append(category)

        } else if (this.json['type'] == 'dynamic') {

            var title = $('<a></a>')
            title.text(this.json['category'])

            var category = $('<a></a>')
            if (this.json['currency']) {
                category.text(`${this.json['min']} ${this.json['currency']} - ${this.json['max']} ${this.json['currency']}`)
            } else {
                category.text(this.json['min'] + '-' + this.json['max'])
            }
            

            item.append(title)
            item.append(category)
        }

        item.on('click', function() {
            Filter.removeFilter(id);
        });

        return item;
    }

    static addFilter(filter) {
        $('#selected-filter').append(filter.buildSelected());
        JSONCookie.append('selected-filter', filter['json']);
        Filter.reloadAll();
    }

    static removeFilter(filter) {
        $('#' + filter).remove();
        JSONCookie.remove('selected-filter', filter['json']);
        Filter.reloadAll();
    }

    static reloadAll() {
        window.location.reload();
        $('#filter-anzahl').text(`Anzahl: ${$('#filter-liste').children().length}`)
    }
}