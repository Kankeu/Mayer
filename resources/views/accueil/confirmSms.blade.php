@extends("start")

@section("css")
    <link href="{{URL::asset('css/confirm.css')}}" rel="stylesheet" type="text/css">
@endsection

@section("content")
    <div class="container" id="container">
        @include("alerts/success")
        @include("alerts/errors")
            <div class="form-group">
                <label class="control-label" style="width: 200px;height: 200px" data-toggle="tooltip" data-placement="right" onmouseover="$(this).tooltip('show');" title="Vous pouvez choisir votre photo de profil en cliquant ici!" for="photo"><img class="img-circle" id="photo_preview" src="img/img_par_default/default.jpg"></label>
            </div>
        <button data-toggle="modal" data-target="#recupPs" class="btn btn-primary">continuer</button>
    </div>
    <div class="modal fade" id="recupPs">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">

                    <span class="close" type="button" data-dismiss="modal">X</span>
                    <h4>Confirmation de compte <span class="glyphicon glyphicon-user"></span></h4>
                </div>
                <div class="modal-body">
                    <form class="well" method="POST" enctype="multipart/form-data" action="{{route('confirm.index')}}">
                        <div class="form-group">
                            <label class="control-label" for="code">Code de confirmation(l'envoie du code vers votre mobile peut prendre quelques minutes)</label>
                            {{csrf_field()}}
                            <input type="file" id="photo" value="" onchange="loadFiles(event);" style="display: none;" name="photo">
                            <input id="code" name="code" type="text" placeholder="Code" required>
                        </div>
                        <div class="form-group">
                            <input class="btn btn-primary" value="envoyer" name="envoyer" type="submit">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div class="row">
                        <div class="col-lg-12" align="center"><a id="resendcode">Je n'ai pas de reçu le code de confirmation? </a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section("js")
    <script src="{{URL::asset('js/confirm.js')}}"></script>
@endsection