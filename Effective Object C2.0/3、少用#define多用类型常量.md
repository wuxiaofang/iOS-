少用#define
#define 宏定义或者预处理阶段替换掉
如果在头文件中添加了，引用头文件的地方都会有这个宏定义
宏定义没有类型，也容易被修改
多用类型常量
最佳实践：
.m
static const NSString* kNotification = @"XXXXX"
.h
extern static const NSString* kNotification;

关于 static 的作用：
1、static const NSString* kNotification = @"XXXXX"
添加了 static 意味着变量仅在这个编译单元（.m）内部可见
2、const NSString* kNotification = @"XXXXX"
不加 static ，编译器为 kNotification 创建外部符号，如果和其他类中定义重名就会报错（符号冲突）
3、如果一个变量即为 static 和 const 修饰，编译器就直接替换，不会创建符号
关于 extern 作用
头文件加入，编译器会把设置为全局符号，其他类也可以引用
关于 const
NSString\* const kNotification;
从右向左解读，一个常量指针，不希望有人去改变指针的值，也就是说不能让指针指向新的内存块
