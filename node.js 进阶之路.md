# node.js 进阶之路

## 1. 基本概念

* node.js 是一个 JavaScript 的运行环境
* node.js = V8引擎 + 内置API

## 2. 内置 API

### 2.1 fs 文件系统模块

作用：处理文件操作

注意：在 JavaScript 代码中，使用 fs 模块操作文件，需要先导入它：`const fs = require('fs')`

#### 2.1.1 fs.readFile( )

*  作用：读取指定文件内容
* 语法格式：`fs.readFile(path[, options], callback)`
  * 参数一：必选，字符串，表示文件路径
  * 参数二：可选，表示以什么编码格式读取文件
  * 参数三：必选，文件写入完成后的回调函数

#### 2.1.2 fs.writeFile( )

* 作用：向指定文件写入内容
* 语法格式：`fs.writeFile(file, data[, options], callback)`
  * 参数一：必选，需要指定一个文件路径的字符串，表示文件存放路径
  * 参数二：必选，表示写入内容
  * 参数三：可选，表示以什么编码格式写入文件
  * 参数四：必选，文件写入完成后的回调函数

### 2.2 path 路径模块

作用：处理路径操作

注意：在 JavaScript 代码中，使用 path 模块操作文件，需要先导入它：`const path = require('path ')`

#### 2.2.1 path.join( )

* 作用：拼接路径字符串
* 语法格式：`path.join([...paths])`
  * ...paths：路径片段序列
  * 返回值：拼接后字符串

#### 2.2.2 path.basename( )

* 作用：获取路径中最后一部分，可通过该方法获取路径中的文件名
* 语法格式:`path.basename(path[, ext])`
  * path：必选，表示路径字符串
  * ext：可选，表示文件扩展名
  * 返回值：表示获取的路径中的文件名

#### 2.2.3 path.extname( )

* 作用：获取路径中的扩展名
* 语法格式：`path.extname(path)`
  * path：必选，表示路径字符串
  * 返回值：扩展名字符串

### 2.3 http 模块

* 作用：创建 Web 服务器
* 使用方式：通过 http 模块的 http.createServer( )，就可把普通电脑变成 Web 服务器
* 注意：在 JavaScript 代码中，使用 http 模块操作文件，需要先导入它：`const http = require('http ')`

#### 2.3.1 服务器知识

* 客户端：在网络节点中，负责消费资源的电脑
* 服务器：在网络节点中，负责对外提供网络资源的电脑
* 服务器与普通电脑区别：服务器上安装了 Web 服务器软件：如：IIS、Apache 等

1. IP地址
   * 作用：每台计算机的唯一地址
   * 格式：‘点分十进制’，写成 (a.b.c.d) 形式，其中 a,b,c,d 为（0-255）之间的十进制整数。如：（192.168.1.1）
   * 注意：
     * 互联网中每台 Web 服务器，都有自己的 IP 地址
     * 在开发期间，自己的电脑既是一台服务器，也是一个客户端。为了方便测试，在自己的浏览器中输入 127.0.0.1 这个 IP 地址，就能把自己电脑当做一台服务器进行访问
2. 域名和域名服务器
   * 域名：IP 地址的别名，便于记忆
   * IP 地址和域名是一一对应关系，这个对应关系存放在域名服务器（DNS）的电脑中
   * 域名服务器：提供 IP 地址和域名之间转换服务的服务器
   * 注意：
     * 单纯使用 IP 地址，互联网的电脑也可以正常工作。但有了域名的加持，便于互联网操作
     * 开发测试期间，127.0.0.1 对应的域名是 localhost，他们都代表自己的这台电脑，在使用效果上没有任何区别
3. 端口号
   * 作用：唯一标识对应服务器
   * 注意：
     * 每个端口号不能同时被多个 web 服务占用
     * 在实际应用中，URL 的80端口可以省略

#### 2.3.2 创建 Web 服务器基本步骤

1. 导入 http 模块

   `const http = require('http')`

2. 创建 Web 服务器实例

   `const server = http.createServer()`

3. 为 Web 服务器实例绑定 request 事件，监听客户端请求

   ```javascript
   server.on('request', (req, res) => {
     console.log('服务器被访问！');
   })
   ```

4. 启动服务器

   ````javascript
   server.listen(80, () => {
     console.log('服务器地址：http://127.0.0.1');
   })
   ````

#### 2.3.3 req 请求对象

* 作用：在事件处理函数中，访问客户端相关数据

* 注意：只要服务器接收了客户端请求，就会调用通过 server.on( ) 为服务器绑定的 request 事件处理函数

* 示例：

  ```javascript
  server.on('request', (req) => {
    console.log(req.url, req.method);
  })
  ```

#### 2.3.4 res 响应对象

* 作用：在事件处理函数中，访问服务器相关数据

* res.end( ) 方法的作用：向客户端发送指定内容，并结束这次请求的处理过程

* 示例：

  ```javascript
  server.on('request', (req, res) => {
    console.log(req.url, req.method);
    res.end(req.url, req.method)
  })
  ```

#### 2.3.5 解决中文乱码问题

* 问题分析：当调用 res.end( ) 方法，向客户端发送中文内容时，会出现乱码问题

* 解决方案：手动设置内容的编码格式

* 示例：

  ```javascript
  server.on('request', (req, res) => {
    const str = '请求地址：' + req.url
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(str)
  })
  ```

#### 2.3.6 根据不同 url 响应不同 html 内容

1. 获取请求 url 地址
2. 设置默认响应内容为 404 Not found
3. 判断用户请求的是否为 / 或 /index.html 首页
4. 判断用户请求的是否为 /about.html 关于页面
5. 设置 Content-Type 响应头，防止中文乱码
6. 使用 res.end( ) 把内容响应给客户端

## 3. 模块化

### 3.1 模块化基本概念

* 概念：模块化指解决一个复杂问题时，自顶向下逐层把系统划分成若干模块的过程
* 编程中模块化：遵守固定规则，把一个大文件拆成独立并互相依赖 多个小模块
* 优点：
  1. 提高代码复用性
  2. 提高代码可维护性
  3. 可按需加载


### 3.2 node.js 模块分类

1. 内置模块（node.js 官方提供，如 fs、path、http 等）
2. 自定义模块（用户创建的每个 .js 文件）
3. 第三方模块（由第三方开发出来的模块，使用前需先下载）

### 3.3 加载模块

* 使用方法：使用 require( ) 方法，可加载内置模块、自定义模块、第三方模块

* 注意：使用 require( ) 方法加载其他模块时，会执行被加载模块中的代码，可省略 .js 后缀名

* 示例：

  ```javascript
  // 1. 加载内置 fs 模块
  const fs = require('fs')
  
  // 2. 加载自定义模块 
  cosnt a = require('./a.js')
  
  // 3. 加载第三方模块
  const moment = require('moment')
  ```

### 3.4 模块作用域

* 概念：自定义模块中定义的变量、方法等成员，只能在当前模块内被访问
* 优点：防止全局变量污染问题

### 3.5 向外共享模块作用域成员

1. module 对象
   * 作用：存储当前模块相关信息
2. module.exports 对象
   * 作用：将模块内成员共享出去，供外界使用
   * 注意：外界用 require( )方法导入自定义模块时，得到 module.exports( )所指对象

3. 共享成员注意点
   * 使用 require( )方法导入模块时，导入结果始终以 module.exports 指向对象为准
4. exports 对象
   * 作用：向外共享成员代码
   * 注意：
     * 默认情况，exports 与 module.exports 指向同一对象
     * 最终共享结果，还是以 module.exports 指向对象为准
     * 为防止混乱，建议不要在同一模块中同时使用 exports 和 module.exports

### 3.6 node.js 模块化规范

* node.js 遵循了 CommonJS 模块化规范，CommonJS 规定了模块特性和各模块之间如何相互依赖
* CommonJS 规定：
  1. 每个模块内部，module 变量代表当前模块
  2. module 变量是一个对象，它的 exports 属性（即 module.exports）是对外暴露的接口
  3. 加载某个模块，就是加载该模块的 module.exports 属性。require( )方法用于加载模块

## 4. npm 与 包

### 4.1 包

* 概念：node.js 中第三方模块又叫包
* 来源：第三方个人或团队开发出来，供所有人免费使用
* 作用：基于内置模块封装，提供更高级、更方便的 API，极大提高开发效率
* 下载地址：
  * https://www.npmjs.com/：网站，搜索需要的包
  * https://registry.npmjs.org/：服务器，下载需要的包
* 下载方式：
  * 包管理工具：npm 包管理工具（与 node.js 同时安装）
  * 查看 npm 版本号：npm -v
  * 安装包命令：`npm install 包的完整名称`（简写方式：`npm i 包的完整名称`）

#### 4.1.1 初次装包

* 增加 node_modules 文件夹和 package-lock.json 配置文件
* node_modules 文件夹：存放所有已安装到项目中的包。require( ) 导入第三方包时，就是从这个目录中查找并加载包
* package-lock.json 配置文件：记录 node_modules 目录下每个包的下载信息，如：包的名字、版本号、下载地址等
* 注意：不要手动修改 node_modules 和 package-lock.josn 文件中的任何代码，npm 包管理工具会自动维护它们

#### 4.1.2 安装指定版本包

* 默认情况，使用 `npm install 包的完整名称` 时，会自动安装最新版本的包
* 如需安装指定版本包，则可以在包名后通过 @符号指定具体版本。如：`npm install moment@2.22.2`

#### 4.1.3 包的语义化版本规范

* 包的版本号以 ‘点分十进制’ 形式进行定义，总共三位数字，如：2.24.0
* 每位数字代表含义如下：
  * 第1位数字：大版本
  * 第2位数字：功能版本
  * 第3位数字：bug 修复版本
* 版本号提升规则：前面版本号增长后，则后面版本号归零

### 4.2 包管理配置文件

* npm 规定，在项目根目录中，必须提供一个 package.json 包管理配置文件，用来记录与项目有关的一些配置信息
* 如：包的名称、版本号、描述、包的使用时期（开发、部署）等

#### 4.2.1 多人协作问题

* 问题分析：第三方包体积过大，不方便团队成员之间共享项目源代码
* 解决方案：共享时忽略 node_modules

#### 4.2.2 记录项目中安装的包

* 在项目根目录中，创建 package.json 配置文件，用来记录项目中安装了那些包
* 作用：便于忽略 node_modules 目录后，团队成员之间共享项目源代码
* 注意：项目开发中，一定要把 node_modules 文件夹，添加到 .gitignore 忽略文件

#### 4.2.3 快速创建 package.json

* npm 包管理工具提供了一个快捷命令，在执行命令时所处目录中，快速创建 package.json 包管理配置文件
* 快捷命令：`npm init -y`
* 注意：
  * 上述命令只能在英文目录下成功运行。因此项目文件夹名称一定用英文命名，不能使用中文，不能出现空格
  * 运行 `npm install 包的完整名称` 命令安装包时，npm 包管理工具会自动把包的名称和版本号，记录到 package.json 中

#### 4.2.4 dependencies 节点

* package.json 文件中的 dependencies 节点，专门记录使用 `npm install 包的完整名称` 命令安装了哪些包

#### 4.2.5 一次性安装所有包

* 运行`npm install ` (或`npm i`)命令，可以一次性安装所有依赖包
* 执行 `npm install` 命令时，npm 包管理工具会先读取 package.json 中的 dependencies 节点。读取到记录的所有依赖包名称和版本号后，npm 包管理工具会把这些包一次性下载到项目中

#### 4.2.6 卸载包

* 执行 `npm uninstall 包的完整名称` 命令，卸载指定包
* 如：`npm install moment`，可卸载 moment 包
* 注意：`npm uninstall` 命令执行成功后，会把卸载的包，自动从 package.json 的 dependencies 节点中移除

4.2.7 devDependencies 节点

* 某些包，只在项目开发阶段使用，项目上线后不使用，则建议把这些包记录到 devDependencies 节点中
* 某些包，在项目开发和上线后都需要用到，则建议把这些包记录到 dependencies 节点中
* 安装指定包，并记录到 devDependencies 节点中的命令如下：
  * 完整写法：`npm install 包的完整名称 --save-dev`
  * 简写方式：`npm install 包的完整名称 -D`

### 4.3 解决下包速度慢问题

#### 4.3.1 为什么下包速度慢

* 在使用 npm 下包时，默认从国外服务器进行下载，此时，网络数据传输需要经过漫长的海底光缆，因此下包速度慢

#### 4.3.2 淘宝 NPM 镜像服务器

* 淘宝在国内搭建了一个服务器，专门把国外官方服务器上的包同步到国内服务器，然后在国内提供下包服务，极大提高下包速度
* 镜像：一种文件存储形式，一个磁盘上的数据在另一个磁盘上存在完全相同的副本即为镜像

#### 4.3.3 切换 npm 下包镜像源

* 下包镜像源：指下包的服务器地址

* 具体操作：

  ```javascript
  // 1. 查看当前下包镜像源
  npm config get registry
  // 2. 将下包的镜像源切换为淘宝镜像源
  npm config set registry=https://registry.npm.taobao.org/
  // 3. 检查镜像源是否下载成功
  npm config get registry
  ```

#### 4.3.4 nrm

* 作用：便于快速查看和切换下包的镜像源

* 具体操作：

  ```javascript
  // 1. 通过 npm 包管理工具，将 nrm 安装为全局可用工具
  npm i nrm -g
  // 2. 查看所有可用的镜像源
  nrm ls
  // 3. 将下包的镜像源切换为 taobao 镜像源
  
  ```

### 4.4 包的分类

#### 4.4.1 项目包

* 概念：被安装到项目的 node_modules 目录中的包

  1.开发依赖包

  * 概念：只在开发期间使用，被记录到 devDependencies 节点中的包
  * 命令：`npm i 包的完整名称 -D`

  2.核心依赖包

  * 概念：开发期间和上线后都会使用，被记录到 dependencies 节点中的包
  * 命令：`npm i 包的完整名称`

#### 4.4.2 全局包

* 概念：执行 `npm install` 命令时，如果提供了 -g 参数，则会把包安装为全局包
* 全局包会被安装到 `C:\Users\Administrator\AppData\Roaming\npm\node_modules` 目录
* 全局安装包命令：`npm i 包的完整名称 -g`
* 卸载全局安装包：`npm uninstall 包的完整名称 -g`
* 注意：
  * 只有工具性质包，才有全局安装的必要性。因为它们提供了好呀的终端命令
  * 判断某个包是否需要全局安装，可参考官方提供的使用说明

### 4.5 规范的包结构

**规范的包的组成结构，必须符合如下3点要求：**

1. 包必须以单独目录存在
2. 包的顶级目录下必须包含 package.json 包管理配置文件
3. package.json 中必须包含三个属性： name 名字, version 版本号, main 包入口

### 4.6 开发属于自己的包

1. 需要实现功能

2. 初始化包的基本结构

   1. 新建 a 文件夹，作为包的根目录
   2. 在 a 文件夹中，新建如下说那个文件：
      * package.json （包管理配置文件）
      * index.js （包的入口文件）
      * README.md （包的说明文档）

3. 初始化 package.json

   * name: 名字
   * version：版本号
   * main：包的入口
   * description：搜索包的描述
   * keywords：搜索包的关键字
   * license：开源协议

   ```javascript
   {
     "name": "wangchaoa", 
     "version": "1.0.0",
     "main": "index.js",
     "description": "wangchaoa",
     "keywords": ["wangchaoa", "a", "b"],
     "license": "ISC"
   }
   ```

### 4.7 发布包

1. 注册 npm 账号
2. 登录 npm 账号
   * 终端输入命令：`npm login`
   * 在执行 `npm login` 命令之前，必须先把下包的服务器切换到 npm 官方服务器
3. 把包发布到 npm 上
   * 将终端切换到包的根目录之后，运行 `npm publish` 命令，即可将包发布到 npm 上（注意：包名不可重复）
4. 删除已发布的包
   * 运行 `npm unpublish 包的完整名称 --force` 命令，即可从 npm 删除已发布的包
   * 注意：
     1. `npm unpublish` 命令只能删除 72 小时以内发布的包
     2. `npm unpublish` 删除的包，在 24 小时内不允许重复发布
     3. 尽量不在 npm 上发布没有意义的包

## 5. 模块的加载机制

### 5.1 优先从缓存中加载

* 模块在第一次加载后会被缓存：多次调用 require( ) 不会熬制模块的代码被执行多次
* 注意：不论是内置模块、自定义模块、第三方模块，都会优先从缓存中加载，从而提高模块的加载效率

#### 5.2 内置模块的加载机制

* 内置模块是由 node.js 官方提供的模块，内置模块的加载优先级最高
* 若自定义模块或第三方模块的名字和内置模块冲突，也是优先加载内置模块

### 5.3 自定义模块的加载机制

* 使用 require ( ) 加载自定义模块时，必须以 ./ 或 ../ 开头的路径标识符，否则 node 会把它当做内置模块或第三方模块进行加载
* 在使用 require ( ) 导入自定义模块时，如果省略文件扩展名，则 node.js 会按顺序分别尝试加载如下文件：
  1. 按照确切的文件名
  2. 补全 .js 扩展名
  3. 补全 .json 扩展名
  4. 补全 .node 扩展名
  5. 加载失败，终端报错

### 5.4 第三方模块加载机制

* 如果传递给 require ( ) 的模块标识符不是一个内置模块，也没有以 ./ 或 ../ 开头，则 node.js 会从当前模块的父目录开始，尝试从 /node_modules 文件夹中加载第三方模块
* 如果没有找到对应的第三方模块，则移动到上一层父目录中，进行加载，直到文件系统的根目录，根目录找不到则报错

### 5.5 目录作为模块

* 当把目录作为模块标识符，传递给 require ( ) 进行加载时，有三种加载方式：
  1. 在被加载目录下查找 package.json 文件，寻找 main 属性，作为 require ( ) 加载入口
  2. 如果目录中没有 package.json 文件 或 main 入口不存在或者无法解析，则 node.js 会尝试加载目录下的 index.js 文件
  3. 如果上面两步都失败了，则 node.js 会在终端打印错误消息，报告模块缺失：Error：Cannot find module 'xxx'

## 6. Express

* 概念：是一个 npm 上的第三方包，基于 node.js 平台，快速、开放、极简的 Web 开发框架
* 作用：专门用来快速创建 Web 服务器
* 使用场景：快速创建 Web 网站服务器或 API 接口服务器

### 6.1 基本使用

1. 安装

   * 在项目所处目录，执行命令 `npm i express@4.17.1`，即可完成 express 安装

2. 创建基本的 Web 服务器

   ```javascript
   // 1. 导入 express
   const express = require('express')
   
   // 2. 创建 web 服务器
   const app = express()
   
   // 3. 调用 app.listen(端口号，启动成功后的回调函数)，启动服务器
   app.listen(80, () => {
     console.log('express 创建的服务器地址：http://127.0.0.1');
   })
   ```

3. 监听 GET 请求

   * 通过 app.get( ) 方法，可以监听客户端的 GET 请求

   * 语法格式：

     ```javascript
     // 参数1：客户端请求的 URL 地址
     // 参数2：请求对应的处理函数，req：请求对象（包含请求相关属性和方法），res：响应对象（包含响应相关属性和方法）
     
     app.get('请求URL', function(req, res) {
     /* 处理函数 */
     })
     ```

4. 监听 POST请求

   * 通过 app.post( ) 方法，可以监听客户端的 POST 请求

   * 语法格式：

     ```javascript
     // 参数1：客户端请求的 URL 地址
     // 参数2：请求对应的处理函数，req：请求对象（包含请求相关属性和方法），res：响应对象（包含响应相关属性和方法）
     
     app.post('请求URL', function(req, res) {
     /* 处理函数 */
     })
     ```

5. 把内容响应给客户端

   * 通过 res.send( ) 方法，把处理好的内容，发送给客户端

   * 语法格式：

     ```javascript
     app.get('/user', (req, res) => {
       // 向客户端发送 JSON 对象
       res.send({name:'itchao', age: 22, height: 1.85})
       })
     
     app.post('/user', (req, res) => {
       // 向客户端发送文本内容
       res.send('请求成功！')
       })
     ```

6. 获取 URL 中携带的查询参数

   * 通过 req.query 对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数

   * 语法格式：

     ```javascript
     app.get('/', (req, res) => {
       // req.query 默认是一个空对象
       // 客户端使用 ? name = itchao & age=22，发送到服务器的参数
       // 可以通过 req.query 对象访问到,如：req.query.name req.query.age
       console.log(req.query);
       res.send(req.query)
     })
     ```

7. 获取 URL 中的动态参数

   * 通过 req.params 对象，可以访问到 URL 中，通过 ：匹配到的动态参数

   * 语法格式：

     ```javascript
     // URL 地址中，可以通过：参数名的形式，匹配动态参数值
     app.get('/user/:id', (req, res) => {
       // req.params 默认是一个空对象
       // 里面存放这通过 ：动态匹配到的参数值
       console.log(req.param);
       res.send(req.param)
     })
     ```

### 6.2 托管静态资源

1. express.static( )

   * 作用：快速创建一个静态资源服务器
   * 语法格式：`app.use(express.static('public'))`
   * 注意：Express 在指定静态目录中查找文件，并对外提供资源的访问路径，因此，存放静态文件目录名不会出现在 URL 中
   * 访问示例：`http:127.0.0.1/index.html`

2. 托管多个静态资源目录

   * 多次调用 express.static( ) 函数，即可托管多个静态资源目录

   * 语法格式：

     ```javascript
     app.use(express.static('public'))
     app.use(express.static('files'))
     ```

   * 注意：访问静态资源文件时，express.static( ) 函数会根据目录的添加顺序查找所需文件（若有同名文件，则以前面文件为准）

3. 挂载路径前缀

   * 在托管的静态资源访问路径之前，挂载路径前缀
   * 语法格式：`app.use('/public', express.static('public'))`
   * 访问示例：`http:127.0.0.1/public/index.html`

### 6.3 nodemon

* 作用：监听项目文件变动，当代码修改后，nodemon 自动帮助重启项目，方便开发和调试项目
* 安装方式：`npm install -g nodemon`
* 使用方式：`nodemon abc.js` 启动项目。好处：代码修改后·，自动重启项目
* 传统方式： `node abc.js` 启动项目。坏处：代码修改后，手动重启项目

### 6.4 Express 路由

* 路由：即映射关系

* Express 路由：客户端请求和服务器处理函数之间的映射关系

* Express 路由的组成：请求类型、请求 URL 地址、处理函数

* 语法格式：`app.method(path, handle)`

* 示例：

  ```javascript
  app.get('/', function (req, res) {
  res.send('hello express!')
  })
  ```

#### 6.4.1 路由匹配过程

* 每当请求到达服务器后，先经过路由匹配，当路由匹配成功后，才调用对应处理函数
* 在匹配时，按路由顺序匹配，如果请求类型和请求 URL 同时匹配成功，则 Express 会将这次请求转交给对应函数处理
* 注意：
  1. 按照定义先后顺序匹配
  2. 请求类型和请求 URL 同时匹配成功，才调用对应处理函数

#### 6.4.2 模块化路由

* 作用：将路由抽离成单独模块，便于对路由进行模块化管理

* 将路由抽离为单独模块的步骤如下：

  1. 创建路由模块对应 .js 文件
  2. 调用 express.Router( ) 函数，创建路由对象
  3. 向路由对象上挂载具体路由
  4. 使用 module.exports 向外共享路由对象
  5. 使用 app.use( ) 函数，注册路由模块

* 创建路由模块示例：

  ```javascript
  // 1. 导入 express
  const express = require('express');
  // 2. 创建路由对象
  const router = express.Router()
  // 3. 挂载具体路由
  router.get('/user/list', function (req, res) {
    res.send('GET')
  })
  
  router.post('/user/add', function (req, res) {
    res.send('POST')
  })
  
  // 4. 导出路由对象
  module.exports = router
  ```

* 注册路由示例：

  ```javascript
  const express = require('express')
  
  const app = express()
  
  // 1. 导入路由模块
  const bRouter = require('./b.js')
  // 2. 注册路由
  app.use(bRouter)
  
  app.listen(80, () => {
    console.log('http://127.0.0.1');
  })
  ```

* 为路由模块添加前缀

  * 注册路由时，给路由模块添加前缀
  * 语法格式：`app.use('/api', bRouter)`

### 6.5 Express 中间件

* 中间件：业务流程中的中间处理环节

* Express 中间件调用流程：当请求到达 Express 服务器后，可连续调用多个中间件，对请求进行预处理

* Express 中间件格式：本质是一个 function 处理函数

  ```javascript
  app.get('/', function (req, res, next) {
    next()
  })
  ```

* 注意：中间件函数的形参列表中，必须包含 next 参数。而路由处理函数只包含 req 和 res

* next 函数作用：实现多个中间件连续调用，表示把流转关系转交给下一个中间件或者路由

#### 6.5.1 Express 中间件初体验

1. 定义中间件函数

   ```javascript
   const a = function (req, res, next) {
     console.log('简单中间件的定义')、
     next()
   }
   ```

2. 全局生效的中间件

   * 概念：客户端发起的任何请求，到达服务器后，都会触发的中间件

   * 定义方式：调用 `app.use(a)` 

   * 语法格式：

     ````javascript
     // 常量a指向的就是一个中间件函数
     const a = function (req, res, next) {
       console.log('简单中间件的定义')、
       next()
     }
     
     // 全局生效的中间件
     app.use(a)
     ````

3. 全局中间件的简写形式

   ```javascript
   app.use(function (req, res, next) {
   console.log('全局中间件的简写形式')
     next()
   })
   ```

4. 中间件作用

   * 特性：多个中间件之间，共享同一份 req 和 res
   * 作用：简化代码编写
   * 具体操作：在上游中间件中，统一为 req 或 res 对象添加自定义的属性或方法，供下游的中间件或路由使用

5. 定义多个全局中间件

   * 用法：使用 app.use( ) 连续定义多个全局中间件

   * 效果：客户端请求到达服务器后，按照中间件定义的先后顺序依次调用

   * 语法格式：

     ```javascript
     app.use(function (req, res, next) {
     console.log('第1个全局中间件')
       next()
     })
     
     app.use(function (req, res, next) {
     console.log('第2个全局中间件')
       next()
     })
     
     app.get('/', function (req, res) {
     res('GET 请求成功调用！')
     })
     ```

6. 局部生效的中间件

   * 概念：不在 app.use( ) ，而在请求中直接使用的中间件

   * 语法格式：

     ```javascript
     const b = function (req, res, next) {
       console.log('局部生效中间件！')
       next()
     }
     
     app.get('/', b, function (req, res) {
         res.send('GET 请求成功！')
     })
     ```

7. 定义多个局部中间件

   * 定义方式：（两者等价）

     1. 逗号分隔：

        ```javascript
        app.get('/', b1, b2, function (req, res) {
            res.send('逗号分隔')
        })
        ```

        

     2. 数组分隔：

        ```javascript
        app.get('/', [b1, b2] , function (req, res) {
            res.send('数组分隔')
        })
        ```

8. 中间件的5个注意事项
   1. 一定要在路由之前注册中间件
   2. 客户端发送的请求，可以连续调用多个中间件进行处理
   3. 执行完中间件的业务代码后，不要忘记调用 next ( ) 函数
   4. 防止代码逻辑混乱，调用 next ( ) 函数后不要写额外代码
   5. 连续调用多个中间件时，多个中间件之间，可共享 req 和 res 对象

#### 6.5.2 中间件分类

1. 应用级别中间件

   * 概念：通过 app.use( ) 或 app.get( ) 或 app.post( )，绑定到 app 实例上的中间件

2. 路由级别中间件

   * 概念：绑定到 express.Router( ) 实例上的中间件

3. 错误级别中间件

   * 作用：捕获整个项目发生的异常错误，防止项目异常崩溃
   * 格式：错误级别中间件的 function 处理函数中，必须有4个形参，function ( err, req, res, next )
   * 注意：错误级别的中间件，必须注册在所有路由之后

4. Express 内置中间件

   * 作用：提高 Express 项目开发效率

     1. express.static：快速托管静态资源，如：HTML 文件、CSS 样式等（无兼容性）

     2. express.json：解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0 + 版本可用）
        * 语法格式：`app.use(express.json())`
        * 接收客户端发送的请求体数据：`req.body`
        * 默认情况下，如果不配置解析表单数据的中间件，则 `req.body` 默认等于 undefined
     3. express.urlencoded：解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0 + 版本可用）
        * 语法格式：`app.use(express.urlencoded({ extended: false }))`
        * 在服务器端，可通过 `req.body` 来获取 JSON 格式的表单数据和 url-encoded 格式数据

5. 第三方中间件

   * 概念：非 Express 官方内置，而是由第三方开发出来的中间件
   * 注意：在项目中，可按需下载并配置第三方中间件，从而提高项目的开发效率

### 6.6 使用 Express 写接口

#### 6.6.1 创建基本服务器

* server.js

```javascript
// 1. 导入 express 模块
const express = require('express');
// 2. 创建 express 服务器实例
const app = express();

// 3. 调用 app.listen()，指定端口号并启动 web 服务器
app.listen(80, () => {
  console.log('http://127.0.0.1');
})
```

#### 6.6.2 创建 API 路由模块

* apiRouter.js

  ```javascript
  // 1. 导入 express 模块
  const express = require('express')
  // 2. 调用 express.Router() 创建路由模块实例
  const apiRouter = express.Router()
  
  // 3. 导入路由模块实例
  module.exports = apiRouter
  ```

* server.js

  ```javascript
  // 1. 导入 express 模块
  const express = require('express');
  // 2. 创建 express 服务器实例
  const app = express();
  
  // 导入并注册路由模块
  const apiRouter = require('./apiRouter')
  app.use('/api', apiRouter);
  
  // 3. 调用 app.listen()，指定端口号并启动 web 服务器
  app.listen(80, () => {
    console.log('http://127.0.0.1');
  })
  ```

#### 6.6.3 编写 GET 请求

```javascript
apiRouter.get('/get', (req, res) => {
  // 1. 获取到客户端通过查询字符串，发送到服务器的数据
  const query = req.query
  // 2. 调用 res.send() 方法，把数据响应给客户端
  res.send({
    state: 0,
    msg: 'get 请求成功',
    data: query
  })
})
```

#### 6.6.4 编写 POST 请求

```javascript
apiRouter.post('/post', (req, res) => {
  // 1. 获取客户端通过请求体，发送到服务器的 URL-encoded 数据
  const body = req.body
  // 2. 调用 res.send() 方法，把数据响应给客户端
  // 注意：要获取 URL-encoded 格式的请求体数据，必须配置中间件 app.use(express.urlencoded({extended:false}))
  res.send({
    state: 0,
    msg: 'post 请求成功',
    data: body
  })
})
```

#### 6.6.5 CORS 跨域资源共享

* 跨域：当协议、域名、端口，至少有一个

1.接口的跨域问题

* 解决方案：
  1. CORS （主流方案，推荐使用）
  2. JSONP（有缺陷方案：只支持 GET 请求）

2. 使用 cors 中间件解决跨域问题

   * cors 是 Express 的一个第三方中间件
   * 通过安装和配置 cors 中间件，就可以很方便的解决跨域问题
   * 使用步骤：
     1. 运行 `npm install cors` 安装中间件
     2. 使用 `const cors = require('cors')` 导入中间件
     3. 在路由之前调用 `app.use(cors())` 配置中间件

3. CORS 是什么

   * CORS（Cross-Origin Resource Sharing，跨域资源共享）由一系列 HTTP 响应头组成，这些 HTTP 响应头决定浏览器是否阻止前端 JS 代码跨域获取资源
   * 浏览器的同源安全策略默认会阻止网页 “跨域” 获取资源。但如果接口服务器配置 CORS 相关 HTTP 响应头，就可以解除浏览器端的跨域访问限制

4. CORS 注意事项

   * CORS 主要在服务端进行配置，客户端浏览器无须做任何额外配置，即可请求开启了 CORS 的接口
   * CORS 在浏览器中有兼容性。只支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服务端接口（例如：IE 10+、Chrome4+、FireFox3.5+ ）

5. CORS 响应头部 Access-Control-Allow-Origin

   * 语法格式：` Access-Control-Allow-Origin: <origin> | *`
   * origin 参数值指定了允许访问该资源的外域 URL，如果参数值为通配符 *，表示允许来自任何域的请求
   * 示例：`res.setHeader('Access-Control-Allow-Origin', 'http://itcast.cn')`

6. CORS 响应头部 Access-Control-Allow-Headers

   * 默认情况下，CORS 仅支持客户端向服务器发送如下的9个请求头：

   * Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width、Content-Type（值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）

   * 如果客户端向服务器发送额外请求头信息，则需要在服务器端，通过 Access-Control-Allow-Headers 对额外请求头进行声明，否则这次请求会失败

   * 语法格式：

     ```javascript
     // 允许客户端额外想服务器端发送 Content-Type 请求头和 X-Custom-Header 请求头
     // 注意：多个请求头之间使用英文逗号进行分隔
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header')
     ```

7. CORS 响应头部 Access-Control-Allow-Methods

   * 默认情况下，CORS 仅支持客户端发起 GET、POST、HEAD 请求

   * 如果客户端希望通过 PUT、DELETE 等方式请求服务器资源，则需要在服务器，通过 Access-Control-Allow-Methods 来指明实际请求所允许使用的 HTTP 方法

   * 语法格式：

     ```javascript
     // 只允许 POST、GET、DELETE、HEAD 请求方法
     res.setHeader('Access-Control-Allow-Methods', 'POST、GET、DELETE、HEAD')
     // 允许所有的 HTTP 请求方法
     res.setHeader('Access-Control-Allow-Methods', '*')
     ```

   8.CORS 请求分类

   * 客户端在请求 CORS 接口时，根据请求方式和请求头的不同，可以将 CORS 请求分为两大类：简单请求和预检请求

     1. 简单请求：

        同时满足以下两大条件的请求，就属于简单请求：

        * 请求方式：GET、POST、HEAD 之一
        * HTTP 头部信息不超过以下几种字段：无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width、Content-Type（值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）

     2. 预检请求：

        只要符合以下任何一个条件的请求，都需要进行预检请求：

        * 请求方式：GET、POST、HEAD 之前的 Method 类型
        * 请求头中包含自定义头部字段
        * 向服务器发送 application/json 格式数据

        在浏览器与服务器正式通信之前，浏览器会先发送 OPTION 请求进行预检，以获知服务器是否允许该实际请求，所以这次 OPTION 请求被称为 “预检请求”。服务器成功响应预检请求后，才会发生真正请求，并且携带真实数据

     3. 简单请求和预检请求的区别：

        简单请求特点：客户端与服务器之间只发生一次请求

        预检请求特点：客户端与服务器之间会发生两次请求，OPTION 预检请求成功之后，才会发起真正的请求

#### 6.6.6 JSONP 接口

**1. JSONP 概念和特点**

* 概念：浏览器端通过 `<script>` 标签的 src 属性，请求服务器数据，同时，服务器返回一个函数的调用。这种请求数据的方式叫 JSONP
* 特点：
  1. JSONP 不属于真正的 Ajax 请求，因为未使用 XMLHttpRequest 对象
  2. JSONP 只支持 GET 请求，不支持 POST、PUT、DELETE 等请求

**2.创建 JSONP 接口的注意事项**

* 如果项目中已经配置了 CORS 跨域资源分享，为了防止冲突，必须在配置 CORS 中间件之前声明 JSONP 的接口，否则 JSONP 接口会被处理成开启了 CORS 的接口

**3.实现 JSONP 接口步骤**

1. 获取客户端发送过来的回调函数的名字
2. 得到要通过 JSONP 形式发送给客户端的数据
3. 根据前两步得到的数据，拼接出一个函数调用的字符串
4. 把上一步拼接得到的字符串，响应给客户端的 `<script>` 标签进行解析执行

## 7. 数据库

### 7.1 数据库基本概念

#### 7.1.1 什么是数据库

* 数据库(database)：组织、存储和管理数据的仓库
* 为了方便管理互联网世界的数据，就有了数据库管理系统的概念（简称：数据库）
* 用户可以对数据库中的数据进行新增、查询、更新、删除等操作

#### 7.1.2 常见数据库及分类

* 最常见数据库有如下几种：
  1. MySQL 数据库（使用最广泛、流行度最高的开源免费数据库；Community 社区免费版 + Enterprise 企业版 ）
  2. Oracle 数据库（收费）
  3. SQL Server 数据库（收费）
  4. MongoDB 数据库 （Community 社区免费版 + Enterprise 企业版 ）
* 数据库分类：
* 传统型数据库（关系型数据库、SQL 数据库）：MySQL、Oracle、SQL Server，这三者的设计理念相同，用法比较类似
* 新型数据库（非关系数据库、NoSQL 数据库）：MongoDB，它在一定程度上弥补了传统型数据库的缺陷

#### 7.1.3 传统型数据库的数据组织结构

* 数据组织结构：数据以什么样的结构进行存储
* 传统型数据库的数据组织架构，与 Excel 中数据的组织结构类似
* 传统型数据库的数据组织结构组成：数据库 (database)、数据表 (table)、数据行 (row)、字段 (field) 
  1. 数据库 -> 工作簿
  2. 数据表 -> 工作表
  3. 数据行 -> 每行数据
  4. 字段 -> 列
  5. 每个字段都有对应的数据类型
* 实际开发中库、表、行、字段的关系：
  1. 一般情况下，每个项目都有对应独立的数据库
  2. 不同数据，需要存储到数据库中不同的表。如：用户数据存储到 users 表，图书数据存储到 books 表
  3. 表中的行，代表每条具体的数据
  4. 每个表中具体存储哪些信息，由字段决定。如：users 表设计 id、username、password 3个字段

### 7.2 安装并配置 MySQL

#### 7.2.1 安装 MySQL 相关软件

* 开发人员安装：MySQL Server 和 MySQL Workbench
* MySQL Server：提供数据存储和服务的软件
* MySQL Workbench：可视化的 MySQL 管理工具，方便操作存储在 MySQL Server 中的数据

### 7.3 创建数据库

#### 7.3.1 设计表

1. 表名、表注释
2. 字段名、字段注释、字段数据类型、字段特殊标识

* DataType 数据类型：
  1. int 整数
  2. varchar(len) 字符串
  3. tinyint(1) 布尔值
* 字段特殊标识：
  1. PK (Primary Key) ：主键、唯一标识
  2. NN（Not Null）：值不允许为空
  3. UQ（Unique）：值唯一
  4. AI（Auto Increment）：值自动增长
  5. Default/Expression：默认值

#### 7.3.2 使用 SQL 管理数据库

1.  什么是 SQL

   * 概念：结构化查询语言，专门用来访问和处理数据库的编程语言
   * 作用：以编程形式，操作数据库内的数据
   * 注意点：
     1. SQL 是一门数据库编程语言
     2. 使用 SQL 语言编写出来的代码，叫 SQL 语句
     3. SQL 语言只在关系型数据库中使用（如：MySQL、Oracle、SQL Server），非关系型数据库（如：MongoDB）不支持 SQL 语言

2. SQL 使用场景

   * 新增、删除、查询、更新数据
   * 创建新数据库、在数据库中创建新表
   * 在数据库中创建存储过程、视图
   * 等等

3. SQL 中的 SELECT 语句

   * 作用：查询数据

   * 执行的结果被存储在一个结果表中（被称为结果集）

   * 语法格式：

     ```sql
     -- 注释格式
     -- 查询指定表的所有列数据
     -- 伪代码: SELECT * FORM 表名称
     SELECT * FROM users
     -- 查询指定表中的指定列(字段)数据
     -- 伪代码: SELECT 列名称 FROM 表名称
     SELECT username FROM users
     ```

   * 注意：

     1. SQL 语句中的关键字对大小写不敏感。如：SELECT 等同 select，FROM 等同 from
     2. 多个列名之间用逗号（,）分隔

4. SQL 中的 INSERT INTO 语句

   * 作用：新增数据

   * 语法格式：

     ```sql
     -- 伪代码: INSERT INTO table_name （列1, 列2...） VALUES (值1, 值2...)
     INSERT INTO users (id) VALUES (99)
     ```

   * 注意：
     1. 向指定表插入数据时，列的值通过 VALUES 指定
     2. 列和值必须要对应指定，多个列和多个值之间，用逗号 (,) 分隔

5. SQL 中的 UPDATE 语句

   * 作用：更新数据

   * 语法格式：

     ```sql
     -- 伪代码: UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 对应列的值
     UPDATE users SET username = 'itchao' WHERE username = 'zs'
     ```

   * 注意：

     1. UPDATE 指定表的名称
     2. SET 指定列的新值
     3. WHERE 指定更新条件
     4. 多个列之间，用逗号 (,) 分隔

6. SQL 中的 DELETE 语句

   * 作用：删除数据

   * 语法格式：

     ```sql
     -- 伪代码: DELETE FROM 表名称 WHERE 列名称 = 对应列的值
     DELETE FROM users WHERE username = 'aaaqa';
     ```

   * 注意：从指定表中，根据 WHERE 条件，删除对应数据行
   
7. SQL 中的 WHERE 子句

   * 作用：限定选择条件

   * 使用场景：在 SELECT、UPDATE、DELETE 语句中，都可使用 WHERE 子句来限定选择条件

   * 语法格式：

     ```sql
     -- 查询语句
     SELECT 列名称 FROM 表名称 WHERE 列名称 运算符 值
     -- 更新语句
     UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 运算符 值
     -- 删除语句
     DELETE FROM 表名称 WHERE 列名称 运算符 值
     ```

   * 运算符：

     * `=`：等于
     * `<>`：不等于（在某些版本的 SQL 中，操作符 <> 可以写成 != ）
     * `>`：大于
     * `<`：小于
     * `>=`：大于等于
     * `<=`：小于等于
     * `BETWEEN`：在某个范围内
     * `LIKE`：搜索某种模式

8.  SQL 中的 AND 和 OR 运算符

    * 作用：把两个或多个条件结合起来
    * AND：必须同时满足多个条件
      * 示例：`SQL * FROM users WHERE state = 0 AND id = 3`
    * OR：只要满足任意一个条件即可
      * 示例：`SQL * FROM users WHERE username= 'itchao' OR id < 2`

9.  SQL 中的 ORDER BY 子句

    * 作用：根据指定列对结果集排序
    * 注意：默认按升序进行排序，ASC 关键字可省略；若想按降序进行排序，则可使用 DESC 关键字
    * 升序示例：`select * from users order by password`
    * 降序示例：`select * from users order by password desc`
    * 多重排序：
      * 作用：先按大分类排序，在按大分类中的小分类进行排序
      * 语法示例：`select * from users order by password, id desc`

10.  SQL 中的 COUNT(*) 函数

     * 作用：返回查询结果的总数据条数

     * 语法格式：

       ```sql
       -- 伪代码: select count(*) from 表名称 WHERE 列名 运算符 值
       select count(username) from users where id = 100
       ```

     * 给列名设置别名：

       * 使用 AS 设置别名
       * 示例：`select count(username) as name from users where id = 100`

### 7.4 在项目中操作 MySQL

#### 7.4.1 在项目中操作数据库的步骤

1. 安装操作 MySQL 数据库的第三方模块（mysql）
2. 通过 mysql 模块链接到 MySQL 数据库
3. 通过 mysql 模块执行 SQL 语句

#### 7.4.2 安装与配置 mysql 模块

1. 安装 mysql 模块：

   * 概念：mysql 模块是托管于 npm 上的第三方模块
   * 作用：提供了在 Node.js 项目中连接和操作 MySQL 数据库的能力
   * 安装命令：`npm install mysql`

2. 配置 mysql 模块：

   1. 导入 mysql 模块

   2. 建立与 MySQL 数据库连接

   3. 语法格式：

      ```javascript
      // 1. 导入 mysql 模块
      const mysql = require('mysql')
      // 2. 建立与 MySQL 数据库连接关系
      const db = mysql.createPool({
        host: '127.0.0.1',  // 数据库 IP 地址
        user: 'root',  // 数据库账号
        password: 'admin123',  // 数据库密码
        database: 'database01'  // 指定操作哪个数据库
      })
      ```

 #### 7.4.3 使用 mysql 模块操作 MySQL 数据库

1. 查询数据

   * 语法格式：

     ```javascript
     const select = 'select * from useras'
     // 执行 select 查询语句，输出结果是数组
     db.query(select, (err, res) => {
       if (err) {
         console.log('错误信息：', err.message);
       }
       else {
         console.log(res);
       }
     })
     ```

     

2. 插入数据

   * 语法格式：

     ```javascript
     // 1.定义插入数据对象
     const user = {
       username: '插入数据1',
       password: 'q'
     }
     // 2. 待执行的 SQL 语句，英文的 ? 表示占位符
     const insertInto = 'insert into users (username, password) values (?, ?)'
     // 3. 使用数组形式，依次为 ? 占位符指定具体值
     // 执行 insert into 语句，输出结果是对象
     db.query(insertInto, [user.username, user.password], (err, res) => {
       if (err) {
         return console.log(err.message);
       }
       // 通过 affectedRows 属性，可以判断插入数据是否成功
       if (res.affectedRows === 1) {
         console.log('插入数据成功！');
       }
     })
     ```

     

3. 插入数据的简写方式

   * 前提：新增数据时，如果数据对象的每个属性和数据表的字段 一 一 对应，则可使用插入数据的简写方式

   * 语法格式：

     ```javascript
     // 1.定义插入数据对象
     const userA = {
       username: '新数据',
       password: 'a'
     }
     // 2. 待执行的 SQL 语句，set 表示设置值，英文的 ? 表示占位符
     const insertIntoA = 'insert into users set ?'
     // 执行 insert into 语句，输出结果是对象
     db.query(insertIntoA, userA, (err, res) => {
       if (err) {
         return console.log(err.message);
       }
       // 通过 affectedRows 属性，可以判断插入数据是否成功
       if (res.affectedRows === 1) {
         console.log('数据插入成功');
       }
     })
     ```

4. 更新数据

   * 语法格式：

     ```javascript
     // 1. 找到将更新的数据对象并写入新值到该数据对象
     const userC = {
       id: 7,
       username: '更新数据2',
       password: 'b'
     }
     // 2. 定义 SQL 语句
     const updateC = 'update users set username=?, password=? where id=?'
     // 3. 执行 SQL 语句
     // 执行 update 语句，输出结果是对象
     db.query(updateC, [userC.username, userC.password, userC.id], (err, res) => {
       if (err) {
         return console.log(err.message);
       }
       // 通过 affectedRows 属性，可以判断插入数据是否成功
       if (res.affectedRows) {
         console.log('更新数据成功！');
       }
     })
     ```

     

5. 更新数据的简写方式

   * 前提：更新数据时，如果数据对象的每个属性和数据表的字段 一 一 对应，则可使用更新数据的简写方式

   * 语法格式：

     ```javascript
     // 1. 找到将更新的数据对象并写入新值到该数据对象
     const userB = {
       id: 6,
       username: '更新数据B2',
       password: 'b'
     }
     // 2. 定义 SQL 语句
     const update = 'update users set ? where  id = ?'
     // 3. 执行 SQL 语句
     // 执行 update 语句，输出结果是对象
     db.query(update, [userB, userB.id], (err, res) => {
       if (err) {
         return console.log(err.message);
       }
       // 通过 affectedRows 属性，可以判断插入数据是否成功
       if (res.affectedRows) {
         console.log('更新数据成功！B');
       }
     })
     ```

6. 删除数据

   * 注意：

     1. 删除数据时，推荐根据 id 这样的唯一标识，来删除对应的数据
     2. 如果 SQL 语句中有多个占位符，则必须使用数组为每个占位符指定具体的值
     3. 如果 SQL 语句中只有一个占位符，则可以省略数组

   * 语法格式：

     ```javascript
     // 1. 定义 SQL 语句
     const deleteA = 'delete from users where id = ?'
     // 2. 执行 SQL 语句
     // 执行 delete 语句，输出结果是对象
     db.query(deleteA, 7, (err, res) => {
       if (err) {
         return console.log(err.message);
       }
       // 通过 affectedRows 属性，可以判断删除数据是否成功
       if (res.affectedRows === 1) {
         console.log('删除数据成功！');
       }
     })
     ```

7. 标记删除

   * 原因：使用 delete 语句，会直接把数据从表中删除。为了保险起见，推荐使用标记删除形式，模拟删除动作。

   * 概念：在表中设置类似于 status 这样的状态字段，来标记当前这条数据是否被删除

   * 解析：当用户执行标记删除时，实际上没有执行 delete 语句把数据删除，而是执行 update 语句进行更新类似 status 状态字段

   * 语法格式：

     ```javascript
     // 1. 定义 SQL 语句
     const deleteTag = 'update users set state = ? where id = ?'
     // 2. 执行 SQL 语句
     // 执行 update 语句，输出结果是对象
     db.query(deleteTag, [1, 6], (err, res) => {
       if (err) {
         return console.log(err.message);
       }
       // 通过 affectedRows 属性，可以判断标记删除数据是否成功
       if (res.affectedRows === 1) {
         console.log('标记删除成功！');
       }
     })
     ```

## 8. 前后端的身份认证

### 8.1 Web 开发模式

* 分类：
  1. 服务端渲染的传统 Web 开发模式
     * 概念：服务器发送给客户端的 HTML 页面，是在服务器通过字符串拼接，动态生成的。因此，客户端不需要使用 AJAX 额外请求页面数据
     * 优点：
       1. 前端耗时少：服务端动态生成 HTML 内容，浏览器直接渲染页面。尤其是移动端，更省电
       2. 有利于 SEO：服务端响应完整的 HTML 内容，爬虫更容易爬取获得信息
     * 缺点：
       1. 占用服务器端资源：服务器端完成 HTML 内容拼接，如果请求较多，会对服务器造成访问压力
       2. 不利于前后端分离，开发效率低：无法分工合作，对于前端复杂度高的项目，不利于项目高效开发
  2. 前后端分离的新型 Web 开发模式
     * 概念：后端负责提供 API 接口，前端使用 AJAX 调用接口的开发模式
     * 优点：
       1. 开发体验好：前端负责 UI 页面开发，后端负责 API 接口开发，且前端有更多选择性
       2. 用户体验好：AJAX 技术的广泛应用，提高了用户体验，可轻松实现页面局部刷新
       3. 减轻服务器端的渲染压力：页面最终在每个用户的浏览器中生成
     * 缺点：
       1. 不利于 SEO：完整的 HTML 页面需要在客户端动态拼接完成，所有爬虫无法爬取页面的有效信息
       2. 解决方案：利用 Vue、React 等前端框架的 SSR 技术能解决 SEO 问题
  3. 如何选择 Web 开发模式
     * 选择方式：根据业务场景选择合适的开发模式
     * 使用场景：
       1. 企业级网站：主要负责展示，没有复杂的交互，且需要良好的 SEO，推荐使用服务器端渲染开发模式
       2. 后台管理项目：交互性较强，不考虑 SEO，推荐使用前后端分离开发模式
       3. 同时兼顾首页渲染速度和前后端分离开发效率：则可采用首页服务器端渲染 + 其他页面前后端分离开发模式

### 8.2 身份认证

#### 8.2.1 什么是身份认证

* 身份认证（身份验证、鉴权）：通过一定手段，完成对用户身份的确认
* 生活中的身份认证：高铁验票乘车、手机密码、微信支付密码等
* Web 开发中用户身份认证：网站的手机验证码登录、邮箱密码登录等

#### 8.2.2 为什么需要身份认证

* 目的：确认用户的身份信息

#### 8.2.3 不同开发模式下的身份认证

1. 服务端渲染：Session 认证机制（推荐）
2. 前后端分离：JWT 认证机制（推荐）

### 8.3 Session 认证机制

#### 8.3.1 HTTP 协议的无状态性

* 概念：客户端的每次 HTTP 请求都是独立的，连续多个请求之间没有直接关系，服务器不会主动保留每次 HTTP 请求状态

#### 8.3.2 如何突破 HTTP 无状态的限制

* 注意：现实生活中的会员卡身份认证方式，Web 开发中专业术语是 Cookie

#### 8.3.3 什么是 Cookie

* 概念：存储在用户浏览器中的一段不超过 4KB 的字符串
* 构成：由一个名称、一个值和其它几个用于控制 Cookie 有效期、安全性、使用范围的可选属性组成
* 注意：不同域名下 Cookie 各自独立，每当客户端发起请求时，自动把当前域名下所有未过期的 Cookie 一同发送到服务器
* 特性：
  1. 自动发送
  2. 域名独立
  3. 4KB 限制
  4. 过期时限

#### 8.3.4 Cookie 在身份认证的作用

* 作用：验证用户身份，连接客户端和服务器端
* 首次请求：
  1. 客户端第一次请求服务器时
  2. 服务器通过响应头的方式，向客户端发送一个可身份验认证的 Cookie
  3. 客户端自动将 Cookie 保存在浏览器中
* 再次请求：
  1. 客户端浏览器再次请求服务器时
  2. 浏览器会自动将身份认证相关的 Cookie，通过请求头的形式发送给服务器
  3. 服务器验证客户端的身份后，响应给客户端相关内容

#### 8.3.5 Cookie 不具有安全性

* Cookie 存储在浏览器中，而且浏览器也提供读写 Cookie 的 API
*  Cookie 很容易被伪造，不具有安全性
* 注意：千万不要让服务器将重要的隐私数据，通过 Cookie 形式发送给浏览器；如：用户身份信息、密码等
* 提高身份认证安全性的操作：客户端提供 Cookie + 服务器验证 Cookie

#### 8.3.6 Session 工作原理

* 工作原理：就是利用 Cookie 在客户端与服务器的连接作用
* 注意：
  1. 将用户重要的隐私信息存储在服务器
  2. 服务器响应给客户端的只是 Cookie
  3. 客户端首次请求服务器时，服务器会存储用户信息，然后返回 Cookie 给客户端
  4. 服务器再次接收到客户端请求时，会根据客户端传递的 Cookie 去匹配服务器存储的用户信息，若匹配成功， 则响应用户特定内容给客户端 

### 8.4 在 Express 中使用 Session 认证

1. 安装 express-session 中间件

   * 命令：`npm install express-session`

2. 配置 express-session 中间件

   * 安装成功后，通过 app.use( ) 注册 express-session 中间件

   * 语法格式：

     ```javascript
     // 1. 导入 express-session 中间件
     const session = require('express-session')
     // 2. 配置 express-session 中间件
     app.use(session({
     secret: 'keyboard cat',  // secret 属性的值可以为任意字符串
     resave: false,   // 固定写法
     saveUninitialized: true  // 固定写法
     }))
     ```

3.向 session 中存数据

* 配置成功后，通过 req.session 来访问和使用 session 对象，从而存储用户的关键信息 

* 语法格式：

  ```javascript
  app.post('api/login', (rq, res) => {
  // 判断用户提交的登录信息是否正确
    if(req.body.username !== 'admin' || req.body.password !== '000'){
      return res.send({ status: 1, msg: '登录失败'})
    }
    
    req.session.user = req.body  // 将用户信息，存储到 Session 中
    req.session.isLogin = true  // 将用户登录状态，存储到 Session 中
    
    res.send({ status: 0, msg: '登录成功'})
  })
  ```

4.从 session 中取数据

* 可直接从 req.session 对象上获取之前存储的数据

* 语法格式：

  ```javascript
  // 获取用户姓名的接口
  app.get('/api/username', (req, res) => {
  // 判断用户是否登录
    if(!req.session.isLogin) {
      return res.send({ status: 1, msg: 'fail'})
    }
    
   res.send({ status: 0, msg: 'success', username: req.session.user.username })
  })
  ```

5.清空 session

* 调用 req.session.destroy( ) 函数，即可清空服务器保存的 session 信息

* 语法格式：

  ```javascript
  // 退出登录的接口
  api.post('api/logout', (req, res) => {
  // 清空当前客户端对应的 session 信息
    req.session.destroy()
    res.send({
    status: 0,
      msg: '退出登录成功'
    })
  })
  ```

### 8.5 JWT 认证机制

#### 8.5.1 了解 Session 认证局限性

* Session 认证机制需要配合 Cookie 才能实现
* 由于 Cookie 默认不支持跨域访问，所以涉及前端跨域请求后端接口时，需要做很多额外配置，才能实现跨域 Session 认证
* 注意：
  1. 前端请求后端接口不存在跨域问题时，推荐使用 Session 身份认证机制
  2. 前后请求后端接口存在跨域问题时，推荐使用 JWT 认证机制

#### 8.5.2 什么是 JWT

* 概念：JWT 是目前最流行的跨域认证解决方案

#### 8.5.3 JWT 工作原理

* 作用：验证用户身份，连接客户端和服务器端
* 首次请求：
  1. 客户端第一次请求服务器时，提交账号和密码
  2. 服务器将用户信息对象经过加密生成 Token 字符串
  3. 服务器将生成的 Token 字符串响应给客户端
  4. 客户端将 Token 字符串存储到 LocalStorage 或 SessionStorage
* 再次请求：
  1. 客户端再次请求服务器时，通过请求头 Authorization 字段，将 Token 发送给服务器
  2. 服务器把 Token 字符串还原成用户信息对象
  3. 用户身份认证成功后，服务器针对当前用户生成特定响应内容
  4. 服务器把当前用户对应页面内容响应给客户端
* 总结：用户信息通过 Token 字符串形式，保存在客户端浏览器中。服务器通过还原 Token 字符串形式来认证用户身份

#### 8.5.4 JWT 组成部分

* 组成：Header（头部）、Payload（有效荷载）、Signature（签名）
* 三者之间使用英文 ( . ) 分隔
* 语法格式：`Header.Payload.Signature`
* 作用：
  1. Payload：真正的用户信息，它是用户信息经过加密之后生成的字符串
  2. Header 与 Signature：安全性相关部分，为了保证 Token 的安全性

#### 8.5.5 JWT 使用方式

* 客户端收到服务器返回的 JWT 之后，通过将它存储在 localStorage 或 sessionStorage 中
* 此后，客户端每次与服务端通信，都要带上这个 JWT 字符串，从而进行身份认证
* 推荐用法：把 JWT 放在 HTTP 请求头的 Authorization 字段
* 语法格式：`Authorization: Bearer <token>`

### 8.6 在 Express 中使用 JWT 认证

1. 安装 JWT 相关包

   * jsonwebtoken：用于生成 JWT 字符串
   * express-jwt：用于将客户端发送的 JWT 字符串解析还原成 JSON 对象
   * 安装命令：`npm install jsonwebtoken express-jwt`

2. 导入 JWt 相关包

   * 使用 require( ) 函数，分别导入 JWT 相关的两个包：

   * 语法格式：

     ```javascript
     // 1. 导入用于生成 JWT 字符串的包
     const jwt = require('jsonwebtoken')
     // 2. 导入用于将客户端发送的 JWT 字符串解析还原成 JSON 对象的包
     const expressJWT = require('expression-jwt')
     ```

3. 定义 secret 密钥

   * 作用：定义一个用于加密和解密的 secret 密钥，保证 JWT 字符串的安全性，防止 JWT 字符串在网络传输过程中被别人破解
   * 具体操作：
     1. 当生成 JWT 字符串时，需要使用 secret 密钥对用户信息进行加密，最终得到加密好的 JWT 字符串
     2. 当 JWT 字符串解析还原成 JSON 对象时，需要使用 secret 密钥进行解密
   * 本质：secret 本质就是一个字符串
   * 语法格式：`const secretKey = 'itchao secret'`

4. 登录成功后生成 JWT 字符串

   * 调用 jsonwebtoken 包提供的 sign( ) 函数，将用户信息加密成 JWT 字符串，响应给客户端

   * 语法格式：

     ```javascript
     // 登录接口
     app.post('api/login', (rq, res) => {
     // 判断用户提交的登录信息是否正确
       if(req.body.username !== 'admin' || req.body.password !== '000'){
         return res.send({ status: 1, msg: '登录失败'})
       }
       // 用户登录成功后，生成 JWT 字符串，通过 token 属性响应给客户端
       res.send({ 
         status: 0,
         msg: '登录成功',
         // 调用 jwt.sign() 生成 JWT 字符串，三个参数分别是：用户信息对象、加密密钥、配置对象
         token: jwt.sign(
           { username: userinfo.username },
           secretKey,
           { expiresIn: '30s' }
         )
       })
     })
     ```

5. 将 JWT 字符串还原为 JSON 对象

   * 客户端每次访问有权限接口时，都需要主动通过请求头中的 Authorization 字段，将 Token 字符串发送到服务器进行身份认证

   * 此时，服务器可以通过 express-jwt 中间件，自动将客户端发送过来的 Token 解析还原成 JSON 对象

   * 语法格式：

     ```javascript
     // 使用 app.use() 注册中间件
     // expressJWT({ secret: secretKey }) 就是解析 Toke 的中间件
     // .unless({ path: [/^\/api\//] }) 用来指定那些接口不需要访问权限
     // 配置成功 express-jwt 中间件后，就可以把解析出来的用户信息，挂载到 req.user 属性上
     app.use(expressJWT({ secret: secretKey }))..unless({ path: [/^\/api\//] })
     ```

6. 使用 req.user 获取用户信息

   * 当 express-jwt 中间件配置成功后，即可在那些有权限的接口中，使用 req.user 对象访问从 JWT 字符串中解析出来的用户信息

   * 语法格式：

     ```javascript
     // 有权限的接口
     
     app.get('/admin/getinfo', (req, res) => {
     console.log(req.user)
     res.send({
     status: 200,
     message: '获取用户信息成功！',
     data: req.user
     })
     })
     ```

7. 捕获解析 JWT 失败后产生的错误

   * 当 express-jwt 解析 Token 字符串时，如果客户端发送的 Token 字符串过期或者不合法，会产生一个解析失败的错误，影响项目的正常运行

   * 可以通过 Express 的错误中间件，捕获这个错误并进行相关处理

   * 语法格式：

     ```javascript
     app.use((err, req, res, next) => {
     // token 解析失败导致的错误
       if(err.name === 'UnauthorizedError') {
         return res.send({ status: 401, message: '无效的token'})
       }
       
       // 其他原因导致的错误
       res.send({ status: 500, message: '未知'})
     })
     ```

     
