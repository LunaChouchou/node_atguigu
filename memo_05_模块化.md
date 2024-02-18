## 模块化
- Node.js模块化介绍
  - 1个文件就是1个模块
- 01_模块化初体验
  - `module.exports = tiemo;` 暴露1个数据
- 02_模块暴露数据
  - 1. `module.exports` exports是1个属性
    - 暴露多个数据 包成1个对象
      ```js 
      module.exports = {
        tiemo:tiemo, 
        niejiao:niejiao
      }
      ```
  - 2. `exports` exports是1个独立变量
    - `exports.tiemo = tiemo;`
    - 暴露多个写多个
  - exports = module.exports = {} 指向相同
    - require的返回结果是目标模块中module.exports的值而非exports
    - `exports = tiemo;``exports = {tiemo:tiemo};` 错误 重新赋值了exports
    - `module.exports.tiemo = tiemo;` 正确
- 03_Node.js导入模块
  - fs模块推荐绝对路径
  - require推荐相对路径 不会被工作路径影响
  - json文件不用暴露
  - 省略js/json后缀时 同名优先js
  - 其他扩展名/无扩展名 默认js
- 04_导入文件夹的情况
  - package.json和index.js都没有的话就不能导入文件夹
    - 需要精确到导入的js文件（main指示或文件名index）
- 05_require导入的基本流程
  - `arguments.callee.toString()` 函数代码
    - fromGPT：模块的加载过程会被包装在一个函数中执行，这个函数的签名看起来与传统的函数定义很相似，这个函数被称为模块的包装函数（Module Wrapper Function）。
  - `(function (){})()` 立即执行函数
  - 把模块对象缓存
  - 自定义模块/内置模块/外部包
- CommonJS模块化规范
