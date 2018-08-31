var original = [],shuffled = [];
var rect_num = 100;

function setup(){
  createCanvas(1500,750);
  for ( let i = 0; i < rect_num; i++){
    original[i] = i;
    shuffled[i] = i;
  }
  shuffle(shuffled);
}
function draw(){
  background(0);
  for (let i = 0; i < shuffled.length; i++){
    let temp = shuffled[i];
    if (shuffled[i] > shuffled[i+1]){
      shuffled[i] = shuffled[i+1];
      shuffled[i+1] = temp;
    }
  }
  for (let i = 0; i< rect_num; i++){
    fill(255);
    rect(i,height,10,shuffled[i]);
  }
}
