release -> 计数器为 0 -》 \_objc_root_dealloc->rootDealloc

标记指针直接返回
1、下面判断是否可以被直接释放：
1、是否是优化过的 isa（标记指针）
2、是否有 c++析构
3、是否有关联对象
4、是否弱引用
5、是否计数器过大在 sidetable 中存储
如果有调用 dispose，没有调用 free
3、调用 dispose
objc_destructInstance
free
4、objc_destructInstance
1）has_cxx_dtor 处理 c++相关的析构 objc_cxxDestruct
2）销毁关联对象
3）调用 clearDeallocating
5、clearDeallocating
1）sideTable_clearDeallocating（）
2）清楚弱引用对象
3）引用计数表中擦除改对象的引用计数。
