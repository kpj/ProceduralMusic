function initBand() {
  var band = [];
  var len = 87;
  for(i = 0 ; i < len ; i++) {
    if(i == Math.floor(len/2))
      band.push("1");
    else
      band.push("0");
  }
  return band;
}

function getEle(i, band) {
  if(i < 0) {
    return band[band.length + i];
  } else if(i >= band.length) {
    return band[i - band.length];
  } else {
    return band[i];
  }
}

function nextStep(band, rule) {
  var next = [];
  for(i = 0 ; i < band.length ; i++) {
    next.push(rule[getEle(i-1, band) + getEle(i, band) + getEle(i+1, band)]);
  }
  return next;
}
