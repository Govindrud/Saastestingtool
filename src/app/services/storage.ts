// Local storage service for persisting user preferences and cached data

interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  autoRefresh: boolean;
  defaultModule: string;
  emailNotifications: boolean;
}

interface CachedData {
  key: string;
  value: any;
  timestamp: number;
  expiresIn: number;
}

class StorageService {
  private readonly STORAGE_PREFIX = 'qualityforge_';
  private readonly CACHE_PREFIX = 'cache_';

  // User Preferences
  getUserPreferences(): UserPreferences {
    const defaults: UserPreferences = {
      theme: 'dark',
      notifications: true,
      autoRefresh: true,
      defaultModule: 'dashboard',
      emailNotifications: true
    };

    try {
      const stored = localStorage.getItem(`${this.STORAGE_PREFIX}preferences`);
      return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
    } catch (error) {
      console.error('Error loading preferences:', error);
      return defaults;
    }
  }

  setUserPreferences(preferences: Partial<UserPreferences>): void {
    try {
      const current = this.getUserPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(`${this.STORAGE_PREFIX}preferences`, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  }

  // Authentication
  getAuthToken(): string | null {
    try {
      return localStorage.getItem(`${this.STORAGE_PREFIX}auth_token`);
    } catch (error) {
      return null;
    }
  }

  setAuthToken(token: string): void {
    try {
      localStorage.setItem(`${this.STORAGE_PREFIX}auth_token`, token);
    } catch (error) {
      console.error('Error saving auth token:', error);
    }
  }

  clearAuthToken(): void {
    try {
      localStorage.removeItem(`${this.STORAGE_PREFIX}auth_token`);
    } catch (error) {
      console.error('Error clearing auth token:', error);
    }
  }

  // User Data
  getUserData(): any {
    try {
      const stored = localStorage.getItem(`${this.STORAGE_PREFIX}user`);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      return null;
    }
  }

  setUserData(userData: any): void {
    try {
      localStorage.setItem(`${this.STORAGE_PREFIX}user`, JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }

  clearUserData(): void {
    try {
      localStorage.removeItem(`${this.STORAGE_PREFIX}user`);
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  }

  // Cache Management
  setCache(key: string, value: any, expiresInMs: number = 5 * 60 * 1000): void {
    try {
      const cacheData: CachedData = {
        key,
        value,
        timestamp: Date.now(),
        expiresIn: expiresInMs
      };
      localStorage.setItem(
        `${this.STORAGE_PREFIX}${this.CACHE_PREFIX}${key}`,
        JSON.stringify(cacheData)
      );
    } catch (error) {
      console.error('Error setting cache:', error);
    }
  }

  getCache<T = any>(key: string): T | null {
    try {
      const stored = localStorage.getItem(`${this.STORAGE_PREFIX}${this.CACHE_PREFIX}${key}`);
      if (!stored) return null;

      const cacheData: CachedData = JSON.parse(stored);
      const isExpired = Date.now() - cacheData.timestamp > cacheData.expiresIn;

      if (isExpired) {
        this.clearCache(key);
        return null;
      }

      return cacheData.value as T;
    } catch (error) {
      console.error('Error getting cache:', error);
      return null;
    }
  }

  clearCache(key: string): void {
    try {
      localStorage.removeItem(`${this.STORAGE_PREFIX}${this.CACHE_PREFIX}${key}`);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  clearAllCache(): void {
    try {
      const keys = Object.keys(localStorage);
      const cacheKeys = keys.filter(k => k.startsWith(`${this.STORAGE_PREFIX}${this.CACHE_PREFIX}`));
      cacheKeys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing all cache:', error);
    }
  }

  // Test History
  addTestToHistory(test: any): void {
    try {
      const history = this.getTestHistory();
      history.unshift(test);
      // Keep only last 50 tests
      const trimmed = history.slice(0, 50);
      localStorage.setItem(`${this.STORAGE_PREFIX}test_history`, JSON.stringify(trimmed));
    } catch (error) {
      console.error('Error adding test to history:', error);
    }
  }

  getTestHistory(): any[] {
    try {
      const stored = localStorage.getItem(`${this.STORAGE_PREFIX}test_history`);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  }

  clearTestHistory(): void {
    try {
      localStorage.removeItem(`${this.STORAGE_PREFIX}test_history`);
    } catch (error) {
      console.error('Error clearing test history:', error);
    }
  }

  // Recent Searches
  addRecentSearch(search: string): void {
    try {
      const searches = this.getRecentSearches();
      const filtered = searches.filter(s => s !== search);
      filtered.unshift(search);
      const trimmed = filtered.slice(0, 10);
      localStorage.setItem(`${this.STORAGE_PREFIX}recent_searches`, JSON.stringify(trimmed));
    } catch (error) {
      console.error('Error adding recent search:', error);
    }
  }

  getRecentSearches(): string[] {
    try {
      const stored = localStorage.getItem(`${this.STORAGE_PREFIX}recent_searches`);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  }

  // Saved Filters
  saveFilter(name: string, filter: any): void {
    try {
      const filters = this.getSavedFilters();
      filters[name] = filter;
      localStorage.setItem(`${this.STORAGE_PREFIX}saved_filters`, JSON.stringify(filters));
    } catch (error) {
      console.error('Error saving filter:', error);
    }
  }

  getSavedFilters(): Record<string, any> {
    try {
      const stored = localStorage.getItem(`${this.STORAGE_PREFIX}saved_filters`);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      return {};
    }
  }

  deleteFilter(name: string): void {
    try {
      const filters = this.getSavedFilters();
      delete filters[name];
      localStorage.setItem(`${this.STORAGE_PREFIX}saved_filters`, JSON.stringify(filters));
    } catch (error) {
      console.error('Error deleting filter:', error);
    }
  }

  // Clear all storage
  clearAll(): void {
    try {
      const keys = Object.keys(localStorage);
      const appKeys = keys.filter(k => k.startsWith(this.STORAGE_PREFIX));
      appKeys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing all storage:', error);
    }
  }
}

// Export singleton instance
export const storage = new StorageService();

// Export types
export type { UserPreferences };
