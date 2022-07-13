
class Component{
  operation = ()=>{

  }
}
class ConcreteComponent extends Component{
  operation = ()=>{
    console.log('///圆形//')
  }
}
class Decorator extends Component{
  constructor(component){
    this.component = component
  }
  operation = ()=>{
    this.component.operation()
  }
}

class DecoratorA extends Decorator{

  operation = ()=>{
    console.log('////A////')
    super.operation()
  }
}

class DecoratorB extends Decorator{

  operation = ()=>{
    console.log('////A////')
    super.operation()
  }
}

let component = new ConcreteComponent()
let decorateA = new DecoratorA(component)
let decorateB = new DecoratorA(decorateA)
decorateB.operation()
