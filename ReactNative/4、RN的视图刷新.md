
dom diff的两个原则
1、相同类型的节点生成相同的dom，不同的节点生成不同的dom'
2、同一个等级的节点可以通过id来判断

节点属性发生变化  更新完之后调用updateview
节点发生删除、增加、排序会调用managerchildren更新



native的渲染流程：
核心就是 
UImanager:
shadowtree：
创建视图、刷新视图都是依赖着两个来完成的

shdowview
和js侧虚拟dom数是对应的，负责更新视图

js  state发生变化，生成dom树通过 diff算法生成最终的虚拟dom数，通过转化成json，通过bridge给到native，给到shadow线程生成shadow tree，等到bridge的批处理时间完成之后会调用collectUpdatedFrames:widthConstraint:heightConstraint来刷新整个shadow tree的视图布局（yoga），刷新完成统一的提交给ui线程更新