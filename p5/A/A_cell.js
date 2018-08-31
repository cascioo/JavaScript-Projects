function Cell(i,j){
 this.i = i;
 this.j = j;
 this.g = 0;
 this.h = dist(this.i*w,this.j*w,width,height);
 this.barry = false;
 this.f = this.g+this.h;
 this.visited = false;

 this.checkNeighbors = function(){
   var neighbors = [];
   var top = grid[index(i,j-1)];
   var right = grid[index(i+1,j)];
   var bottom = grid[index(i,j+1)];
   var left = grid[index(i-1,j)];
   var top_right = grid[index(i+1,j-1)];
   var bottom_right = grid[index(i+1,j+1)];
   var top_left = grid[index(i-1,j-1)];
   var bottom_left = grid[index(i-1,j+1)];

   if (bottom_right && !bottom_right.visited && !this.barry){
     neighbors.push(bottom_right);
   }

   if (right && !right.visited && !this.barry){
     neighbors.push(right);
   }

   if (bottom && !bottom.visited && !this.barry){
     neighbors.push(bottom);
   }

   if (top_right && !top_right.visited && !this.barry){
     neighbors.push(top_right);
   }

   if (bottom_left && !bottom_left.visited && !this.barry){
     neighbors.push(bottom_left);
   }

   if (top && !top.visited && !this.barry){
     neighbors.push(top);
   }

   if (left && !left.visited && !this.barry){
     neighbors.push(left);
   }

   if (top_left && !top_left.visited && !this.barry){
     neighbors.push(top_left);
   }

     if (neighbors.length > 0){
       sort(neighbors);
     return neighbors[0];
   } else {
     return undefined;
   }
 }
 this.highlight = function(){
   var x = this.i*w;
   var y = this.j*w;
   noStroke();
   fill(0,0,255,100);
   rect(x,y,w,w);
 }
 this.show = function() {
   var x = this.i*w;
   var y = this.j*w;
   if (this.barry){
     noStroke();
     fill(0);
     rect(x,y,w-1,w-1);
   } else if (this.i == 0 && this.j == 0){
     noStroke();
     fill(0,255,0);
     rect(x,y,w-1,w-1);
   } else if (this.i == cols-1 && this.j == rows-1){
     noStroke();
     fill(255,0,0);
     rect(x,y,w-1,w-1);
   } else {
     noStroke();
     fill(255);
     rect(x,y,w-1,w-1);
   }
 }
 this.block = function(){
   if (random() < .2){
     this.barry = true;
   }
 }
 this.final = function(){
   var x = this.i*w;
   var y = this.j*w;
   noStroke();
   fill(255,255,0);
   rect(x,y,w-1,w-1);
 }
}
