/**
 * SSR-safe browser API utilities
 */

/**
 * Check if code is running in a browser environment
 */
export const isBrowser = typeof window !== 'undefined' && 
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined';

/**
 * SSR-safe localStorage wrapper
 */
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (!isBrowser || typeof localStorage === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    if (!isBrowser || typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Fail silently
    }
  },
  removeItem: (key: string): void => {
    if (!isBrowser || typeof localStorage === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Fail silently
    }
  }
};

/**
 * SSR-safe sessionStorage wrapper
 */
export const safeSessionStorage = {
  getItem: (key: string): string | null => {
    if (!isBrowser || typeof sessionStorage === 'undefined') return null;
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    if (!isBrowser || typeof sessionStorage === 'undefined') return;
    try {
      sessionStorage.setItem(key, value);
    } catch {
      // Fail silently
    }
  },
  removeItem: (key: string): void => {
    if (!isBrowser || typeof sessionStorage === 'undefined') return;
    try {
      sessionStorage.removeItem(key);
    } catch {
      // Fail silently
    }
  }
};

/**
 * SSR-safe window utilities
 */
export const safeWindow = {
  scrollTo: (x: number, y: number): void => {
    if (!isBrowser) return;
    window.scrollTo(x, y);
  },
  addEventListener: (event: string, handler: EventListener): void => {
    if (!isBrowser) return;
    window.addEventListener(event, handler);
  },
  removeEventListener: (event: string, handler: EventListener): void => {
    if (!isBrowser) return;
    window.removeEventListener(event, handler);
  },
  getLocation: () => {
    if (!isBrowser) {
      return {
        pathname: '/',
        search: '',
        hash: '',
        href: 'http://localhost:3000/'
      };
    }
    return window.location;
  }
};

/**
 * SSR-safe document utilities
 */
export const safeDocument = {
  getElementById: (id: string): HTMLElement | null => {
    if (!isBrowser) return null;
    return document.getElementById(id);
  },
  querySelector: (selector: string): Element | null => {
    if (!isBrowser) return null;
    return document.querySelector(selector);
  },
  querySelectorAll: (selector: string): NodeListOf<Element> | [] => {
    if (!isBrowser) return [] as any;
    return document.querySelectorAll(selector);
  }
}; 