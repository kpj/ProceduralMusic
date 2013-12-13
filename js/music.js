function playNote(note) {
  MIDI.noteOn(0, note, 100, 0); // 21 - 108
}

// holds various methods to transform the band into music
var caTranslator = {
  "one_count": function(w) {
    var state = w.band.filter(function(value) { return value == 1 }).length;
    playNote(21 + state);
  },
  "cumulative": function(w) {
    w.cumulativeState = (w.cumulativeState + listToInt(w.band)) % 87;
    playNote(21 + w.cumulativeState);
  }
};

function playMusic() {
  console.log("Loaded");
  MIDI.setVolume(0, 127);

  for(var i in windows) {
    var w = windows[i];

    document.getElementById("playpause_" + w.id).disabled = false;
    document.getElementById("output_" + w.id).innerHTML = w.band.join("");
  }
}
