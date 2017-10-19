(function ($) {

    $('#date').pickadate({
        closeOnselect: true,
        selectMonths: true,
        selectYears: 80,
        min: new Date(1960, 1, 1),
        max: new Date(2015,12,1)
    });
})(jQuery);
