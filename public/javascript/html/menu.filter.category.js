import { FilterKategorie } from "./filter.category.js"

export class MenuFilterKategorie extends FilterKategorie {

    build() {
        var item = $('<li></li>')
        item.addClass('menu-item')

        var title = $('<a></a>')
        title.addClass('title')
        title.text(this.tag['category'])

        item.on('click', function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active')
            } else {
                $(this).addClass('active')
            }
            
        })
        var sub = $('<ul></ul>')
        sub.addClass('sub-menu')
        sub.attr('category', this.tag['category'])

        item.append(title)
        item.append(sub)

        return item;
    }
}