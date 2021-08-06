
function toggleMenu() {
    if ($("#menu").hasClass("open")) {
        // Entferne die Klasse „open“ vom Menü.
        $("#menu").removeClass("open")
        // Füge dem Overlay die Klasse „active“ hinzu.
        $('#overlay').removeClass("active")
      } else {
        // Füge dem Menü die Klasse „open“ hinzu.
        $("#menu").addClass("open")
        // Füge dem Overlay die Klasse „active“ hinzu.
        $('#overlay').addClass("active")
    }
}

function öffneTab(name) {
    $('.tab-content').css('display', 'none')
    $('#' + name).css('display', 'block')
}

function accordion(element) {
    if ($(element).hasClass('active')) {
        $(element).removeClass('active')
    } else {
        $(element).addClass('active')
    }
}