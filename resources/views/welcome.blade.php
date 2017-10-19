<!DOCTYPE html>
<html lang="fr">
    <head>
        <title>Mayer</title>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
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
    </script>
    <script src="{{URL::asset('js/welcome.js')}}"></script>
</html>
