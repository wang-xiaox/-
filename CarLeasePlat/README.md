# 汽车租赁平台后端服务

## 项目概述
汽车租赁平台后端服务是基于Spring Boot开发的RESTful API服务，为用户前端和管理员后台提供数据支持和业务逻辑处理。

## 技术栈
- Spring Boot 2.5.6
- MyBatis-Plus 3.4.1
- MySQL 8.0
- Redis
- JWT认证
- Druid连接池
- Lombok
- Hutool工具集

## 项目结构
```
src/main/java/com/project/car/
├── CarLeaseServeApplication.java    # 应用程序入口
├── api/                            # API接口层
├── config/                         # 配置类
├── controller/                     # 控制器层
├── domain/                         # 实体类
├── mapper/                         # 数据访问层
├── service/                        # 服务层
│   └── impl/                       # 服务实现
├── utils/                          # 工具类
└── vo/                             # 视图对象
```

## 核心功能
- 用户认证与授权
- 汽车信息管理
- 汽车类型管理
- 订单管理
- 用户管理

## 环境要求
- JDK 1.8+
- Maven 3.6+
- MySQL 5.7+
- Redis 5.0+

## 安装步骤
1. 克隆项目到本地
2. 配置数据库
   - 在MySQL中创建名为`car_rental_separate`的数据库
   - 修改`src/main/resources/application-dev.yml`中的数据库连接信息
3. 配置Redis
   - 修改`src/main/resources/application-dev.yml`中的Redis连接信息
4. 使用Maven构建项目
   ```bash
   mvn clean install
   ```
5. 运行Spring Boot应用
   ```bash
   mvn spring-boot:run
   ```

## API文档
启动应用后，可通过以下地址访问Swagger API文档：
```
http://localhost:8081/swagger-ui.html
```

## 开发指南

### 添加新实体
1. 在`domain`包中创建实体类
2. 在`mapper`包中创建Mapper接口
3. 在`service`包中创建Service接口和实现类
4. 在`controller`包中创建Controller类

### 配置说明
- 应用配置: `application.yml`
- 开发环境配置: `application-dev.yml`
- 生产环境配置: `application-prod.yml`

## 部署指南
1. 使用Maven打包应用
   ```bash
   mvn clean package -Dmaven.test.skip=true
   ```
2. 将生成的jar包部署到服务器
3. 配置必要的环境变量和属性文件
4. 使用以下命令启动应用
   ```bash
   java -jar target/CarLeasePlat-0.0.1-SNAPSHOT.jar
   ```

## 数据库设计
主要数据表包括：
- 用户表
- 汽车信息表
- 汽车类型表
- 订单表

## 常见问题
1. **问题**: 数据库连接失败
   **解决**: 检查数据库配置信息是否正确，确认MySQL服务是否启动

2. **问题**: Redis连接失败
   **解决**: 检查Redis配置信息是否正确，确认Redis服务是否启动 