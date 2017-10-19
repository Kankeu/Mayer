$(document).on('click','.exit',function (e) {
    e.preventDefault();
    var article_id = $(this).attr('article_id');
    var reponse_id = $(this).attr('reponse_id');
    $(this).siblings(".affcmt:first").find(".surroundcmt").attr("style","display:block");
    $(this).siblings(".affcmt:first").find(".surroundcmt[reponse_id="+reponse_id+"]").find(".parent").attr("style","display:block");
    window.localStorage.removeItem('repondrecmt'+article_id);
    $(this).remove();
});
$(document).on('keyup','.Zcomment',function (e) {
    e.preventDefault();
    if(e.keyCode === 13){
      sendcmt($(this));
    }
});
function reponsecmt($this) {
    var reponse_id = $this.attr('reponse_id');
    var article_id = $this.attr('article_id');
    var parent = $this.parents(".affcmt:first");
    window.localStorage.setItem("repondrecmt"+article_id,reponse_id);
    parent.find(".surroundcmt[reponse_id!="+reponse_id+"]").attr("style","display:none");
    parent.find(".surroundcmt[reponse_id="+reponse_id+"]").find(".parent").attr("style","display:none");
    parent.parents(".modulecmt:first").prepend("<button  article_id='"+article_id+"'  reponse_id='"+reponse_id+"'  style='z-index:100;position:absolute;color:red;font-size:17px;background:transparent;border:none;left:0;top:0'  class='exit btn glyphicon glyphicon-chevron-left'></button>");
    parent.parents('.modulecmt').find("textarea").focus();
}
  function sendcmt($this){
      $('#loader').show();
      var comment = $this.val().trim();
      if(comment !== "") {
          var article_id = $this.attr("article_id");
          var nom = $("#nomuser").text();
          var photo = $("#photo").attr('src');
          var repondrecmt = '<a class="pull-right" style="margin-right:10px;cursor:pointer;" class="repondrecmt">répondre </a>';
          var style = "margin-left: 0px;margin-right: 0px;max-height:100px";
          var repondre = window.localStorage.getItem('repondrecmt'+article_id);
          var reponse = null;
          var cmthtml =  cmthtml = '<div class="surroundcmt"><div style="' + style + ';margin-bottom:5px" class="parent"> <div style="background:#ddd;max-height: 150px;display:flex;word-wrap: break-word;margin-right: 10px;"> <div style="width: 50px;background:white"> <img src ="' + photo + '" style="width:50px;height:50px;margin-right:5px;background:white"> </div><div style="word-wrap: break-word;width: 200px;max-height: 150px;overflow-y: auto"> <i><strong>' + nom + '</strong></i> &nbsp;:<br>' + comment + '</div> </div> <span class="glyphicon glyphicon-thumbs-up tap-target btn"></span>' + repondrecmt + '</div></div>';
          $this.parents(".card:first").find(".cmtcount").text($this.parents(".card:first").find(".cmtcount").text()*1 + 1)
          if (repondre !== null) {
              repondrecmt = '';
              style = "margin-left: 20px;margin-right: 0px;max-height:100px";
              reponse = 0;
              cmthtml = '<div style="' + style + ';margin-bottom:20px"><blockquote><div style="background:#ddd;max-height: 150px;display:flex;word-wrap: break-word;margin-right: 10px;"> <div style="width: 50px;background:white"> <img src ="' + photo + '" style="width:50px;height:50px;margin-right:5px;background:white"> </div><div style="word-wrap: break-word;width: 200px;max-height: 150px;overflow-y: auto"> <i><strong>' + nom + '</strong></i> &nbsp;:<br>' + comment + '</div> </div> <span class="glyphicon glyphicon-thumbs-up tap-target btn"></span>' + repondrecmt + '</blockquote></div>';
          }
          if (reponse === 0) {
              $(".surroundcmt[reponse_id=" + repondre + "]").append(cmthtml);
          } else {
              $this.parents('.modulecmt:first').find('.affcmt').append(cmthtml);
          }
          $.ajax({
              type: "post",
              url: "../reponse/commentaire.php",
              data: {comment: comment, article_id: article_id, reponse_id: repondre},
              success: function (server_response) {
                    
              },
              complete: function () {
                  $("#loader").hide();
                  var commentaire = $this.parents('.modulecmt').find('.affcmt');
                  commentaire.animate({scrollTop: commentaire.prop('scrollHeight')}, 750);
                  $this.val("").height(0).css('overflow', 'hidden');
                  $this.focus();
                  var bipsound = document.getElementById("bipsound");
                  bipsound.play();
              }
          });
      }
  }
