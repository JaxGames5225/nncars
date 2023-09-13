var dCanvas = document.getElementById('carDisplay');
var dctx = dCanvas.getContext("2d");
var dwidth = dCanvas.width;
var dheight = dCanvas.height;
var dpressed = false;
var dmouse = {
  x: 0,
  y: 0
};

function dcircle(x, y, r){
  dctx.beginPath();
  dctx.lineWidth=3;
  dctx.fillStyle = "rgba(0, 0, 0, 0)"
  dctx.arc(x,y,r,0,2*Math.PI);
  dctx.fill();
  dctx.stroke();
  dctx.closePath();
}

function darc(x, y, r, s, e){
  dctx.beginPath();
  dctx.arc(x,y,r,toRadians(s),toRadians(e));
  dctx.fill();
  dctx.stroke();
  dctx.closePath();
}

function dgetMousePos(dCanvas, evt){
  var rect = dCanvas.getBoundingClientRect();
  return{
    x: evt.clientX-rect.left,
    y: evt.clientY-rect.top
  }
}

function dbackground(r, g, b){
  dctx.fillStyle = "rgb("+r+","+g+","+b+")"
  dctx.fillRect(0, 0, dwidth, dheight)
}

function dfill(r,g,b){
  dctx.fillStyle = "rgb("+r+","+g+","+b+")"
}

function dstroke(r,g,b){
  dctx.linewidth=3
  dctx.strokeStyle = "rgb("+r+","+g+","+b+")"
}

function dstrokeWeight(x){
  dctx.linedwidth=x;
}

function dtranslate(x, y){
  dctx.translate(x,y);
}

function drotate(x){
  dctx.rotate(x);
}

function dpush(){
  dctx.save();
}

function dpop(){
  dctx.restore();
}

function donMove(evt){
  dheight = getMousePos(dCanvas, evt)
  if(typeof mouseMoved == 'function'){
    mouseMoved();
  }
}

function dinteract(){
  if (typeof mousePressed == 'function') {
    dCanvas.addEventListener("click", mousePressed);
  }
  dCanvas.addEventListener("mousemove", onMove);
  if(typeof keyPressed == 'function'){
    window.addEventListener("keydown", keyPressed);
  }
  if(typeof keyReleased == 'function'){
    window.addEventListener("keyup", keyReleased);
  }
}

function dtoDegrees (angle) {
  return angle * (180 / Math.PI);
}

function dtoRadians (angle) {
  return angle * (Math.PI / 180);
}

function dget(x, y, w, h){
  var data;
  if(w && h){
    var data = dctx.getImageData(x, y, w, h);
  }else{
    var data = dctx.getImageData(x, y, 1, 1);
  }
  return data;
}

function dtext(x, y, s){
  dctx.textAlign = "center";
  dctx.fillText(x, y, s);
}

function dfont(s, f){
  dctx.font = s+"px "+f;
}

function drect(x, y, w, h){
  dctx.beginPath();
  dctx.lineWidth=3;
  dctx.rect(x, y, w, h);
  dctx.fill();
  dctx.stroke();
  dctx.closePath();
}

function noFill(){
  ctx.fillStyle = "rgba(0, 0, 0, 0)"
}

class roadLine{
  constructor(y){
    this.x = (dwidth/2)-5;
    this.y = y;
    this.w = 10;
    this.h = 30;
  }
  show(){
    dctx.fillStyle = "rgb(255, 255, 0)"
    dctx.lineWidth = 3
    dctx.rect(this.x, this.y, this.w, this.h)
    dctx.fill();
    dctx.stroke();
    dctx.fillStyle = "rgb(255, 255, 255)";
  }
  move(speed){
    this.y+=speed;
    if(this.y>dheight){
      this.y = -50;
    }
  }
}

function dcar(s, i){


  var dpositions = [];
  var dangles = [];
  let dtheata = 180/(parseInt(i)+1);
  for(let j = 1; j < i+1; j ++){
    dangles.push(-90+(j*dtheata))
  }
  //positions.push(new Vector((s*2)+10, -(s/2)))
  for(let j = 0; j < i; j ++){
    //console.log(i)
    dpositions.push(new Vector((s*2)+10, -(s/2)))
  }

  for(let i = 0; i < dpositions.length; i ++){
    dpositions[i].rotate(toRadians(-90 + dangles[i]));
    dpositions[i].add(new Vector(dwidth/2, dheight/2))
  }

  for(let pos of dpositions){
    //noFill();
    dfill(0, 0, 0)
    dcircle(pos.x, pos.y, 7, 7)
  }

  dpush();
  dtranslate(dwidth/2, dheight/2)
  dfill(100, 100,100);
  dstroke(0, 0, 0)
  drect(-s/2, -s, s, s*2)
  drect(-s/2, -s/4, s, (s/5)*4)
  dpop()
}

let lines = [ new roadLine((dheight+50)/2), new roadLine((dheight+50)/4), new roadLine(((dheight+50)/4)*3), new roadLine(((dheight+50)/4)*0)]


function dshowCar(){
  dbackground(0,128,0)
  dfill(200, 200, 200)
  dctx.fillStyle = "rgb(200, 200, 200)"
  dctx.beginPath();
  dctx.fillRect((dwidth/2)-50, 0, 100, dheight)
  dctx.strokeRect((dwidth/2)-50, 0, 100, dheight)
  //console.log((dwidth/2)-50)

  dctx.stroke();

  let dsize;
  let dspeed;
  let dinputs;
  if($('#type').val()==1){
    dsize = 10;
    dspeed = 3;
    dinputs = 3;
  }else if($('#type').val()==2){
    dsize = 15;
    dspeed = 3;
    dinputs = 4;
  }else if($('#type').val()==3){
    dsize = 20;
    dspeed = 3;
    dinputs = 2;
  }
  dspeed = $('#speed').val();
  for(n of lines){
    n.show();
    n.move(parseInt(dspeed));
  }
  dcar(dsize*2, dinputs)
}

setInterval(dshowCar, 16)
