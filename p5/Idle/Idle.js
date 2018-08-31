let score = 0;
let b = [];
function setup(){
  createCanvas(700,700);
  b[0] = new Button(0, 1)
}

function draw(){
  background(0);
  for(let x = 0; x < b.length; x++){
    b[x].update();
  }
  fill(255);
  textSize(32);
  text(score, width - 50,height - 10);
}


Button = function(stage, level){
  this.x = 100*stage;
  this.y = 0;
  this.level = level;
  this.highlight = false;
  this.current;
  this.clicked = false;
  this.update = function(){
    this.highlight = false;
    if (mouseX < this.x + 100 && mouseX > this.x && mouseY < 100){
      this.highlight = true;
    }
    fill(100);
    if (this.highlight){
      fill(125);
    }
    rect(this.x,this.y,100,100);
    if (this.clicked){
      let w = (millis() - this.current)/(10*this.level);
      fill(200);
      noStroke();
      rect(this.x,this.y,w,100);
      if(w > 99){
        this.clicked = false;
        score += this.level;
      }
    }
    if(score > 9){
      b[b.length] = new Button(b.length, b.length*2);
      score -= 10;
    }
  }
}


function mouseClicked(){
  for (let x = 0; x < b.length; x++){
    if (b[x].highlight){
      b[x].clicked = true;
      b[x].current = millis();
    }
  }
}
