class Target{
  request = ()=>{

  }
}

class Adapter extends Target{

  request = ()=>{

  }
}

class AdapteeA{
  specificRequest = ()=>{

  }
}

class AdapterA extends Adapter{
  constructor(){
    this.adaptee = new AdapteeA()
  }
  request = ()=>{
    this.adaptee.specificRequest()
  }
}



let target = new AdapteeA()
target.request()
