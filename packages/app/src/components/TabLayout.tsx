import { TabBar } from 'antd-mobile'
import { AntOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  { key: '/home', title: '首页', icon: <AntOutline /> },
  { key: '/list', title: '列表', icon: <UnorderedListOutline /> },
  { key: '/profile', title: '我的', icon: <UserOutline /> },
]

export default function TabLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="tab-layout">
      <div className="tab-layout-content">
        <Outlet />
      </div>
      <div className="tab-layout-tabbar">
        <TabBar
          activeKey={location.pathname}
          onChange={(key) => navigate(key)}
        >
          {tabs.map((item) => (
            <TabBar.Item
              key={item.key}
              icon={item.icon}
              title={item.title}
            />
          ))}
        </TabBar>
      </div>
    </div>
  )
}
