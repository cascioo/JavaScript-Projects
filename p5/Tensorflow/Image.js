let model;
let xs, ys;
let resolution = 20,rows,cols;
let color = "HSB";
let sketch = false;
let train_xs, test = [];
let train_ys;
let real_img;
let pix_img = [];
let tf_img = [];


function preload(){
  real_img = loadImage('mario.png');
}
function setup(){
  createCanvas(1400,700);
  real_img.loadPixels();
  rows = real_img.height/resolution;
  cols = real_img.width/resolution;
  let wholeImage = (4 * real_img.width * real_img.height);
  for (let i = 0; i < wholeImage; i += 4*resolution) {
    pix_img.push([real_img.pixels[i],real_img.pixels[i + 1],real_img.pixels[i + 2],real_img.pixels[i + 3]]);
  }
  for(let i = 0; i < pix_img.length; i++){
    let x = i * resolution % (cols * resolution);
    let y = i / rows % (rows * resolution);
    test.push([x,y]);
  }
  console.log(test);
  console.log(pix_img)

  xs = tf.tensor2d(test);

  train_xs = xs;
  train_ys= tf.tensor2d(pix_img);
  model = tf.sequential({
    layers: [tf.layers.dense({inputShape: [2],units: 4,activation: 'sigmoid'}),
             tf.layers.dense({units: 4,activation: 'sigmoid'})]
  });
  model.compile({
    optimizer: tf.train.adam(0.1),
    loss: 'meanSquaredError'

  })
}

async function trainModel(){
  return await model.fit(train_xs, train_ys, {
    shuffle: true,
    epochs: 100
  });
}
function draw(){

  tf.tidy(() => { trainModel().then(h => console.log(h.history.loss[0]))});
  tf.tidy(() => { ys = model.predict(xs).dataSync()});

  for(let i = 0; i < pix_img.length; i++){
    let x = i * resolution % (cols * resolution);
    let y = i / cols % (rows * resolution);
    noStroke();
    fill(pix_img[i]);
    rect(x,y,resolution,resolution);
  }
  for(let i = 0; i < tf_img.length; i++){
    let x = i * resolution % (cols * resolution);
    let y = i / rows % (rows * resolution);
    noStroke();
    fill(ys[i]);
    rect(x+225,y,resolution,resolution);
  }
}
