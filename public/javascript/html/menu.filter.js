import { Filter } from './filter.js';

export class MenuFilter extends Filter {

    build() {
        let _this = this;

        var item = $('<li></li>')
        item.addClass('menu-item')
        item.text(this.json['title'])

        item.on('click', function() {
            Filter.addFilter(_this);
        });
        return item;
    }
}