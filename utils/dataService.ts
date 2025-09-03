// Optimized data service with caching and lazy loading

class DataService {
  private cache: Map<string, any> = new Map();
  private loadingPromises: Map<string, Promise<any>> = new Map();

  // Preload critical data in chunks
  async preloadCriticalData(): Promise<void> {
    // Only load a subset of plans data initially for faster first paint
    const criticalPlans = await this.loadPlansSubset();
    this.cache.set('critical-plans', criticalPlans);
  }

  private async loadPlansSubset(): Promise<any> {
    try {
      const fullData = await this.fetchPlansData();
      
      // Get the first 10 plans plus plans for popular countries
      const firstTenPlans = fullData.items.slice(0, 10);
      
      // Add plans for popular countries that should always be available for meta titles
      const popularCountryCodes = ['SB', 'US', 'GB', 'AU', 'CA', 'DE', 'FR', 'JP', 'SG', 'NZ', 'AD'];
      const popularCountryPlans = fullData.items.filter((plan: any) => 
        plan.covered_countries.some((countryCode: string) => popularCountryCodes.includes(countryCode))
      );
      
      // Combine and remove duplicates
      const allPlans = [...firstTenPlans, ...popularCountryPlans];
      const uniquePlans = allPlans.filter((plan, index, self) => 
        index === self.findIndex(p => p.identifier === plan.identifier)
      );
      
      return {
        items: uniquePlans,
        isSubset: true
      };
    } catch (error) {
      console.error('Failed to load critical plans:', error);
      return { items: [], isSubset: true };
    }
  }

  async getPlansData(options?: { full?: boolean; forceRefresh?: boolean }): Promise<any> {
    const full = options?.full === true;
    const forceRefresh = options?.forceRefresh === true;

    console.log(`DataService.getPlansData: Called with full=${full}, forceRefresh=${forceRefresh}`);

    // If force refresh is requested, clear cache and reload
    if (forceRefresh) {
      console.log('DataService.getPlansData: Force refresh requested, clearing cache...');
      this.cache.delete('plans-data');
      this.cache.delete('critical-plans');
      this.loadingPromises.delete('plans-data');
    }

    // Always load full data for region and country pages to ensure complete coverage
    // Check if this is being called from a page that needs full data
    const shouldLoadFull = full || this.shouldAlwaysLoadFull();

    if (shouldLoadFull) {
      console.log('DataService.getPlansData: Loading full data...');
      return this.loadFullPlansData();
    }

    const cacheKey = 'plans-data';
    
    // Return cached data if available
    if (this.cache.has(cacheKey)) {
      console.log('DataService.getPlansData: Returning cached data');
      return this.cache.get(cacheKey);
    }

    // Return critical subset while full data loads
    if (this.cache.has('critical-plans')) {
      console.log('DataService.getPlansData: Returning critical subset while full data loads');
      // Load full data in background
      this.loadFullPlansData();
      return this.cache.get('critical-plans');
    }

    // If nothing cached, load full data first
    console.log('DataService.getPlansData: No cache, loading full data...');
    return this.loadFullPlansData();
  }

  // Check if we should always load full data based on current context
  private shouldAlwaysLoadFull(): boolean {
    if (typeof window === 'undefined') return true; // Always load full on server

    // Check URL to determine if this is a country or region page
    const pathname = window.location?.pathname || '';
    const isCountryPage = pathname.includes('/country/') || pathname.includes('/esim-');
    const isRegionPage = pathname.includes('/region/') || 
                        pathname.includes('/europe') || 
                        pathname.includes('/asia') || 
                        pathname.includes('/north-america') || 
                        pathname.includes('/south-america') || 
                        pathname.includes('/africa') || 
                        pathname.includes('/oceania');

    return isCountryPage || isRegionPage;
  }

  private async loadFullPlansData(): Promise<any> {
    const cacheKey = 'plans-data';
    
    // Return cached data if available
    if (this.cache.has(cacheKey)) {
      console.log('DataService.loadFullPlansData: Returning cached full data');
      return this.cache.get(cacheKey);
    }
    
    // Prevent multiple simultaneous requests
    if (this.loadingPromises.has(cacheKey)) {
      console.log('DataService.loadFullPlansData: Request already in progress, waiting...');
      return this.loadingPromises.get(cacheKey);
    }

    console.log('DataService.loadFullPlansData: Starting new fetch request');
    const loadPromise = this.fetchPlansData().then(
      data => {
        this.cache.set(cacheKey, data);
        this.loadingPromises.delete(cacheKey);
        return data;
      },
      error => {
        this.loadingPromises.delete(cacheKey);
        throw error;
      }
    );
    
    this.loadingPromises.set(cacheKey, loadPromise);
    return loadPromise;
  }

  private async fetchPlansData(): Promise<any> {
    console.log('DataService.fetchPlansData: Starting to fetch plans data...');
    
    // Check if we're in a server environment
    if (typeof window === 'undefined') {
      console.log('DataService.fetchPlansData: Server environment detected');
      // Server-side: read from file system
      try {
        const fs = await import('fs');
        const path = await import('path');
        
        // Try multiple possible paths for production
        const possiblePaths = [
          path.default.join(process.cwd(), 'public', 'plans.json'),
          path.default.join(process.cwd(), 'dist', 'client', 'plans.json'),
          path.default.join(process.cwd(), 'plans.json')
        ];
        
        let data = null;
        for (const plansPath of possiblePaths) {
          try {
            if (fs.default.existsSync(plansPath)) {
              data = fs.default.readFileSync(plansPath, 'utf-8');
              console.log(`✅ Loaded plans.json from: ${plansPath}`);
              break;
            }
          } catch (pathError) {
            console.warn(`Failed to check path: ${plansPath}`, pathError);
            continue;
          }
        }
        
        if (data) {
          const parsed = JSON.parse(data);
          console.log(`DataService.fetchPlansData: Server loaded ${parsed.items?.length || 0} plans`);
          return parsed;
        } else {
          console.error('Failed to find plans.json in any expected location');
          return { items: [] };
        }
      } catch (error) {
        console.error('Failed to read plans.json from filesystem:', error);
        return { items: [] };
      }
    } else {
      console.log('DataService.fetchPlansData: Client environment detected, using fetch');
      // Client-side: use fetch with cache busting for updated data
      try {
        // Add timestamp to ensure we get the latest data after updates
        const timestamp = Date.now();
        const response = await fetch(`/plans.json?t=${timestamp}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch plans: ${response.status}`);
        }
        const data = await response.json();
        console.log(`DataService.fetchPlansData: Client fetched ${data.items?.length || 0} plans`);
        return data;
      } catch (fetchError) {
        console.error('Failed to fetch plans data:', fetchError);
        // Fallback to cached version without timestamp
        try {
          const fallbackResponse = await fetch('/plans.json');
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            console.log('DataService.fetchPlansData: Using fallback data');
            return fallbackData;
          }
        } catch (fallbackError) {
          console.error('Fallback fetch also failed:', fallbackError);
        }
        return { items: [] };
      }
    }
  }

  // Method to force refresh data (useful after updates)
  async refreshPlansData(): Promise<any> {
    console.log('DataService.refreshPlansData: Forcing fresh data load...');
    return this.getPlansData({ full: true, forceRefresh: true });
  }

  async getSpeedTestData(): Promise<any> {
    const cacheKey = 'speed-test-data';
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey);
    }

    const loadPromise = this.fetchSpeedTestData();
    this.loadingPromises.set(cacheKey, loadPromise);

    try {
      const data = await loadPromise;
      this.cache.set(cacheKey, data);
      this.loadingPromises.delete(cacheKey);
      return data;
    } catch (error) {
      this.loadingPromises.delete(cacheKey);
      console.error('Failed to load speed test data:', error);
      return null;
    }
  }

  private async fetchSpeedTestData(): Promise<any> {
    // Check if we're in a server environment
    if (typeof window === 'undefined') {
      // Server-side: read from file system
      try {
        const fs = await import('fs');
        const path = await import('path');
        
        // Try multiple possible paths for production
        const possiblePaths = [
          path.default.join(process.cwd(), 'public', 'data', 'global-speed-test.json'),
          path.default.join(process.cwd(), 'dist', 'client', 'data', 'global-speed-test.json'),
          path.default.join(process.cwd(), 'src', 'data', 'global-speed-test.json'),
          path.default.join(process.cwd(), 'global-speed-test.json')
        ];
        
        let data = null;
        for (const speedTestPath of possiblePaths) {
          try {
            if (fs.default.existsSync(speedTestPath)) {
              data = fs.default.readFileSync(speedTestPath, 'utf-8');
              console.log(`✅ Loaded speed test data from: ${speedTestPath}`);
              break;
            }
          } catch (pathError) {
            console.warn(`Failed to check path: ${speedTestPath}`, pathError);
            continue;
          }
        }
        
        if (data) {
          return JSON.parse(data);
        } else {
          console.error('Failed to find global-speed-test.json in any expected location');
          return null;
        }
      } catch (error) {
        console.error('Failed to read speed test data from filesystem:', error);
        return null;
      }
    } else {
      // Client-side: use fetch
      try {
        const response = await fetch('/data/global-speed-test.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch speed test data: ${response.status}`);
        }
        return response.json();
      } catch (fetchError) {
        console.error('Failed to fetch speed test data:', fetchError);
        return null;
      }
    }
  }

  // Clear cache when needed
  clearCache(): void {
    this.cache.clear();
    this.loadingPromises.clear();
  }

  // Get cache size for debugging
  getCacheInfo(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  // Get data freshness info
  getDataInfo(): { plansCount: number; isCached: boolean; isSubset: boolean } {
    const plansData = this.cache.get('plans-data') || this.cache.get('critical-plans');
    return {
      plansCount: plansData?.items?.length || 0,
      isCached: this.cache.has('plans-data') || this.cache.has('critical-plans'),
      isSubset: plansData?.isSubset || false
    };
  }
}

// Export singleton instance
export const dataService = new DataService();

// Export types for better TypeScript support
export interface Plan {
  covered_countries: string[];
  price: {
    amount_with_tax: number;
    currency: string;
  };
  name: string;
  identifier: string;
  data_limit?: {
    amount: number;
    unit: string;
    is_unlimited: boolean;
  };
  duration?: {
    amount: number;
    unit: string;
  };
  region?: string;
}

export interface PlansData {
  items: Plan[];
  isSubset?: boolean;
}