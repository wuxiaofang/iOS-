//
class Strategy{

  getResult = (money)=>{

  }
}

class StrategyA extends Strategy{

  getResult = (money)=>{
    return money * 1;
  }
}

class StrategyB extends Strategy{

  getResult = (money)=>{
    return money * 2;
  }
}


class StrategyC extends Strategy{

  getResult = (money)=>{
    return money * 3;
  }
}


//策略
// class Content{
//   constructor(strategy){
//     this.strategy = strategy
//   }
//   getResult = (money)=>{
//     return this.strategy.getResult(money)
//   }
// }

// //使用
// let content = new Content(new StrategyA())
// content.getResult(100)

//策略 + 简单工厂
class Content{
  constructor(huodong){
    switch(huodong){
      case 'A':
        this.strategy = new StrategyA()
        break
        case 'b':
        this.strategy = new StrategyB()
        break
        case 'c':
        this.strategy = new StrategyC()
        break
    }
    
  }
  getResult = (money)=>{
    return this.strategy.getResult(money)
  }
}

//使用
let content = new Content('打着')
content.getResult(100)

/**
 *  策略进行了算法的封装，对外只暴露一个类，彻底实现算法和客户端的解耦
 * ******/





