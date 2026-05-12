import { NavBar, Grid, Card } from 'antd-mobile'
import { APP_NAME } from '@mobile/shared'

const gridItems = [
  { icon: '📊', text: '数据' },
  { icon: '📈', text: '图表' },
  { icon: '📋', text: '报表' },
  { icon: '⚙️', text: '设置' },
]

export default function Home() {
  return (
    <div>
      <NavBar back={null}>{APP_NAME}</NavBar>
      <Card title="功能入口" className="page-card">
        <Grid columns={4} gap={16}>
          {gridItems.map((item) => (
            <Grid.Item key={item.text}>
              <div className="grid-item">
                <span className="grid-icon">{item.icon}</span>
                <span className="grid-text">{item.text}</span>
              </div>
            </Grid.Item>
          ))}
        </Grid>
      </Card>
    </div>
  )
}
