import { Slider } from "./slider.js";

export class FilterKategorie {

    constructor(tag) {
        this.tag = tag;
    }

    build() {
        var item = $('<li></li>')
        item.addClass('filter-item')

        var title = $('<a></a>')
        title.addClass('title')
        title.text(this.tag['category'])

        if (this.tag['type'] == 'static') {

            var sub = $('<ul></ul>')
            sub.attr('category', this.tag['category'])
            sub.addClass('sub-static-filter')

            title.on('click', function() {
                accordion(item)
            })

            item.append(title)
            item.append(sub)

        } else if (this.tag['type'] == 'dynamic') {

            item.attr('category', this.tag['category'])
            title.on('click', function() {
                accordion(item)
            })
            var slider = new Slider(this.tag)
    
            item.append(title)
            item.append(slider.build())
        }

        return item;
    }
}