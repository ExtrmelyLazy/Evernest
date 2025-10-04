<!-- .vitepress/theme/Layout.vue -->
<template>
  <DefaultLayout>
    <!-- 在所有页面的内容顶部显示横幅 -->
    <template #page-top>
      <div class="top-banner">
        <div class="top-word">
          {{ displayText }}<span class="cursor" :class="{ blinking: !isTyping }">|</span>
        </div>
      </div>
    </template>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRoute, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const DefaultLayout = DefaultTheme.Layout
const route = useRoute()
const { frontmatter, title } = useData()

// 判断是否是首页
const isHomePage = computed(() => route.path === '/')

// 获取页面标题（优先使用 frontmatter.title，其次使用 h1 标题）
const pageTitle = computed(() => {
  return frontmatter.value.title || title.value || '文档页面'
})

// 优美的句子库
const sentences = [
  '你是我贫瘠宇宙里，唯一盛开的玫瑰',
  'I love you',
  '明月装饰了你的窗子，你装饰了别人的梦',
  '我不是归人，是个过客',
  '面朝大海，春暖花开',
  '朋友啊，那不是花瓣，是我凋落的心',
  '轻轻的我走了，正如我轻轻的来',
  '你的名字，是我读过最短的情诗。',
  '我喜欢你，像风走了八千里，不问归期。',
  '星河滚烫，你是人间理想。',
  '你是我漫长生命里，所有期待的总和。',
  '世间万物皆苦，你明目张胆的偏爱就是救赎。',
  '遇见你的那一刻，浩瀚众星，皆降为尘。',
  '我贪恋的人间烟火，不偏不倚，全都是你。',
  '你是我的今天，以及所有的明天。',
  '与你同行，不介路远。',
  '一眼着迷，满是爱意。',
  '浮世三千，吾爱有三：日、月与卿。日为朝，月为暮，卿为朝朝暮暮。',
  '我半生穿过枫叶，抖落白雪，就为奔向你面前。',
  '因为你，我愿意成为一个更好的人。',
  '你是我温暖的手套，冰冷的啤酒，带着阳光味道的衬衫，日复一日的梦想。',
  '今晚的月色真美。',
  '醒来觉得，甚是爱你。',
  '你是爱，是暖，是希望，你是人间的四月天。',
  '我们站着，不说话，就十分美好。',
  '草在结它的种子，风在摇它的叶子。',
  '你一会看我，一会看云。我觉得，你看我时很远，你看云时很近。',
  '于千万人之中遇见你所要遇见的人，于千万年之中，时间的无涯的荒野里，没有早一步，也没有晚一步，刚巧赶上了。',
  '原来你也在这里。',
  '我的心是旷野的鸟，在你的眼睛里找到了它的天空。',
  '眼睛为她下着雨，心却为她打着伞，这就是爱情。',
  '我愿意一路坎坷不平却总能听见你喊我。',
  '今夜我不关心人类，我只想你。',
  '你是我的半截的诗，不许别人更改一个字。',
  '当我跨过沉沦的一切，向着永恒开战的时候，你是我的军旗。',
  '告诉你，一想到你，我这张丑脸上就泛起微笑。',
  '爱你就像爱生命。',
  '我把我整个灵魂都给你，连同它的怪癖，耍小脾气，忽明忽暗，一千八百种坏毛病。它真讨厌，只有一点好，爱你。',
  '雨声潺潺，像住在溪边。宁愿天天下雨，以为你是因为下雨不来。',
  '见了他，她变得很低很低，低到尘埃里。但她心里是欢喜的，从尘埃里开出花来。',
  '我永恒的灵魂，注视着你的心，纵然黑夜孤寂，白昼如焚。',
  '你是我灵魂每日的面包。',
  '愿有岁月可回首，且以深情共白头。',
  '山河远阔，人间烟火，无一是你，无一不是你。',
  '浮生若梦，为欢几何，独有时你，在我心头。',
  '时光静好，与君语；细水流年，与君同；繁华落尽，与君老。',
  '白茶清欢无别事，我在等风也等你。',
]

// 响应式数据
const displayText = ref('')
const currentIndex = ref(0)
const isTyping = ref(false)
const isDeleting = ref(false)
let timer = null

// 获取当前要显示的文字
const getCurrentText = () => {
  if (isHomePage.value) {
    // 首页：从句子库中随机选择
    return sentences[currentIndex.value]
  } else {
    // 其他页面：显示页面标题
    return pageTitle.value
  }
}

// 打字机效果
const typeWriter = () => {
  const currentText = getCurrentText()
  const currentLength = displayText.value.length
  
  if (!isDeleting.value && !isTyping.value) {
    isTyping.value = true
    if (currentLength < currentText.length) {
      displayText.value = currentText.substring(0, currentLength + 1)
      timer = setTimeout(typeWriter, 80) // 打字速度
    } else {
      isTyping.value = false
      timer = setTimeout(() => {
        isDeleting.value = true
        typeWriter()
      }, 3000) // 显示完整文字的暂停时间（3秒）
    }
  } else if (isDeleting.value) {
    if (currentLength > 0) {
      displayText.value = currentText.substring(0, currentLength - 1)
      timer = setTimeout(typeWriter, 40) // 删除速度
    } else {
      // 删除完成，准备下一句
      isDeleting.value = false
      if (isHomePage.value) {
        // 首页：随机选择下一句
        let newIndex
        do {
          newIndex = Math.floor(Math.random() * sentences.length)
        } while (newIndex === currentIndex.value && sentences.length > 1)
        currentIndex.value = newIndex
      }
      timer = setTimeout(typeWriter, 500) // 切换到下一句前的暂停
    }
  }
}

// 开始打字效果
const startTyping = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  displayText.value = ''
  isTyping.value = false
  isDeleting.value = false
  timer = setTimeout(typeWriter, 500)
}

// 监听路由变化，切换页面时重新开始打字效果
watch([isHomePage, pageTitle], () => {
  startTyping()
})

onMounted(() => {
  // 初始化随机选择一句
  if (isHomePage.value) {
    currentIndex.value = Math.floor(Math.random() * sentences.length)
  }
  startTyping()
})

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script>

<style scoped>
.top-banner {
  margin: 0.5rem auto 1rem;
  display: flex;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* 更新为 PNG 文件 */
  background-image: url(/img/top-background.png);
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  width: 100%;
  max-width: calc(100% - 32px);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
}

.top-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.top-word {
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: 2rem;
  font-weight: 600;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  padding: 0 40px;
  position: relative;
  z-index: 2;
  line-height: 1.4;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.cursor {
  color: #ffd700;
  font-weight: 300;
  margin-left: 2px;
  animation: blink 1s infinite;
}

.cursor.blinking {
  animation: blink 0.8s infinite;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .top-banner {
    height: 150px;
    max-width: calc(100% - 16px);
    margin: 0.5rem auto 0.5rem;
  }
  
  .top-word {
    font-size: 1.6rem;
    padding: 0 20px;
  }
}

@media (max-width: 480px) {
  .top-banner {
    height: 120px;
    border-radius: 8px;
  }
  
  .top-word {
    font-size: 1.3rem;
    padding: 0 16px;
  }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .top-banner {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  }
}
</style>