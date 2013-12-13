function getWindowById(id) {
  for(var i in windows) {
    if(windows[i].id == id)
      return windows[i];
  }
  return null;
}

function myWindow(id) {
  this.id = id;

  this.interval = undefined;

  this.band = initBand();
  this.transType = "cumulative";

  this.cumulativeState = 0;

  // rule 150
  this.rule = {
    "110": "0",
    "101": "0",
    "100": "1",
    "011": "0",
    "010": "1",
    "001": "1",
    "000": "0",
    "111": "1"
  }

  this.html = createWindow(this.id, this.rule, this);

  this.next = function() {
    var me = getWindowById(id);
    caTranslator[me.transType](me);
    me.band = nextStep(me.band, me.rule);
    document.getElementById("output_" + me.id).innerHTML = me.band.join("");
  }
}

function setId(name, id) {
  return name + "_" + id;
}

function createWindow(id, ruleDict, me) {
  var w = document.createElement("div");
  var rule = document.createElement("div");
  var output = document.createElement("div");

  w.className = "window";
  output.id = setId("output", id);
  output.className = "center";
  output.innerHTML = "-";
  rule.className = "center";

  w.appendChild(rule);
  w.appendChild(output);

  // init rule definer
  var combs = ["000","001","010","100","110","011","101","111"];
  for(p in combs) {
    var inp = document.createElement("input");
    inp.type = "text";
    inp.id = setId(combs[p], id);
    inp.value = ruleDict[combs[p]];

    var spa = document.createElement("span");
    spa.innerHTML = combs[p] + ": ";

    rule.appendChild(spa);
    rule.appendChild(inp);
    rule.appendChild(document.createElement("br"));
  }
  var but = document.createElement("input");
  but.type = "button";
  but.value = "Update";
  but.addEventListener("click", function() {
    console.log("Updating rules for " + getWindowById(id).id);

    var eles = rule.getElementsByTagName("input");
    for(p in eles) {
      var cur = eles[p];
      if(cur.type == "text" && cur.id.indexOf(id) != -1) {
        getWindowById(id).rule[cur.id.split("_")[0]] = cur.value;
      }
    }

    console.log(getWindowById(id).rule);
  });
  rule.appendChild(but);

  // custom velocity
  var velo = document.createElement("input");
  velo.type = "text";
  velo.id = setId("velocity", id);
  velo.value = "700";
  rule.appendChild(velo);
  velo.addEventListener("change", function() {
    if(me.interval !== undefined) {
      window.clearInterval(me.interval);
      me.interval = window.setInterval(me.next, document.getElementById(setId("velocity", id)).value);
    }
  });

  // play/pause button
  var but2 = document.createElement("input");
  but2.type = "button";
  but2.value = "Play/Pause";
  but2.disabled = true;
  but2.id = setId("playpause", id);
  but2.addEventListener("click", function() {
    if(me.interval === undefined) {
      me.interval = window.setInterval(me.next, document.getElementById(setId("velocity", id)).value);
    } else {
      window.clearInterval(me.interval);
      me.interval = undefined;
    }
  });
  rule.appendChild(but2);

  rule.appendChild(document.createElement("br"));

  // select method
  var sel = document.createElement("select");
  sel.id = setId("method_select", id);
  for(var key in caTranslator) {
    var op = document.createElement("option");
    op.value = key;
    op.innerHTML = key;
    if(key == me.transType) {
      op.selected = true;
    }
    sel.appendChild(op);
  }
  rule.appendChild(sel);
  sel.addEventListener("change", function() {
    var type = document.getElementById(setId("method_select", id)).value;
    me.transType = type;
    console.log("Setting playback type to: " + type);
  });

  // edit mode
  output.addEventListener("dblclick", function() {
    if(me.interval !== undefined)
      return;

    var tmp = document.getElementById(setId("output", id)).innerHTML;
    var text = document.createElement("input");
    text.type = "text";
    text.value = tmp;
    text.size = tmp.length;

    text.addEventListener("change", function() {
      me.band = text.value.split("");
      document.getElementById(setId("output", id)).innerHTML = text.value;
    });

    document.getElementById(setId("output", id)).innerHTML = "";
    document.getElementById(setId("output", id)).appendChild(text);
  });

  return w;
}