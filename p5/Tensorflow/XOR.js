let nn;
let model;
let xs, ys;
let resolution = 10,rows,cols;
let color = "HSB";
let sketch = false;
let train_xs;
let train_ys;

function setup(){
  createCanvas(700,700);
  colorMode(HSB);
  rows = height/resolution;
  cols = width/resolution;

  let inputs = [];
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let x1 = i / cols;
      let y1 = j / rows;
      inputs.push([x1, y1]);
    }
  }
  xs = tf.tensor2d(inputs);

  train_xs = tf.tensor2d([[0,0],[1,0],[0,1],[1,1]]);
  train_ys= tf.tensor2d([[0],[1],[1],[0]]);
  model = tf.sequential({
    layers: [tf.layers.dense({inputShape: [2],units: 4,activation: 'sigmoid'}),
             tf.layers.dense({units: 1,activation: 'sigmoid'})]
  });
  model.compile({
    optimizer: tf.train.adam(0.1),
    loss: 'meanSquaredError'

  })
}

async function trainModel(){
  return await model.fit(train_xs, train_ys, {
    shuffle: true,
    epochs: 1
  });
}
function draw(){

  tf.tidy(() => { trainModel().then(h => console.log(h.history.loss[0]))});
  tf.tidy(() => { ys = model.predict(xs).dataSync()});


  let index = 0;
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      noStroke();
      fill(ys[index]*255);
      rect(i*resolution,j*resolution,resolution,resolution);
      index++;
    }
  }
}
