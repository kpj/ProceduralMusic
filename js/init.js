// init everything
var windows = [];
$(function () {

  var musicReady = false; 

  var musicPlay = function() {
    if(musicReady){
      playMusic(); 
    }
  }

  // load plugin
  MIDI.loadPlugin({
    soundfontUrl: "./api/soundfont/",
    instruments: Object.keys(instruments),
    callback: function() {
      console.log("Loaded");

      musicReady = true; 
      musicPlay(); 
    }
  });

  var addInstrument = function() {
    var i = windows.length; 
    var w = new myWindow(i);
    windows.push(w);
    $(w.html)
      .appendTo("body")
      .draggable(); 

    musicPlay(); // refresh music stuffs
  }

  // create menu
  var win = $("<div>")
    .addClass("options")
    .append(
      $("<div class='center'>")
      .text("Controls: ")
      .append(
        $("<button>").text("Add Instrument").click(function(){
          addInstrument(); 
          return false; 
        })
      )
    )
    .appendTo("body")

  for(var i=0;i<2;i++){
    addInstrument(); // add to instruments to start with
  }

});