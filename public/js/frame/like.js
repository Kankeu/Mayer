    interact('.tap-targe')
    .on('tap', function (event) {
    event.currentTarget.classList.toggle('switch-bg');
    event.preventDefault();
  });
    interact('.move')
.on('doubletap', function (event) {
        event.currentTarget.classList.toggle('draggable');
        event.preventDefault();
    });
   interact('.tap-target')
  .on('tap', function (event) {
    event.currentTarget.classList.toggle('switch-bg');
    event.preventDefault();
  })
  .on('doubletap', function (event) {
    event.currentTarget.classList.toggle('glyphicon-thumbs-up');
    event.currentTarget.classList.toggle('glyphicon-heart');
    event.currentTarget.classList.add('switch-bg');
    event.currentTarget.classList.toggle('rotate');
    event.preventDefault();
  })
  /*.on('hold', function (event) {
    event.currentTarget.classList.remove('glyphicon-heart');
    event.currentTarget.classList.toggle('glyphicon-thumbs-up');
    event.currentTarget.classList.toggle('rotate');
    event.currentTarget.classList.remove('large');
  });*/

