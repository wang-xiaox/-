# 汽车租赁平台系统

## 项目介绍
汽车租赁平台系统是一个基于Spring Boot + Vue.js开发的全栈应用，为用户提供汽车租赁服务。系统分为用户前端、管理员后台和后端服务三个主要部分。

## 项目架构

### 后端 (CarLeasePlat)
- 基于Spring Boot 2.5.6
- MyBatis-Plus作为ORM框架
- MySQL作为数据库
- Redis用于缓存
- JWT用于身份认证

### 用户前端 (UserVue)
- 基于Vue.js 2.6
- 使用Element UI作为UI组件库
- Axios处理HTTP请求
- Vue Router进行路由管理
- Vuex进行状态管理

### 管理员后台 (AdminVue)
- 基于Vue.js 2.6
- 使用Element UI作为UI组件库
- Axios处理HTTP请求
- Vue Router进行路由管理
- Vuex进行状态管理

## 系统要求
- JDK 1.8+
- Maven 3.6+
- MySQL 5.7+
- Redis 5.0+
- Node.js 14.0+
- npm 6.0+

## 安装步骤

### 后端安装
1. 克隆项目到本地
2. 进入CarLeasePlat目录
3. 配置数据库
   - 在MySQL中创建名为`car_rental_separate`的数据库
   - 修改`src/main/resources/application-dev.yml`中的数据库连接信息
4. 配置Redis
   - 修改`src/main/resources/application-dev.yml`中的Redis连接信息
5. 使用Maven构建项目
   ```bash
   mvn clean install
   ```
6. 运行Spring Boot应用
   ```bash
   mvn spring-boot:run
   ```
   或
   ```bash
   java -jar target/CarLeasePlat-0.0.1-SNAPSHOT.jar
   ```

### 用户前端安装
1. 进入UserVue目录
2. 安装依赖
   ```bash
   npm install
   ```
3. 修改API配置
   - 如需修改后端API地址，请编辑相关配置文件
4. 开发环境运行
   ```bash
   npm run serve
   ```
5. 生产环境构建
   ```bash
   npm run build
   ```

### 管理员后台安装
1. 进入AdminVue目录
2. 安装依赖
   ```bash
   npm install
   ```
3. 修改API配置
   - 如需修改后端API地址，请编辑相关配置文件
4. 开发环境运行
   ```bash
   npm run serve
   ```
5. 生产环境构建
   ```bash
   npm run build
   ```

## 系统功能

### 用户端功能
- 用户注册与登录
- 汽车信息浏览
- 汽车分类查询
- 汽车租赁下单
- 订单管理
- 个人中心

### 管理员端功能
- 管理员登录
- 用户管理
- 汽车信息管理
- 汽车分类管理
- 订单管理
- 统计分析

## 开发指南

### 后端开发
- 遵循MVC架构开发
- 使用MyBatis-Plus开发数据访问层
- 在service层编写业务逻辑
- 在controller层提供RESTful API

### 前端开发
- 遵循Vue.js组件化开发理念
- 使用Vuex管理全局状态
- 使用Vue Router进行路由管理
- 使用Element UI组件库构建界面

## 部署说明

### 后端部署
1. 使用Maven打包应用
   ```bash
   mvn clean package -Dmaven.test.skip=true
   ```
2. 将生成的jar包部署到服务器
3. 配置必要的环境变量和属性文件
4. 使用以下命令启动应用
   ```bash
   java -jar CarLeasePlat-0.0.1-SNAPSHOT.jar
   ```

### 前端部署
1. 在各前端目录(UserVue/AdminVue)中执行构建命令
   ```bash
   npm run build
   ```
2. 将生成的dist目录内容部署到Web服务器
3. 配置Web服务器(如Nginx)将API请求代理到后端服务器

## 常见问题

1. **问题**: 数据库连接失败
   **解决**: 检查数据库配置信息是否正确，确认MySQL服务是否启动

2. **问题**: 前端API访问失败
   **解决**: 检查后端服务是否正常运行，前端API配置是否正确

3. **问题**: 前端页面样式异常
   **解决**: 清除浏览器缓存，确保使用最新的构建版本

## 许可证
本项目采用MIT许可证