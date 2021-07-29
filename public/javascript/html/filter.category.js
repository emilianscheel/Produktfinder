export class FilterKategorie {

    constructor(title) {
        this.title = title;
    }

    build() {
        var item = $('<li></li>')
        item.addClass('filter-item')

        var title = $('<a></a>')
        title.addClass('title')
        title.text(this.title)

        var sub = $('<ul></ul>')
        sub.attr('category', this.title)
        sub.addClass('sub-filter')

        item.on('click', function() {
            accordion(this)
        })

        item.append(title)
        item.append(sub)

        return item;
    }
}