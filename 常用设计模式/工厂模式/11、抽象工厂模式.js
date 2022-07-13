//简单工厂上面变化过来的，多个类型的组合
class Operation{
  operation = ()=>{

  }
}

class OperationAdd extends Operation{
  operation = ()=>{
    
  }
}

class OperationSub extends Operation{
  operation = ()=>{
    
  }
}

class ScanBook{
  operation = ()=>{

  }
}

class ScanBookAdd extends ScanBook{
  operation = ()=>{
    
  }
}

class ScanBookSub extends ScanBook{
  operation = ()=>{
    
  }
}

class IFactory{
  createOperation = ()=>{

  }
  createScan = ()=>{
  }
}
class AddFactory{
  createOperation = ()=>{
    return new OperationAdd()
  }
  createScan = ()=>{
    return new ScanBookAdd()
  }
}

class SubFactory{
  createOperation = ()=>{
    return new OperationSub()
  }
  createScan = ()=>{
    return new ScanBookSub()
  }
}

let operation = new AddFactory().createOperation()