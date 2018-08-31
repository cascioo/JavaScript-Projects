function Cell(start_x, start_y, spacing, point_num,k,l){
  ellipseMode(CENTER);
  //console.log(k);
  if (k == 0){
    //console.log("top");
    this.x = (l*spacing) + start_x;
    this.y = (0*spacing) + start_y;
  }
  if (k == 1){
    //console.log("left");
    this.x = (square_size*spacing/4)+start_x;
    this.y = (l*spacing) + start_y;
  }
  if (k == 2){
    //console.log("bottom");
    this.x = (((square_size/4) - l)*spacing) + start_x;
    this.y = (square_size*spacing/4) + start_y;
  }
  if (k == 3){
    //console.log("right");
    this.x = (0*spacing) + start_x;
    this.y = (((square_size/4) - l)*spacing) + start_y;
  }
  this.show = function(){
    if (colorful){
      this.col = color(random(255),random(255),random(255));
    } else {
      this.col = 255
    }
    fill(this.col);
    ellipse(this.x,this.y,10,10);
  }

  this.connect = function(i,j,t){
    if (colorful){
      this.col = color(random(255),random(255),random(255));
    } else {
      this.col = 255
    }
     if (j == 1){
      if (i == 1){
        var x = points[0];
        var r = 2*dist(x.x,x.y,this.x,this.y);
        noFill();
        stroke(this.col);
        ellipse(this.x,this.y,r,r)
      } else if (i == 2){
        var x = points[0];
        var y = points[points.length/2-1];
        var r = (dist(this.x,this.y,x.x,x.y)+dist(this.x,this.y,y.x,y.y));
        noFill();
        stroke(this.col);
        ellipse(this.x,this.y,r,r)
      } else if (i == 3){
        var x = points[0];
        var y = points[floor(points.length/3)];
        var z = points[floor(2*points.length/3)];
        var r = 2*(dist(this.x,this.y,x.x,x.y)+dist(this.x,this.y,y.x,y.y)+dist(this.x,this.y,z.x,z.y))/3;
        noFill();
        stroke(this.col);
        ellipse(this.x,this.y,r,r)
      }
    } else if (j == 2) {
      //strokeWeight(.1);
      stroke(this.col);
      line(this.x,this.y,points[(t+i)%point_num].x,points[(t+i)%point_num].y)
    }
  }
}
