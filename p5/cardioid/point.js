function Point(radius, point_num, center_x, center_y){
  ellipseMode(CENTER);
  this.x = (center_x + radius * Math.cos(2 * Math.PI * i/point_num));
  this.y = (center_y + radius * Math.sin(2 * Math.PI * i/point_num));
  this.col;

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
        var r = 2*dist(this.x,this.y,x.x,x.y);
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
      //draw lines between the points
      stroke(this.col);
      line(this.x,this.y,points[(t+i)%point_num].x,points[(t+i)%point_num].y)
    }
  }
  this.col = color(random(255),random(255),random(255));

}
