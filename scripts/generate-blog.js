const fs = require('fs');
const path = require('path');

const postsDir = './docs/blog/posts';
const indexFile = './docs/blog/index.md';

function generateBlogIndex() {
  console.log('📁 开始生成博客索引...');
  
  // 确保目录存在
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
    console.log('✅ 创建博客文章目录');
  }

  // 获取所有文章
  const files = fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // 提取标题（从 # 标题 或者 frontmatter）
      let title = file.replace('.md', '');
      let date = '未知日期';
      let description = '';
      
      // 尝试从 frontmatter 提取
      const frontMatterMatch = content.match(/---\n([\s\S]*?)\n---/);
      if (frontMatterMatch) {
        const frontMatter = frontMatterMatch[1];
        const titleMatch = frontMatter.match(/title:\s*(.+)/);
        const dateMatch = frontMatter.match(/date:\s*(.+)/);
        const descMatch = frontMatter.match(/description:\s*(.+)/);
        
        if (titleMatch) title = titleMatch[1].trim();
        if (dateMatch) date = dateMatch[1].trim();
        if (descMatch) description = descMatch[1].trim();
      } else {
        // 从 # 标题提取
        const titleMatch = content.match(/^#\s+(.+)$/m);
        if (titleMatch) title = titleMatch[1].trim();
      }
      
      return {
        file,
        slug: file.replace('.md', ''),
        title,
        date,
        description,
        mtime: fs.statSync(filePath).mtime
      };
    })
    .sort((a, b) => new Date(b.mtime) - new Date(a.mtime)); // 按修改时间倒序

  console.log(`📝 找到 ${files.length} 篇文章`);

  // 生成索引内容
  let content = `# 📚 我的博客\n\n> 这里记录我的思考和学习，共 ${files.length} 篇文章\n\n## 最新文章\n\n`;

  if (files.length === 0) {
    content += '> 🎯 还没有文章，快去创建第一篇吧！\n\n';
    content += '在 \`docs/blog/posts/\` 目录下创建 \`.md\` 文件即可。\n';
  } else {
    files.forEach((post, index) => {
      content += `### ${index + 1}. [${post.title}](./posts/${post.slug})\n`;
      content += `📅 **日期：** ${post.date}  \n`;
      if (post.description) {
        content += `📖 **简介：** ${post.description}  \n`;
      }
      content += `\n[阅读全文](./posts/${post.slug}) | [编辑](https://github.com/ExtrmelyLazy/Evernest/edit/main/docs/blog/posts/${post.file})\n\n`;
      content += `---\n\n`;
    });
  }

  // 写入文件
  fs.writeFileSync(indexFile, content);
  console.log('✅ 博客索引生成完成！');
}

generateBlogIndex();
