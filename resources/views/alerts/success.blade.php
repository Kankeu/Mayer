@if(session("success"))
    <div class="alert alert-success pull-right alert-dismissable" style="position: fixed;right:10">
        <a href="" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <ul>
              @foreach(session("success") as $success)
                <li>{{$success}}</li>
              @endforeach
        </ul>
    </div>
@endif