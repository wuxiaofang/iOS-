1 gif 较大时，容易造成内存紧张
使用 YYImageView 优化
具体逻辑是：
使用 apple 的 api 先读出 image 的信息，imagesource，
自己去控制 image 的展示，比如有 100 张图，可以先读 10 张，这样内存中一直存在 10 张
主要技术为 imageSource 类似于 table 的策略
