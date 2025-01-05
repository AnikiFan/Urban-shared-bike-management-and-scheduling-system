# README

## 文件目录说明

1. `public\`:静态资源，如图片，字体
2. `seed\`:填充数据库相关程序
   - `dev_seed.py`:填充数据库所用程序
3. `src\`:系统源程序
   - `app\`:文件路由系统
   - `db\`:数据库
   - `lib`:ServerAction等后端所用程序
     - `auth.ts`:鉴权逻辑
     - `dal.ts`:数据访问层
     - `definition`:类型定义
     - `login.ts`:登录逻辑
     - `utils.ts`:辅助函数
     - `actions.ts`:Server Action
   - `ui\`:前端