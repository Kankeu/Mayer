$(document).on('submit','.form',function(e){
    e.preventDefault();
    $form = $(this);
    uploadImage($form);
});
function uploadImage($form){
    var formdata = new FormData($form[0]);
    var request = new XMLHttpRequest();
    request.upload.addEventListener('progress',function(e){
        var percent = Math.round(e.loaded/e.total*100);
        $form.find('.progress').attr('style','display:block;width:81.5%');
        $form.find('.progress-bar').width(percent+'%').html(percent+'%');
    });
    request.onreadystatechange =function(){
        if(request.readyState === 4){
            if(request.status === 200){
                $form.find('[type=submit]').replaceWith('<button class="btn btn-success glyphicon glyphicon-ok" style="width: 70px" type="button"></button>');
            }}}
    request.open('post','../reponse/save_articles.php');
    request.send(formdata);
}

  $("#creer").click(function(){
    var ln = $("#lignes").val();
    if(ln <= 100){
    var i = 1;
    $('#conf').html("<button class='btn btn-success' data-dismiss='modal' style='margin-right: 50px'>Annuler</button><button class='btn btn-danger'>Supprimer</button>");
    getln = window.localStorage.getItem('ln');
    if(getln !== null){
        ln = eval(getln) + eval(ln);
        i = eval(getln) + 1;
    }
    
    while(i<=ln){ 
    var formveu = "<form style='margin-bottom:10px' class='form' action='#'  data-placement='left' onblur=\"$(this).tooltip('hide');\" ondblclick=\"if(confirm('Voullez vous vraiment supprimer cette ligne?')){$(this).tooltip('hide');$(this).remove();}\" onmouseover=\"$(this).tooltip('show');\" id='from' onclick='alert(\"yy\");var dp = document.getElementById(\"from\"); alert(dp.('div').innerHTML);' title='Double cliquer pour supprimer cette ligne!'><div class='progress progress-bar-striped active' style='width:81.5%;display:none'><div class='progress-bar progress-bar-success progress-bar-striped' style='width: 0%;'></div></div><div  style='display:flex;'><tr><th><label for='file"+i+"' style='text-align:center' class='btn btn-info'>photo</label><input onchange='var class_carousel = $(this).attr(\"class_carousel\");var class_inner = $(this).attr(\"class_inner\");var nom = $(this).attr(\"nom_img\");Loadfile(nom,event,class_carousel,class_inner)' class_inner='carousel-inner"+i+"' class_carousel='carousel-example-generic"+i+"' type='file' id='file"+i+"' nom_img='divfile"+i+"' name='photo_article' style='display:none'  accept='image/*' required='required'><th><img id='divfile"+i+"' style='width:200px;height:150px'></th></th><th><input style='width:200px;height:150px;font-size:15px' class='form-control' maxlength='15' placeholder='nom du produit...' name='nomduproduit' type='search' required></th></th><th><input type='search' placeholder='Prix...' style='width:200px;height:150px;font-size:15px' class='form-control' name='prix' required></th><th><textarea style='width:200px;height:150px;margin-top:0px;font-size:15px;background:white' placeholder='description du produit...' class='form-control' name='description'></textarea></th><th><input type='submit' class='btn btn-success' value='Publier' name='publier'></th></tr></div></form>";
            
    $("#table").append(formveu).show();
    i++;
    window.localStorage.setItem('ln',ln);
}
    if(window.localStorage.getItem('ln')>1){
    $("#table").prepend('<button class="btn btn-danger" onclick=\'$("form").remove();\' style="left: 100px;top:68px;position:fixed;width:150px">Supprimer tout</button><input type="submit"   style="right: 100px;top:68px;position:fixed;width:100px" class="pull-left btn btn-success" id="envoyer" onmouseover="$(this).tooltip(\'show\');" title="Cliquer ici pour Publier vos articles une fois le formulaire remplit!" onclick="uploadAll();" name="publier" value="Publier tout">').show();
}
}else{
    $(".modal-body").html("<font color='red'>Votre nombre de lignes ne doit pas depasser 100!</font>").show();
    $('#suppression').click();
}
}); 
var Loadfile = function (nom,event,class_carousel,class_inner){
    var files = event.target.files;
    var prev = document.getElementById(nom);
    prev.src = URL.createObjectURL(event.target.files[0]);
}
function uploadAll(){
    $("form").each(function(index){
        if(index !== 0){
            $(this).find('[type=submit]').click();
            
        }
    });
}

            
             
              