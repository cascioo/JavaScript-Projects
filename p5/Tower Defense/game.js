let d = 20;
let tower = [];
let level;
let bullets = [];
let enemy = [];
//let path = new Path(level);
function setup(){
  createCanvas(600,600);
  rectMode(CENTER);
  tower[0] = new Tower(3,100,550,true);
  tower[1] = new Tower(4,200,550,true);
  tower[2] = new Tower(5,300,550,true);
  tower[3] = new Tower(6,400,550,true);
  tower[4] = new Tower(8,500,550,true);
  enemy[0] = new Enemy(20,20,8);
  path = new Path();
}

function draw(){
  if(mouseY > 500){
    cursor(HAND);
  } else {
    cursor(CROSS);
  }
  background(0);

  for (let i = 0; i < path.length; i++){
    for (let j = 0;  j < path.length; j++){
      push();
      rectMode(CORNER);
      fill(255);
      if(path[i][j] == 1){
        fill(100);
      }
      stroke(0);
      let space = path.length;
      rect(j*width/space,i*(height-100)/space,width/space,(height-100)/space);
      pop();
    }
  }

  fill(100);
  noStroke();
  rect(300,550,600,100)
  for(let i = 0; i < tower.length; i++){
    tower[i].update(i);
  }
  for(let i = 0; i < bullets.length; i++){
    bullets[i].update(i);
  }
  for(let i = 0; i < enemy.length; i++){
    enemy[i].update(i);
  }
}

function mousePressed(){
  for(let i = 0; i < 5; i++){
    if(isWithin(tower[i],mouseX,mouseY)){
      tower[tower.length] = new Tower(tower[i].type,mouseX,mouseY,false)
    }
  }
}
function mouseReleased(){
  for(let i = 0; i < tower.length; i++){
    if(i >= 5){
      if(i == tower.length-1 && !tower[tower.length-1].placed){
        if(mouseY > 500){
          tower.splice(tower.length-1,1);
        }
        for(let i = 5; i < tower.length-1; i++){
          if(isTowerWithin(tower[tower.length-1],tower[i])){
            tower.splice(tower.length-1,1);
          }
        }
      }
    }
  }
  tower[tower.length-1].placed = true;
}

isWithin = function(t,x,y){
  if(x < t.x + d && x > t.x - d && y < t.y + d && y > t.y - d){
    return true;
  } else {
    return false;
  }
}
isTowerWithin = function(t1,t2){
  if(t1.x < t2.x + 2*d && t1.x > t2.x - 2*d && t1.y < t2.y + 2*d && t1.y > t2.y - 2*d){
    return true;
  } else {
    return false;
  }
}
isHit = function(e,b){
  if(e.x - 30 < b.x + 5 && e.x + 30 > b.x - 5 && e.y - 15 < b.y + 5 && e.y + 15 > b.y - 5){
    return true;
  } else {
    return false;
  }
}
