// usable instruments with program number
var instruments = {
  "acoustic_grand_piano": 0,
  "acoustic_guitar_nylon": 24,
  "trumpet": 56,
  "flute": 73,
  "electric_bass_finger": 33
};

// plays note of given pitch
function playNote(note, w) {
  var channel = w.id;
  var instr = w.instrument;

  MIDI.programChange(channel, instruments[instr])
  MIDI.noteOn(channel, note, 100); // 21 - 108
}

// holds various methods to transform the band into music
var caTranslator = {
  "one_count": function(w) {
    var state = w.band.filter(function(value) { return value == 1 }).length;
    playNote(21 + state, w);
  },
  "cumulative": function(w) {
    w.cumulativeState = (w.cumulativeState + listToInt(w.band)) % 87;
    playNote(21 + w.cumulativeState, w);
  }
};

function playMusic() {
  MIDI.setVolume(0, 127);

  for(var i in windows) {
    var w = windows[i];
    if(w instanceof myWindow) {
      $("#playpause_" + w.id).attr("disabled", false);
      $("#output_" + w.id).html(w.band.join(""));
    }
  }
}
