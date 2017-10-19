$(document).on('focus','.field-input', function(){
    $(this).parent().addClass('is-focused has-label');
});

$('.field-input').each(function(){
    if($(this).val() != ''){
        $(this).parent().addClass('has-label');
    }
});

$(document).on('blur', '.field-input',function(){
    $parent = $(this).parent();
    if($(this).val() == ''){
        $parent.removeClass('has-label');
    }
    $parent.removeClass('is-focused');
});
$(document).on('click', '#keepnavbar li', function (event) {
    $('#keepnavbar li').removeClass('nav-active');
    $(this).addClass('nav-active');
})