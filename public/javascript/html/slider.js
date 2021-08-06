import { Filter } from "./filter.js";


export class Slider {

    constructor(tag) {
        this.tag = tag;
        this.container = $('<div></div>')
        this.minSlider = $('<input>')
        this.maxSlider = $('<input>')
        this.minLabel = $('<a></a>')
        this.maxLabel = $('<a></a>')
        this.minGap = 0;
    }

    build() {
        var _this = this;

        this.container = $('<div></div>')
        this.container.addClass('slider-container')
        this.container.attr('min', this.tag['min'])
        this.container.attr('max', this.tag['max'])

        var values = $('<div></div>')
        values.addClass('slider-values-container')

        var inner = $('<div></div>')
        inner.addClass('slider-thumbs-container')
        
        var track = $('<div></div>')
        track.addClass('slider-track')
        
        // First Slider
        this.minSlider.attr('type', 'range')
        this.minSlider.attr('min', this.tag['min'])
        this.minSlider.attr('max', this.tag['max'])
        this.minSlider.attr('value', this.tag['min'])
        this.minSlider.on('input', function() {
            _this.updateFirstSlider(_this.maxSlider.val());
            _this.updateLabels();
        })

        // Second Slider
        this.maxSlider = $('<input>')
        this.maxSlider.attr('type', 'range')
        this.maxSlider.attr('min', this.tag['min'])
        this.maxSlider.attr('max', this.tag['max'])
        this.maxSlider.attr('value', this.tag['max'])
        this.maxSlider.on('input', function() {
            _this.updateSecondSlider(_this.minSlider.val());
            _this.updateLabels();
        })

        if (this.tag['step']) {
            this.minSlider.attr('step', this.tag['step'])
            this.maxSlider.attr('step', this.tag['step'])
        }

        // Labels
        this.minLabel.addClass('slider-value')
        this.minLabel.attr('placeholder', 'Minimum')
        this.minLabel.text(this.tag['min'])
        this.minLabel.on('input', function() {
            _this.updateFirstSlider($(this).val());
        })
    
        this.maxLabel.addClass('slider-value')
        this.maxLabel.attr('type', 'text')
        this.maxLabel.text(this.tag['max'])
        this.maxLabel.attr('placeholder', 'Maximum')
        this.maxLabel.on('input', function() {
            _this.updateSecondSlider($(this).val());
        })

        // Einheit, falls vorhanden
        if (this.tag['currency']) {
            this.minLabel.text(this.minLabel.text() + " " + this.tag['currency'])
            this.maxLabel.text(this.maxLabel.text() + " " + this.tag['currency'])
        }

        // Enter Button
        var button = $('<input>')
        button.addClass('slider-button')
        button.attr('type', 'button')
        button.attr('value', 'Hinzufügen')
        button.on('click', function() {
            Filter.addFilter(new Filter(_this.tag))
        })

        inner.append(track)
        inner.append(this.minSlider)
        inner.append(this.maxSlider)

        values.append(this.minLabel)
        values.append(this.maxLabel)
        values.append(button)

        this.container.append(values)
        this.container.append(inner)

        return this.container;
    }

    updateLabels() {
        this.maxLabel.text(parseInt(this.maxSlider.val()))
        this.minLabel.text(parseInt(this.minSlider.val()))
        this.container.attr('min', parseInt(this.minSlider.val()))
        this.container.attr('max', parseInt(this.maxSlider.val()))

        this.tag['min'] = parseInt(this.minSlider.val())
        this.tag['max'] = parseInt(this.maxSlider.val())

        if (this.tag['currency']) {
            this.minLabel.text(this.minLabel.text() + " " + this.tag['currency'])
            this.maxLabel.text(this.maxLabel.text() + " " + this.tag['currency'])
        }
    }

    updateFirstSlider(value) {
        if (parseInt(this.value) - parseInt(this.minSlider.val()) <= this.minGap) {
            this.minSlider.val(parseInt(value) - this.minGap)
        }
    }

    updateSecondSlider(value) {
        if (parseInt(this.maxSlider.val()) - parseInt(this.value) <= this.minGap) {
            this.maxSlider.val(parseInt(value) + this.minGap)
        }
    }
}
