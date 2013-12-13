// init everything
var windows = [];
window.onload = function () {
  // load plugin
  MIDI.loadPlugin({
    soundfontUrl: "./api/soundfont/",
    instrument: "acoustic_grand_piano",
    callback: playMusic
  });

  // create windows
  for(var i = 0 ; i < 2 ; i++) {
    var w = new myWindow(i);
    windows.push(w);
    document.body.appendChild(w.html);
  }

  // add window properties
  $(".window").draggable();
}
