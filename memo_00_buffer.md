## Buffer
- 介绍与创建
  - 创建x字节的Buffer 1byte=8bit 2位16进制=8位2进制
  - Node在启动时已经加载进来 不需要手动导入 Buffer全局变量
    - alloc 全部归零
    - allocUnsafe 可能会包含旧的内存数据 不会对旧数据清零 速度更快
    - from 一个字符串or数组转为buffer
      - Unicode（兼容ASCII）字符（包含数字）对应的2进制数字
- 操作与注意点
  - **buf 直接输出Buffer 2进制的Buffer 显示为16进制**
    - `console.log(buf)`
    - `<Buffer 68 65 6c 6c 6f>`
  - **buf.toString() 2进制的Buffer→字符串 默认utf8**
    - `console.log(buf.toString())`
    - `hello`
  - Buffer类似于数组 buf[0]返回的是一个10进制的数字
    - 可以更改元素 buf[0]=95
  - **buf[0] 输出数组元素 10进制（的数字）**
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
