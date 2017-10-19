$(document).ready(function(){
    var prevarticle = null;
    var n = 0;
 $('#search').on('keyup', function(e) {
        e.preventDefault();
        e.stopPropagation();
       var recherche = $(this).val().trim();
       var data;
       if(recherche.length === 0 || recherche.trim() == ""){
               if(prevarticle !== null) {
                   $("#first").html(prevarticle);
                   loadarticlejs();
               }
       }else {
               if (recherche.length > 0 && recherche !== "") {
                   divaff = "autocomplete";
                   data = 'motclef=' + recherche + '&type=' + 'prev';
                   searchreq(data, divaff);
               }
       }
 });
    function searchreq(data,divaff) {
        $.ajax({
            type : "GET",
            url : "../reponse/searchRes.php",
            data : data,
            success: function (server_response){
                if(n === 0){
                    prevarticle = $("#first").html().split('<script>')[0];
                    n = 1;
                }
                if(divaff === "autocomplete") {
                    $("#" + divaff + "").html(server_response);
                }else{
                    $("#" + divaff + "").html(server_response);
                    loadarticlejs();
                }
            },
            complete:function (resultat,statut,error) {
                $('#loader').hide()
            }
        });
    }
      $('#formsearch').on('submit', function(e) {
          e.preventDefault();
          e.stopPropagation();
          recherche = $(this).find('input').val().trim();
          if(!(recherche.length === 0 || recherche.trim() == "")){
              divaff = "first";
              data = 'motclef=' + recherche;
              searchreq(data, divaff);
          }
      });
});