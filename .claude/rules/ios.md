---
paths:
  - "packages/app/ios/**"
  - "packages/app/capacitor.config.*"
  - "**/Podfile"
  - "**/Podfile.lock"
---

# iOS Pod 依赖规则

所有 pod 依赖都是**本地路径引用**（来自 node_modules），不需要从 CocoaPods 远程仓库下载。

| Pod | npm 包来源 | 说明 |
|-----|-----------|------|
| Capacitor | @capacitor/ios | 核心桥接层，WebView ↔ Native 通信 |
| CapacitorCordova | @capacitor/ios | Cordova 插件兼容层 |
| CapacitorApp | @capacitor/app | App 生命周期事件 |
| CapacitorHaptics | @capacitor/haptics | 触觉反馈 |
| CapacitorKeyboard | @capacitor/keyboard | 键盘事件处理 |
| CapacitorStatusBar | @capacitor/status-bar | 状态栏样式控制 |

**重要**: Capacitor 不支持 Swift Package Manager (SPM)，只能通过 CocoaPods 管理依赖。

`pnpm cap:sync` 会自动执行 `pod install`，通常不需要手动运行。
