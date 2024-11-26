import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRoleStore = defineStore(
  'role',
  () => {
    const role = ref('')
    const setRole = newRole => {
      role.value = newRole
    }
    const removeRole = () => {
      role.value = ''
    }
    return {
      role,
      setRole,
      removeRole,
    }
  },
  {
    persist: true,
  },
)
