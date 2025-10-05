<!-- .vitepress/theme/components/HeroHeader.vue -->
<template>
  <div class="hero-container" ref="container">
    <div class="hero-background" :style="backgroundStyle"></div>
    <div class="hero-content" :style="contentStyle">
      <slot>
        <h1 class="hero-title" :style="titleStyle">{{ title }}</h1>
        <p class="hero-description" :style="descriptionStyle">{{ description }}</p>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { withBase } from 'vitepress'

// 导入同级目录的图片
import heroBg from './hero-bg.png'

const props = defineProps({
  backgroundImage: {
    type: String,
    default: heroBg  // 直接使用导入的图片
  },
  title: {
    type: String,
    default: '博客标题'
  },
  description: {
    type: String,
    default: '博客描述'
  }
})

const scrollY = ref(0)

// 计算滚动比例
const scrollProgress = computed(() => {
  const maxScroll = 200
  return Math.min(scrollY.value / maxScroll, 1)
})

// 背景样式
const backgroundStyle = computed(() => {
  const scale = 1 + scrollProgress.value * 0.1
  const brightness = 1 - scrollProgress.value * 0.2
  const blur = scrollProgress.value * 1
  
  return {
    backgroundImage: `url(${props.backgroundImage})`, // 直接使用导入的路径
    transform: `scale(${scale})`,
    filter: `brightness(${brightness}) blur(${blur}px)`
  }
})

// 其他样式计算保持不变
const contentStyle = computed(() => {
  const translateY = scrollProgress.value * -20
  return { transform: `translateY(${translateY}px)` }
})

const titleStyle = computed(() => {
  const scale = 1 - scrollProgress.value * 0.3
  return { transform: `scale(${scale})` }
})

const descriptionStyle = computed(() => {
  const opacity = 1 - scrollProgress.value * 0.2
  return { opacity: opacity }
})

const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 样式保持不变 */
.hero-container {
  position: relative;
  height: 60vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  will-change: transform, filter;
  transition: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  will-change: transform;
  transition: none;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  will-change: transform;
  transition: none;
  transform-origin: center center;
}

.hero-description {
  font-size: 1.2rem;
  opacity: 0.9;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  will-change: opacity;
  transition: none;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  .hero-description {
    font-size: 1rem;
  }
}
</style>
