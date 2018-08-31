
let col_num = 40;
let area;
let grid;
let a = 0;
function setup(){
  createCanvas(600,600, WEBGL);
  //colorMode(HSB);
  grid = new Array(col_num);
  for (let i = 0; i < col_num; i++){
    grid[i] = new Array(col_num);
  }
  for (let j = 0; j < col_num; j++){
    for (let i = 0; i < col_num; i++){
      grid[j][i] = new Array(col_num);
    }
  }
  for (let z = 0; z < col_num; z++){
    for (let y = 0; y < col_num; y++){
      for (let x = 0; x < col_num; x++){
        grid[z][y][x] = new Box(x-floor(col_num/2),y-floor(col_num/2),z-floor(col_num/2),col_num);
      }
    }
  }
  //area = new Box(0,0,0,100);
  console.log(grid);
}

function draw(){
  //ambientLight(255);
  ambientMaterial(150);
  background(0);
  noStroke();
  rotateX(-PI/8);
  rotateY(PI/4);
  directionalLight(150, -50, -50, 100, -100, 100);
  //sphere((width/4))
  //noFill();
  //translate(width/2,height/2)
  for (let z = 0; z < col_num; z++){
    for (let y = 0; y < col_num; y++){
      for (let x = 0; x < col_num; x++){
        grid[z][y][x].show();
      }
    }
  }
  a+= 0.005;
  //stroke(255);
  //strokeWeight(4);

}
Box = function(x,y,z,r){
  let spacing = width/(2*col_num)
  this.r = spacing;
  this.pos = createVector(x*spacing,y*spacing,z*spacing);
  this.state = (this.pos.x == 0 && this.pos.y == 0 && this.pos.z == 0) ? 1 : 0;

  this.show = function(){
    if(frameCount % 100 == 0){
      this.state = (random(1) < .01) ? 1 : 0;
    }
    if(this.state == 1){
      push();
      translate(this.pos.x,this.pos.y,this.pos.z);
      // strokeWeight(1);
      // noFill()
      // noStroke()
      // ambientMaterial(250);
      // if(this.state == 0){
      //   ambientMaterial(250);
      //   //fill(100,100,100);
      //   //stroke(100);
      // }
      box(this.r);
      pop();
    }
  }

}
