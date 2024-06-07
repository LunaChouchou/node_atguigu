## express框架
- express介绍
- 01_express初体验
  - 路由
    - req 请求报文封装对象
    - res 响应报文封装对象
    - 请求路径 '/home'
    - res.end 响应结果
- 路由的介绍
  - 分配谁来处理
- 02_路由的使用
  - 请求方法、路径、回调函数
    - 应用对象.方法(路径,回调)
  - 发送post请求
    - ajax
    - form
  - 路径'/'
    - localhost:3000 报文内请求路径是'/'
  - 路径'*' 通配符
    - 上面没有符合的路径时返回404
- 03_获取请求报文参数
  - `req.path` express封装
    - =parsedUrl.pathname url模块(旧) 本文件310行
    - =url.pathname url模块(新) 本文件328行
  - `req.query` 参数
    - =parsedUrl.query url模块(旧) 本文件317行
    - =url.search/searchParams url模块(新) 本文件329行
  - `req.ip` IP
  - `req.get('host')` 请求头
  - `ipconfig` 查看本地IP
    - 查看Wifi/本机IPv4地
  - `req.body` 请求体 fromGPT
- 04_获取路由参数
  - :id 占位符 可用.或/分割
    - '/search/:query'
    - '/search/:query/xxx'
    - '/search/:query.html'
  - `req.params` 路由参数
    - `req.params.id` 取出
- 05/练习01_路由参数练习
  - 数组.find(回调函数 i => {}) 遍历 i是数组的元素
- 06_响应设置
  - 原生
    - `res.write` 写响应体
    - `res.end` 写最后的响应体
  - express
    - `res.send` 写响应体 自动在响应头中加charset
    - 可以链式调用
- 07_其他响应
  - `res.redirect` 重定向到其他网址
    - 响应结果302 Found
    - Location 重定向地址 浏览器收到后重新发送请求
  - `res.download` 下载 文件绝对路径
    - 抓包响应报文
      - 响应头里有 attachment 表明是个文件
      - 响应体是文件内容
  - `res.json`
    - 响应头 Content-Type是json
  - `res.sendFile` 响应文件内容
    - html文件之类
- 中间件介绍
  - 常用实践顺序：全局中间件（所有请求）→路由中间件
  - fromGPT：实际执行顺序：从上到下
- 08_全局中间件实践
  - Template String插件
  1. `function recordMiddleware(req, res, next){` 声明
     - next内部函数 执行后 指向后续路由回调或中间件函数回调
     - 最后要调用next 不然不会执行后续代码
  2. `app.use(recordMiddleware)` 执行
- 09_路由中间件实践
  - 通过报文传过来的数据都是字符串
  - `req.query.xxx` 取得数据
  1. 声明中间件
     - 函数形式没有限制 箭头函数、匿名函数、具名函数都可
  2. `app.get('/admin', checkCodeMiddleware, (req, res) => {`
     - 路由中间件放到受约束的路由规则中
     - 匹配路由后先执行路由中间件
     - 校验身份、权限
- 10_静态资源中间件
  - 静态资源目录/网站根目录
  - `app.use(express.static(__dirname + '/public'));`
    - 定义静态资源文件夹路径
  - http://localhost:3000/静态资源目录下路径
  - 会自动设置mime类型和字符集
- 静态资源中间件注意点
  - from弹幕：中间件和路由（get和use）都是基于同方法实现的
    - 所以执行顺序不取决于中间件还是路由
  - fromGPT：注册到app里的函数会被认为是中间件 并且能接收到req, res, next
    - 其实Servlet也差不多 能接到HTTP请求
  - 如果要设置路径和静态资源目录下某文件相同的路由 写在在静态资源中间件声明下面就相当于无效
- 练习02_静态资源中间件练习
  1. `npm init` 创建包（项目？）
  2. `npm i express` 
  3. 写server.js
  4. 开启项目
  5. 查服务器ip地址
- 11_获取请求体数据
  - body-parser包 一种中间件 提取请求体内容 express 4.x以上内置
  1. 导入bodyParser
       - var 可重新赋值、声明
       - let 可重新赋值、不可重新声明
       - const 不可重新赋值、声明
  2. 使用
     - 选择设置为全局中间件/设置为路由中间件
     - 获取jsonParser中间件函数
       - `const jsonParser = bodyParser.json()` 解析json用
       - `const urlencodedParser = bodyParser.urlencoded({ extended: false })` 解析querystring用
     - 注册中间件
     - 执行后会向请求对象身上添加一个属性body `req.body`
     - 取得形式为对象
     - fromGPT：一个路由可执行多个中间件
  - action可以简写成路径
    - 在地址栏里直接输入路径 会自动拼接完整URL
- 防盗链
  - 禁止该域名以外的其他网站访问资源
- 12_防盗链实践
  - 请求头中包含referer 发送请求时自动携带当前网页协议域名端口
  1. 声明一个全局中间件用于检测 记得写next不然无法获取referer
  2. 取得请求的IP地址/域名部分
     1. `req.get('referer')` 获取referer 通过referer判断请求来源
       - 127.0.0.1 
       - localhost 特殊的主机名，通常可被称为域名
     2. `new URL(referer)` 将referer实例化为URL 
     3. `url.hostname` 
  3. 判断 
     - 第一次发送请求没有referer值 所以需要判断referer为不为空
- 13_路由模块化
  - `express.Router()` 小型app对象 可写中间件、路由函数
  - `app.use(router)` 将子app（路由器）作为中间件挂载到app的路径上 严格来说不是注册中间件
  - `app.use('/users', usersRouter);` 可以设置路径前缀 usersRouter里写/users后的路径
- 14-模板引擎
- 14-01_EJS初体验
  - 用于分离 服务器端js 和 html 类似于jsp
  1. `npm i ejs` 安装EJS
     - 项目内任何文件夹内都可以执行npm i（if package(-lock).json or node_modules exist, packages will be installed where they are）
  2. 导入ejs
  3. render响应
     - **ejs语法** ejs.render
     - `ejs.render('我爱你 <%=china %>', {china: china})` ejs内部语法 输出表达式值
       - `{china: china, weather}` 可多个变量
       - 左对应<%=属性名 右对应声明变量名 相同可简写
     - →`ejs.render(str, {china})` 简写 str从外部导入
     - →`let str = fs.readFileSync('./01_html.html').toString();` str从文件导入 buffer→string
- 14-02_ejs列表渲染 forEach文
  - 在str里写代码 类似于el式
    - <% %> js代码
    - <%= %> js表达式
- 14-03_ejs条件渲染 if文
- 14-04_express中使用ejs
  1. 设置模板引擎
       - ejs是模板引擎的一种 还有pug twing等
       - `app.set('view engine', 'ejs');` 设置express使用的模板引擎（而非写require ejs？）
  2. 设置模板文件存放位置 html文件
       - `app.set('views', path.resolve(__dirname, './views'));` 
  3. render响应
       - **express语法** res.render
       - `res.render('模板的文件名home', 数据);`
         - 数据为对象字面量 {title}或{title:title}这样的 可不带数据
  4. 创建模板文件
       - home.ejs 放在views文件夹下
       - <%=title %> 显示数据
- 15_express-generator
  - 官方工具 快速搭建骨架
  - `npm install -g express-generator` 全局安装
  - express命令
  - 新建项目步骤
    - `express -e 项目名` -e 添加ejs的支持
    - `npm i` 安装依赖
    - `npm start` 实际执行命令写在package.json里
- 15_文件上传报文
  - `<form action="/portrait" method="post" enctype="multipart/form-data">` 上传文件属性 分块上传的
  - `<input type="file" name="portrait">` 上传部品
- 15_express处理文件上传
  - 安装工具包formidable `npm i formidable` 已改成ES6模块标准语法
  - 写法示例 https://www.npmjs.com/package/formidable
  - 1在路由中可以完成body-parser的功能
    - 获取fields 一般字段 除了文件之外的字段
  - 2上传文件到public目录
    - formidable选项 uploadDir:路径 keepExtensions:true
  - 3服务器保存该图片的访问URL
    - `let url = '/images/' + files.portrait.newFilename;` 取得url 后续保存在数据库中