import { NavBar, List, Avatar, Tag } from 'antd-mobile'
import {
  SetOutline,
  InformationCircleOutline,
  PhoneFill,
  MailOutline,
  LocationOutline,
} from 'antd-mobile-icons'

const buildTime = new Date(__BUILD_TIME__).toLocaleString('zh-CN')

const skills = [
  { name: 'React', color: '#61dafb' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Vue', color: '#42b883' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Flutter', color: '#02569b' },
  { name: 'CSS', color: '#e34f26' },
]

const contacts = [
  { icon: <PhoneFill />, text: '+86 138****8888' },
  { icon: <MailOutline />, text: 'lgowen@example.com' },
  { icon: <LocationOutline />, text: '中国' },
]

const tags = ['React', 'TypeScript', '移动端']

export default function Profile() {
  return (
    <div className="bg-[#f8f7f4] min-h-100%">
      <NavBar back={null} className="!bg-transparent !h-44px" />

      {/* Hero */}
      <div className="relative pb-28px mb-4px">
        <div className="profile-hero-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,rgba(212,175,135,0.12)_0%,transparent_70%)]" />
        <div className="relative z-1 flex flex-col items-center pt-24px">
          {/* Avatar ring */}
          <div className="avatar-ring w-88px h-88px rounded-full p-3px mb-16px">
            <Avatar
              src=""
              style={{ '--size': '80px', '--border-radius': '50%', border: '3px solid #1e2a3a' } as React.CSSProperties}
              fallback="L"
            />
          </div>

          {/* Identity */}
          <div className="text-center mb-16px">
            <h1 className="text-24px text-white font-bold tracking-2px m-0">
              lgowen
            </h1>
            <p className="text-13px text-white/55 mt-4px tracking-1px">
              前端开发工程师
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-8px justify-center">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-10px py-3px rounded-20px text-11px text-white/80 font-500 bg-white/10 border border-white/15 tracking-0.5px"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* About */}
      <section className="px-20px pt-20px">
        <h2 className="profile-section-title">关于我</h2>
        <div className="profile-card relative p-16px pl-20px">
          <div className="accent-bar absolute left-0 top-12px bottom-12px w-3px rounded-2px" />
          <p className="text-14px text-[#555] !leading-[1.8] m-0">
            专注于前端开发，擅长 React 生态和移动端应用开发。
            热衷于探索新技术，目前在研究跨端方案和 AI 辅助开发。
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="px-20px pt-20px">
        <h2 className="profile-section-title">联系方式</h2>
        <div className="profile-card overflow-hidden">
          {contacts.map((c, i) => (
            <div
              key={c.text}
              className={`flex items-center gap-12px p-14px_16px text-14px text-[#444] ${i < contacts.length - 1 ? 'border-b border-[#f0f0f0]' : ''}`}
            >
              <span className="flex items-center justify-center w-32px h-32px rounded-8px bg-[#f5f3ef] text-14px text-[#8b7355] shrink-0">
                {c.icon}
              </span>
              <span>{c.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="px-20px pt-20px pb-8px">
        <h2 className="profile-section-title">技术栈</h2>
        <div className="flex flex-wrap gap-8px">
          {skills.map((skill) => (
            <div key={skill.name} className="profile-skill-chip">
              <span
                className="w-8px h-8px rounded-full shrink-0"
                style={{ background: skill.color }}
              />
              {skill.name}
            </div>
          ))}
        </div>
      </section>

      {/* System Info */}
      <List header="系统信息" className="!mt-8px">
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
      </List>

      {/* Settings */}
      <List header="设置" className="!mt-8px">
        <List.Item prefix={<SetOutline />}>账号与安全</List.Item>
        <List.Item prefix={<SetOutline />}>通知设置</List.Item>
        <List.Item prefix={<SetOutline />}>清除缓存</List.Item>
      </List>
    </div>
  )
}
