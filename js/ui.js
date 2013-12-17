function getWindowById(id) {
  //for(var i in windows) { //do not do this; i will be a string!
  for(var i=0;i<windows.length;i++){
    if(windows[i] instanceof myWindow && windows[i].id == id)
      return windows[i];
  }
  return null;
}

function myWindow(id) {
  this.id = id; // also used as MIDI-channel

  this.interval = undefined;

  this.band = initBand();

  this.transType = "cumulative";
  this.instrument = "acoustic_grand_piano";

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
}

myWindow.prototype.next = function() {
    var me = getWindowById(this.id);
    caTranslator[me.transType](me);
    me.band = nextStep(me.band, me.rule);
    $("#" + setId("output", me.id)).html(me.band.join(""));
}

myWindow.prototype.close = function(){

  if(typeof this.interval != "undefined"){ //shitcur for checking undefined
    window.clearInterval(this.interval);
    this.interval = undefined; 
  }
  var id = this.id; 
  console.log("["+id+"] - Deleting "); 

  for(var i=0;i<windows.length;i++){

    if(windows[i] instanceof myWindow && windows[i].id == id){
      $(windows[i].html).remove(); //remove html from page
      windows[i] = undefined; //delete this window
      return; 
    }
  }

}

function setId(name, id) {
  return name + "_" + id;
}

function createWindow(id, ruleDict, me) {
  var w = document.createElement("div");
  var rule = document.createElement("div");
  var output = document.createElement("div");

  $(w)
    .addClass("window")
    .append(rule)
    .append(output);
  $(output)
    .attr("id", setId("output", id))
    .addClass("center")
    .html("-");
  $(rule).addClass("center");

  //remove button
  $(rule).append(
    $("<button>")
    .text("Remove Instrument")
    .click(function(){
      windows[id].close(); 
      return false; 
    }), 
    document.createElement("br")
  ); 

  // instrument selection
  var isel = document.createElement("select");
  $(isel).attr("id", setId("instrument_select", id));
  for(var key in instruments) {
    var op = document.createElement("option");
    $(op)
      .val(key)
      .html(key);
    if(key == me.instrument) {
      $(op).attr("selected", true);
    }
    $(isel).append(op);
  }
  $(rule).append(isel);
  $(isel).on("change", function() {
    var type = $("#" + setId("instrument_select", id)).val();
    me.instrument = type;
    console.log("[" + getWindowById(id).id + "] - Setting instrument to: " + type);
  });

  $(rule).append(document.createElement("br"));

  // init rule definer
  var combs = ["000","001","010","100","110","011","101","111"];
  for(p in combs) {
    var inp = document.createElement("input");
    $(inp)
      .attr("type", "text")
      .attr("id", setId(combs[p], id))
      .attr("value", ruleDict[combs[p]]);

    var spa = document.createElement("span");
    $(spa).html(combs[p] + ": ");

    $(rule)
      .append(spa)
      .append(inp)
      .append(document.createElement("br"));
  }
  var but = document.createElement("input");
  $(but)
    .attr("type", "button")
    .val("Update")
    .on("click", function() {
      console.log("[" + getWindowById(id).id + "] - Updating rules");

      $("input").each(function() {
        if($(this).attr("type") == "text" && $(this).attr("id").split("_")[1] == id) {
          getWindowById(id).rule[$(this).attr("id").split("_")[0]] = $(this).val();
        }
      });

      console.log(getWindowById(id).rule);
    });
  $(rule).append(but);

  // custom velocity
  var velo = document.createElement("input");
  $(velo)
    .attr("type", "text")
    .attr("id", setId("velocity", id))
    .val("700")
    .on("change", function() {
      if(me.interval !== undefined) {
        window.clearInterval(me.interval);
        me.interval = window.setInterval(function() { me.next() }, document.getElementById(setId("velocity", id)).value);
      }
    });
  $(rule).append(velo);

  // play/pause button
  var but2 = document.createElement("input");
  $(but2)
    .attr("type", "button")
    .val("Play/Pause")
    .attr("disabled", true)
    .attr("id", setId("playpause", id))
    .on("click", function() {
      if(me.interval === undefined) {
        me.interval = window.setInterval(function() { me.next() }, document.getElementById(setId("velocity", id)).value);
      } else {
        window.clearInterval(me.interval);
        me.interval = undefined;
      }
    });
  $(rule).append(but2);

  $(rule).append(document.createElement("br"));

  // select method
  var sel = document.createElement("select");
  $(sel).attr("id", setId("method_select", id));
  for(var key in caTranslator) {
    var op = document.createElement("option");
    $(op)
      .val(key)
      .html(key);
    if(key == me.transType) {
      $(op).attr("selected", true);
    }
    $(sel).append(op);
  }
  $(rule).append(sel);
  $(sel).on("change", function() {
    var type = $("#" + setId("method_select", id)).val();
    me.transType = type;
    console.log("[" + getWindowById(id).id + "] - Setting playback type to: " + type);
  });

  // edit mode
  $(output).on("dblclick", function() {
    if(me.interval !== undefined)
      return;

    var tmp = $("#" + setId("output", id)).html();
    var text = document.createElement("input");
    $(text)
      .attr("type", "text")
      .val(tmp)
      .attr("size", tmp.length);

    $(text).on("change", function() {
      me.band = text.value.split("");
      $("#" + setId("output", id)).html(text.value);
    });

    $("#" + setId("output", id)).html("");
    $("#" + setId("output", id)).append(text);
  });

  return w;
}