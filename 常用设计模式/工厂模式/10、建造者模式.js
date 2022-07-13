class Product{
  constructor(){
    this.list = []
  }
  addA = (a)=>{
    this.list.push(a)
  }
  addB = (b)=>{
    this.list.push(b)
  }
}
class Builer{
  buildA = ()=>{}
  buildB = ()=>{}
}
class ConcreteBuilder extends Builer{
  constructor(){
    this.product = new Product()
  }
  buildA = ()=>{
    this.product.addA('//')
  }
  buildB = ()=>{
    this.product.addB('///')
  }
}

class Director {
  constructor(builder){
    builder.buildA()
    builder.buildB()
  }
}
