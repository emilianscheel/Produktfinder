import { Filter } from "./filter.js";

export class Produkt {

    constructor(json) {
        this.json = json;
    }

    build() {
        var container = $('<li></li>')
        container.addClass('produkt')

        var imageContainer = $('<div></div>')
        imageContainer.addClass('wrapper')

        var img = $('<div></div>')
        img.addClass('produkt-bild')
        img.css('background-image', `url(${this.json['image_url']})`)

        imageContainer.append(img)

        var textContainer = $('<div></div>')
        textContainer.addClass('wrapper')

        var headline = $('<h1></h1>')

        var name = $('<a></a>')
        name.addClass('produkt-company')
        name.text(this.json['compandy_name'])
        name.attr('href', this.json['company_link'])

        var title = $('<a></a>')
        title.addClass('produkt-title')
        title.text(this.json['title'])
        title.attr('href', this.json['link'])

        headline.append(name)
        headline.append(title)

        var price = $('<h3></h3>')
        price.addClass('produkt-price')
        price.text(`${this.json['price']} ${this.json['currency']}`)

        // Tags
        let tags = this.json['configurations'][0]['tags']
        let tagContainer = $('<ul></ul>')
        tagContainer.addClass('produkt-tags')
                
        tags.forEach((tag) => {

            const FilterIncluded = tagContainer.children().some((item) => {
                return $(item).attr("category") == tag['category'];
            });

            if (!FilterIncluded) {

                var kategorie = $('<li></li>')
                kategorie.addClass('tag-item')
                kategorie.attr('category', tag['category'])

                var title = $('<a></a>')
                title.text(tag['category'])
                title.addClass('title')

                var sub = $('<ul></ul>') 
                sub.addClass('sub-tags')
                sub.addClass('hover')

                kategorie.append(title)
                kategorie.append(sub)
                tagContainer.append(kategorie)
            }

            var item = $('<li></li>')
            item.addClass('produkt-tag')
            item.text(tag['title'])
            
            item.on('click', function () {
                Filter.addFilter(new Filter(tag))
            })

            let category = tagContainer.children().filter(function (item) {
                return $(this).attr('category') == tag['category']
            })

            category.children().last().append(item)
        });

        textContainer.append(headline)
        textContainer.append(price)
        textContainer.append(tagContainer)

        container.append(imageContainer)
        container.append(textContainer)

        return container;
    }

    static reloadAll() {
        $('#produkt-anzahl').text(`Anzahl: ${$('#produkt-liste').children().length}`)
    }

    static getTagsOf(produkte) {
        var tags = [];
        produkte.forEach((produkt) => {
            produkt['configurations'].forEach((configuration) => {
                configuration['tags'].forEach((tag) => {
                    tags.push(tag);
                })
            })
        })
        return tags;
    }

    static getTags(produkte, text) {
        var tags = Produkt.getTagsOf(produkte);

        if (!text) return tags;        
    
        tags = tags.filter((tag) => {
            return tag['title'].toLowerCase().includes(text.toLowerCase()) || tag['category'].toLowerCase().includes(text.toLowerCase());
        });
        return tags;
    }
}