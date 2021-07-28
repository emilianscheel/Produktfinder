import { FilterKategorie } from "./filter.category.js"

export class MenuFilterKategorie extends FilterKategorie{

    build() {
        var item = $('<li></li>')
        item.addClass('menu-item')

        var title = $('<a></a>')
        title.addClass('title')
        title.text(this.title)

        item.on('click', function() {
            console.log('click')
            if ($(this).hasClass('active')) {
                $(this).removeClass('active')
            } else {
                $(this).addClass('active')
            }
            
        })

        var sub = $('<ul></ul>')
        sub.addClass('sub-menu')
        sub.attr('category', this.title)

        item.append(title)
        item.append(sub)

        return item;
    }
}