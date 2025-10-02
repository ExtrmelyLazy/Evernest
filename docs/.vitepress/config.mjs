export default {
  title: 'EverNest',
  description: '无聊',
  
  themeConfig: {
    search: {
      provider: 'local'
    },
    
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/about' },
      { text: '博客', link: '/blog' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/VICTORIALAZY111' },
      { icon: 'mail', link: 'mailto:477522069@qq.com' }
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2025 EverNest'
    },

    appearance: true,
  },
  
  lastUpdated: true
}
