import { NavBar, List, Avatar, Space, Tag } from 'antd-mobile'
import { SetOutline, InformationCircleOutline } from 'antd-mobile-icons'

const buildTime = new Date(__BUILD_TIME__).toLocaleString('zh-CN')

export default function Profile() {
  return (
    <div>
      <NavBar back={null}>我的</NavBar>
      <div className="profile-header">
        <Space align="center">
          <Avatar src="" style={{ '--size': '64px' }} fallback="U" />
          <div>
            <div className="profile-name">用户名</div>
            <div className="profile-desc">user@example.com</div>
          </div>
        </Space>
      </div>
      <List header="系统信息">
        <List.Item
          prefix={<InformationCircleOutline />}
          extra={<Tag color="primary">v{__APP_VERSION__}</Tag>}
        >
          版本号
        </List.Item>
        <List.Item
          prefix={<InformationCircleOutline />}
          extra={<Tag color="success">{__BUILD_HASH__}</Tag>}
        >
          Build Hash
        </List.Item>
        <List.Item
          prefix={<InformationCircleOutline />}
          extra={buildTime}
        >
          构建时间
        </List.Item>
        <List.Item
          prefix={<InformationCircleOutline />}
          extra={navigator.userAgent.includes('Capacitor') ? 'iOS App' : 'H5 浏览器'}
        >
          运行环境
        </List.Item>
        <List.Item
          prefix={<InformationCircleOutline />}
          description={<span style={{ wordBreak: 'break-all', fontSize: 11 }}>{navigator.userAgent}</span>}
        >
          UA
        </List.Item>
      </List>
      <List header="设置">
        <List.Item prefix={<SetOutline />}>账号与安全</List.Item>
        <List.Item prefix={<SetOutline />}>通知设置</List.Item>
        <List.Item prefix={<SetOutline />}>清除缓存</List.Item>
      </List>
    </div>
  )
}
