## Mongodb
- 01_介绍
- 02_核心概念
  - database数据库
  - collection集合
    - 存储同类型数据
  - document文档
    - 属性（字段）
- 03_下载安装与启动
  - 27017端口 mongodb协议
  - mongod.exe服务端程序
  - mongo.exe客户端程序
  - 把mongod的path配置到环境变量
  - 服务端选中文本服务会停止 按enter恢复
- 04_数据库与集合命令
  - 命令行交互
    - 库
      - `use 数据库名` 切换库 没有会创建
      - `show dbs` 查看库
        - 不显示没有数据的库 需要创建集合
      - `db.createCollection('users')` 创建users集合
        - 一般把集合名设定为复数
      - `db` 查看当前库
      - `db.dropDatabase();` 删除当前库
    - 集合
      - `show collections` 查看集合
      - `db.集合名.drop()` 删除集合
      - `db.集合名.renameCollection('newName')` 修改集合名
- 05_文档命令
  - `db.users.insert({name: '张三', age: 18})` 插入文档 **insert**
    - 返回WriteResult nInserted插入数
  - `db.users.find();` 查看文档 **select ***
    - `db.users.find({age: 18});` 查询文档 **select**
  - `db.users.update(查询条件,新的文档)` 更新文档 **update set** 
    - `db.users.update({name: '张三'}, {age: 30})` 默认所有属性全部更新 name属性会消失
    - 返回WriteResult nMatched匹配数 nModified更新数
    - `db.集合名.update({name:'张三'},{$set:{age:19}})` $set 属性名 部分更新 name属性不会消失
  - `db.users.remove({name:'张三'})` 删除文档 **delete**
- 06_数据库操作应用场景
## mongoose
- mongoose介绍
  - 工具包 可用代码操作mongodb
    - mongo 命令行
    - mongoose 代码程序
- 01_连接数据库
  - 1.2.安装 导入
    - `npm i mongoose`
  - 3.url 连接
    - mongodb协议/27017端口可以不写/数据库名称
    - 数据库不存在自动创建
  - 4.设置回调 connect.on('', 回调函数) 
    - on绑定事件
    - 连接成功回调用once once只执行一次 比如掉线重连时不再执行
- 02_插入文档
  - 5.创建文档的结构对象 BookSchema
    - 需要手动保证与连接db的设置(schema, 关联集合名books)相同
      ```js
      let BookSchema = new mongoose.Schema({
          name: String
        });
      ```
  - 6.创建模型对象 BookModel 下面有方法 可以对文档进行操作
      ```js
      let BookModel = mongoose.model('novel', BookSchema);
      // 若不存在集合则以复数名novels创建
      // 注意这里文档对象名book≠集合名novel
      ```
  - 7.新增文档
    - 会自动生成一个内部id 一般用不到
    - 新版不支持课件里如下的回调函数写法了
      - `find({条件},回调);`
      ```js
      BookModel.find({ author: '余华' }, (err, data) => {
          //若失败
          if (err) {
            console.log('读取失败~~~');
            return;
          }
          //若成功
          console.log(data);
        })
      ```
    - fromGPT：新版回调写法
      ```js
      newUser.save() // newUser是插入对象
          .then(() => console.log('Document inserted successfully'))
          .catch(err => console.error('Error inserting document:', err));
      UserModel.insertMany(users) // users是插入对象
        .then(() => console.log('Documents inserted successfully'))
        .catch(err => console.error('Error inserting documents:', err));
      ```
  - 8.关闭连接
    - `mongoose.disconnect();` 项目中不会用 挂着
- 03_字段类型
  - 插入未被定义的属性会被忽略 产生一个缺少某属性的文档
  - binary资源一般保存在静态资源文件夹下 db保存url
  - Mixed类型写成`mongoose.Schema.Types.Mixed`
  - ObjectId类型 必须是文档ID 用来设置外键 少用 不好使
- 04_字段验证
  - 把属性值设为对象类型 加入验证属性
    ```js
    let BookSchema = new mongoose.Schema({
        name: {
          type: String,
          required: true,
          unique: true,
          default: '匿名',
          enum: ['a','b','匿名']
    }})
    ```
  - fromGPT：mongodb的主键只有 _id 可以手动设置也可以默认mongodb创建
    - 可以手动设置一个unique的索引 但不能是主键
- 05_删除文档
  - fromGPT：新版回调写法 使用Promise的功能处理异步操作
      ```js
      BookModel.deleteOne({ name: '西游记' })
        .then(() => {
          // 删除成功后的逻辑
        })
        .catch(err => {
          // 错误处理逻辑
        });
      ```
- 06_更新文档
  - `BookModel.updateOne({条件}, {更新内容})` 更新1条
  - `BookModel.updateMany({ name: '西游记' }, { price: 25.9 })` 更新多条
- 07_读取文档
  - `BookModel.findOne({条件})` 获取1条
  - `BookModel.find({ price: { $gt: 20 } })` 不确定条
    - 可以不写条件 ()或({})都OK
  - `BookModel.findById('ID')` 获取多条
- 08_条件控制
  - `{ price: { $gt: 20 } }` 大于
    - lt小于
    - gte大于等于
    - lte小于等于
    - ne不等于
  - `{$or: [{author: '曹雪芹'}, {author: '余华'}]}` 或
  - `{$and: [{price: {$gt: 30}}, {price: {$lt: 70}}]}` 且
  - `{name: /三/}` 正则
    - `{name: new RegExp('三')}` 便于传参数
- 09_个性化读取
  - 字段筛选 `find().select({name: 1, author: 1}).exec()`
    - 一般会返回_id 也可以明示设置不返回
  - 排序 `find().sort({name: 1, author: 1}).exec()`
    - 1升序 -1降序
  - 数据截取 `find().sort({price: -1}).skip(3).limit(3)`
    - skip(3)跳过 limit(3)条数 取得4-6条
    - 常用于分页
  - fromGPT：promise, 链式调用
    - exec()是promise语法 后半段的.exec().then().catch()链式调用是异步处理
    - 前半段的.sort().skip().limit()链式调用是同步处理
    - .exec(接err,data的回调函数)不可用
    - .exec().then(接data的回调函数,接err的回调函数) 可用 但不常见
    - .exec().then(接data的回调函数).catch(接err的回调函数) 可用 常见写法
- 10_代码模块化
  - 直接看代码
  - /** tab或回车 快速输入doc
  - index.js拆分
    - db.js（连接db）
      - 暴露成一个函数db 接promise对象
    - BookModels.js（连接集合 创建Schema）
      - 暴露成一个对象
    - index.js
      - 调用db函数　db(success,error)
      - 可省略失败回调 执行error时会是undefined
        - 所以在once前判断error是否为func 不是的话设置默认值
  - config.js 抽出连接db服务配置信息
    - export参数
    - 导入config文件
    - ${}替换url
- 11_Mongodb图形化工具
  - Robo 3T 免费
  - Navicat 收费
  - mongodb compass
## 案例优化_记账本
- 本节可结合本地git accounts的历史记录查看
- 01_结合数据库
  - 引入db相关操作
    - bin/www 项目入口文件
    - 全部用success包起来 先连接db成功再启动http服务
    - fromGPT：关于bin/www
      - 在使用Express生成的Node.js项目中，/bin/www文件通常是用来启动HTTP服务器的脚本。它的主要职责是设置并启动服务器，并且在项目初始化时由Express生成。这个文件包含了一些与服务器配置相关的代码，例如端口设置、错误处理等。
- 02_准备模型文件
  - 创建models/AccountModel.js
    - 无需定义id
- 03_插入数据库
  - /account/create post 表单提交对象路由下 lowdb改为db
    - 把表单date字符串转成Date对象
      - fromGPT：Mongodb自动转换类型
        - 给Date结构传其他类型值Mongodb会自动尝试将其转换成Date 失败时产生ValidationError 其实'2024-06-23'可以构造Date对象 not wrong but 正式开发时明确转换比较亲切
      - moment工具包 将字符串转为日期对象
        - `npm i moment`安装 require导入
      - moment是一个函数
        - `moment('2024-06-23').toDate()`
        - 2024-06-23→Moment对象→Date对象
      - `.create({...req.body, time: moment(req.body.time).toDate()})`
        - 右边的time（对象）会覆盖左边第一次的time（字符串）
      - req.body.time是可以人为修改的
- 04_读取数据库
  - /account get 路由下 读取db信息
    - 调整日期显示
      - 可以把moment对象传递给ejs
      - `res.render('list', {accounts: data, moment: moment});`
      - `<%= moment(item.time).format('YYYY-MM-DD') %>`
- 05_删除文档
  - ejs模板里传回路由的id（lowdb）改为_id（mongodb）
    - 不改也可以 改了更清晰
    - fromGPT：Mongoose自动映射id
      - Mongoose 会将 MongoDB 的 _id 字段映射到模型的 id 属性上，以便在应用程序中更容易使用。
      - account.id 是 Mongoose 为了方便用户访问 _id 字段而添加的一个虚拟 getter，它返回的是 _id 字段的字符串表示形式。
      - 在 EJS 模板中，item._id 和 item.id 是等价的。
  - fromGPT：
    - sample
        ```js
        //删除记录
        router.get('/account/:id', (req, res) => {
          //获取params的id参数
          let id = req.params.id;
          //删除
          AccountModel.deleteOne({_id: id}).then(() => {
            //提醒
            res.render('success', {msg: '删除成功哦~~~', url: '/account'});
          }).catch((err) => {
            res.status(500).send('删除失败~');
            return;
          });
        })
        ```
    - promise方法可用变量范围
      - JavaScript 中的闭包特性允许内部函数访问其外部函数的变量
        - then和catch可以使用id,res,req
      - then 回调函数可以接收前一个 Promise **返回的值!!**作为参数
        - 如果 deleteOne 操作成功并返回一些结果，你可以接收这个结果作为参数
    - catch里写不写return
      - 在 catch 中写 return 并不是必须的，因为你已经调用了 res.status(500).send('删除失败~') 来结束响应
  - 添加确认对话框 在前端绑定事件
    - <script>js代码</script> 内联脚本
    - <script src="path/to/your/script.js"></script> 引用外部脚本
  - 在list页面添加添加按钮