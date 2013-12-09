function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function listToInt(list) {
  // assume origin to be in middle
  var origin = Math.floor(list.length / 2);
  
  var binNum = "";
  var dist = 0;

  while(dist < origin) {
    // favour right
    binNum += list[origin + dist];
    binNum += list[origin - dist];
    
    dist++;
  }
  return parseInt(binNum, 2);
}
