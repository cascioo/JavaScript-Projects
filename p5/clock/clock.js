function setup(){
  createCanvas(700,700);
  angleMode(DEGREES);
}
function draw(){
  push();
  translate(width/2,height/2);
  rotate(-90);
  background(0);
  strokeWeight(20);
  let sc = map(second(),0,60,0,359);
  let mn = map(minute(),0,60,0,359);
  let hr = map(hour(),0,12,0,359);
  stroke(255,0,0);
  fill(255,0,0);
  arc(0,0,width-100,width-100,0,sc, PIE);
  stroke(0,255,0);
  fill(0,255,0);
  arc(0,0,width-100-100,width-100-100,0,mn,PIE);
  stroke(0,0,255);
  fill(0,0,255);
  arc(0,0,width-100-200,width-100-200,0,hr,PIE);
  fill(0);
  ellipse(0,0,200,200);
  pop();
  fill(255,0,255);
  textSize(40);
  text(month() + "/" + day() + "/" + year(),width/2-90,height/2-20,100,100);
}
