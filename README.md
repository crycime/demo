# 選舉投票系統

## Introduction

**接口文档：[API_DOC.md](https://github.com/crycime/demo/blob/master/API_DOC.md)**

---

## 技术栈
开发环境 nodejs 10.15  Mongodb 4.0.2  docker 18.09.2

nodejs + nestjs + mongodb + mongoose + es6/7 + typescript

## 介绍

### 接口概述

  - code 状态码
    * `4000` 请求的业务被拒绝
    * `4003` 权限不足/请求参数需要更高的权限
    * `4004` 资源不存在
    * `5000` 服务器挂了
    * `0` 正常

### 数据模型

  - 模型
    * 用户`user`（[模型在此](https://github.com/crycime/demo/blob/master/src/components/user/schemas/user.schema.ts)）
    * 活动`campaign`（[模型在此](https://github.com/crycime/demo/blob/master/src/components/campaign/schemas/campaign.schema.ts)）
    * 选举人`elector`（[模型在此](https://github.com/crycime/demo/blob/master/src/components/elector/schemas/elector.schema.ts)）

### 应用结构

- 入口

  * `main.ts`：引入配置，启动主程序，引入各种全局服务
  * `app.module.ts`：主程序根模块，负责各业务模块的聚合

## 项目布局

```
.
├── src                          
│   ├── common
│   │   └── apiService                服务api（邮箱服务）      
│   │   └── config                    配置文件
│   │   └── constants                 常量配置文件
│   │   └── db                        数据库配置文件
│   │   └── guard                     守卫过滤（鉴权）         
│   │   └── helpers                   http请求过滤
│   │   └── interceptor               数据流拦截器（格式化数据）
│   │   └── plugins                   数据库插件
│   │   └── util                      工具文件
│   │   └── validata                  数据校验
│   │   └── base.dto.ts               dao基类
│   │   └── custom.module.ts          全局自定义模块            
│   ├── components
│   │   └── campaign                   活动模块                             
│   │   └── elector                    选举人模块 
│   │   └── user                       用户模块     
│   ├── app.module.ts                     主程序根模块
│   ├── main.ts                           入口文件
├── test                                    单元测试     
├── .dockerignore                     
├── .gitignore   
├── .prettierignore 
├── default.env                             全局环境变量
├── docker-compose.yaml                     docker-compose配置      
├── package.json                          
├── prettier.config.js                      代码格式配置文件                  
├── tsconfig.build.json                        
├── tsconfig.json                           typescript配置文件
├── tslint.json                             代码规范配置文件             
.


```
## 部署

```bash
$ docker-compose up -d
```

## Development Setup

```bash
# 构建
$ npm run build

# 启动
$ npm run start

# 代码格式化
$ npm run format

# tslint
$ npm run lint

# 测试
$ npm run test

```
