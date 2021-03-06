# 技术路线

## 技术概况

项目采用Electron技术，以Chromium作为前端，Node.js作为后端，实现桌面应用程序的跨平台开发。本项目旨在最终实现以下功能：

- 离线操作sqlite数据库
- 在线操作sqlserver数据库
- 纯前端项目，除数据库连接秘钥等重要信息外，尽量避免与后端有交互
- 调用操作系统低级api，进行简单的系统交互
- 具备基础的框架功能：上传下载、表格、表单、列表、统计图表等
- 实现离线操作百度地图
- 实现简单的Excel操作

## 技术说明

### 项目中涉及到的框架

#### 底层框架：vue

> 用于构建用户界面的渐进式框架

#### UI框架：View UI

> 基于 Vue.js 的开源 UI 组件库，主要服务于 PC 界面的中后台产品

#### 本地数据库：sqlite

> 提供离线数据库存储

#### 远程数据库：sqlserver

> 提供在线数据库存储

### 项目中用到的组件

#### axios

> 提供与远程后端的数据交互

#### is-online

> 用于判断本地的联网状态

#### md5

> md5加密，用于验证用户登录信息

#### mssql.js

> 用于实现js操作远程sqlserver数据库

#### sql.js

> 用于实现js操作本地sqlite离线数据库
