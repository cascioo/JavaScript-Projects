var original = [];
var shuffled = [];
var transfer = [];
var radix_0 = [];
var radix_1 = [];
var radix = [];
var canvas_w = 1400;
var canvas_h = 750;
var rect_num = 2048;
var rect_w = canvas_w/rect_num;
var rect_h = canvas_h/rect_num;
var clicked = 0;
var temptransfer = [];
var steps = 0;
var hu;
function setup() {
  colorMode(HSB);
  (function(){
      var ConvertBase = function (num) {
          return {
              from : function (baseFrom) {
                  return {
                      to : function (baseTo) {
                          return parseInt(num, baseFrom).toString(baseTo);
                      }
                  };
              }
          };
      };
      ConvertBase.bin2dec = function (num) {
          return ConvertBase(num).from(2).to(10);
      };
      ConvertBase.dec2bin = function (num) {
          return ConvertBase(num).from(10).to(2);
      };
      this.ConvertBase = ConvertBase;
  })(this);
  createCanvas(canvas_w, canvas_h);
  background(0);
  noStroke();
  for (var i = 0; i < rect_num; i++) {
    var amount = int(ConvertBase.dec2bin(-i-1));
    original[i] = amount;
		shuffled[i] = amount;
  }
  reverse(original);
  for (var i = 0; i < rect_num; i++) {
    hu = map((-1*int(ConvertBase.bin2dec(original[i]))),0,rect_num,0,360);
    fill(hu,255,255)
    rect((i*rect_w),canvas_h,rect_w,(int(ConvertBase.bin2dec(original[i]))*rect_h));
  }
  shuffle(shuffled, true);
  for (var i = 0; i < rect_num; i++) {
    var amount = shuffled[i];
    transfer[i] = amount;
  }
  steps = ceil(log(-1*(int(ConvertBase.bin2dec(original[0]))))/log(2));
  for (var y = 0; y < steps; y ++){
    var count = 0;
    for (var x = 0; x < rect_num; x ++){
      var temp = transfer[x];
      if (((floor(temp/(pow(10,y)))) % 2) == 0) {
        splice(radix_0,temp,count);
      } else {
        splice(radix_1,temp,count);
      }
      count = count + 1;
    }
    transfer = concat(radix_0,radix_1);
    temptransfer[y+1] = transfer;
    temptransfer[0] = shuffled;
    radix_0 = [];
    radix_1 = [];
  }
}

function draw(){

    frameRate(1);
    background(0);
    for (var i = 0; i < original.length; i++) {
      hu = map((-1*int(ConvertBase.bin2dec(temptransfer[(clicked%(steps+1))][i]))),0,rect_num,360,0);
      fill(hu,255,255);
      rect((i*rect_w),canvas_h,rect_w,(int(ConvertBase.bin2dec(temptransfer[(clicked%(steps+1))][i]))*rect_h));
    }
    clicked++;

}
