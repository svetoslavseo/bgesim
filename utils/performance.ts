// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Mark performance timing
  mark(name: string): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(name);
      this.metrics.set(name, performance.now());
    }
  }

  // Measure performance between two marks
  measure(name: string, startMark: string, endMark: string): number | null {
    if (typeof window !== 'undefined' && 'performance' in window) {
      try {
        performance.measure(name, startMark, endMark);
        const measure = performance.getEntriesByName(name, 'measure')[0];
        return measure ? measure.duration : null;
      } catch (error) {
        console.warn('Performance measure failed:', error);
        return null;
      }
    }
    return null;
  }

  // Get Core Web Vitals
  getCoreWebVitals(): Promise<{
    lcp?: number;
    fid?: number;
    cls?: number;
  }> {
    return new Promise((resolve) => {
      const vitals: any = {};

      // Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            vitals.lcp = lastEntry.startTime;
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // First Input Delay
          const fidObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach((entry: any) => {
              vitals.fid = entry.processingStart - entry.startTime;
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });

          // Cumulative Layout Shift
          const clsObserver = new PerformanceObserver((entryList) => {
            let clsValue = 0;
            const entries = entryList.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            vitals.cls = clsValue;
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });

          // Resolve after a delay to collect metrics
          setTimeout(() => {
            resolve(vitals);
          }, 3000);
        } catch (error) {
          console.warn('Performance observer failed:', error);
          resolve(vitals);
        }
      } else {
        resolve(vitals);
      }
    });
  }

  // Log performance metrics
  logMetrics(): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      console.group('🚀 Performance Metrics');
      console.log('DOMContentLoaded:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
      console.log('Load Event:', navigation.loadEventEnd - navigation.loadEventStart);
      console.log('Time to Interactive:', navigation.domInteractive - navigation.navigationStart);
      
      // Log custom metrics
      this.metrics.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
      
      console.groupEnd();
    }
  }

  // Preload critical resources
  preloadResource(href: string, as: string, type?: string): void {
    if (typeof window !== 'undefined' && document.head) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      if (type) link.type = type;
      
      document.head.appendChild(link);
    }
  }

  // Preconnect to external domains
  preconnectDomain(domain: string): void {
    if (typeof window !== 'undefined' && document.head) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      
      document.head.appendChild(link);
    }
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// Auto-log metrics in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      performanceMonitor.logMetrics();
      performanceMonitor.getCoreWebVitals().then((vitals) => {
        console.group('📊 Core Web Vitals');
        console.log('LCP (Largest Contentful Paint):', vitals.lcp, 'ms');
        console.log('FID (First Input Delay):', vitals.fid, 'ms');
        console.log('CLS (Cumulative Layout Shift):', vitals.cls);
        console.groupEnd();
      });
    }, 1000);
  });
}