import { NavBar, List, Avatar, Space } from 'antd-mobile'
import { SetOutline } from 'antd-mobile-icons'

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
      <List>
        <List.Item prefix={<SetOutline />}>设置</List.Item>
        <List.Item prefix={<SetOutline />}>关于</List.Item>
        <List.Item prefix={<SetOutline />}>版本信息</List.Item>
      </List>
    </div>
  )
}
