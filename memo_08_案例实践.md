## 案例实践_记账本
- 01_基本结构搭建
  - `express -e accounts` 创建项目
  - `npm i` 安装依赖
  - package.json 改npm start命令为nodemon
  - 写路由规则 app.js 跳到routes写
- 02_响应静态页面
  - css样式丢失
    - href写相对路径的话会和url进行拼接
    - 写绝对路径以/开头就是public文件夹
  - fromGPT：script标签
    - 引入外部JavaScript文件，使其功能在当前的HTML文档中可用
    - 将 `<script>` 标签放在网页代码的最后（通常在 </body> 标签之前）是一个常见的最佳实践
- 03_获取表单数据
  - 要把数据传递给服务端 每个表单项都必须有name值
  - action写相对url /account （路由定义的路径）
  - 获取请求体的数据
    - 07_express里学到要导入bodyParser库+使用中间件取得body数据 但generator已经设置好了 把body添加到了req的属性上 可以直接用
- 04_lowdb介绍与使用
  - 借助json的db 用得少
    - 使用1.0.0旧版本 最新版本要用es6模块化语法
    - `npm i lowdb@1.0.0` 下载lowdb库
  - 复制示例代码到test/lowdb.js
    - https://www.npmjs.com/package/@types/lowdb
  - 数据会存到db.json里
  - 执行lowdb.js
    - `db.defaults({ posts: [], user: {} }).write()` 初始化数据
      - post数组（集合） user对象 
          ```json
          {
            "posts": [],
            "user": {}
          }
          ```
    - `db.get('posts').push({ id: 1, title: 'lowdb is awesome'}).write()` 写入新数据
      - posts数组（集合） id&title posts下的对象
          ```json
          {
            "posts": [
              {
                "id": 1,
                "title": "lowdb is awesome"
              }
            ],
            "user": {}
          }
          ```
      - 在db实例中找到posts集合（没有则创建）
        - push 在数组最后添加 unshift 在数组最上方添加
      - db实例仅存在于内存 需要用write写入文件中将数据持久化
        - write() 写入文件 只要是更新文件就要使用
    - `db.get('posts').remove({id:3}).write()` delete
      - 删除数据 remove(条件)
      - 有返回值 删除掉的对象 类似pop
    - `db.get('posts').value()`
      - value() 获取数据
    - `db.get('posts').find({id:1}).value()` select
      - 获取单条数据
    - `db.get('posts').find({id: 1}).assign({title: '今天下雨啦!!!'}).write()` update
      - assign 更新数据
- 05_保存账单记录
  - 创建db.json 手动初始化数据 用lowdb会重复初始化
  - lowdb代码加到routes/index.js内
  - 加入数据的id shortid库 `npm i shortid`
    - 导入库 生成id shortid.generate()
    - {id:id, ...req.body}
  - 一般用unshift 先看最新数据
- 06_完善成功提醒
  - 添加成功页面ejs
- 07_账单列表
  - 静态页面→渲染db中的数据
  - ""里也可以写<%= %>
- 08_删除账单
  - 用params或query传递要删除的id参数
    - 占位符:id
    - 获取路由参数 `req.params.id`
  - 