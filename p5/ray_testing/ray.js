let increment = 10;
let b = [];
let speed;
let debug = true;
let goaldist;

function setup() {
  createCanvas(600,600);
  angleMode(DEGREES);
  for( let i = 0; i < 1; i++){
    b[i] = new Body(width/2, height/2, random(360));
  }



}

function draw() {
  background(0);
  for( let i = 0; i < b.length; i++){

    b[i].update();
  }
}

function Body(x,y,r){
  this.pos = createVector(x,y);
  this.rays = [];
  this.dists = [];
  this.angle = r;
  this.rays[0] = new Ray( this.pos, this.angle, true, null, 5);

  this.update = function(){
    fill(255);
    noStroke();
    ellipse(this.pos.x,this.pos.y,10,10);
    (debug) ? speed = 10 : speed = 30;

    for(y = 0; y < speed; y++){
      for(i = 0; i < this.rays.length; i++){
        this.rays[i].update();

        let temp = this.dead(i);
        if(temp){
          append(this.dists, createVector(temp[0], temp[1] % 360));
          if(!this.rays[i].origin){
            this.continue(i);
          } else {
            this.splitoff(i);
          }
        }
      }
    }
  }

    this.dead = function(i) {
      if( this.rays[i].dist >= 100){
        return [ this.rays[i].dist, this.rays[i].dir]
      } else {
        return null;
      }
    }

    this.splitoff = function(position){
      this.rays[this.rays.length] = new Ray(this.pos, this.rays[position].dir + increment, false, increment, this.rays[position].decay)
      this.rays[this.rays.length] = new Ray(this.pos, this.rays[position].dir + 360 - increment, false, 360 - increment, this.rays[position].decay)
      this.rays.splice(position, 1);
    }
    this.continue = function(position){
      if(this.rays[position].decay > 0){
        this.rays[this.rays.length] = new Ray(this.pos, this.rays[position].dir + this.rays[position].change, false, this.rays[position].change, this.rays[position].decay -1);
      } else {
        this.dists = [];
        this.pos.x += 5*cos(this.angle);
        this.pos.y += 5*sin(this.angle);
        this.xOff += 0.05;
        this.rays[0] = new Ray(this.pos, this.angle, true, null, 5);

      }
      this.rays.splice(position,1);

    }
  function Ray(posq, z, qwer, asdf, yui){
    this.pos = posq.copy()
    this.dir = z;
    this.start = posq.copy()
    this.dist = 0;
    this.origin = qwer;
    this.change = asdf;
    this.decay = yui;


    this.update = function(){
      push();
      translate(this.start.x,this.start.y)
      rotate(this.dir);
      if (debug){
        stroke(255);
        line(0,0,this.pos.x - this.start.x, this.pos.y - this.start.y);
      }
      pop();
      this.dist = dist(this.start.x, this.start.y, this.pos.x, this.pos.y)
      if( this.dist < 100){
        this.pos.x += 10;
      }
    }
  }
}
