class Car{
  constructor(x, y, i, b){
    this.size = 15;
    this.speed = 5;
    this.pos = new Vector(x, y);
    this.start = new Vector(x, y);
    this.vel = new Vector(this.speed, 0);
    this.dir = 0;
    if(b){
      this.brain = b.copy();
    }else{
      this.brain = new NeuralNetwork(i, 2, 1);
    }
    this.laps = 0;
    this.inputs = i;
    this.dead = false;
    this.score = 0;
    this.fitness = 0;
    //this.corners = [];
  }
  update(){
    this.score ++;
    this.pos.add(this.vel);
    this.vel.rotate(toRadians(this.dir))
    //this.display();

  }
  display(){
    push();
    translate(this.pos.x, this.pos.y)
    rotate(toRadians(this.dir))
    fill(100, 100,100);
    stroke(0, 0, 0)
    rect(0, -this.size/2, this.size*2, this.size)
    if(this.size <11){
      rect(5, -this.size/2, this.size*.8, this.size)
    }else{
      rect(7, -this.size/2, this.size*.8, this.size)
    }
    pop();
  }
  steer(d){
    if(d == 0){
      this.dir +=0*this.speed*(this.size/15);
    }else if(d == -1){
      this.dir +=-1*this.speed*(this.size/15);
    }else if(d == 1){
      this.dir +=1*this.speed*(this.size/15);
    }
  }
  reset(r, g, b, a){
    var positions = [];
    positions.push(new Vector((this.size*2)+5, -(this.size/2)))
    positions.push(new Vector(0, - (this.size/2)))
    positions.push(new Vector((this.size*2), (this.size/2)))
    positions.push(new Vector(0, (this.size/2)))
    for(let i = 0; i < positions.length; i ++){
      positions[i].rotate(toRadians(this.dir));
      positions[i].add(this.pos)
    }
    var colors = [];
    for(let i = 0; i < positions.length; i ++){
      colors.push(get(positions[i].x, positions[i].y))
    }

    for(let pos of positions){
      //circle(pos.x, pos.y, 1)
    }

    for(let i = 0; i < colors.length; i ++){
      if(colors[i].data[0] == r){
        if(colors[i].data[1] == g){
          if(colors[i].data[2] == b){
            if(colors[i].data[3] == a){
              //this.pos = new Vector(this.start.x, this.start.y);
              //this.dir = 0;
              //this.vel = new Vector(this.speed, 0);
              this.dead = true;
              //alert(1)
              console.log(this.dead)
            }
          }
        }
      }
    }
    //circle(this.pos.x + (this.size*2), this.pos.y - (this.size/2), 10, 10)
    //colors.push(get(10, 10))

  }
  think(){
    stroke(0, 0, 0)
    var positions = [];
    var angles = [];
    let theata = 180/(parseInt(this.inputs)+1);
    for(let j = 1; j < this.inputs+1; j ++){
      angles.push(-90+(j*theata))
    }
    //positions.push(new Vector((this.size*2)+10, -(this.size/2)))
    for(let i = 0; i < this.inputs; i ++){
      //console.log(i)
      positions.push(new Vector((this.size*3)+10, -(this.size/2)))
    }

    for(let i = 0; i < positions.length; i ++){
      positions[i].rotate(toRadians(this.dir + angles[i]));
      positions[i].add(this.pos)
    }

    var colors = [];
    for(let i = 0; i < positions.length; i ++){
      colors.push(get(positions[i].x, positions[i].y))
    }

    for(let pos of positions){
      //circle(pos.x, pos.y, 1)
    }
    var inputs = [];
    for(let i = 0; i < colors.length; i ++){
      /*for(let j = 0; j < colors[i].data.length; j ++){
        inputs.push(colors[i].data[j]/255);
      }*/
      inputs.push(colors[i].data[2]/255);
    }
    let outputs = this.brain.feedforward(inputs);
    if(outputs[0]>.33 && outputs[0]<.66){
      this.steer(0)
    }else if(outputs[0]>.66){
      this.steer(1)
    }else if(outputs[0]<.33){
      this.steer(-1)
    }
    //console.log(outputs)
  }
  train(targetArray){
    stroke(0, 0, 0)
    var positions = [];
    var angles = [];
    let theata = 180/(parseInt(this.inputs)+1);
    for(let j = 1; j < this.inputs+1; j ++){
      angles.push(-90+(j*theata))
    }
    //positions.push(new Vector((this.size*2)+10, -(this.size/2)))
    for(let i = 0; i < this.inputs; i ++){
      //console.log(i)
      positions.push(new Vector((this.size*3)+10, -(this.size/2)))
    }

    for(let i = 0; i < positions.length; i ++){
      positions[i].rotate(toRadians(this.dir + angles[i]));
      positions[i].add(this.pos)
    }

    var colors = [];
    for(let i = 0; i < positions.length; i ++){
      colors.push(get(positions[i].x, positions[i].y))
    }


    var inputs = [];
    for(let i = 0; i < colors.length; i ++){
      /*for(let j = 0; j < colors[i].data.length; j ++){
        inputs.push(colors[i].data[j]/255);
      }*/
      inputs.push(colors[i].data[2]/255);
    }

    let guess;
    let outputs = this.brain.feedforward(inputs);
    console.table(outputs)
    if(outputs[0]>.33 && outputs[0]<.66){
      guess = "Straight"
    }else if(outputs[0]>.66){
      guess = "Right"
    }else if(outputs[0]<.33){
      guess = "Left"
    }

    for(let pos of positions){
      //circle(pos.x, pos.y, 1)
    }



    this.brain.train(inputs, targetArray);
    return [guess, outputs[0]];
  }
  show(){
    var positions = [];
    var angles = [];
    let theata = 180/(parseInt(this.inputs)+1);
    for(let j = 1; j < this.inputs+1; j ++){
      angles.push(-90+(j*theata))
    }
    //positions.push(new Vector((this.size*2)+10, -(this.size/2)))
    for(let i = 0; i < this.inputs; i ++){
      //console.log(i)
      positions.push(new Vector((this.size*3)+10, -(this.size/2)))
    }

    for(let i = 0; i < positions.length; i ++){
      positions[i].rotate(toRadians(this.dir + angles[i]));
      positions[i].add(this.pos)
    }

    var colors = [];
    for(let i = 0; i < positions.length; i ++){
      colors.push(get(positions[i].x, positions[i].y))
    }


    var inputs = [];
    for(let i = 0; i < colors.length; i ++){
      /*for(let j = 0; j < colors[i].data.length; j ++){
        inputs.push(colors[i].data[j]/255);
      }*/
      inputs.push(colors[i].data[2]/255);
    }
    for(let pos of positions){
      circle(pos.x, pos.y, 1)
    }
  }
  loop(x, y){
    if(this.pos.y > height){
      this.pos = new Vector(x, y);
      console.log(x, y)
      this.dir = 0;
      this.vel = new Vector(this.speed, 0);
      this.laps++;
      //this.dead = true;
    }
  }
  mutate(r){
    this.brain.mutate(r)
  }
}
