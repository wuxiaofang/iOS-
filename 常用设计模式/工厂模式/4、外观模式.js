
 class SystemOne {
  methodOne = ()=>{

  }
 }

 class SystemTwo {
  methodTwo = ()=>{
    
  }
 }

 class SystemThree {
  methodThree = ()=>{
    
  }
 }

 class SystemFour {
  methodFour = ()=>{
    
  }
 }
 class Facade{
  constructor(){
    this.one = new SystemOne()
    this.two = new SystemTwo()
    this.three = new SystemThree()
    this.four = new SystemFour()
  }
  methonA = ()=>{
    this.one.methodOne()
    this.two.methodTwo()
  }
  methodB = ()=>{
    this.three.methodThree()
    this.four.methodFour()
    this.one.methodOne()
  }
 }