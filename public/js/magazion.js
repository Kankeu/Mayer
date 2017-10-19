$('#table').on('dblclick','.formChamp',function (event) {
    event.preventDefault();
    var index = $('.formChamp').index($(this));
    $("#messagedeconfirmation").find('#accepter').attr('index',index);
    $('#messagedeconfirmation').modal();
});
let ligne= "<div><form data-placement='left' class='formChamp' title='Double cliquer pour supprimer cette ligne!'> <div class='progress progress-bar-striped active'><div class='progress-bar progress-bar-success progress-bar-striped'></div></div><div class='inputSurround'><label class='btn btn-info'><br><br><br>photo(s)<input type='file' name='photos' accept='image/*' multiple='multiple'></label><img><input class='form-control' maxlength='15' placeholder='nom du produit...' name='nom' type='search' required><input type='search' placeholder='Prix...' class='form-control' name='prix' required><textarea placeholder='description du produit...' class='form-control' name='description'></textarea><input type='submit' class='btn btn-success' value='Publier' name='publier'></div></form></div>";
$(document).on('submit','.formCreerChamp',function (event) {
    event.preventDefault();
    let nombre = ($(this).find('.inputCreerChamp').val() > 100) ? 100 : $(this).find('.inputCreerChamp').val();
    for(i=1;i<=nombre;i++)
    {
        $('#table').append(ligne);
    }
    var forms = $('#table').find('form').length;
    if(forms>1)
    {
       $('.Gbtn').css('visibility', 'visible');
    }
});

$(document).on('click','#accepter',function (event) {
    event.preventDefault();
    $('.formChamp').eq($(this).attr('index')).slideUp(500,function () {
        $(this).remove();
        var forms = $('#table').find('form').length;
        if(forms<2)
        {
            $('.Gbtn').css('visibility', 'hidden');
        }
    });
});
$(document).on('change','[name=photos]',function (event) {
   var img = $(this).parents('form').find('img');
   img.attr('src',URL.createObjectURL(event.target.files[0]));
});
$(document).on('click','.effacer',function (event) {
    event.preventDefault();
    $('#table').empty();
});
$(document).on('submit','.formChamp',function (event) {
   event.preventDefault();
   sendArticles($(this));
});
$(document).on('click','.publier',function (event) {
    event.preventDefault();
    $('.formChamp [type=submit]').each(function () {
        $(this).click();
    });
});
function sendArticles($form){
    var formdata = new FormData($form[0]);
    var request = new XMLHttpRequest();
    request.upload.addEventListener('progress',function(e){
        var percent = Math.round(e.loaded/e.total*100);
        $form.find('.progress').attr('style','display:block;width:83%');
        $form.find('.progress-bar').width(percent+'%').html(percent+'%');
    });
    request.onreadystatechange = function(){
        if(request.readyState === 4){
            if(request.status === 200){
                console.log(request.response);
                $form.find('[type=submit]').replaceWith('<button class="btn btn-success glyphicon glyphicon-ok" style="width: 70px" type="button"></button>');
            }}}
    request.open('post','/boutique/articles');
    request.setRequestHeader('X-CSRF-TOKEN', window.Laravel.csrfToken);
    request.send(formdata);
}
