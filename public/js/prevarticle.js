$(document).on('submit', '.modifarticle', function (e) {
        e.preventDefault();
        $form = $(this);
        editarticle($form);
        e.stopImmediatePropagation();
    });
    $(document).on('click', '.supparticle', function (e) {
        e.preventDefault()
        $("#loader").show();
        id = $(this).parents('.card:first').attr('card_id')
        $.ajax({
            url: "../reponse/modifarticle.php",
            type: "post",
            data: {id: id,action:"controllerarticles.supparticle"},
            success: function (server_response, statut) {
                $(this).parents('.card:first').remove();
            },
            complete: function (resultat, statut, error) {
                $('#loader').hide()
            }
        })
    });

    function success($form, reponse) {
        $form.find('[type=submit]').replaceWith('<button class="btn btn-success glyphicon glyphicon-ok" style="width: 70px"></button>');
        id = $form.find('[name=id]').val();
        $('[card_id=' + id + ']').replaceWith(reponse);
        imgfirst = $form.find('img').attr('src');
        $('[card_id=' + id + ']').find('a').find('img').attr('src', imgfirst);
    }

    function editarticle($form) {
        $('#loader').show();
        var formdata = new FormData($form[0]);
        var request = new XMLHttpRequest();
        request.upload.addEventListener('progress', function (e) {
            var percent = Math.round(e.loaded / e.total * 100);
            $form.find('.progress').attr('style', 'display:block;width:100%');
            $form.find('.progress-bar').width(percent + '%').html(percent + '%');
        });
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    success($form, request.response);
                }
                $("#loader").hide();
            }
        }
        request.open('post', '../reponse/modifarticle.php');
        request.send(formdata);
    }

    function modifarticle($this) {
        var form = "<form data-placement='left' class='modifarticle' style='z-index:2;margin-left:300px;margin-top:80px;position:absolute;width: 900px' onblur=\"$(this).tooltip('hide');\" ondblclick=\"if(confirm('Voullez vous vraiment supprimer cette ligne?')){$(this).tooltip('hide');$(this).remove();}\" onmouseover=\"$(this).tooltip('show');\" id='form' title='Double cliquer pour supprimer cette ligne!'><div class='progress progress-bar-striped active' style='width:81.5%;display:none'><div class='progress-bar progress-bar-success progress-bar-striped' style='width: 0%;'></div></div><div  style='display:flex;'><tr><th><label for='file' style='text-align:center;height: 150px;' class='btn btn-info'><br><br><br>photo</label><input type='file' id='file' name='photo_article' style='display:none' onchange='loadimg(event,$(this));' accept='image/*'><th><img id='divfile' style='width:200px;height:150px'></th></th><th><input style='width:200px;height:150px;font-size:15px' class='form-control' maxlength='15' placeholder='nom du produit...' name='nomduproduit' type='search' required></th></th><th><input type='search' placeholder='Prix...' style='width:200px;height:150px;font-size:15px' class='form-control' name='prix' required></th><th><textarea style='width:200px;height:150px;margin-top:0px;font-size:15px;background:white' placeholder='description du produit...' class='form-control' name='description'></textarea></th><th><input type='submit' class='btn btn-success' value='Modifier' style='height: 150px' name='publier'><input type='text' style='display:none' name='id'><input type='text' style='display:none' name='action' value='controllerarticles.modifarticles'></th></tr></div></form>";
        var parent = $this.parents('.card:first')
        parent.find('span:first').click();
        $('body').find('.zmarticle').remove();
        $('body').prepend('<div style="position:fixed;z-index: 2;width: 900px;" class="zmarticle">' + form + '</div>');
        $('#form').slideDown(500);
        var table = $('#form')
        nom = parent.find('.card__title').text().trim()
        description = parent.find('.readmore').text().trim()
        prix = parent.find('.prix').text()
        prix = prix.split(/:(.+)/)[1].trim()
        imgfirst = parent.find('a').find('img').attr('src');
        id = parent.attr('card_id');
        table.find('img').attr('src', imgfirst)
        table.find('[name=nomduproduit]').val(nom)
        table.find('[name=description]').val(description)
        table.find('[name=prix]').val(prix)
        table.find('[name=id]').val(id)
    }

    function loadimg(event, $this) {
        event.preventDefault();
        $this.siblings('img').attr('src', URL.createObjectURL(event.target.files[0]));
    }

$(document).on('dblclick','.card',function (event) {
        event.preventDefault();
        var indexprope = $(this).index()/2;
        var index =indexprope +(3-(indexprope%3));
        $('.card').eq(index-1).attr("style","background:red");
        if ($(this).next('.row-detail').hasClass('noview')) {
            $('.row-detail').addClass('noview');
            $('.row-detail').hide();
            $(this).next('.row-detail').slideDown(750, function () {
                $(this).removeClass('noview');
                $('html,body').animate({scrollTop: $(this).offset().top - 250}, 750);
            });

            for (var i = 1; i <= 4; i++) {
                $(this).next('.row-detail').find('.stagger' + i).css({
                    opacity: 0,
                    marginLeft: -20
                }).delay(300 + 300 * i).animate({opacity: 1, marginLeft: 0});
            }
        }
        else {
            $(this).next('.row-detail').slideUp(750, function () {
                $(this).addClass('noview');
            });
            $('html,body').animate({scrollTop: $(this).offset().top - 200}, 750);
        }
    });
    $(document).on('click','.closedetail',function (event) {
        event.preventDefault();
        $(this).parent('.row-detail').slideUp(750, function () {
            $(this).addClass('noview');
        });
        $('html,body').animate({scrollTop: $(this).parent('.row-detail').prevAll('.card:first').offset().top - 200}, 750);
    });