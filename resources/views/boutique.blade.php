<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Mayer</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="{{URL::asset('css/frame/bootstrap.min.css')}}" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="{{URL::asset('css/boutique.css')}}">
    <link rel="stylesheet" type="text/css" href="{{URL::asset('css/frame/bootstrap4.css')}}">
    <link rel="stylesheet" href="{{URL::asset('css/frame/fontsgoogleapi.css')}}">
    <link rel="stylesheet" href="{{URL::asset('css/frame/googleIcon.css')}}">
</head>
<body>
 <div id="main">
     <app></app>
  </div>
</body>
    <script>
        window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
        ]) !!};
        window.user = {!! json_encode(
                    Auth::user()
                ) !!};
    </script>
    <script src="{{URL::asset('js/frame/jquery-3.1.1.min.js')}}"></script>
    <script src="//{{Request::getHost()}}:6001/socket.io/socket.io.js"></script>
    <script src="{{URL::asset('js/app.js')}}"></script>
    <script src="{{URL::asset('js/frame/bootstrap.min.js')}}"></script>
</html>
