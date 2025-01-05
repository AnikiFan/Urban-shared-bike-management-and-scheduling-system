# README

## 文件目录说明

1. `init\init.sql`:用于初始化数据库的sql文件
2. `public\`:静态资源，如图片，字体
3. `seed\`:填充数据库相关程序
   - `dev_seed.py`:填充数据库所用程序
4. `src\`:系统源程序
   - `app\`:文件路由系统
     - `(management)\`:功能页面
       - `dashboard\`:单车与停车区域分布图页面
         - `(withStatistics)\`:页面上方带有统计数据卡片的页面
           - `(withColorBar)\`:页面下方带有颜色条的页面
             - `scheduleMap\`:调度查询页面
             - `usageMap\`:单车使用查询页面
         - `reviewPanel\`:审查页面
     - `api\`:API接口
       - `bike\`:供单车上传使用记录的API
       - `scheduler`:供调度员上传数据的API
         - `changeForm`:上传状态更改
         - `schedulingLog`:上传调度记录
     - `login\`:登录页面
   - `db\`:DrizzleORM所需文件夹
   - `lib\`:ServerAction等后端所用程序
     - `auth.ts`:鉴权逻辑
     - `dal.ts`:数据访问层
     - `definition`:类型定义
     - `login.ts`:登录逻辑
     - `utils.ts`:辅助函数
     - `actions.ts`:Server Action
   - `ui\`:前端
5. `drizzle\`:DrizzleORM的输出文件夹
6. `api_test\`:用于测试API接口所用的文件

## 环境配置说明

1. `seed/.env.dev`:存放连接待填充数据的Postgres数据库的连接方式
2. `.env.development`:运行`pnpm dev`时所用的环境变量
3. `.env.production`:运行`pnpm build`,`pnpm start`时所用的环境变量

## 系统运行说明

1. 可以通过`pnpm dev`以开发模式运行
2. 可以通过`pnpm build`,`pnpm start`以生产模式运行

## 其他

1. 目前的`.env.production`中存储的是部署在Vercel上的数据库的连接方式
2. 可以通过`https://nextjs-dashboard-eight-kappa-78.vercel.app`来访问部署在云端的系统
3. 分析团队账号为`analyst@email.com`,管理员账号为`manager@email.com`,密码均为`test`