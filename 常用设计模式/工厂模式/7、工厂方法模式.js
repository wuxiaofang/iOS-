//简单工厂上面变化过来的
class Operation{
  operation = ()=>{

  }
}

class OperationAdd extends Operation{
  operation = ()=>{
    
  }
}

class IFactory{
  createOperation = ()=>{

  }
}
class AddFactory{
  createOperation = ()=>{
    return new OperationAdd()
  }
}

let operation = new AddFactory().createOperation()

/*
简单方法不符和软件设计模式的开闭原则
工厂方法相对于简单工厂来说，封装了运算符类的创建，便于在代码中修改
****/
