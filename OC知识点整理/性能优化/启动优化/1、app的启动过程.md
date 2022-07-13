ios 的启动分为：premain、main 之后
启动分为：
冷启动：点击 appicon 直接开始加载
热启动：用户点击 Home 之后退到后台，这时候 app 还在运行，点击 appicon 再次打开 app
冷启动启动顺序：
premain：
1、app 的环境初始化，加载环境变量
2、dyld 加载库，读取 mach-o
3、rebase/bind
4、objc setup： 加载类、加载分类、selector 唯一性检查
5、Initializers 初始化：调用类的+load、分类的+load、c++调用 attribute((constructor))初始化、创建 C++的全局静态变量
main：
appDelegate 到 didFinishLaunchingWithOptions 首屏完成渲染
