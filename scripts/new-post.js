const fs = require('fs');
const path = require('path');

function createNewPost() {
  const title = process.argv[2] || '新文章';
  const slug = title.replace(/\s+/g, '-').toLowerCase();
  const date = new Date().toISOString().split('T')[0];
  
  const filePath = path.join('./docs/blog/posts', `${slug}.md`);
  
  const content = `---
title: ${title}
date: ${date}
description: 这里是文章简介
---

# ${title}

这里是你的文章内容...

<!-- 更多内容 -->
`;
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ 创建新文章: ${filePath}`);
}

createNewPost();
