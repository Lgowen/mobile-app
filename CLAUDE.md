# Akulaku Mobile App

## 项目架构

- **技术栈**: React 18 + TypeScript + Capacitor 6 + antd-mobile + Vite
- **路由**: HashRouter，三个 Tab 页 — `/home`、`/list`、`/profile`
- **API 代理**: `/api` 请求转发到 `localhost:3456`
- **构建流程**: React → Vite 打包 → Capacitor sync → iOS/Android 原生 WebView 加载
- **运行命令**: `cd packages/app && pnpm dev`
- **iOS 编译**: 运行 `/ios-build` 查看完整流程

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

## 编译结果

| 项目 | 值 |
|------|-----|
| 编译状态 | BUILD SUCCEEDED |
| 架构 | arm64 (单架构) |
| 产物类型 | Mach-O 64-bit executable |
| 目标平台 | iOS Simulator (iPhone 16 Pro) |
| SDK | iPhoneSimulator 18.5 |
| 最低部署版本 | iOS 13.0 |
| 两种构建目标 | Simulator（本地调试）、真机 Release（需 Apple Developer 证书） |

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
