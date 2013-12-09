function playNote(note) {
  MIDI.noteOn(0, note, 100, 0); // 21 - 108
}

var cumulativeState = 0;
function dropThePiano() {
  console.log(band.join(""));
  document.getElementById("output").innerHTML = band.join("");

  // How to transform band into music
  cumulativeState = (cumulativeState + listToInt(band)) % 87;
  playNote(21 + cumulativeState);
  /*var state = band.filter(function(value) { return value == 1 }).length;
  playNote(21 + state);*/

  nextStep();
}

function playMusic() {
  console.log("Loaded");
  MIDI.setVolume(0, 127);

  document.getElementById("playpause").disabled = false;
  document.getElementById("output").innerHTML = band.join("");
}
