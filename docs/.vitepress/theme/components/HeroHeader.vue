<!-- .vitepress/theme/components/HeroHeader.vue -->
<template>
  <div class="hero-container" :class="{ 'scrolled': isScrolled }">
    <div class="hero-background" :style="backgroundStyle"></div>
    <div class="hero-content">
      <h1 class="hero-title">{{ title }}</h1>
      <p class="hero-description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '博客标题'
  },
  description: {
    type: String,
    default: '博客描述'
  },
  backgroundImage: {
    type: String,
    default: '/hero-bg.jpg'
  }
})

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const backgroundStyle = {
  backgroundImage: `url(${props.backgroundImage})`
}
</script>

<style scoped>
.hero-container {
  position: relative;
  height: 60vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.4s ease;
}

.hero-container.scrolled {
  height: 40vh;
  min-height: 200px;
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
  transition: all 0.6s ease;
  transform: scale(1);
}

.hero-container.scrolled .hero-background {
  transform: scale(1.1);
  filter: brightness(0.8) blur(1px);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  transition: all 0.4s ease;
  transform: translateY(0);
}

.hero-container.scrolled .hero-content {
  transform: translateY(-20px);
  opacity: 0.9;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
}

.hero-container.scrolled .hero-title {
  font-size: 2rem;
}

.hero-description {
  font-size: 1.2rem;
  opacity: 0.9;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
}

.hero-container.scrolled .hero-description {
  font-size: 1rem;
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-container.scrolled .hero-title {
    font-size: 1.5rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
}
</style>
