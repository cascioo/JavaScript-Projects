function heuristic(a,b){
  let d = dist(a.i,a.j,b.i,b.j);
  return d;
}


function removeFromArray(arr,elt){
   for (let i = arr.length-1; i >= 0; i--) {
     if (arr[i] == elt) {
       arr.splice(i,1);
     }
   }
}

let cols;
let rows;
let grid;
let openSet = [];
let closedSet = [];
let start;
let end;
let w = 10;
let h = w;
let path = [];
let current;

function isWithin(cx,cy,bx,by,bw,bh){
  if(cx > bx - .5*bw && cx < bx + .5*bw && cy < by + .5*bh && cy > by - .5*bh){
    return true;
  }
}

function Cell(i,j){
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false;

  this.addNeighbors = function(grid){
    let i = this.i;
    let j = this.j;
    if (i < cols - 1){
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
    // if (i > 0 && j > 0){
    //   this.neighbors.push(grid[i - 1][j - 1]);
    // }
    // if (i < cols - 1 && j > 0){
    //   this.neighbors.push(grid[i + 1][j - 1]);
    // }
    // if (i > 0 && j < rows - 1){
    //   this.neighbors.push(grid[i - 1][j + 1]);
    // }
    // if (i < cols - 1 && j < rows - 1){
    //   this.neighbors.push(grid[i + 1][j + 1]);
    // }
  }


}


function setup1(){
  cols = floor(width / w);
  rows = floor(height / h);
  grid = new Array(cols);
  for (i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }
  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i,j);
      for (let q = 0; q < barrier.length; q++){
        if (isWithin(i*10, j*10,barrier[q].x,barrier[q].y,barrier[q].w,barrier[q].h)) {
          grid[i][j].wall = true;
        }
      }
    }
  }
  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[5][floor((height-50) / 10)];
  end = grid[floor(goal.x/10)][floor(goal.y/10)];
  start.wall = false;
  end.wall = false;
  openSet.push(start);
  draw1();
}

function draw1(){
  let done = false;
  while(!done){

    if (openSet.length > 0) {

      let winner = 0;
      for (let i = 0; i < openSet.length; i++){
        if (openSet[i].f < openSet[winner].f){
          winner = i;
        }
      }

      current = openSet[winner];

      if (current === end){
        done = true;
        console.log("DONE");
      }


      removeFromArray(openSet, current);
      closedSet.push(current);

      let neighbors = current.neighbors;
      for (i = 0; i < neighbors.length; i ++){
        let neighbor = neighbors[i];

        if (!closedSet.includes(neighbor) && !neighbor.wall){
          let tempG = current.g + 1;



          let newPath = false;
          if (openSet.includes(neighbor)){
            if (tempG < neighbor.g){
              newPath = true;
              neighbor.g = tempG;
            }
          } else {
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }

          if (newPath){
            neighbor.h = heuristic(neighbor,end);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = current;
          }
        }
      }
    } else {
      noSol = true;
      done = true;
    }

    path = [];
    let temp = current;
    path.push(temp);
    while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
    }
  }
}
