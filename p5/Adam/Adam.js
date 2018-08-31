//I have it organized into several files, but this should work.

var m, ss;

function setup(){
  createCanvas(400,400);
  background(0);
  m = new menu;
  ss = new screens;
}

function draw(){
  background(0);
  show(m.components);
  update(m.components);
  show(ss.select());
  for(let z = 0; z < ss.fields.length; z++){
    update(ss.fields[z].components)
  }
}


function mouseReleased(){
  for(let i = 0; i < m.components.length; i++){
    if(m.components[i].class == "button" && checkMouse(m.components[i])){   //Menu buttons get their own screen...for now
      ss.cfnum = i;
    }
  }
}



function screens(){
  this.fields = Array(m.btnrow).fill().map(x => new screen);
  this.cfnum = 0;

  this.select = function(){
    return this.fields[this.cfnum].components
  }

  createBar(this.fields[1], 100, 100, 200, 40, 200, 100);
}


function screen(){
  this.components = [];
}



function menu(){
  this.components = [];
  this.btnrow = 5;
  for(let i = 0; i < this.btnrow; i++){
    let q = width * ( i / this.btnrow ) ;
    let w = 0 ;
    let e = width / this.btnrow ;
    if(i == this.btnrow - 1) e -= 1;
    let r = height / 6 ;
    createBtn(this, q, w, e, r, 135);
  }

}



createBtn = function(place, x, y, w, h, color){
  append(place.components, {class: "button", xpos: x, ypos: y, width: w, height: h, col: color});
}

createBar = function(place, x, y, w, h, color1, color2){
  append(place.components, {class: "bar", xpos: x, ypos: y, width: w, height: h, col1: color1, col2: color2, progress: 0, rate: 0.01});
}



show = function(compts){
  for(let i = 0; i < compts.length; i++){
    if(compts[i].class == "button"){
      fill(compts[i].col);
      rect(compts[i].xpos, compts[i].ypos, compts[i].width, compts[i].height);
    }

    if(compts[i].class == "bar"){
      fill(compts[i].col1);
      rect(compts[i].xpos, compts[i].ypos, compts[i].width, compts[i].height);
      fill(compts[i].col2);
      rect(compts[i].xpos + 5, compts[i].ypos + 5, (compts[i].width - 5) * compts[i].progress, compts[i].height - 10);
    }

  }
}


update = function(compts){
  for(let i = 0; i < compts.length; i++){
    if(compts[i].class == "button"){
      checkMouse(compts[i])  ?  compts[i].col = 200 : compts[i].col = 135;
    }

    if(compts[i].class == "bar"){
      compts[i].progress = (compts[i].progress + compts[i].rate) % 1
    }

  }
}


checkMouse = function(c){
  if(mouseX > c.xpos && mouseX < c.width + c.xpos && mouseY > c.ypos && mouseY < c.height + c.ypos){
    return true;
  } else {
    return false;
  }
}
