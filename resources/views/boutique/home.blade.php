@extends('boutique')

@section('content')
    <div class="container-fluid row">
        <div class="col-lg-2"></div>
        <div class="col-lg-8" id="articles">
           <articles></articles>
          <div id="loaderfooter">
        <hr></hr>
        <span class="loader loader-bars"></span>
       </div>
        </div>
        <div class="col-lg-2"></div>
    </div>
@endsection

@section('js')
    <script defer src="{{URL::asset('js/article.js')}}"></script>
@endsection