function testingTrack(){
  fill(200, 200, 200);
  stroke(100, 100, 100);
  strokeWeight(3)
  rect(0, 30, 1053, 50)
  turn(1050, 140, 180, -90, 110)
  turn(1050, 300, 180, 90, 100)
  fill(200, 200, 200);
  rect(747, 500, 306, 50)
  turn(1050, 450, 180, -90, 100);
  turn(750, 450, 180, 90, 100);
  turn(750, 260, 180, -90, 140);
  push();
  translate(691, 192);
  rotate(toRadians(135))
  fill(200, 200, 200);
  rect(0, 0, 400, 50)
  pop();
  turn(750, 260, 179, -135, 140);
  turn(341, 400, 179, 45, 100);
  turn(203, 269, 179, -135, 140);
  fill(200, 200, 200);
  rect(63, 263, 50, 350)
  turn(203, 269, 179, -180, 140);
}

function trainingTrack(){
  fill(200, 200, 200);
  stroke(100, 100, 100);
  strokeWeight(3)
  rect((width/2)-303, (height/2)-125, 606, 50)
  rect((width/2)-303, (height/2)+75, 606, 50)
  turn((width/2)-300, (height/2), 180, 90, 125);
  turn((width/2)+300, (height/2), 180, -90, 125);

}

function turn(x, y, l, r, w){
  fill(200, 200, 200);
  arc(x, y, w, r, r+l)
  fill(0,128,0)
  arc(x, y, w-50, r, r+l)
}
