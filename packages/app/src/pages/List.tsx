import { NavBar, List, Tag } from 'antd-mobile'

const mockData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `列表项 ${i + 1}`,
  desc: `这是第 ${i + 1} 条数据的描述信息`,
  tag: i % 3 === 0 ? '新' : i % 3 === 1 ? '热' : '',
}))

export default function ListPage() {
  return (
    <div>
      <NavBar back={null}>列表</NavBar>
      <List>
        {mockData.map((item) => (
          <List.Item
            key={item.id}
            description={item.desc}
            extra={item.tag ? <Tag color="primary">{item.tag}</Tag> : undefined}
            clickable
          >
            {item.title}
          </List.Item>
        ))}
      </List>
    </div>
  )
}
