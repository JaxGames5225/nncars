function sigmoid(x){
  return 1/(1+Math.exp(-x));
}

function dsigmoid(y){
  //return sigmoid(x) * (1 - sigmoid(x))
  return y * (1-y);
}

class NeuralNetwork{
  constructor(inputNodes, hiddenNodes, outputNodes){
    if (inputNodes instanceof NeuralNetwork) {
      this.inputNodes = inputNodes.inputNodes;
      this.hiddenNodes = inputNodes.hiddenNodes;
      this.outputNodes = inputNodes.outputNodes;

      this.weightsIH = inputNodes.weightsIH.copy();
      this.weightsHO = inputNodes.weightsHO.copy();

      this.biasH = inputNodes.biasH.copy();
      this.biasO = inputNodes.biasO.copy();
      this.learningRate = inputNodes.learningRate;
    } else {
      //Establish # of Nodes
      this.inputNodes = inputNodes;
      this.hiddenNodes = hiddenNodes;
      this.outputNodes = outputNodes;

      //Establish Weights
      this.weightsIH = new Matrix(this.hiddenNodes, this.inputNodes);
      this.weightsHO = new Matrix(this.outputNodes, this.hiddenNodes);

      //Randomize Weights;
      this.weightsIH.random();
      this.weightsHO.random();

      //Establish Bias
      this.biasH = new Matrix(this.hiddenNodes, 1);
      this.biasO = new Matrix(this.outputNodes, 1);

      //Randomize Bias
      this.biasH.random();
      this.biasO.random();

      this.learningRate = .1;
    }
  }
  feedforward(inputArray){
    //Pass Through Hidden
    let inputs = Matrix.fromArray(inputArray);
    let hidden = Matrix.mult(this.weightsIH, inputs);
    hidden.add(this.biasH);
    hidden.map(sigmoid);

    //Pass Through Outputs
    let output = Matrix.mult(this.weightsHO, hidden);
    output.add(this.biasO);
    output.map(sigmoid);

    return output.toArray();
  }
  setWeights(arr){
    if(arr.length != this.weightsIH.length + this.weightsHO.length){
      console.log("Array Length Unproportional");
      return undefined;
    }else{
      let weightsIHarr = [];
      for(let i = 0; i < this.weightsIH.length; i ++){
        weightsIHarr.push(arr[i]);
      }
      let weightsHOarr = [];
      for(let i = this.weightsIH.length; i < this.weightsHO.length+this.weightsIH.length; i ++){
        weightsHOarr.push(arr[i]);
      }
      for(let i = 0; i < this.weightsIH.rows; i++){
        for(let j = 0; j < this.weightsIH.cols; j++){
          this.weightsIH.data[i][j] = weightsIHarr[(this.weightsIH.rows*j)+i];
        }
      }
      for(let i = 0; i < this.weightsHO.rows; i++){
        for(let j = 0; j < this.weightsHO.cols; j++){
          this.weightsHO.data[i][j] = weightsHOarr[(this.weightsHO.rows*j)+i];
        }
      }
    }
  }
  train(inputArray, targetArray){
    //let outputs = this.feedforward(inputs);

    //Pass Through Hidden
    let inputs = Matrix.fromArray(inputArray);
    let hidden = Matrix.mult(this.weightsIH, inputs);
    hidden.add(this.biasH);
    hidden.map(sigmoid);

    //Pass Through Outputs
    let outputs = Matrix.mult(this.weightsHO, hidden);
    outputs.add(this.biasO);
    outputs.map(sigmoid);

    let targets = Matrix.fromArray(targetArray);
    let outputError =  Matrix.sub(targets, outputs);
    //let gradient = outputs

    let gradients = Matrix.map(outputs, dsigmoid);
    gradients.mult(outputError)
    gradients.mult(this.learningRate)

    let hiddenT = Matrix.transpose(hidden);
    let weightsHODeltas = Matrix.mult(gradients, hiddenT)

    this.weightsHO.add(weightsHODeltas)
    this.biasO.add(gradients);


    let whoT = Matrix.transpose(this.weightsHO);
    let hiddenError = Matrix.mult(whoT, outputError);
    let hiddenGradient = Matrix.map(hidden, dsigmoid);
    hiddenGradient.mult(hiddenError);
    hiddenGradient.mult(this.learningRate);

    let inputsT = Matrix.transpose(inputs);
    let weightsIHDeltas = Matrix.mult(hiddenGradient, inputsT);
    this.weightsIH.add(weightsIHDeltas)
    this.biasH.add(hiddenGradient);

    //outputs.print();
    //targets.print();
  }
  process(arr){
    if(arr[0] > .5 && arr[1] > .5){
      return 1;
    }else if(arr[0] < .5 && arr[1] < .5){
      return -1;
    } else {
      return 0;
    }
  }
  copy() {
    return new NeuralNetwork(this);
  }
  mutate(rate) {
    function m(val){
      if(Math.random()<rate){
        return val + ((Math.random()*.02)-.01)
      }else{
        return val;
      }
    }
    this.weightsIH.map(m);
    this.weightsHO.map(m);
    this.biasH.map(m);
    this.biasO.map(m);
  }
  serialize(){
    var string = JSON.stringify(this);
    return string;
  }
  static deserialize(string){
    var brain = JSON.parse(string);
    if(brain instanceof NeuralNetwork){
      return brain;
    }else{
      console.error("Not A NeuralNetwork")
    }
  }
}
