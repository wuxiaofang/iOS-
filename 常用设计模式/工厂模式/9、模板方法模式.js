
class AbstractClass {

  operation1 = ()=>{

  }
  templateMethod = ()=>{
    this.operation1()
  }
}

class ConcreteClass1 extends AbstractClass{
  operation1 = ()=>{
    console.log('//////ConcreteClass1////')
  }
}

class ConcreteClass2 extends AbstractClass{
  operation1 = ()=>{
    console.log('//////ConcreteClass2////')
  }
}

//把不变的行为抽象到父类

