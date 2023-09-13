interact();

var c = new Car((width/2), 200, 3);
var dir = 0;

var testing = false;

var training = true;

let positions = [
  {
    x:(width/2),
    y:200,
    r:0,
    m:"c"
  },
  {
    x:(width/2)+400,
    y:300,
    r:90,
    m:"c"
  },
  {
    x:(width/2)-400,
    y:300,
    r:-90,
    m:"c"
  },
  {
    x:(width/2),
    y:200,
    r:180,
    m:"cc"
  },
  {
    x:(width/2)+400,
    y:300,
    r:-90,
    m:"cc"
  },

  {
    x:(width/2)-400,
    y:300,
    r:90,
    m:"cc"
  }
]

let test = false;

let chosenPosition = Math.floor(Math.random()*positions.length)

function updateQuestion(){
  if(positions[chosenPosition].m == "c"){
    $('#question').html("Question: If the car is moving clockwise around the track, what should it do here? (Answer Below)");
  }else{
    $('#question').html("Question: If the car is moving counter-clockwise around the track, what should it do here? (Answer Below)");
  }
}

function randomizeCarPos(){
  chosenPosition = Math.floor(Math.random()*positions.length);
  placeCar();
}

function placeCar(){
  c.pos = new Vector((positions[chosenPosition].x), (positions[chosenPosition].y));
  c.dir = (positions[chosenPosition].r)
}

function setup(){
  placeCar();
}

function trainCar(){
  randomizeCarPos();
  placeCar();
  test = false;
}

function testCar(){
  c.pos = new Vector(50, 55);
  c.dir = 0;
  test = true;
}

function draw(){
  background(0,128,0)
  if(!test){
    trainingTrack();
  }else{
    testingTrack();
  }
  //testingTrack();
  c.display();
  //c.show();
  if(test){
    c.think();
    c.update();
  }
  c.reset();//*/
  c.loop(50, 55);
  //c.steer(dir)
  //if(!pressed){
    //dir = 0;
  //}
  //pressed = false;
  updateQuestion();
}

function keyPressed(key){
  pressed = true;
  if(key.code == "ArrowRight"){
    dir = 1;
  }else if(key.code == "ArrowLeft"){
    dir = -1;
  }
}

function keyReleased(){
  pressed = false;
}

function mousePressed(){
  console.log(mouse.y)
}

$('#apply').click(function(){
  let size;
  let speed;
  let inputs;
  if($('#type').val()==1){
    size = 10;
    speed = 3;
    inputs = 3;
  }else if($('#type').val()==2){
    size = 15;
    speed = 3;
    inputs = 4;
  }else if($('#type').val()==3){
    size = 20;
    speed = 3;
    inputs = 2;
  }
  speed = $('#speed').val();
  c = new Car((width/2), 200, inputs);
  c.size = size;
  c.speed = speed;
})

$('.trainCar').click(function(){
  console.log(this.value)
  if(this.value == "r"){
    for(let i = 0; i < 2; i ++){
      c.train([1])
    }
    let info = c.train([1])
    let guess = info[0];
    let numb = info[1];
    let p;
    if(numb < .66){
      p = 1-(Math.abs(numb-.66)/.66)
    }
    if(guess == "Right"){
      guessCorrect("Right")
    }else{
      guessIncorrect(guess, Math.floor(p*100))
    }
    console.log(c.train([1]))
  }else if(this.value == "l"){
    for(let i = 0; i < 2; i ++){
      c.train([0])
    }
    let info = c.train([0])
    let guess = info[0];
    let numb = info[1];
    let p;
    if(numb > .33){
      p = 1-(Math.abs(numb-.33)/.66)
    }
    if(guess == "Left"){
      guessCorrect("Left")
    }else{
      guessIncorrect(guess, (Math.floor(p*100)))
    }
    console.log(c.train([1]))
  }else if(this.value == "s"){
    for(let i = 0; i < 2; i ++){
      c.train([.5])
    }
    let info = c.train([.5])
    let guess = info[0];
    let numb = info[1];
    let p;
    if(numb > .66){
      p = 1-(Math.abs(numb-.66)/.33)
    }else if(numb < .33){
      p = 1-(Math.abs(numb-.33)/.33)
    }
    if(guess == "Straight"){
      guessCorrect("Straight")
    }else{
      guessIncorrect(guess, (Math.floor(p*100)))
    }
    console.log(c.train([.5]))
  }
  randomizeCarPos();
})

function guessCorrect(dir){
  let txt = "Your Car Guessed Correct: "
  $('#alert').html(txt.bold()+dir)
  $("#alert").attr('class', 'alert alert-success');
}

function guessIncorrect(dir, correct){
  let txt = "Your Car Guessed Incorrect: ";
  $('#alert').html(txt.bold()+"Your Car was "+correct+"% Correct")
  $("#alert").attr('class', 'alert alert-danger');
}

$('#btnTrain').click(function(){
  $('.training').show();
  trainCar();
})

$('#btnTest').click(function(){
  $('.training').hide();
  testCar();
  //test=true;
})

setup();
setInterval(draw, 16);
