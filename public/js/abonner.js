function abonner($this){
  var reciever_id = $this.attr('reciever_id');
  $.ajax({
  	url:"../reponse/abonner.php",
  	type:"post",
  	data:{reciever_id:reciever_id},
  	success:function(server_reponse){
  		$this.toggleClass('btn-twitter glyphicon glyphicon-ok');
  		$this.text(server_reponse);
  }
  });
}
function confirmer($this,etat){
  var dmd_id = $this.attr('dmd_id');
  $.ajax({
  	url:"../reponse/abonner.php",
  	type:"post",
  	data:{dmd_id:dmd_id,etat:etat},
  	success:function(){
  		$this.addClass('btn-twitter glyphicon glyphicon-ok');
  		   $this.text("Abonné(e)");
  		   var li = document.getElementById($this.attr('dmd_id'));
  		   if(etat === 1 ){
  		   	$('[btn='+$this.attr('dmd_id')+']').remove();
       }else{
           li.remove();
       }
  	}
  });
}