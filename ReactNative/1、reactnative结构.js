rn 新旧架构对比

旧架构

js 层 jsc js 线程
bridge ： shadow tree， native module ， json 序列化通信
native： ios android

native 恻会调用 RCTBatchBridge 的 injectJSONConfiguration 将 Module 信息同步给 js
module 信息都存储在 \_\_fbBatchedBridgeConfig 中

rn 的初始化

rctbridge
两个初始化函数：

- (instancetype)initWithBundleURL:(NSURL _)bundleURL
  moduleProvider:(RCTBridgeModuleListProvider)block
  launchOptions:(NSDictionary _)launchOptions

- (instancetype)initWithDelegate:(id<RCTBridgeDelegate>)delegate
  bundleURL:(NSURL _)bundleURL
  moduleProvider:(RCTBridgeModuleListProvider)block
  launchOptions:(NSDictionary _)launchOptions

RCTBridgeDelegate 返回了 url

- (NSURL _)sourceURLForBridge:(RCTBridge _)bridge;

setUp

- (void)setUp
{
  RCT_PROFILE_BEGIN_EVENT(0, @"-[RCTBridge setUp]", nil);
// 日志
  _performanceLogger = [RCTPerformanceLogger new];
  [_performanceLogger markStartForTag:RCTPLBridgeStartup];
  [_performanceLogger markStartForTag:RCTPLTTI];

  //bridge class ,默认为 RCTCxxBridge,继承自RCTCBridge  批处理的bridge batchedBridge
  Class bridgeClass = self.bridgeClass;

  //注册刷新reload的监听
  #if RCT_DEV
  RCTExecuteOnMainQueue(^{
    RCTRegisterReloadCommandListener(self);
  });
  #endif

  // Only update bundleURL from delegate if delegate bundleURL has changed
  //更新bundle url
  NSURL *previousDelegateURL = _delegateBundleURL;
  _delegateBundleURL = [self.delegate sourceURLForBridge:self];
  if (_delegateBundleURL && ![_delegateBundleURL isEqual:previousDelegateURL]) {
    _bundleURL = _delegateBundleURL;
  }

  // Sanitize the bundle URL
  _bundleURL = [RCTConvert NSURL:_bundleURL.absoluteString];
 //批处理url
  self.batchedBridge = [[bridgeClass alloc] initWithParentBridge:self];
  [self.batchedBridge start];

  RCT_PROFILE_END_EVENT(RCTProfileTagAlways, @"");
}


RCTCxxBridge 
_parentBridge 持有上面的bridge ，weak类型

start方法

- (void)start
{
  RCT_PROFILE_BEGIN_EVENT(RCTProfileTagAlways, @"-[RCTCxxBridge start]", nil);
//loading将要开始加载的通知
  [[NSNotificationCenter defaultCenter]
    postNotificationName:RCTJavaScriptWillStartLoadingNotification
    object:_parentBridge userInfo:@{@"bridge": self}];

  // Set up the JS thread early
  //设置js线程
  _jsThread = [[NSThread alloc] initWithTarget:[self class]
                                      selector:@selector(runRunLoop)
                                        object:nil];
  _jsThread.name = RCTJSThreadName;
  _jsThread.qualityOfService = NSOperationQualityOfServiceUserInteractive;
#if RCT_DEBUG
  _jsThread.stackSize *= 2;
#endif
  [_jsThread start];

  dispatch_group_t prepareBridge = dispatch_group_create();

  [_performanceLogger markStartForTag:RCTPLNativeModuleInit];

  //3. 注册native modules，主要是在初始化RCTBridge使用initWithBundleURL_moduleProvider_launchOptions中的moduleProvider block返回值的native modules;

  [self registerExtraModules];
  // Initialize all native modules that cannot be loaded lazily
  //注册非懒加载模块
  (void)[self _initializeModules:RCTGetModuleClasses() withDispatchGroup:prepareBridge lazilyDiscovered:NO];
  // 注册懒加载木块
  [self registerExtraLazyModules];

  [_performanceLogger markStopForTag:RCTPLNativeModuleInit];

  // This doesn't really do anything.  The real work happens in initializeBridge.
  _reactInstance.reset(new Instance);

  __weak RCTCxxBridge *weakSelf = self;

  // Prepare executor factory (shared_ptr for copy into block)
  std::shared_ptr<JSExecutorFactory> executorFactory;
  if (!self.executorClass) {
    if ([self.delegate conformsToProtocol:@protocol(RCTCxxBridgeDelegate)]) {
      id<RCTCxxBridgeDelegate> cxxDelegate = (id<RCTCxxBridgeDelegate>) self.delegate;
      executorFactory = [cxxDelegate jsExecutorFactoryForBridge:self];
    }
    if (!executorFactory) {
      executorFactory = std::make_shared<JSCExecutorFactory>(nullptr);
    }
  } else {
    id<RCTJavaScriptExecutor> objcExecutor = [self moduleForClass:self.executorClass];
    executorFactory.reset(new RCTObjcExecutorFactory(objcExecutor, ^(NSError *error) {
      if (error) {
        [weakSelf handleError:error];
      }
    }));
  }

  // Dispatch the instance initialization as soon as the initial module metadata has
  // been collected (see initModules)
  dispatch_group_enter(prepareBridge);
  [self ensureOnJavaScriptThread:^{
    [weakSelf _initializeBridge:executorFactory];
    dispatch_group_leave(prepareBridge);
  }];

  // Load the source asynchronously, then store it for later execution.
  dispatch_group_enter(prepareBridge);
  __block NSData *sourceCode;
  [self loadSource:^(NSError *error, RCTSource *source) {
    if (error) {
      [weakSelf handleError:error];
    }

    sourceCode = source.data;
    dispatch_group_leave(prepareBridge);
  } onProgress:^(RCTLoadingProgress *progressData) {
#if RCT_DEV && __has_include("RCTDevLoadingView.h")
    // Note: RCTDevLoadingView should have been loaded at this point, so no need to allow lazy loading.
    RCTDevLoadingView *loadingView = [weakSelf moduleForName:RCTBridgeModuleNameForClass([RCTDevLoadingView class])
                                       lazilyLoadIfNecessary:NO];
    [loadingView updateProgress:progressData];
#endif
  }];

  // Wait for both the modules and source code to have finished loading
  dispatch_group_notify(prepareBridge, dispatch_get_global_queue(QOS_CLASS_USER_INTERACTIVE, 0), ^{
    RCTCxxBridge *strongSelf = weakSelf;
    if (sourceCode && strongSelf.loading) {
      [strongSelf executeSourceCode:sourceCode sync:NO];
    }
  });
  RCT_PROFILE_END_EVENT(RCTProfileTagAlways, @"");
}

通过  [weakSelf _initializeBridge:executorFactory]; 去初始化reactInstances

通过executorfactory 创建一个jsExecutor  
创建一个  nativetojsbridge，放到消息队列中



