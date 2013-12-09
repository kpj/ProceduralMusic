var band = [];

// rule 150
var rule = {
  "111": "1",
  "110": "0",
  "101": "0",
  "100": "1",
  "011": "0",
  "010": "1",
  "001": "1",
  "000": "0"
};

// initializeband
var len = 87;
for(i = 0 ; i < len ; i++) {
  if(i == Math.floor(len/2))
    band.push("1");
  else
    band.push("0");
}

function getEle(i) {
  if(i < 0) {
    return band[band.length + i];
  } else if(i >= band.length) {
    return band[i - band.length];
  } else {
    return band[i];
  }
}

function nextStep() {
  next = []
  for(i = 0 ; i < band.length ; i++) {
    next.push(rule[getEle(i-1) + getEle(i) + getEle(i+1)]);
  }
  band = next;
}
