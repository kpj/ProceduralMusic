// init everything
var windows = [];
window.onload = function () {
  // load plugin
  MIDI.loadPlugin({
    soundfontUrl: "./api/soundfont/",
    instruments: Object.keys(instruments),
    callback: playMusic
  });

  // create windows
  for(var i = 0 ; i < 2 ; i++) {
    var w = new myWindow(i);
    windows.push(w);
    $("body").append(w.html);
  }

  // add window properties
  $(".window").draggable();
}
