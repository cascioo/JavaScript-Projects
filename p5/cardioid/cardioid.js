var points = [];
var bumps = 1;
var point_num = 100;
var design = 1;
var mode = 2;
var colorful = true;
var show_circle = true;
var shape = "cardioid";
var temp = [];
var square_size = (point_num-1)*4;
var noloop = true;


function setup(){
  ellipseMode(CORNER);
  createCanvas(800,800);
  background(0);
  if (shape == "cardioid"){
    cardioid(height/4, point_num, width / 2, height / 2);
  } else if (shape == "square"){
    for (var i = 0; i < square_size; i++){
      points[i] = i;
    }
    square(width / (point_num*2), point_num, width/4, height/4);
  }
}
function square(spacing, point_num, start_x, start_y){
  for(i=0; i<points.length; i++){
    var q = floor(i / (square_size/4));
    //console.log(q);
    var w = i % (square_size/4);
    points[i] = new Cell(start_x, start_y, spacing, point_num,q,w);
  }
  return;
}
function cardioid(radius, point_num, center_x, center_y){
  for(i=0; i<point_num; i++){
    points[i] = new Point(radius, point_num, center_x, center_y);
  }
  return;
}

function draw(){
  if (shape == "cardioid"){
    if (mode == 2){
      design = 0;
    }
    frameRate(7)
    for(t=0; t<point_num; t++){
      points[t].connect(design,mode,t);
      if (show_circle){
        points[t].show();
      }
      if (mode == 2){
        design += bumps;
      }
    }
    if (noloop) {
      noLoop();
    }
  } else if (shape == "square"){
    if (mode == 2){
      design += bumps;
    }
    frameRate(7)
    for (var t = 0; t < points.length; t++) {
      if (show_circle){
        points[t].show();
      }
      points[t].connect(design,mode,t);
    }
    if (noloop) {
      noLoop();
    }
  }
}
