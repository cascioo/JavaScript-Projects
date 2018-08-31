Bullet = function(x,y,type){
  this.x = x;
  this.y = y;
  this.dir = atan2(mouseY - this.y, mouseX - this.x) + PI / 2;
  this.type = type;

  this.update = function(i){
    push();
    translate(this.x,this.y);
    fill(100,100,255);
    ellipse(0,0,10,10);
    pop();
    this.x += sin(this.dir)*10;
    this.y -= cos(this.dir)*10;
    if(this.x < 0  || this.x > width || this.y < 0 || this.y > height){
      bullets.splice(i,1);
    }
  }
}
