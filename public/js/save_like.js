$(document).on('click','.like',function (e){
    var img_id = $(this).attr('img_id');
    var name = $(this).attr('name');
    var prap = $(this).attr('class');
    var verif = prap.split(" ");
    var vote = null;
    for(i=0;i<=verif.length-1;i++){
        if(verif[i] === "switch-bg"){
            vote = verif[i];
        }
    }
    if(vote !== null){
        $(this).parents(".card:first").find(".likecount").text($(this).parents(".card:first").find(".likecount").text()*1 + 1);
    }else{$(this).parents(".card:first").find(".likecount").text($(this).parents(".card:first").find(".likecount").text()*1 - 1);}
    vote = "glyphicon-thumbs-up";
    uploadLike(name,img_id,vote);
});
function uploadLike(name,img_id,vote){
    $.ajax({
        type : "POST",
        url : "../reponse/like.php",
        data : {name:name,img_id:img_id,vote:vote},
        success: function (server_response){
           $('#like'+img_id+'').html(eval($('#like'+img_id+'').html()) + 1);
        }
    });
}
function prepanier($this){
    var etat = 0;
    var recieverid = $this.parents('.card').attr('userid');
    var name = panier;
    var img_id = $this.attr('img_id');
    var name = $this.attr('name');
    var prap = $this.attr('class');
    var verif = prap.split(" ");
    for(i=0;i<=verif.length-1;i++){
        if(verif[i] === "switch-bg"){
            etat = 1;
        }else{
            etat = 0;
        }
    }
    panier(name,img_id,etat,recieverid);
}
$('#commander').click(function (e){
    var name = "commander";
    commander(name);
});
function commander(name) {
  $.ajax({
      type : "POST",
      url : "../reponse/save_panier.php",
      data : {name:name},
      success: function (server_response){

      }
  });
}
function panier(name,img_id,etat,recieverid){
    $.ajax({
        type : "POST",
        url : "../reponse/save_panier.php",
        data : {name:name,etat:etat,img_id:img_id,recieverid:recieverid},
        success: function (server_response){

        }
    });
}