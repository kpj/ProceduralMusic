// some variables
var playerInterval = undefined;

// init everything
window.onload = function () {
  // load plugin
  MIDI.loadPlugin({
    soundfontUrl: "./api/soundfont/",
    instrument: "acoustic_grand_piano",
    callback: playMusic
  });

  // init rule definer
  var combs = ["000","001","010","100","110","011","101","111"];
  for(p in combs) {
    var inp = document.createElement("input");
    inp.type = "text";
    inp.id = combs[p];
    inp.value = rule[combs[p]];

    var spa = document.createElement("span");
    spa.innerHTML = combs[p] + ": ";

    document.getElementById("rule").appendChild(spa);
    document.getElementById("rule").appendChild(inp);
    document.getElementById("rule").appendChild(document.createElement("br"));
  }
  var but = document.createElement("input");
  but.type = "button";
  but.value = "Update";
  but.addEventListener("click", function() {
    console.log("Updating rules");

    var eles = document.getElementById("rule").getElementsByTagName("input");
    for(p in eles) {
      var cur = eles[p];
      if(cur.type == "text") {
        rule[cur.id] = cur.value;
      }
    }

    console.log(rule);
  });
  document.getElementById("rule").appendChild(but);

  // custom velocity
  var velo = document.createElement("input");
  velo.type = "text";
  velo.id = "velocity";
  velo.value = "700";
  document.getElementById("rule").appendChild(velo);
  velo.addEventListener("change", function() {
    if(playerInterval !== undefined) {
      window.clearInterval(playerInterval);
      playerInterval = window.setInterval(dropThePiano, document.getElementById("velocity").value);
    }
  });

  // play/pause button
  var but2 = document.createElement("input");
  but2.type = "button";
  but2.value = "Play/Pause";
  but2.disabled = true;
  but2.id = "playpause";
  but2.addEventListener("click", function() {
    if(playerInterval === undefined) {
      playerInterval = window.setInterval(dropThePiano, document.getElementById("velocity").value);
    } else {
      window.clearInterval(playerInterval);
      playerInterval = undefined;
    }
  });
  document.getElementById("rule").appendChild(but2);

  document.getElementById("rule").appendChild(document.createElement("br"));

  // select method
  var sel = document.createElement("select");
  sel.id = "method_select";
  for(var key in caTranslator) {
    var op = document.createElement("option");
    op.value = key;
    op.innerHTML = key;
    if(key == transType) {
      op.selected = true;
    }
    sel.appendChild(op);
  }
  document.getElementById("rule").appendChild(sel);
  document.getElementById("method_select").addEventListener("change", function() {
    var type = document.getElementById("method_select").value;
    transType = type;
    console.log("Setting playback type to: " + type);
  });
}