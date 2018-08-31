Enemy = function(x,y,type){
  this.x = x;
  this.y = y;
  this.health = type;
  let right = true;

  this.update = function(i){
    fill(170,60,45);
    noStroke();
    ellipse(this.x,this.y,30,30);

    if(this.x+)
    // if(right){
    //   if(this.x < width - 30){
    //     this.x += 5;
    //   } else {
    //     this.y += 5;
    //     right = false;
    //   }
    // } else {
    //   if(this.x > 30){
    //     this.x -= 5;
    //   } else {
    //     this.y += 5;
    //     right = true;
    //   }
    // }

    for(let j = 0; j < bullets.length; j++){
      if(isHit(this,bullets[j])){
        this.health--;
        bullets.splice(j,1);
        if(this.health == 0){
          enemy.splice(i,1);
        }
      }
    }
  }
}
