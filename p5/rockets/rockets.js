let r = [];
let goal;
let p = [];
let batch = 1000;
let gen = 1;
let xOff = 0;
let best;
let types;
let barrier = [];
let reached = 0;
let noSol = false;
function setup(){
  angleMode(DEGREES);
  rectMode(CENTER);
  frameRate(60)
  colorMode(HSB);
  ellipseMode(CENTER);
  createCanvas(1400,700);
  goal = new Target(width-50,50,20,20);
  for(let i = 0; i < 8; i++){
    barrier[i] = new Barrier(random(100, width-100), random(100,height-100), 200, 200);
  }
  for(let i = 0; i < batch; i ++){
    r[i] = new Rocket(null, null, i%5);
  }
  best = r[0];


  setup1();
}

function draw(){

  background(0);
  goal.update();
  for (let i = 0; i < barrier.length; i++){
    barrier[i].update();
  }
  for (let i = 0; i < r.length; i++){
    r[i].update(i);
  }
  textSize(20);
  fill(255);
  text(reached, 10,20)
  text("Gen: " + gen, width - 100,height - 10);
  text("Best fitness:" + floor(best.fitness), width - 300, height -10);

  // for  (let i = 0; i < path.length; i ++){
  //   fill(120, 100, 100);
  //   rect(path[i].i * 10, path[i].j * 10 ,10,10)
  // }
}
Target = function(x,y,w,h){
  this.x = x;
  this.y = y;
  this.update = function(){
    fill(0,100,100);
    noStroke();
    push();
    translate(x,y);
    rect(0,0,w,h);
    pop();
  }
}
Barrier = function(x,y,w,h){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.update = function(){
    fill(255,100,100);
    rect(x,y,w,h);
  }
}
Rocket = function(p1,p2, type){
  this.type = type;
  this.fitness = 0;
  this.col = map(type,0,5,0,360);
  this.x = 50;
  this.crash = false;
  this.y = height-50;
  this.dir = new Array(200);
  this.ingoal = false;
  this.time = 100;
  this.gen = gen;
  if(!p1 && !p2){
    for(let i = 0; i < this.dir.length; i++){
      this.dir[i] = map(noise(xOff),0,1,-360,360);
      xOff+= .01;
    }
  } else {
    let mutate = this.type*10 + 1;
    for(let i = 0; i < this.dir.length; i ++){
      (random() < .5) ? this.dir[i] = p1.dir[i] + random(-mutate, mutate): this.dir[i] = p2.dir[i] + random(-mutate, mutate);
    }
    this.xOff = p1.xOff + random(-mutate, mutate);
  }

  this.fit = function(){
    let qewr = 100;
    let qewrindex = 0;
    for (let i = 0; i < path.length; i++){
      if(dist(this.x,this.y,path[i].j*10,path[i].i*10) < qewr){
        qewr = dist(this.x,this.y,path[i].j*10,path[i].i*10);
        qewrindex = i;
      }

    }
    //percent of line traveled / time taken
    let pol = qewrindex / path.length;
    this.fitness = qewrindex// / this.time)// * 100/dist(this.x,this.y,goal.x,goal.y);
  }

  this.update = function(q){
    let index = frameCount%r[0].dir.length;
    if (this.x + 10 > goal.x && this.x - 10 < goal.x && this.y + 10 > goal.y && this.y - 10 < goal.y && !this.ingoal){
      this.ingoal = true;
      this.time = frameCount%100;
      this.fit();
      console.log(r[q]);
      reached++;
      if(reached >= 100){
        noLoop();
      }
    }
    if(this.x < 0 || this.x > width || this.y < 0 || this.y > height){
      this.crash = true;
    }
    for(let i = 0; i < barrier.length; i++){
      if(this.x > barrier[i].x - barrier[i].w/2 && this.x < barrier[i].x + barrier[i].w/2 && this.y > barrier[i].y - barrier[i].h/2 && this.y < barrier[i].y + barrier[i].h/2){
        this.crash = true;
      }
    }
    fill(this.col,100,100);
    noStroke();
    if(this.goal){
      Stroke(120,100,100);
      StrokeWeight(8);
    }
    push();
    translate(this.x,this.y);
    rotate(this.dir[index]);
    rect(0,0,5,10);
    pop();
    if (!this.ingoal && !this.crash){
      this.x += 10*sin(this.dir[index]);
      this.y -= 10*cos(this.dir[index]);
    }
    if(index == r[0].dir.length-1){
      if (!this.ingoal){
        this.fit();
        if(this.crash) this.fit -= 1000;
      }
      if( q == r.length-1){
        gen++;
        evolve();
      }
    }
  }
}

evolve = function(){
  let temp = [];
  for (let i = 0; i < r.length; i++){
    temp[i] = r[i];
  }
  temp.sort((a,b) => b.fitness - a.fitness);

  best = temp[0];
  console.log(temp);
  let sum = 0;
  // for(let i = 0; i < batch/4; i++){
  //   sum += 1 / (i + 1)
  // }
  // for(let i = 0; i < batch; i++){
  //   temp[i].pChance = 100 * ((1 / (i+1) ) / sum);
  //   if(temp[i].pChance <= .5) temp[i].pChance = 1;
  // }
  let par = [];
  // for (let i = 0; i < batch * 2; i++){
  //   append(par, temp[0]);
  // }
  for (let i = 0; i < batch/2; i++){
      par.push(temp[i],batch/(2^(i+1)));
    }

  // for(let i = 0; i < batch ; i++){
  //   for (let y = 0; y < ceil(temp[i].pChance * 8); y++){
  //     append(par, temp[i]);
  //   }
  // }
  // append(par, par);
  // append(par, par);
  //console.log(par.length);
  par = shuffle(par);
  for(let i = 0; i < par.length; i += 2){
    //console.log("d");
    let temp = (i / 2) % 5;
    //let temp = par[i].type;
    r[i/2] = new Rocket(par[i],par[i+1],temp);
  }
}
