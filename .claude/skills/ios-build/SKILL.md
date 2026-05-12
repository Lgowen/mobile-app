---
name: ios-build
description: iOS 编译环境搭建和故障排查。包含从零开始的完整编译流程、已验证的环境版本、以及踩坑记录。在用户需要编译 iOS app 或遇到 iOS 编译问题时使用。
disable-model-invocation: true
---

# iOS 编译完整流程

## 已验证的环境版本

| 工具 | 版本 | 安装方式 |
|------|------|----------|
| macOS | Darwin 24.3.0 | - |
| Xcode | 16.4 | App Store |
| Ruby | 3.2.2 | mise（预编译二进制） |
| CocoaPods | 1.16.2 | gem install |
| Node | v20.10.0 | - |
| pnpm | 8.6.1 | - |
| iOS SDK | iPhoneSimulator 18.5 | Xcode 内置 |
| 最低部署版本 | iOS 13.0 | 项目配置 |

## 从零开始的编译流程

```bash
# 1. 安装 Xcode（约 12GB）
# 方式一: App Store 搜索 Xcode 安装（推荐）
# 方式二: 命令行安装
brew install xcodes && xcodes install --latest
# 方式三: mas CLI
mas install 497799835

# 安装完成后：
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
sudo xcodebuild -license accept

# 2. 安装 mise + Ruby
curl https://mise.run | sh
echo 'eval "$(~/.local/bin/mise activate zsh)"' >> ~/.zprofile
source ~/.zprofile
mise install ruby@3.2.2
mise use -g ruby@3.2.2

# 3. 安装 CocoaPods
gem sources --remove https://rubygems.org/
gem sources --add https://gems.ruby-china.com/
gem install cocoapods --no-document

# 4. 构建 Web 产物并同步到 iOS
cd packages/app
pnpm build          # Vite 构建 React 代码
pnpm cap:sync       # 同步 web 资源到 iOS 项目 + 自动 pod install

# 5. 打开 Xcode 编译
pnpm cap:ios        # 或手动打开 ios/App/App.xcworkspace
# 在 Xcode 中选择模拟器 → Cmd+R 编译运行
```

如果 sync 后 pod 依赖有问题，再手动执行：`cd ios/App && pod install`

## 踩坑记录

### 踩坑 1: macOS 不自带完整 Xcode

**现象**: `xcodebuild` 命令存在但功能不完整，Xcode.app 不在 `/Applications/` 下。

**原因**: macOS 只预装 Command Line Tools，完整 Xcode 需要单独安装。

**解决**:
```bash
# 确认是否只有 CommandLineTools
xcode-select -p
# 如果输出 /Library/Developer/CommandLineTools → 只有 CLI 工具

# 从 App Store 安装 Xcode（约 12GB）
# 安装后设置路径
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch   # 首次安装必须执行，注册组件
sudo xcodebuild -license accept    # 接受许可协议
```

### 踩坑 2: 系统 Ruby 2.6 太旧，gem install 卡死

**现象**: `sudo gem install cocoapods` 执行后长时间无反应，或报 ffi 相关错误。

**原因**: macOS 自带 Ruby 2.6.10，CocoaPods 依赖的 ffi gem 需要 Ruby 3.0+。系统 Ruby 编译 ffi 时会卡住或失败。

**尝试过的失败方案**:
1. `sudo gem install cocoapods` — 卡死（ffi 编译失败）
2. `brew install cocoapods` — Homebrew 在 macOS 15 上有问题，下载失败
3. `brew install --cask cocoapods` — 显示 "cocoapods has been officially discontinued"
4. 手动下载 gem 文件本地安装 — ffi 依赖仍然编译失败
5. rbenv + 源码编译 Ruby — 编译太慢（10分钟+）
6. gem 换源（ruby-china.com）— 解决了网络超时但 ffi 编译问题仍在
7. `gem install --user-install` — 避免了 sudo 但 ffi 编译问题仍在（需要先有新版 Ruby）

**最终解决方案: 用 mise 安装预编译 Ruby**:
```bash
# 安装 mise（Ruby 版本管理器，支持预编译二进制）
curl https://mise.run | sh
echo 'eval "$(~/.local/bin/mise activate zsh)"' >> ~/.zprofile
source ~/.zprofile

# 安装预编译 Ruby（秒装，不需要编译）
mise install ruby@3.2.2
mise use -g ruby@3.2.2

# 验证
ruby --version   # 应该显示 3.2.2
which ruby       # 应该指向 mise 路径

# 安装 CocoaPods
gem install cocoapods --no-document
pod --version    # 验证安装
```

**PATH 配置**:
```bash
# mise 激活脚本放在 ~/.zprofile（登录时加载）
eval "$(~/.local/bin/mise activate zsh)"

# Ruby 路径会自动配置，无需手动添加到 PATH
```

**注意**: 如果之前尝试过 rbenv，需要清理残留：
```bash
# 从 ~/.zshrc 中移除 rbenv 相关行
# 删除 ~/.rbenv 目录
rm -rf ~/.rbenv
```

**备选方案 1**: 不用 sudo，装到用户目录：
```bash
gem install cocoapods --no-document --user-install
```

**备选方案 2**: 下载 CocoaPods 独立 App（不需要 Ruby 环境）：
```bash
curl -L -o /tmp/CocoaPods.app.zip https://github.com/CocoaPods/CocoaPods/releases/download/1.16.2/CocoaPods.app-1.16.2.zip
unzip /tmp/CocoaPods.app.zip -d /Applications/
```

### 踩坑 3: Capacitor 版本不一致 warning

**现象**: 编译时提示 `@capacitor/core@6.0.0` 和 `@capacitor/ios@6.2.1` 版本不一致。

**影响**: 不影响编译和运行，但建议统一。

**解决**:
```bash
pnpm --filter @mobile/app add @capacitor/core@6.2.1
```

### 踩坑 4: gem install 网络超时

**现象**: `gem install` 下载超时，rubygems.org 访问慢。

**解决**: 换国内镜像源
```bash
gem sources --remove https://rubygems.org/
gem sources --add https://gems.ruby-china.com/
```
