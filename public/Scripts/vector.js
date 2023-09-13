class Vector{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  add(val){
    if(val instanceof Vector){
      this.x += val.x;
      this.y += val.y;
    }else{
      console.error("Vector cannot add with"+val);
    }
  }
  sub(val){
    if(val instanceof Vector){
      this.x -= val.x;
      this.y -= val.y;
    }else{
      console.error("Vector cannot add with"+val);
    }
  }
  mult(val){
    this.x *= val;
    this.y *= val;
  }
  div(val){
    this.x /= val;
    this.y /= val;
  }
  mag(){
    let mag = Math.sqrt((this.x*this.x)+(this.y*this.y));
    return mag;
  }
  normalize() {
    let m = this.mag();
    if (m != 0) {
      this.div(m);
    }
  }
  limit(max){
    if(this.mag()>max){
      this.normalize();
      this.mult(max);
    }
  }
  rotate(a){
    var z = this.mag();
    this.x = Math.cos(a)*z;
    this.y = Math.sin(a)*z;
  }
  static add(a, b){
    let sum = new Vector(a.x+b.x, a.y+b.y);
    return sum;
  }
  static mult(a, b){
    let sum = new Vector(a.x*b.x, a.y*b.y);
    return sum;
  }
  static sub(a, b){
    let sum = new Vector(a.x-b.x, a.y-b.y);
    return sum;
  }
  static div(a, b){
    let sum = new Vector(a.x/b.x, a.y/b.y);
    return sum;
  }
  static fromArray(arr){
    if(arr.length == 2){
      let result = new Vector(arr[0], arr[1]);
      return result;
    }
  }
}
