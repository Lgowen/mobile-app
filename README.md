<div align="center">

# mobile-app

基于 React + Capacitor 的跨平台移动应用

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Capacitor](https://img.shields.io/badge/Capacitor-7-119EFF?logo=capacitor)](https://capacitorjs.com/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev/)
[![UnoCSS](https://img.shields.io/badge/UnoCSS-66.7-333333?logo=unocss)](https://unocss.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-11-F69220?logo=pnpm)](https://pnpm.io/)

</div>

## 简介

一个基于 **React 19 + TypeScript + Capacitor 7** 的跨平台移动应用，使用 **pnpm monorepo** 管理项目结构，支持 iOS 原生打包。

### 核心特性

- **跨平台** — 一套代码，同时支持 Web、iOS
- **类型安全** — 全量 TypeScript，严格模式
- **组件化** — antd-mobile 移动端 UI 组件库
- **原子化 CSS** — UnoCSS（wind3 + icons + rem-to-px），className 模式
- **Monorepo** — pnpm workspace 管理多包依赖
- **原生能力** — Capacitor 桥接原生 API（状态栏、键盘、触觉反馈等）
- **React Compiler** — Vite 8 + babel-plugin-react-compiler 编译期自动优化

## 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| UI 框架 | React | ^19.2.6 |
| 类型系统 | TypeScript | ~5.7.3 |
| 构建工具 | Vite | ^8.0.14 |
| Vite 插件 | @vitejs/plugin-react | ^6.0.2 |
| 原子化 CSS | UnoCSS (wind3 + icons + rem-to-px) | ^66.7.0 |
| 原生桥接 | Capacitor | ^7.6.5 |
| 路由 | React Router | ^7.15.1 |
| 组件库 | antd-mobile | ^5.42.3 |
| 包管理 | pnpm | ^11.4.0 |
| Node.js | LTS | >= 22.0.0 |
| iOS 工具链 | Xcode + CocoaPods | 16.0+ / 1.16.2 |

## 快速开始

### 环境要求

- Node.js >= 22.0.0
- pnpm >= 11.0.0

### 安装

```bash
# 克隆项目
git clone git@github.com:Lgowen/mobile-app.git
cd mobile-app

# 安装依赖
pnpm install
```

### 开发

```bash
# 启动 Web 开发服务器（端口 5173）
pnpm dev

# 后端 API 代理到 localhost:3456
```

### 构建

```bash
# 构建 Web 产物
pnpm build
```

## 项目结构

```
mobile-app/
├── packages/
│   ├── app/                          # 主应用
│   │   ├── src/
│   │   │   ├── main.tsx              # 入口文件
│   │   │   ├── App.tsx               # 根组件 + 路由配置
│   │   │   ├── components/
│   │   │   │   └── TabLayout.tsx     # 底部 Tab 布局
│   │   │   ├── pages/
│   │   │   │   ├── Home.tsx          # 首页
│   │   │   │   ├── List.tsx          # 列表页
│   │   │   │   └── Profile.tsx       # 个人中心
│   │   │   ├── hooks/
│   │   │   │   └── useCapacitor.ts   # Capacitor 原生能力封装
│   │   │   ├── utils/
│   │   │   │   └── api.ts            # HTTP 请求封装
│   │   │   └── styles/
│   │   │       └── global.css        # 全局样式
│   │   ├── ios/                      # iOS 原生工程（CocoaPods）
│   │   ├── capacitor.config.ts       # Capacitor 配置
│   │   └── vite.config.ts            # Vite 构建配置
│   └── shared/                       # 共享包
│       └── src/
│           └── index.ts              # 共享类型和常量
├── CLAUDE.md                         # 项目文档（Claude Code 自动加载）
├── README.md                         # 项目说明
├── .nvmrc                            # Node.js 版本锁定
├── pnpm-workspace.yaml               # pnpm 工作区配置
└── package.json                      # 根包配置
```

## 可用脚本

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动 Vite 开发服务器 |
| `pnpm build` | 构建 Web 产物（shared → app） |
| `pnpm preview` | 预览生产构建 |
| `pnpm typecheck` | TypeScript 类型检查（shared + app） |
| `pnpm clean` | 清理构建产物（保留 node_modules） |
| `pnpm clean:all` | 清理所有（包括 node_modules） |
| `pnpm deploy:ios` | 一键编译安装到 iPhone（无线） |
| `pnpm deploy:ios:release` | 编译 Release 版安装到 iPhone |
| `pnpm archive:ios` | 打包 Archive 导出 .ipa |
| `pnpm upload:ios` | 上传到 App Store |

## 架构设计

### 路由

使用 `HashRouter`（哈希路由），兼容 Capacitor 原生 WebView 的 `file://` 协议：

| 路径 | 页面 | 说明 |
|------|------|------|
| `/home` | Home | 首页，功能入口网格 |
| `/list` | List | 列表页，展示数据列表 |
| `/profile` | Profile | 个人中心 |
| `*` | Redirect → `/home` | 默认重定向 |

### 布局

```
┌─────────────────────┐
│      NavBar         │  ← 页面标题
├─────────────────────┤
│                     │
│    <Outlet />       │  ← 路由内容区域（可滚动）
│                     │
├─────────────────────┤
│  首页  │  列表  │  我的  │  ← 底部 TabBar
└─────────────────────┘
```

### API 层

```typescript
import { api } from '@/utils/api'

// GET 请求
const data = await api.get<User[]>('/users')

// POST 请求
const result = await api.post<User>('/users', { name: 'test' })
```

所有请求通过 `/api` 前缀代理到后端服务（开发环境：`http://localhost:3456`）。

### 原生能力

通过 `useCapacitor` Hook 封装 Capacitor 原生 API：

- **状态栏** — 设置为浅色样式
- **返回键** — Android 返回按钮处理（无历史记录时退出应用）
- **Web 兼容** — 在浏览器环境中自动降级，不报错

### 共享包

`@mobile/shared` 导出跨包共享的类型和常量：

```typescript
export const APP_NAME = 'mobile-app'

export interface ApiResponse<T> {
  code: number
  data: T
  message: string
}
```

## iOS 编译

### 前置条件

- Xcode 16.0+
- CocoaPods 1.16.2

### 环境变量

在项目根目录创建 `.env.local`（已 gitignore）：

```bash
APPLE_TEAM_ID=QV7G5PG495          # Apple Developer Team ID
IOS_DEVICE_UDID=BBF6E2D4-...      # iPhone 设备 UDID
APPLE_ID=your@email.com            # Apple ID（用于上传）
```

### 一键部署到真机（无线）

```bash
pnpm deploy:ios
```

执行链：`source .env.local` → `pnpm build` → `cap sync` → `xcodebuild` → `xcrun devicectl install`

### 编译结果

| 项目 | 值 |
|------|-----|
| 架构 | arm64 |
| 最低部署版本 | iOS 14.0 |
| 签名 | 免费 Apple ID（7 天过期） |

> 详细的环境搭建和踩坑记录见 [CLAUDE.md](./CLAUDE.md) 或运行 `/ios-build`

## 配置说明

### Capacitor

```typescript
// capacitor.config.ts
{
  appId: 'com.mobile.app',      // 应用 ID
  appName: 'mobile-app',         // 应用名称
  webDir: 'dist',                // Web 构建产物目录
  server: {
    androidScheme: 'https'       // Android WebView 使用 HTTPS
  }
}
```

### Vite

```typescript
// vite.config.ts
{
  plugins: [react()],            // @vitejs/plugin-react 6.x (React Compiler)
  resolve: {
    alias: { '@': './src' }      // 路径别名
  },
  define: {
    __APP_VERSION__,             // 注入版本号
    __BUILD_HASH__,              // 注入 Git commit hash
    __BUILD_TIME__               // 注入构建时间
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3456'  // API 代理
    }
  }
}
```

### TypeScript

严格模式开启，包含以下额外检查：

- `noUnusedLocals` — 禁止未使用的局部变量
- `noUnusedParameters` — 禁止未使用的参数
- `noFallthroughCasesInSwitch` — 禁止 switch 穿透

## 环境变量

在项目根目录创建 `.env.local`（已 gitignore），用于 iOS 部署脚本：

```bash
APPLE_TEAM_ID=QV7G5PG495          # Apple Developer Team ID
IOS_DEVICE_UDID=BBF6E2D4-...      # iPhone 设备 UDID
APPLE_ID=your@email.com            # Apple ID（用于上传，需付费账号）
```

Vite 环境变量可创建 `.env` 文件，通过 `import.meta.env.VITE_*` 访问。

## 相关文档

- [Capacitor 文档](https://capacitorjs.com/docs)
- [React 文档](https://react.dev/)
- [antd-mobile 文档](https://mobile.ant.design/)
- [Vite 文档](https://vitejs.dev/)

## License

Private
