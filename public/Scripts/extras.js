var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var pressed = false;
var mouse = {
  x: 0,
  y: 0
};

function circle(x, y, r){
  ctx.beginPath();
  ctx.arc(x,y,r,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function arc(x, y, r, s, e){
  ctx.beginPath();
  ctx.arc(x,y,r,toRadians(s),toRadians(e));
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function getMousePos(canvas, evt){
  var rect = canvas.getBoundingClientRect();
  return{
    x: evt.clientX-rect.left,
    y: evt.clientY-rect.top
  }
}

function background(r, g, b){
  ctx.fillStyle = "rgb("+r+","+g+","+b+")"
  ctx.fillRect(0, 0, width, height)
}

function fill(r,g,b){
  ctx.fillStyle = "rgb("+r+","+g+","+b+")"
}

function stroke(r,g,b){
  ctx.strokeStyle = "rgb("+r+","+g+","+b+")"
}

function strokeWeight(x){
  ctx.lineWidth=x;
}

function translate(x, y){
  ctx.translate(x,y);
}

function rotate(x){
  ctx.rotate(x);
}

function push(){
  ctx.save();
}

function pop(){
  ctx.restore();
}

function onMove(evt){
  mouse = getMousePos(canvas, evt)
  if(typeof mouseMoved == 'function'){
    mouseMoved();
  }
}

function interact(){
  if (typeof mousePressed == 'function') {
    canvas.addEventListener("click", mousePressed);
  }
  canvas.addEventListener("mousemove", onMove);
  if(typeof keyPressed == 'function'){
    window.addEventListener("keydown", keyPressed);
  }
  if(typeof keyReleased == 'function'){
    window.addEventListener("keyup", keyReleased);
  }
}

function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function get(x, y, w, h){
  var data;
  if(w && h){
    var data = ctx.getImageData(x, y, w, h);
  }else{
    var data = ctx.getImageData(x, y, 1, 1);
  }
  return data;
}

function text(x, y, s){
  ctx.textAlign = "center";
  ctx.fillText(x, y, s);
}

function font(s, f){
  ctx.font = s+"px "+f;
}

function rect(x, y, w, h){
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}
