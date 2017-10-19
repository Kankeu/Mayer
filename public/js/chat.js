$(document).ready(function () {
    $("#search").focus();
});
$(document).on('submit','#formsearch',function(e){
  e.preventDefault();
});
 function autosize(){
      $('.normal').autosize();
      $('.animated').autosize({append: "\n"});
  }
  function submit_form($text) {
    $text.submit();
  }
  var socket = io.connect('http://localhost:1337');
  var token = window.localStorage.getItem('token');
$(document).on('submit','.tchat',function (e) {
    e.preventDefault();
    var $form = $(this);
    if($form.find('textarea').val().trim() !== "") {
        var formdata = new FormData($form[0]);
        var request = new XMLHttpRequest();
        request.upload.addEventListener('progress', function (e) {
            var percent = Math.round(e.loaded / e.total * 100);
            $form.find('.progress').attr('style', 'display:block;width:81.5%');
            $form.find('.progress-bar').width(percent + '%').html(percent + '%');
        });
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    socket.emit('msgsend', {
                        reciever_id: $form.find('input[name=sendid]').val(),
                        send_id: token,
                    });
                    var bipsound = document.getElementById("bipsound");
                    bipsound.play();
                }
            }
        }
        request.open('post', '../reponse/listenevent.php', false);
        request.send(formdata);
    }
        $form.find('textarea').val('').height(0).css('overflow', 'hidden');
        $form.find('textarea').focus();
});
socket.on('newmsg',function(user){
  if(user.reciever_id.trim() === token){
  refresh("#"+$("[Zchat="+user.send_id+"]").attr('id'),user.send_id);
}
if(user.send_id.trim() === token){
  refresh("#"+$("[Zchat="+user.reciever_id+"]").attr('id'),user.reciever_id);
}
});
  function refresh(namespace,reciever_id) {
      $.ajax({
          url : "../reponse/listenevent.php",
          type : "post",
          data: {reciever_id:reciever_id,namespace:namespace,action:"controllerchat.recupmsg"},
          success: function (server_reponse) {
              $(namespace).find('#viewmsg').append(server_reponse);
              elt = document.querySelectorAll(namespace+" #scrolldown");
              elt[0].scrollTop = elt[0].scrollHeight;
          }
      });
  }
  $('.viewmsg').remove();
$("#menu-close").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});
var interlocuteur = function(){
    this.id = 23;
    this.nom = "Dubernet";
    this.prenom = "jean";
    this.photo = "fean.jpg";
    modalid = "chat1"
    style = "position: fixed;left: 5px;top: 25px;width: 400px;height: 460px;";
    $('.chatmodal').each(function(){
        if($(this).attr('id') === "chat1"){
            modalid = "chat2";
            style = "position: fixed;left: 330px;top: 25px;width: 400px;height: 460px;";
        }
    })
    $('.chatmodal:hidden').each(function(index){
        if(index === 0){
            modalid = $(this).attr('id');
            style = "margin-right:200px";
        }
    })
    this.modal = '<div class="modal chatmodal fade move" id="'+modalid+'" Zchat="" data-toggle="click" data-target="toggle" data-placement="bottom" onmouseover="$(this).tooltip(\'show\');" title="double cliquer pour pouvoir deplacer la zone de chat et aussi pour la fixer!" style="'+style+'"  data-keyboard="false" data-backdrop="false"><div class="modal-dialog"><div class="modal-content" style="position:fixed;left: 25px;top: 25px;box-shadow: none;border-radius: 10px;width: 300px;height: 400px;"><div class="modal-header" style="background:#00aced;height: 42px;width: 298px;border-radius: 10px 10px 0px 0px"><a style="display: inline-flex;text-decoration: none;height: 40px;width: 100%;margin: 0"><figure style="top: 0px;left:0px;position: absolute"></figure>&nbsp;&nbsp;<h4 style="left:45px;position:absolute;top:2px;width: 100px"></h4><button class="dismissmodal close" onclick="dismissmodal($(this))" type="button" style="position: absolute;background: transparent;right:5px" data-dismiss="modal">X</button></a></div><div class="modal-body" style="height: 265px;"><div class="chat_box_wrapper chat_box_small chat_box_active" id="scrolldown" style="width: 283px;height: 265px;opacity: 1; display: block; transform: translateX(0px);"><div  id="viewmsg" class="chat_box touchscroll chat_box_colors_a" style="overflow-y: auto;overflow-x: hidden;"></div></div></div><div class="modal-footer" style="border:none"><form style="bottom:0;position:absolute;display:flex;width:300px;" class="tchat"><div style="height: 60px"><textarea name="nachricht" style="font-size: 18px;width:260px;max-height: 150px;overflow-x: hidden;bottom: 0;position: absolute" placeholder="message..." class="animated md-textarea emojiable-question"  onkeyup="if(event.keyCode === 13) {$(this).submit();}" onkeypress="autosize();" required></textarea></div><div><input type="hidden" name="sendid" value="0" style="display: none"><input type="hidden" style="display:none" name="action" value="controllerchat.savemsg"></div></div></form></div></div></div></div>';
}
var count = 0;
$('.lancerchat').on('click',function(event){
    event.preventDefault();
    person = new interlocuteur();
    if(count <= 1){
        $('body').append(person.modal);
            $('.emojiable-question').emojiPicker({
                width: '290px',
                height: '210px',
            });
    }
    $('.lancerchat').attr('data-target','');
    $('.chatmodal:hidden').each(function(index){
        $('.lancerchat').attr('data-target','#'+$(this).attr('id'));
    })
    $($(this).attr("data-target")).modal("show");
    $("#menu-close").click();
    $($(this).attr("data-target")).find('[name=sendid]').val($(this).attr('userid'));
    $($(this).attr("data-target")).attr("Zchat",$(this).attr('userid'));
    refresh($(this).attr('data-target'),$(this).attr('userid'));
    var zid = $(this).attr('data-target');
    $(zid).find('.modal-header figure').html($(this).find('img').clone().attr('style','width:40px;height:40px;float:left;').attr('class','img-circle'));
    $(zid).find('.modal-header').find('h4').html($(this).find('span').text());
})
function dismissmodal($this){
    var id = $this.parents('.modal:first').attr('id');
    $('.lancerchat').attr('data-target','#'+id);
}

