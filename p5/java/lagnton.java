int dir;
int x, y;
PImage canvas;

void setup() {
  dir = 0;
  background(0);
  x = 200;
  y = 200;
  size(400, 400);
  //fullScreen();
  canvas = createImage(width, height, RGB);
  for (int q = 0; q < canvas.pixels.length; q ++) {
    if (random(100) < 99) {
      canvas.pixels[q] = color(0);
    } else {
      canvas.pixels[q] = color(255);
    }
  }
}
void draw() {
  fill(255, 0, 0);
  noStroke();
  rectMode(CENTER);
  for (int w = 0; w < 100; w++) {
    Move(x, y);
    image(canvas, 0, 0);
    rect(x, y, 5, 5);
  }
}
void turnRight() {
  dir++;
  if (dir == 4) {
    dir = 0;
  }
}
void turnLeft() {
  dir--;
  if (dir == -1) {
    dir = 3;
  }
}
void Move(int i, int j) {
  canvas.loadPixels();
  int index = i + j * canvas.width;
  if (canvas.pixels[index] == color(0)) {
    turnRight();
    canvas.pixels[index] = color(255);
  } else if (canvas.pixels[index] == color(255)) {
    turnLeft();
    canvas.pixels[index] = color(0);
  }
  if (dir == 0) {
    //up
    y--;
    if (y < 0) {
      y = height-1;
    }
  } else if (dir == 1) {
    //right
    x++;
    if (x >= width) {
      x = 0;
    }
  } else if (dir == 2) {
    //down
    y++;
    if (y >= height) {
      y = 0;
    }
  } else if (dir == 3) {
    //left
    x--;
    if (x < 0) {
      x = width-1;
    }
  }
  canvas.updatePixels();
}
