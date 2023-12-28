## 入门
- nodejs.org
  - runtime environment
- cmd
  - dir /s 显示所有文件内容
  - d: 切换到d盘
- NodeJS编码注意事项
  - 浏览器中的JavaScript
      - ES, DOM, BOM, AJAX, Storage, **console, 定时器**, alert/confirm...
  - Node.js中的JavaScript
      - fs, url, http, util, **console, 定时器**, path...
- 不能使用BOM和DOM的API
  - global, globalThis 访问顶级对象 相当于window

## Buffer
- 介绍与创建
  - 创建x字节的Buffer 1byte=8bit 2位16进制=8位2进制
  - Node在启动时已经加载进来 不需要手动导入 Buffer全局变量
    - alloc 全部归零
    - allocUnsafe 可能会包含旧的内存数据 不会对旧数据清零 速度更快
    - from 一个字符串or数组转为buffer
      - Unicode（兼容ASCII）字符（包含数字）对应的2进制数字
- 操作与注意点
  - **buf 直接输出Buffer 显示16进制**
    - `console.log(buf)`
    - `<Buffer 68 65 6c 6c 6f>`
  - **buf.toString() Buffer→字符串 默认utf8**
    - `console.log(buf.toString())`
    - `hello`
  - Buffer类似于数组 buf[0]返回的是一个10进制的数字
    - 可以更改元素 buf[0]=95
  - **buf[0] 输出数组元素 显示10进制**
    - `console.log(buf[0])`
    - `104`
  - **buf[0].toString(2) 10进制（的数字！）→2进制（的字符串！）**
    - `console.log(buf[0].toString(2))`
    - `1101000`
      - buf[0]没有Ox之类的前缀 所以是10进制
      - 第1位是符号位 1时是负数
  - 溢出
    - 255以内
    - 舍弃高位的数字 只取右边的8位
    - 相当于取模 mod256
  - 中文
    - utf-8的中文 一般占3个字节

## 计算机基础
- 进程和线程
  - 线程是一个进程中执行的一个执行流

## fs模块
- 写入文件
  - fsAPI file system
  - 实现与硬盘的交互
  - 导入模块 
    - `const fs = require('fs');`
    - require全局函数
      - import是es6语法 异步导入 执行到用的时候导入
      - require是commonjs 同步导入 执行到require的时候导入
  - `fs.writeFile('路径', '内容', [option], 接err回调函数)`
    - 成功时返回null
- 同步与异步
  - `writeFile` 异步
    - JS主线程
    - I/O线程
    - write结束后 回调函数压入到任务队列中执行
    - 主线程不等待write结果直接执行
  - `writeFileSync('路径', '内容', [option])` 同步
- fs追加写入
  - `appendFile('路径', '内容', [option], 接err回调函数)`
      ```js
      err=>{
      if(err){}} //错误对象强制转boolean是true
      ```
  - `appendFileSync('路径', '内容', [option])`
  - fs模块中加入换行是/r/n 不是<br>
  - writeFile的option写{flag: 'a'} 可以追加写入 a:append
    - w 写入
    - a 追加
    - r 读取
- 文件流式写入
  - `createWriteStream('路径', [option])` 建立通道
  - `ws.write('内容')`
  - `ws.close`
    - 脚本执行完毕后会自动关闭资源
- 文件写入应用场景
  - git add -A 存入object文件夹
  - git/logs/HEAD
- fs文件读取
  - `readFile('路径', [option], 接err+data回调函数)`
    - 全部读到内存中
    - data文件信息 是一个buffer data.toString
  - `readFileSync('路径', [option])`
- 读取文件应用场景
  - git log 读取文件
- fs流式读取
  - 一部分一部分地读到内存中
  - 处理大文件时提高效率
  - `createReadStream('路径', [option])`
  - `rs.on('data',接chunk回调)` 绑定data事件 每次读取一次数据执行一次回调
    - 每次65536字节 64KB
  - `rs.on('end', 回调)` end事件
- fs练习 文件复制
  - 读取速度一般比写入速度快
    - 读了很多条 一条一条排队写
  - `process.memoryUsage()`
    - 此process
    - rss整个占用内存大小
    - （连续执行会变大）
  - `rs.pipe(ws)` 复制 用得不多
- fs文件重命名与移动
  - `fs.rename('路径', '新路径', 接err回调函数)`
  - `fs.renameSync('路径','新路径')`
- fs文件删除
  - `unlink('路径', 接err回调函数)`
    - `unlinkSync('路径')`
  - `rm('路径', 接err回调函数)`
    - `rmSync`
- fs文件夹操作
  - 创建
    - `mkdir('路径', [option], 接err回调函数)`
    -  `{recursive: true}` 递归创建option
  - 读取
    - `readdir('路径', 接err+data回调函数)`
      - data返回数组 文件夹和文件名
  - 删除
    - `rmdir('路径', 接err回调函数)` depricated
      - 只能删空文件夹
    - `{recursive: true}` 递归删除option
    - `rm` 建议使用
  - 都有Sync版本
- fs查看资源状态
  - `stat('路径', 接err+data回调函数)`
    - err和data都是对象
      - atime 最后访问
      - mtime 最后修改
      - ctime 最后修改文件状态
      - birthtime 创建
      - `data.isFile()` `data.isDirectory()` 判断文件or文件夹
  - `statSync`
- fs路径
  - D:/...
  - /... 盘符根目录
- fs相对路径的bug
  - fs相对路径的参照物不是js文件所在目录 而是命令行工作目录
  - `__dirname` like全局变量 所在文件的目录的绝对路径
- fs练习 批量重命名
  - 遍历数组 forEach(item => {})
  - 元素拆分 item.split('-') 拆分后是数组
  - 数组解构赋值 let [num, name] = data; num和name是变量名
    - 等效代码
      ```js
      let num = data[0];
      let name = data[1];
      ```
  - Number(num) 强制类型转换 String→int
  - `` 模板字符串 可以更方便地构建包含变量值${xx}的字符串，而不需要使用字符串拼接或连接符号

## path模块
- 导入path模块
- resolve(绝对路径,相对路径) 分析出正确路径
  - __dirname 分隔符是\ 
  - /index.html是一个绝对路径
  - (绝对路径1,绝对路径2,相对路径) →绝对路径2+相对路径
- sep 分隔符
  - 设定本系统的分隔符 win \ linux /
- parse方法 获取路径相关信息
  - `__filename` like全局变量 文件绝对路径
  - \ 转义字符 `\\` 给\加上一个转义字符 正确输出\
  - `parse(路径)`  root盘符，dir文件夹路径，base文件名+扩展名，ext扩展名，name文件名
- basename方法 获取文件名
- dirname方法 获取路径
- extname方法 获取扩展名 .js

## http协议
- 