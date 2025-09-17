# DT-webpack-splitchunks
23kb cdn 5个

libs      react ...[？庞大]
    libs - 1>
    libs - 2>
    react-xxxxxxx 
组件mui    庞大 
二开组件库  很小
公用代码    commons 组件
sdk        ...... script方式
sdk2       ethers


120kb - 30kb 

maxInitialRequests -> maxAsyncRequests
1.自己本身就算是1个请求
2.入口里面有动态加载模块不算
3.runtime不算
4.css不算
5.同时如果模块满足cachegGroup的拆分 maxInitialRequests进行了限制 2 更大的模块丢出来


maxAsyncRequests: 5,
maxInitialRequests: 4,
 maxInitialRequests / maxAsyncRequests <maxSize<minSize