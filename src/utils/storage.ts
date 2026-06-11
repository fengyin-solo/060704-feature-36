import type { Diary, User, InventoryItem, ArchivedDiary } from '@/types'

export interface RecentLogin {
  userId: string
  timestamp: number
}

const STORAGE_KEYS = {
  CURRENT_USER: 'glitch_diary_current_user',
  USERS: 'glitch_diary_users',
  DIARIES: 'glitch_diary_diaries',
  INVENTORY: 'glitch_diary_inventory_',
  ARCHIVED_DIARIES: 'glitch_diary_archived_diaries',
  RECENT_LOGINS: 'glitch_diary_recent_logins'
}
const MAX_RECENT_LOGINS = 5

export const storage = {
  getCurrentUser(): string | null {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
  },
  
  setCurrentUser(userId: string | null): void {
    if (userId) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, userId)
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
    }
  },
  
  getUsers(): User[] {
    const data = localStorage.getItem(STORAGE_KEYS.USERS)
    return data ? JSON.parse(data) : []
  },
  
  saveUsers(users: User[]): void {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
  },
  
  getDiaries(): Diary[] {
    const data = localStorage.getItem(STORAGE_KEYS.DIARIES)
    return data ? JSON.parse(data) : []
  },
  
  saveDiaries(diaries: Diary[]): void {
    localStorage.setItem(STORAGE_KEYS.DIARIES, JSON.stringify(diaries))
  },
  
  getInventory(userId: string): InventoryItem[] {
    const data = localStorage.getItem(STORAGE_KEYS.INVENTORY + userId)
    return data ? JSON.parse(data) : []
  },
  
  saveInventory(userId: string, inventory: InventoryItem[]): void {
    localStorage.setItem(STORAGE_KEYS.INVENTORY + userId, JSON.stringify(inventory))
  },

  getArchivedDiaries(): ArchivedDiary[] {
    const data = localStorage.getItem(STORAGE_KEYS.ARCHIVED_DIARIES)
    return data ? JSON.parse(data) : []
  },

  saveArchivedDiaries(archivedDiaries: ArchivedDiary[]): void {
    localStorage.setItem(STORAGE_KEYS.ARCHIVED_DIARIES, JSON.stringify(archivedDiaries))
  },

  getRecentLogins(): RecentLogin[] {
    const data = localStorage.getItem(STORAGE_KEYS.RECENT_LOGINS)
    return data ? JSON.parse(data) : []
  },

  addRecentLogin(userId: string): void {
    const recentLogins = this.getRecentLogins()
    const filtered = recentLogins.filter(r => r.userId !== userId)
    filtered.unshift({ userId, timestamp: Date.now() })
    const trimmed = filtered.slice(0, MAX_RECENT_LOGINS)
    localStorage.setItem(STORAGE_KEYS.RECENT_LOGINS, JSON.stringify(trimmed))
  },

  removeRecentLogin(userId: string): void {
    const recentLogins = this.getRecentLogins()
    const filtered = recentLogins.filter(r => r.userId !== userId)
    localStorage.setItem(STORAGE_KEYS.RECENT_LOGINS, JSON.stringify(filtered))
  }
}
