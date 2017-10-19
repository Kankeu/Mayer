  function search_abr($this){
    var input = $this;
    var val  = input.val();

    // Si rien est tapé, on affiche tout
    if(val == ''){
      $('#filter_retrouver li').show();
      return true;
    }

    // On construit l'expression à partir de ce qui est tapé (.*)e(.*)x(.*)e(.*)m(.*)p(.*)l(.*)e(.*)
    var regexp = '\\b(.*)';
    for(var i in val){
      if(val[i] !== ' '){
      regexp += '('+val[i]+')(.*)';
    }
    }
      regexp += '\\b';
    $('#filter_retrouver li').show();

    // On parcourt chaque élément de la liste
    $('#filter_retrouver').find('a>span').each(function(){
      var span = $(this);
      var resultats =  span.text().match(new RegExp(regexp,'i'));
      // le text match
      if(resultats){
        var string = '';
        for(var i in resultats){
          if(i > 0){
            if(i%2 == 0){
              string += '<span>'+resultats[i]+'</span>';
            }else{
              string += resultats[i];
            }
          }
        }
        span.empty().append(string);
      }else{
        span.parent().parent().hide();
      }
    })
  }
 function search_prp($this){
    var input = $this;
    var val  = input.val();

    // Si rien est tapé, on affiche tout
    if(val == ''){
      $('#filterprp li').show();
        $('#filterprp a span').attr('style','');
      return true;
    }

    // On construit l'expression à partir de ce qui est tapé (.*)e(.*)x(.*)e(.*)m(.*)p(.*)l(.*)e(.*)
    var regexp = '\\b(.*)';
    for(var i in val){
      if(val[i] !== ' '){
      regexp += '('+val[i]+')(.*)';
    }
    }
      regexp += '\\b';
    $('#filterprp li').show();
    $('#filterprp').find('a>span').each(function(){
      var span = $(this);
      var resultats =  span.text().match(new RegExp(regexp,'i'));
      if(resultats){
        var string = '';
        for(var i in resultats){
          if(i > 0){
            if(i%2 == 0){
              string += '<span>'+resultats[i]+'</span>';
            }else{
              string += resultats[i];
            }
          }
        }
        span.empty().append(string);
      }else{
        span.parent().parent().hide();
      }
    })
}