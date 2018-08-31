Tower = function(type,x,y,placed){
  this.x = x;
  this.y = y;
  this.type = type;
  this.placed = placed;

  this.update = function(i){
    if(i >= 5){
      fill(0,0,255);
      if(i == tower.length-1 && !this.placed){
        fill(255,0,0);
        if(this.y < 500){
          fill(0,255,0);
        }
        for(let i = 5; i < tower.length-1; i++){
          if(isTowerWithin(this,tower[i])){
            fill(255,0,0);
          }
        }
      }
    } else if(i < 5){
      noFill();
      if(isWithin(tower[i],mouseX,mouseY)){
        fill(255);
      }
      stroke(255);
    }
    if(!this.placed){
      this.x = mouseX;
      this.y = mouseY;
    }
    if(this.type == 3){
      push();
      beginShape();
      translate(this.x,this.y);
      vertex(0,-d);
      vertex(d*sin(PI/3),d*cos(PI/3));
      vertex(-d*sin(PI/3),d*cos(PI/3));
      endShape(CLOSE);
      pop();
    } else if(this.type == 4){
      push();
      beginShape();
      translate(this.x,this.y);
      vertex(sqrt(d*10),sqrt(d*10));
      vertex(-sqrt(d*10),sqrt(d*10));
      vertex(-sqrt(d*10),-sqrt(d*10));
      vertex(sqrt(d*10),-sqrt(d*10));
      endShape(CLOSE);
      pop();
    } else if(this.type == 5){
      push();
      beginShape()
      translate(this.x,this.y);
      let c_1 = cos((TWO_PI)/5);
      let c_2	=	cos(PI/5);
      let s_1	=	sin((TWO_PI)/5);
      let s_2	=	sin((2*TWO_PI)/5);
      vertex(0,-d);
      vertex(s_1*d,-c_1*d);
      vertex(s_2*d,c_2*d);
      vertex(-s_2*d,c_2*d);
      vertex(-s_1*d,-c_1*d);
      endShape(CLOSE);
      pop();
    } else if(this.type == 6){
      push();
      beginShape();
      translate(this.x,this.y);
      vertex(d,0);
      vertex(d*sin(PI/6),d*cos(PI/6));
      vertex(-d*sin(PI/6),d*cos(PI/6));
      vertex(-d,0);
      vertex(-d*sin(PI/6),-d*cos(PI/6));
      vertex(d*sin(PI/6),-d*cos(PI/6));
      endShape(CLOSE);
      pop();
    } else if(this.type == 8){
      push();
      beginShape();
      translate(this.x,this.y);
      rotate(PI/8);
      vertex(d,0);
      vertex(sqrt(d*10),sqrt(d*10));
      vertex(0,d);
      vertex(-sqrt(d*10),sqrt(d*10));
      vertex(-d,0)
      vertex(-sqrt(d*10),-sqrt(d*10));
      vertex(0,-d)
      vertex(sqrt(d*10),-sqrt(d*10));
      endShape(CLOSE);
      pop();
    }
    if(this.placed && i > 4){
      if(frameCount%(this.type*10) == 0){
        bullets[bullets.length] = new Bullet(this.x,this.y,this.type);
      }
    }
  }
}
