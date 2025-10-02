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
      { icon: 'github', link: 'https://github.com/VICTORIALAZY111' }
    ],

    footer: {
      message: '基于 VitePress 构建',
      message: '请联系 <a href="mailto:477522069@qq.com">477522069@qq.com</a>'
      copyright: 'Copyright © 2025 EverNest'
    },

    appearance: true,
  },
  
  lastUpdated: true
}
