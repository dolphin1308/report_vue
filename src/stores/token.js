import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTokenStore = defineStore(
  'token',
  () => {
    const token = ref('')
    const setToken = newToken => {
      this.token = newToken
    }

    const removeToken = () => {
      this.token = ''
    }

    return {
      token,
      setToken,
      removeToken,
    }
  },
  // {
  //   persist: true,
  // },
)
