// Optimized data service with caching and lazy loading

import { Plan as PlanType } from '../types';

// Define a custom interface to extend the global Window object
interface CustomWindow extends Window {
  __PRELOADED_PLANS__?: { items: PlanType[] };
}

// Augment the global scope to include our custom global property
declare global {
  var plansData: { items: PlanType[] } | undefined;
}


// Singleton Data Service
class DataService {
  private plans: { items: PlanType[] } = { items: [] };
  private isFullDataLoaded = false;
  private lastFetchTime: number | null = null;
  private static instance: DataService;
  private cache: Map<string, any> = new Map();
  private loadingPromises: Map<string, Promise<any>> = new Map();

  private constructor() {
    this.init();
  }

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  private init() {
    // Check for pre-loaded data in SSR environment
    if (typeof window !== 'undefined' && (window as CustomWindow).__PRELOADED_PLANS__) {
      this.plans = (window as CustomWindow).__PRELOADED_PLANS__!;
      this.isFullDataLoaded = true;
      console.log('DataService: Initialized with pre-loaded SSR data.');
      return;
    }

    this.fetchPlansData().catch(error => {
      console.error('Failed to load initial plans data:', error);
    });
  }

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
    const isServer = typeof window === 'undefined';

    if (isServer && globalThis.plansData) {
        console.log('DataService.fetchPlansData: Server environment detected, using pre-loaded data from globalThis.');
        this.plans = globalThis.plansData;
        this.lastFetchTime = Date.now();
        return;
    }

    console.log('DataService.fetchPlansData: Client environment detected, using fetch');
    // Add timestamp to ensure we get the latest data after updates
    const timestamp = Date.now();
    const response = await fetch(`/plans.json?t=${timestamp}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch plans: ${response.status}`);
    }
    const data = await response.json();
    console.log(`DataService.fetchPlansData: Client fetched ${data.items?.length || 0} plans`);
    return data;
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
export const dataService = DataService.getInstance();

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