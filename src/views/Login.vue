<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'

const emit = defineEmits<{
  login: [userName: string]
}>()

const userStore = useUserStore()
const userName = ref('')
const isLoading = ref(false)

const hasRecentUsers = computed(() => userStore.recentUsers.length > 0)

function handleSubmit() {
  if (!userName.value.trim()) return
  
  isLoading.value = true
  
  setTimeout(() => {
    emit('login', userName.value.trim())
    isLoading.value = false
  }, 500)
}

function handleQuickLogin(userName: string) {
  isLoading.value = true
  
  setTimeout(() => {
    emit('login', userName)
    isLoading.value = false
  }, 300)
}
</script>

<template>
  <div class="min-h-[70vh] flex items-center justify-center">
    <div class="w-full max-w-md">
      <div class="crt-container rounded-lg border-2 border-diary-fresh p-8 bg-gray-900/80">
        <div class="text-center mb-8">
          <div class="text-6xl mb-4">📓</div>
          <h1 class="font-vt323 text-4xl text-diary-fresh glow-text mb-2">
            故障日记
          </h1>
          <p class="text-gray-400 font-vt323">
            GLITCH_DIARY v0.1.0
          </p>
        </div>
        
        <div class="ascii-divider text-center mb-6">
          ====================================
        </div>
        
        <div v-if="hasRecentUsers" class="mb-6">
          <label class="block font-vt323 text-diary-fresh mb-3 text-lg">
            > 最近登录
          </label>
          <div class="space-y-2">
            <button
              v-for="user in userStore.recentUsers"
              :key="user.id"
              type="button"
              @click="handleQuickLogin(user.name)"
              :disabled="isLoading"
              class="w-full text-left px-4 py-3 border-2 border-gray-700 rounded hover:border-diary-fresh hover:bg-gray-800/50 transition-all bg-gray-800/30 group"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="text-2xl">👤</span>
                  <div>
                    <div class="font-vt323 text-diary-fresh text-lg group-hover:glow-text">
                      {{ user.name }}
                    </div>
                    <div v-if="user.bio" class="text-gray-500 font-vt323 text-xs">
                      {{ user.bio }}
                    </div>
                  </div>
                </div>
                <span class="text-diary-fresh font-vt323 opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </div>
            </button>
          </div>
          <div class="ascii-divider text-center my-6">
            --------------- OR ---------------
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block font-vt323 text-diary-fresh mb-2 text-lg">
              > 请输入你的名字
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-diary-fresh font-vt323 text-xl">
                $
              </span>
              <input
                v-model="userName"
                type="text"
                placeholder="type your name here..."
                class="terminal-input pl-8 py-3 border-2 border-gray-700 rounded focus:border-diary-fresh transition-colors bg-gray-800/50"
                :disabled="isLoading"
                maxlength="20"
              />
            </div>
            <p class="text-gray-500 font-vt323 text-sm mt-2">
              已注册用户将自动登录，新用户将自动创建账户
            </p>
          </div>
          
          <button
            type="submit"
            class="w-full btn-pixel text-diary-fresh border-diary-fresh text-xl py-3"
            :disabled="!userName.trim() || isLoading"
          >
            {{ isLoading ? 'CONNECTING...' : '▶ 进入系统' }}
          </button>
        </form>
        
        <div class="ascii-divider text-center mt-6 mb-4">
          ====================================
        </div>
        
        <div class="text-center text-gray-500 font-vt323 text-sm space-y-1">
          <p>「记录终将腐朽，但腐朽也是一种美」</p>
          <p class="text-xs text-gray-600">
            每篇日记都有自己的生命周期，请善待它们
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
