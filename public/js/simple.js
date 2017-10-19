 
width = window.innerWidth;
height = window.innerHeight;
if(width<=400){
$("#titre").html("<input type='search' id='search' class='form-control' style='width:100%'>").show();
$("#formsearch").attr('style','display:none');
$("#photo").attr('style','display:none');
$("#loader").attr('style','display:none');
$("#first").attr('style','display: flex;flex-wrap: wrap;margin-top: 180px;');
}else{
$("#photomobile").attr('style','display:none');
$("#navbarmobile").attr('style','display:block');
$("#loadermobile").attr('style','display:none');
$("#nav").attr('style','');
$("#titre").attr('style','display:none');
}
var photo = window.localStorage.getItem('file');
var selectphoto = document.getElementById('divfile'); 
if(photo){
	selectphoto.src = photo;
}
else{
	selectphoto.src = "../img/img_par_default/default.jpg";
}
