function playNote(note) {
  MIDI.noteOn(0, note, 100, 0); // 21 - 108
}

function dropThePiano() {
  console.log(band.join(""));
  document.getElementById("output").innerHTML = band.join("");

  // How to transform band into music
  //var state = listToInt(band);
  var state = band.filter(function(value) { return value == 1 }).length;
  

  playNote(21 + state);
  nextStep();
}

function playMusic() {
  console.log("Loaded");
  MIDI.setVolume(0, 127);

  window.setInterval(dropThePiano, 500);
}
