import { defineConfig } from 'unocss'
import presetWind3 from '@unocss/preset-wind3'
import presetIcons from '@unocss/preset-icons'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetRemToPx({
      baseFontSize: 16,
    }),
  ],
  shortcuts: {
    'profile-hero-bg':
      'absolute inset-0 bg-gradient-to-br from-[#1e2a3a] via-[#2c3e50] to-[#34495e]',
    'profile-section-title':
      'text-12px font-600 text-[#999] uppercase tracking-2px mb-12px',
    'profile-card': 'bg-white rounded-12px shadow-sm',
    'profile-skill-chip':
      'inline-flex items-center gap-6px px-14px py-6px rounded-20px text-13px font-500 text-[#333] bg-white border border-[#e8e6e1]',
  },
  rules: [
    [
      'avatar-ring',
      {
        background: 'linear-gradient(135deg, #d4af87 0%, #a0c4d8 100%)',
      },
    ],
    [
      'accent-bar',
      {
        background: 'linear-gradient(to bottom, #d4af87, #a0c4d8)',
      },
    ],
  ],
})
