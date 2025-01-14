<template>
    <div class="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0a0a2a] to-[#1a1a3a]"
         @mousemove="handleMouseMove">
      <!-- Header -->
      <div class="absolute top-4 right-4">
        <div class="flex items-center gap-3">
          <a href="https://x.com/TraderNovaAI" target="_blank">
            <Icon icon="fa6-brands:x-twitter" class="text-white"/>
          </a>
         
        </div>
      </div>
      <!-- Stars Background -->
      <div class="absolute inset-0">
        <div v-for="(star, index) in backgroundStars" 
             :key="'bg-star-' + index"
             class="absolute rounded-full bg-white"
             :style="{
               left: `${star.x + (mouseX * star.parallax)}px`,
               top: `${star.y + (mouseY * star.parallax)}px`,
               width: `${star.size}px`,
               height: `${star.size}px`,
               opacity: star.opacity,
               boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,${star.opacity})`
             }">
        </div>
      </div>
  
      <!-- Constellation -->
      <div class="absolute inset-0">
        <div 
          v-for="(star, index) in constellationStars" 
          :key="index"
          class="absolute rounded-full cursor-pointer transition-all duration-300 ease-in-out"
          :class="{'animate-pulse': star.isHovered}"
          :style="{
            left: `${star.x + (mouseX * star.parallax)}px`,
            top: `${star.y + (mouseY * star.parallax)}px`,
            width: `${star.size || 1}px`,
            height: `${star.size || 1}px`,
            backgroundColor: 'white',
            boxShadow: `0 0 ${(star.size || 1) * 4}px #fff, 
                        0 0 ${(star.size || 1) * 6}px #fff, 
                        0 0 ${(star.size || 1) * 8}px #fff`
          }"
          @mousemove="moveStar($event, index)"
          @mouseenter="star.isHovered = true"
          @mouseleave="star.isHovered = false"
        ></div>
        <svg class="absolute inset-0 pointer-events-none">
          <path :d="constellationPath" class="stroke-white/20 stroke-[1] fill-none" />
        </svg>
      </div>
  
      <!-- Content -->
      <div class="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 class="font-megrim text-8xl font-bold text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          nova
        </h1>
        <!-- Add a cool button -->
        <router-link to="/dashboard">
        <button class="font-semibold mt-8 px-8 py-3 bg-transparent border-2 border-white/50 text-white 
                       rounded-full hover:bg-white/10 transition-all duration-300 
                       backdrop-blur-sm group hover:border-white">
          <span class="font-megrim">Launch app</span>
        </button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    data() {
      return {
        mouseX: 0,
        mouseY: 0,
        backgroundStars: [],
        constellationStars: [
          // Betelgeuse (right shoulder) - one of the brightest, reddish
          { 
            x: window.innerWidth * 0.6, 
            y: window.innerHeight * 0.2, 
            originalX: window.innerWidth * 0.6, 
            originalY: window.innerHeight * 0.2, 
            isHovered: false, 
            parallax: 0.15,
            size: 3 // Larger size for this bright star
          },
          // Bellatrix (left shoulder)
          { 
            x: window.innerWidth * 0.4, 
            y: window.innerHeight * 0.2, 
            originalX: window.innerWidth * 0.4, 
            originalY: window.innerHeight * 0.2, 
            isHovered: false, 
            parallax: 0.15,
            size: 2
          },
          // Alnitak (Belt - left)
          { 
            x: window.innerWidth * 0.48, 
            y: window.innerHeight * 0.45, 
            originalX: window.innerWidth * 0.48, 
            originalY: window.innerHeight * 0.45, 
            isHovered: false, 
            parallax: 0.12,
            size: 2
          },
          // Alnilam (Belt - center)
          { 
            x: window.innerWidth * 0.5, 
            y: window.innerHeight * 0.46, 
            originalX: window.innerWidth * 0.5, 
            originalY: window.innerHeight * 0.46, 
            isHovered: false, 
            parallax: 0.12,
            size: 2
          },
          // Mintaka (Belt - right)
          { 
            x: window.innerWidth * 0.52, 
            y: window.innerHeight * 0.45, 
            originalX: window.innerWidth * 0.52, 
            originalY: window.innerWidth * 0.45, 
            isHovered: false, 
            parallax: 0.12,
            size: 2
          },
          // Saiph (left foot)
          { 
            x: window.innerWidth * 0.45, 
            y: window.innerHeight * 0.7, 
            originalX: window.innerWidth * 0.45, 
            originalY: window.innerHeight * 0.7, 
            isHovered: false, 
            parallax: 0.1,
            size: 1.5
          },
          // Rigel (right foot) - very bright, bluish
          { 
            x: window.innerWidth * 0.58, 
            y: window.innerHeight * 0.7, 
            originalX: window.innerWidth * 0.58, 
            originalY: window.innerHeight * 0.7, 
            isHovered: false, 
            parallax: 0.1,
            size: 2.5
          },
          // Orion's Sword (including M42 nebula)
          { 
            x: window.innerWidth * 0.5, 
            y: window.innerHeight * 0.52, 
            originalX: window.innerWidth * 0.5, 
            originalY: window.innerHeight * 0.52, 
            isHovered: false, 
            parallax: 0.11,
            size: 2
          },
          { 
            x: window.innerWidth * 0.498, 
            y: window.innerHeight * 0.55, 
            originalX: window.innerWidth * 0.498, 
            originalY: window.innerHeight * 0.55, 
            isHovered: false, 
            parallax: 0.11,
            size: 1.5
          },
          { 
            x: window.innerWidth * 0.496, 
            y: window.innerHeight * 0.58, 
            originalX: window.innerWidth * 0.496, 
            originalY: window.innerHeight * 0.58, 
            isHovered: false, 
            parallax: 0.11,
            size: 1.5
          }
        ]
      }
    },
    computed: {
      constellationPath() {
        const connections = [
          [0, 2], // Right shoulder to belt
          [1, 2], // Left shoulder to belt
          [2, 3, 4], // Belt stars
          [2, 5], // Belt to left foot
          [4, 6], // Belt to right foot
          [3, 7, 8, 9] // Belt to sword
        ]
        
        let path = ''
        connections.forEach(connection => {
          connection.forEach((pointIndex, i) => {
            const star = this.constellationStars[pointIndex]
            const x = star.x + (this.mouseX * star.parallax)
            const y = star.y + (this.mouseY * star.parallax)
            path += `${i === 0 ? 'M' : 'L'} ${x} ${y} `
          })
        })
        return path
      }
    },
    mounted() {
      this.generateStars()
      window.addEventListener('resize', this.updateConstellationPosition)
      window.addEventListener('resize', this.generateStars)
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.updateConstellationPosition)
      window.removeEventListener('resize', this.generateStars)
    },
    methods: {
      generateStars() {
        const stars = []
        const numStars = 200
        
        for (let i = 0; i < numStars; i++) {
          stars.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.7 + 0.3,
            parallax: Math.random() * 0.2 + 0.1
          })
        }
        
        this.backgroundStars = stars
      },
      handleMouseMove(event) {
        // Smoother parallax movement
        const targetX = (event.clientX - window.innerWidth / 2) / 10
        const targetY = (event.clientY - window.innerHeight / 2) / 10
        
        // Smooth transition
        this.mouseX += (targetX - this.mouseX) * 0.1
        this.mouseY += (targetY - this.mouseY) * 0.1
      },
      moveStar(event, index) {
        const maxDistance = 50
        const star = this.constellationStars[index]
        const rect = event.target.getBoundingClientRect()
        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top
        
        const deltaX = mouseX - star.originalX
        const deltaY = mouseY - star.originalY
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        
        if (distance < maxDistance) {
          this.constellationStars[index] = {
            ...star,
            x: star.originalX + (deltaX * 0.2),
            y: star.originalY + (deltaY * 0.2)
          }
        }
      },
      updateConstellationPosition() {
        this.constellationStars = this.constellationStars.map(star => ({
          ...star,
          x: star.originalX = star.originalX * (window.innerWidth / star.lastWidth || 1),
          y: star.originalY = star.originalY * (window.innerHeight / star.lastHeight || 1),
          lastWidth: window.innerWidth,
          lastHeight: window.innerHeight
        }))
      }
    }
  }
  </script>
  
  <style scoped>
  /* Keep existing animations */
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }
  
  /* Add a twinkle animation for the dynamic stars */
  @keyframes twinkle {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  </style>
  <script setup>
  import { Icon } from '@iconify/vue';
  </script>
  