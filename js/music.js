function playNote(note) {
  MIDI.noteOn(0, note, 100, 0); // 21 - 108
}

// holds various methods to transform the band into music
var cumulativeState = 0;
var transType = "cumulative";
var caTranslator = {
  "one_count": function(b) {
    var state = b.filter(function(value) { return value == 1 }).length;
    playNote(21 + state);
  },
  "cumulative": function(b) {
    cumulativeState = (cumulativeState + listToInt(band)) % 87;
    playNote(21 + cumulativeState);
  }
};

function dropThePiano() {
  console.log(band.join(""));
  document.getElementById("output").innerHTML = band.join("");

  caTranslator[transType](band);

  nextStep();
}

function playMusic() {
  console.log("Loaded");
  MIDI.setVolume(0, 127);

  document.getElementById("playpause").disabled = false;
  document.getElementById("output").innerHTML = band.join("");
}
