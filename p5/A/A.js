var cols, rows;
var w = 20;
var grid = [];
var current;
var stack = [];
var path = [];
var obs_percent=.3;
function setup() {
 createCanvas(700,700);
 cols = floor(width/w);
 rows = floor(height/w);

 for (var j = 0; j < rows; j++){
   for (var i = 0; i < cols; i++){
     var cell = new Cell(i,j);
     grid.push(cell);
   }
 }
 current = grid[0];

 for (var i = 1; i < grid.length-1; i++){
   if (random() < obs_percent){
     grid[i].barry = true;
   }
 }

}
function draw(){
 //frameRate(10);
 background(0);
 for (var i = 0; i < grid.length; i++){
   grid[i].show();
 }
 current.visited = true;

 current.highlight();
 var next = current.checkNeighbors();
 if (current !== grid[(rows*cols)-1]){
   path.push(current);
   if (next) {
    next.visited = true;
    stack.push(current);
    current = next;
   } else if (stack.length > 0){
    current = stack.pop();
   }
 }
 for (var i = 0; i < path.length; i++){
   current.highlight();
   //path[i].final();
 }
 for (var x = 0; x<path.length; x++){
   for (var y = 0; y<path.length; y++){
     if (path[x] == path[y]){
       path.splice(x,y-x);
     }
   }
 }
 for (var x = 0; x<path.length; x++){
   path[x].final();
 }
}
function remove(array, element) {
    var index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
}
function index(i,j){
 if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1){
   return -1;
 }
 return i + j * cols;
}
