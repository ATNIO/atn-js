# ATN Client - atn-js
### atn-js
 简体中文 | [English](README.us-en.md)   
 &emsp;&emsp;***atn-js*** 是基于 **Typescript** 和 **Web3** 开发的程序包，是 **ATN Client** 的一部分。`atn-js`是结合钱包插件***atn-wallet***而开发的，运行于浏览器端的程序包。该包主要适用于第三方可提供签名算法的插件(例如：**atn-wallet**)。`atn-js`目前使用于`AI Market`前端项目，依赖于`atn-wallet`提供账户，从而完成个人账户使用DBotServer AI 调用通道的相关操作。

---

### ATN Client

**ATN Client**目前有以下两个版本：  
   - [atn-js](https://github.com/ATNIO/atn-js)：浏览器端使用，结合[atn-wallet](https://github.com/ATNIO/atn-wallet)，使用`atn-wallet`自身的签名算法;
   - [atn-node-js](https://github.com/ATNIO/atn-node-js)：**Node**版本程序，本程序包Demo项目可参考[ATN Client Example](https://github.com/ATNIO/atn-client-example/tree/alpha#%E8%B0%83%E8%AF%95);  
  
未来会陆续提供 **Java**、**Python**等主流语言版本。


#### 具体使用：
-  创建**AI**调用通道： async createChannel(receiverAddress: string,deposit: string,from: string,cb: Function)
-  获取**AI**通道信息： async getChannelDetail(receiverAddress: string, from: string)
-  增加通道调用次数：    asynctopUpChannel(receiverAddress: string,value: string,from: string,cb: Function) 
-  关闭**AI**调用通道： async closeChannel(receiverAddress: string,from: string,balance: string,callBack: Function)
-  调用**DBotServer AI**服务： async callAPI(dbotAddress: string,method: string,uri: string, option: AxiosRequestConfig,from: string)


----

### 快速开始   
&emsp;&emsp;`atn-js`是**AI Market**所使用的程序包，结合[`atn-wallet`](https://github.com/ATNIO/atn-wallet)使用定制开发，可参考我们的AI Market前端项目：`AI_MARKET_UI`([项目地址](https://github.com/ATNIO/AI_MARKET_UI))，从而帮助你快速开发使用 **atn-js**
 
#### 1. `AI Market` 上查询想要使用的 DBot AI 服务 
   🔗[AI Market地址](https://market-test.atnio.net)  
   例如：**百度NLP**
   ```javascript
   dbotAddress = "0xe4640e4005903e147ebb54dd9ddf17e85ce53303"
   ``` 
   ```javascript
   uri = '/lexer'
   ```
   ```javascript
   method = "post"
   ```
   ![AI Market](http://p5vswdxl9.bkt.clouddn.com/AI_market_ui.png "AI Market UI")	
   
#### 2. 使用 `atn-js`  
   使用该包之前请确认本地已安装node环境(需要V8.0以上node版本)
   ```
   $ node --version 
   ```
   JS项目根目录安装atn-js
   ```markdown
   $ npm install atn-js --save
   ```
 


#### 3. 开发示例  
以下相关示例可参照[AI Market](https://github.com/ATNIO/AI_MARKET_UI)

**具体开发示例**

   STEP 1：引入 **atn-js** 包，浏览器安装`atn-wallet`[下载地址](https://github.com/ATNIO/atn-wallet/releases)
   
   ```javascript
   //  引入atn-js包
   import Atn from "atn-js";
   //  创建window对象
   var atn = new Atn(window.atn3);
   //  设置DBotAddress地址
   const dbotAddress = "0xe4640e4005903e147ebb54dd9ddf17e85ce53303";
   // 账户地址获取
   const eth = this.$atn.web3.eth;
   const accounts = await eth.getAccounts();
   const from = accounts[0]      
   ```
 
   STEP 2：创建DBotServer调用通道
   
   ```js
   // 代码片段  
   // 1. 引入 atn-js 包
   ...

   const deposit = 3e18  //可自定义
   const from = accounts[0] //个人钱包获取的账户地址
   // 2. 使用 步骤(1) 上查询的DBotServer 地址
   const result = await atn.createChannel(dbotAddress, deposit,from,console.log)
   ```  
   
   STEP 3：获取 **DBotServer** 调用通道
   
   ```js
   // 代码片段  
   // 1. 引入 atn-js 包
   ...
   
   // 2. 获取创建的调用通道信息
   const from = accounts[0] 
   const result = await atn.getChannelDetail(dbotAddress,from);
   ``` 
   
   STEP 4：调用指定地址的 **DBotServer AI** 服务
   
   ```js
   // 代码片段
   // 1. 引入 atn-js 包
   ...
   // 2. 获取当前atn-wallet账户
   ...
   const from = accounts[0] 
   // 3. 设置请求参数（百度nlp请求示例）, option参数设置参见 callDBotAI参数具体详情
   var option = {
     headers: {
         "Content-Type": "application/json;charset=UTF-8"
       },
       responseEncoding: "GBK",
       method: "post",
       data: { text: "百度是一家高科技公司" }
   };
   var uri = '/lexer';
   var method = 'post';
   // 3. 调用DBotServer AI服务
   const result = await atn.callAPI(dbotAddress,method,uri,option,from);
   
   ```
     
   STEP 5：增加通道调用次数
   
   ```js
   // 代码片段
   // 1. 引入 atn-js 包
   ... 
   // 2. 获取当前atn-wallet账户
   ...
   const from = accounts[0] 
   var vaule = 10e18 ; //可自定义，按照单位可自己换算
   
   // 3. 增加调用次数
   const result = await atn.topUpChannel(dbotAddress,value,from,console.log)
  
   ```
   
   STEP 6：关闭调用通道
   
   ```js
   // 代码片段
   // 1. 引入 atn-js 包
   ...
   // 2. 获取当前atn-wallet账户 
   const from = accounts[0] 
   const dbotAddress = "0xe4640e4005903e147ebb54dd9ddf17e85ce53303";
   var vaule = 10e18 ; //可自定义，按照单位可自己换算
   
   // 3. 关闭调用通道
   const result = await atn.closeChannel(dbotAddress,from,balance,console.log);
   ```
   
----   

### 接口文档
* [atn-js](https://atnio.github.io/atn-js/classes/_atn_.atn.html)  


----

### 相关参考
* [mochajs](https://mochajs.org/#more-information)
