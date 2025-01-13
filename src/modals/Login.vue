<template>
    <!-- Modal backdrop -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-out duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="modalOpen" class="fixed inset-0 bg-gray-900 bg-opacity-60 z-50 transition-opacity" aria-hidden="true"></div>
    </transition>
    <!-- Modal dialog -->
    <transition
      enter-active-class="transition ease-in-out duration-200"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in-out duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div v-show="modalOpen" :id="id" class="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6" role="dialog" aria-modal="true">
        <div ref="modalContent" class="bg-gray-800 rounded-lg shadow-lg max-w-lg w-full max-h-full">
          <!-- Modal header -->
          <div :class="isProcessing ? 'bg-gray-900/50' : ''" class="px-5 py-3 border-b border-gray-200 dark:border-gray-700/60">
            <div class="flex justify-between items-center">
              <!-- Tabs -->
              <div class="flex -mb-3">
                <button 
                  @click="$emit('update:activeTab', 'signup')"
                  :class="[
                    'px-4 py-2 text-sm font-medium -mb-px',
                    activeTab === 'signup'
                      ? 'border-b-2 border-blue-500 text-blue-500'
                      : 'text-gray-500 hover:text-gray-400'
                  ]"
                >
                  Sign Up
                </button>
                <button 
                  @click="$emit('update:activeTab', 'login')"
                  :class="[
                    'px-4 py-2 text-sm font-medium -mb-px',
                    activeTab === 'login'
                      ? 'border-b-2 border-blue-500 text-blue-500'
                      : 'text-gray-500 hover:text-gray-400'
                  ]"
                >
                  Login
                </button>
              </div>
              
              <!-- Close button -->
              <button 
                class="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400" 
                @click.stop="handleClose"
              >
                <div class="sr-only">Close</div>
                <svg class="fill-current" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                </svg>
              </button>
            </div>
          </div>
          <slot />       
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    name: 'LoginModal',
    props: {
      id: String,
      modalOpen: Boolean,
      activeTab: {
        type: String,
        default: 'signup'
      },
      isProcessing: {
        type: Boolean,
        default: false
      },
      allowCloseWhileProcessing: {
        type: Boolean,
        default: false
      }
    },
    emits: ['close-modal', 'update:activeTab'],
    setup(props, { emit }) {
      const modalContent = ref(null)
  
      const handleClose = () => {
        if (!props.isProcessing || props.allowCloseWhileProcessing) {
          emit('close-modal')
        }
      }
  
      return {
        modalContent,
        handleClose
      }
    }  
  }
  </script>