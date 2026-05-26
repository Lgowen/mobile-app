# Akulaku Mobile App

## 项目架构

- **技术栈**: React 18 + TypeScript + Capacitor 6 + antd-mobile + Vite
- **架构**: pnpm monorepo（app + shared）
- **路由**: HashRouter，三个 Tab 页 — `/home`、`/list`、`/profile`
- **API 代理**: `/api` 请求转发到 `localhost:3456`
- **构建流程**: Vite 打包 → Capacitor sync → iOS/Android 原生 WebView 加载
- **运行命令**: `pnpm dev`

```
┌─────────────────────────────────────────┐
│            App.xcworkspace              │
├─────────────────────────────────────────┤
│  App.xcodeproj (iOS 原生代码)            │
│    ├── App/  (Swift/ObjC 源码)           │
│    ├── AppDelegate                       │
│    └── Info.plist                        │
├─────────────────────────────────────────┤
│  Pods.xcodeproj (CocoaPods 依赖)         │
│    ├── Capacitor (核心桥接层)             │ ← @capacitor/ios
│    ├── CapacitorCordova (Cordova 兼容)   │ ← @capacitor/ios
│    ├── CapacitorApp                      │ ← @capacitor/app
│    ├── CapacitorHaptics                  │ ← @capacitor/haptics
│    ├── CapacitorKeyboard                 │ ← @capacitor/keyboard
│    └── CapacitorStatusBar                │ ← @capacitor/status-bar
├─────────────────────────────────────────┤
│  Web 资源 (Vite 构建 → dist/)            │
│    └── 复制到 App/public/                │
└─────────────────────────────────────────┘
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动 Web 开发服务器 |
| `pnpm build` | 构建 Web 产物（shared → app） |
| `pnpm preview` | 预览生产构建 |
| `pnpm typecheck` | TypeScript 类型检查（shared + app） |
| `pnpm clean` | 清理构建产物（保留 node_modules） |
| `pnpm clean:all` | 清理所有（包括 node_modules） |
| `pnpm deploy:ios` | 一键编译安装到 iPhone（无线） |
| `pnpm deploy:ios:release` | 编译 Release 版安装到 iPhone |
| `pnpm archive:ios` | 打包 Archive 导出 .ipa（需付费开发者账号） |
| `pnpm upload:ios` | 上传到 App Store（需付费开发者账号） |

## iOS 部署

### 环境变量

在项目根目录创建 `.env.local`（已 gitignore）：

```bash
APPLE_TEAM_ID=QV7G5PG495          # Apple Developer Team ID
IOS_DEVICE_UDID=BBF6E2D4-...      # iPhone 设备 UDID
APPLE_ID=your@email.com            # Apple ID（用于上传，需付费账号）
```

### 一键部署（无线）

```bash
pnpm deploy:ios
```

执行链：`source .env.local` → `pnpm build` → `cap sync` → `xcodebuild` → `xcrun devicectl install`

### 无线调试

- iPhone 和 Mac 需在同一 WiFi
- 首次需 USB 配对：Xcode → Window → Devices and Simulators → 勾选 "Connect via network"
- 如果设备显示 `unavailable`，先跑 `xcrun devicectl list devices` 等几秒再试

### 编译结果

| 项目 | 值 |
|------|-----|
| 编译状态 | BUILD SUCCEEDED |
| 架构 | arm64 (单架构) |
| 产物类型 | Mach-O 64-bit executable |
| 最低部署版本 | iOS 13.0 |
| 签名 | deploy:ios/release = 免费 Apple ID（7 天过期）；archive/upload = 付费开发者账号 |

## Claude Code 使用注意事项

### mimo 模型兼容性问题

- **不要在对话中包含图片时切换模型** — 会触发上下文溢出，显示误导性错误
- **mimo 不支持剪贴板图片** — 需要先用 `pngpaste` 保存到文件再用 Read 工具读取
- **切模型前先 `/compact`** — 压缩对话历史，避免图片数据导致上下文超限

### 已知相关 GitHub Issues

- [#58252](https://github.com/anthropics/claude-code/issues/58252) — mimo-v2.5-pro 上下文溢出误报为模型无权限
- [#56990](https://github.com/anthropics/claude-code/issues/56990) — Desktop 版模型名校验拒绝非 Anthropic 模型名
- [#56016](https://github.com/anthropics/claude-code/issues/56016) — 损坏图片毒化整个会话
- [#54988](https://github.com/anthropics/claude-code/issues/54988) — 图片+空文本导致 resume 失败
