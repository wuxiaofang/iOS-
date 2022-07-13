//为其他对象提供一种代理以控制对这个对象的访问 

class Subject {
  request = ()=>{

  }
}
class RealSubject extends Subject{
  request = ()=>{
    console.log('/////RealSubject///')
  }
}

class Proxy extends Subject{
  constructor(){
    this.real = new RealSubject()
  }
  request = ()=>{
    this.real.request()
  }
}

let proxy = new Proxy()
proxy.request()

/*
  代理模式的使用场合：
  1、远程代理：为一个对象在不同的地址空间提供局部代表，这样可以隐藏一个对象在不同地址空间的事实
  2、虚拟代理：要创建开销很大的对象，通过他来存放实例化需要很长时间的真实对象
  3、安全代理：控制真实对象访问时的权限
  4、智能代理：当调用真实的对象时，代理处理另一些事
**/