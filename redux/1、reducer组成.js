const { connect } = require("http2")
const { type } = require("os")

reducer组成
1、State
  服务器返回的state
  UI的state
  app组件的state
2、action 只描述时间的发生
函数 的object
{
  type: ""
  data: {}
}
3、reducer
函数
响应发送过来的action
接受连个参数  一个旧的store 一个action
有一个返回值  需要更新的state
给到store
4、store

接收到resucer的值更新state
dispatch 发送action
subscribe订阅时间


State
store
action
reducer

provider

connect

store(reducer)

reducer 接受两个参数  state， action

action是通过 store的dispatch进行发送的

provider  需要传入 store来包装component
connect mapStateToProps mapDispatchToProps
接收参数  dispatch  state





