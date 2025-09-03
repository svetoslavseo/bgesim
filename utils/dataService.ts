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
  private static instance: DataService;
  private plans: { items: PlanType[] } = { items: [] };
  private isLoaded = false;
  private loadPromise: Promise<void> | null = null;

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
    // Client-side hydration from preloaded data
    if (typeof window !== 'undefined' && (window as CustomWindow).__PRELOADED_PLANS__) {
      this.plans = (window as CustomWindow).__PRELOADED_PLANS__!;
      this.isLoaded = true;
      console.log('DataService: Initialized with pre-loaded SSR data.');
    }
  }
  
  private async fetchPlansData(): Promise<{ items: PlanType[] }> {
    // In SSR, data is loaded into globalThis by server-production.js
    if (typeof window === 'undefined') {
      if (globalThis.plansData) {
        console.log('DataService: Using pre-loaded data from globalThis in SSR.');
        return globalThis.plansData;
      }
      // This should ideally not happen if the server is configured correctly
      console.error('DataService: plansData not found on globalThis in SSR!');
      return { items: [] };
    }

    // Client-side fetch
    console.log('DataService: Fetching plans data on client...');
    try {
      const response = await fetch('/plans.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`DataService: Fetched ${data.items?.length || 0} plans on client.`);
      return data;
    } catch (error) {
      console.error('DataService: Failed to fetch plans.json on client.', error);
      return { items: [] }; // Return empty structure on failure
    }
  }

  public async getPlansData(forceRefresh = false): Promise<{ items: PlanType[] }> {
    if (this.isLoaded && !forceRefresh) {
      return this.plans;
    }

    // Use a single promise to prevent multiple concurrent fetches
    if (!this.loadPromise || forceRefresh) {
      this.loadPromise = this.fetchPlansData().then(data => {
        if (data && Array.isArray(data.items)) {
          this.plans = data;
        } else {
          console.warn('DataService: Fetched data is invalid, falling back to empty array.');
          this.plans = { items: [] };
        }
        this.isLoaded = true;
        this.loadPromise = null; // Reset promise after completion
      }).catch(error => {
        console.error("DataService: Error in getPlansData.", error);
        this.plans = { items: [] }; // Ensure plans is safe on error
        this.isLoaded = true; // Mark as loaded to prevent retries on every call
        this.loadPromise = null;
      });
    }

    await this.loadPromise;
    return this.plans;
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