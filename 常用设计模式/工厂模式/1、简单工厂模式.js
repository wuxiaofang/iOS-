
class Operation {
  a
  b
  constructor(){
  
  }
  getResult = ()=>{
    
  }
}

class OperationAdd extends Operation {
  getResult = ()=>{
    return this.a + this.b
  }
}
class OperationSub extends Operation {
  getResult = ()=>{
    return this.a - this.b
  }
}
class OperationMul extends Operation {
  getResult = ()=>{
    return this.a * this.b
  }
}
class OperationDiv extends Operation {
  getResult = ()=>{
    return this.a / this.b
  }
}

class OperationFactory{
   static createOperation=(a)=>{
    let operation = null
    switch(a){
      case '+':
        operation = new OperationAdd();
      break
      case '—':
        operation = new OperationSub();
      break
      case '*':
        operation = new OperationMul();
      break
      case '/':
        operation = new OperationDiv();
      break
    }
  }
}
let operation = OperationFactory.createOperation('+');
operation.a = 10;
operation.b = 20;
console.log(operation.getResult())

