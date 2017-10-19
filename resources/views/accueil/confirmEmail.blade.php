@extends("start")

@section("css")
    <link href="{{URL::asset('css/confirm.css')}}" rel="stylesheet" type="text/css">
@endsection

@section("content")
    <div class="container" id="container">
        @include("alerts/success")
        @include("alerts/errors")
        <form method="POST" action="{{route('confirmation.terminer')}}" id="confirmation" style="width: 100%" enctype="multipart/form-data">
    <div class="form-group">
        <label class="control-label" style="width: 200px;height: 200px" data-toggle="tooltip" data-placement="right" onmouseover="$(this).tooltip('show');" title="Vous pouvez choisir votre photo de profil en cliquant ici!" for="photo"><img class="img-circle" id="photo_preview" src="{{URL::asset('img/img_par_default/default.jpg')}}"></label>
    </div>
    <input type="file" id="photo" value="" onchange="loadFiles(event);" style="display: none;" name="photo">
    {{csrf_field()}}
            <input type="submit" name="Terminer" value="Terminer" class="btn btn-primary">
    </form>
    </div>
@endsection

@section("js")
<script src="{{URL::asset('js/confirm.js')}}"></script>
@endsection