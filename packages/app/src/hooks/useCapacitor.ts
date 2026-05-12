import { useEffect } from 'react'
import { App as CapApp } from '@capacitor/app'
import { StatusBar, Style } from '@capacitor/status-bar'

export function useCapacitor() {
  useEffect(() => {
    // 监听 Android 返回键
    CapApp.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) {
        CapApp.exitApp()
      } else {
        window.history.back()
      }
    })

    // 设置状态栏样式
    StatusBar.setStyle({ style: Style.Light }).catch(() => {
      // Web 环境下会失败，忽略
    })

    return () => {
      CapApp.removeAllListeners()
    }
  }, [])
}
