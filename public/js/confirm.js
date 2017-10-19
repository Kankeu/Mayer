function loadFiles(event) {
    var photo = document.getElementById('photo_preview');
    photo.src = window.URL.createObjectURL(event.target.files[0]);
};