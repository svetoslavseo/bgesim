import { sailyApiService } from './sailyApiService';

// Interface for normalized plan structure
interface NormalizedPlan {
  id: string;
  identifier: string;
  name: string;
  data_amount: number;
  data_unit: string;
  data: string;
  validity_days: number;
  validity: string;
  price: {
    amount_with_tax: number;
    currency: string;
    identifier?: string;
  };
  covered_countries: string[];
  region?: string;
  planType?: string;
  is_unlimited?: boolean;
  source: 'saily' | 'local';
}

interface PlansData {
  items: NormalizedPlan[];
}

// Country code to region mapping for Saily plans
const COUNTRY_TO_REGION_MAP: Record<string, string> = {
  // Europe
  'AT': 'Europe', 'BE': 'Europe', 'BG': 'Europe', 'HR': 'Europe', 'CY': 'Europe',
  'CZ': 'Europe', 'DK': 'Europe', 'EE': 'Europe', 'FI': 'Europe', 'FR': 'Europe',
  'DE': 'Europe', 'GR': 'Europe', 'HU': 'Europe', 'IS': 'Europe', 'IE': 'Europe',
  'IT': 'Europe', 'LV': 'Europe', 'LI': 'Europe', 'LT': 'Europe', 'LU': 'Europe',
  'MT': 'Europe', 'NL': 'Europe', 'NO': 'Europe', 'PL': 'Europe', 'PT': 'Europe',
  'RO': 'Europe', 'SK': 'Europe', 'SI': 'Europe', 'ES': 'Europe', 'SE': 'Europe',
  'CH': 'Europe', 'GB': 'Europe', 'UK': 'Europe', 'VA': 'Europe', 'AD': 'Europe',
  'MC': 'Europe', 'SM': 'Europe', 'ME': 'Europe', 'RS': 'Europe', 'BA': 'Europe',
  'MK': 'Europe', 'AL': 'Europe', 'MD': 'Europe', 'UA': 'Europe', 'BY': 'Europe',
  'RU': 'Europe',

  // Asia
  'CN': 'Asia', 'JP': 'Asia', 'KR': 'Asia', 'IN': 'Asia', 'TH': 'Asia',
  'VN': 'Asia', 'SG': 'Asia', 'MY': 'Asia', 'ID': 'Asia', 'PH': 'Asia',
  'TW': 'Asia', 'HK': 'Asia', 'MO': 'Asia', 'KH': 'Asia', 'LA': 'Asia',
  'MM': 'Asia', 'BD': 'Asia', 'LK': 'Asia', 'NP': 'Asia', 'BT': 'Asia',
  'MV': 'Asia', 'AF': 'Asia', 'PK': 'Asia', 'UZ': 'Asia', 'KZ': 'Asia',
  'KG': 'Asia', 'TJ': 'Asia', 'TM': 'Asia', 'MN': 'Asia', 'AM': 'Asia',
  'AZ': 'Asia', 'GE': 'Asia', 'TR': 'Asia', 'IL': 'Asia',
  'PS': 'Asia', 'JO': 'Asia', 'LB': 'Asia', 'SY': 'Asia', 'IQ': 'Asia',
  'IR': 'Asia', 'SA': 'Asia', 'YE': 'Asia', 'OM': 'Asia', 'AE': 'Asia',
  'QA': 'Asia', 'BH': 'Asia', 'KW': 'Asia',

  // North America
  'US': 'North America', 'CA': 'North America', 'MX': 'North America',
  'GT': 'North America', 'BZ': 'North America', 'SV': 'North America',
  'HN': 'North America', 'NI': 'North America', 'CR': 'North America',
  'PA': 'North America',

  // South America
  'BR': 'South America', 'AR': 'South America', 'CL': 'South America',
  'PE': 'South America', 'CO': 'South America', 'VE': 'South America',
  'EC': 'South America', 'BO': 'South America', 'PY': 'South America',
  'UY': 'South America', 'GY': 'South America', 'SR': 'South America',
  'GF': 'South America',

  // Africa
  'ZA': 'Africa', 'EG': 'Africa', 'NG': 'Africa', 'KE': 'Africa', 'GH': 'Africa',
  'ET': 'Africa', 'TZ': 'Africa', 'UG': 'Africa', 'MZ': 'Africa', 'MG': 'Africa',
  'CM': 'Africa', 'CI': 'Africa', 'NE': 'Africa', 'BF': 'Africa', 'ML': 'Africa',
  'MW': 'Africa', 'ZM': 'Africa', 'SN': 'Africa', 'SO': 'Africa', 'TD': 'Africa',
  'GN': 'Africa', 'RW': 'Africa', 'BJ': 'Africa', 'TN': 'Africa', 'BI': 'Africa',
  'TG': 'Africa', 'SL': 'Africa', 'LY': 'Africa', 'LR': 'Africa', 'CF': 'Africa',
  'MR': 'Africa', 'ER': 'Africa', 'GM': 'Africa', 'BW': 'Africa', 'GA': 'Africa',
  'LS': 'Africa', 'GW': 'Africa', 'GQ': 'Africa', 'MU': 'Africa', 'SZ': 'Africa',
  'DJ': 'Africa', 'KM': 'Africa', 'CV': 'Africa', 'ST': 'Africa', 'SC': 'Africa',
  'MA': 'Africa', 'DZ': 'Africa', 'SD': 'Africa', 'SS': 'Africa', 'AO': 'Africa',
  'CD': 'Africa', 'CG': 'Africa', 'ZW': 'Africa', 'NA': 'Africa',

  // Oceania
  'AU': 'Oceania', 'NZ': 'Oceania', 'FJ': 'Oceania', 'PG': 'Oceania',
  'NC': 'Oceania', 'SB': 'Oceania', 'VU': 'Oceania', 'PF': 'Oceania',
  'WS': 'Oceania', 'GU': 'Oceania', 'TO': 'Oceania', 'KI': 'Oceania',
  'PW': 'Oceania', 'MH': 'Oceania', 'FM': 'Oceania', 'NR': 'Oceania',
  'TV': 'Oceania', 'CK': 'Oceania', 'NU': 'Oceania', 'TK': 'Oceania',
  'WF': 'Oceania', 'AS': 'Oceania', 'MP': 'Oceania'
};

class SailyPlansService {
  private static instance: SailyPlansService;
  private cachedNormalizedPlans: PlansData | null = null;
  private lastCacheTime: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private constructor() {}

  public static getInstance(): SailyPlansService {
    if (!SailyPlansService.instance) {
      SailyPlansService.instance = new SailyPlansService();
    }
    return SailyPlansService.instance;
  }

  /**
   * Normalize a Saily plan to match the existing plan structure
   */
  private normalizeSailyPlan(sailyPlan: any): NormalizedPlan {
    const dataAmount = sailyPlan.data_limit?.amount || 0;
    const dataUnit = sailyPlan.data_limit?.unit || 'GB';
    const validityDays = sailyPlan.duration?.amount || 0;
    
    // Determine region based on covered countries
    let region = 'Global';
    if (sailyPlan.covered_countries && sailyPlan.covered_countries.length > 0) {
      if (sailyPlan.covered_countries.length === 1) {
        // Single country plan
        region = COUNTRY_TO_REGION_MAP[sailyPlan.covered_countries[0]] || 'Other';
      } else if (sailyPlan.covered_countries.length <= 10) {
        // Small regional plan - use the most common region
        const regions = sailyPlan.covered_countries
          .map((code: string) => COUNTRY_TO_REGION_MAP[code])
          .filter(Boolean);
        
        if (regions.length > 0) {
          // Find most common region
          const regionCounts: Record<string, number> = {};
          regions.forEach((r: string) => {
            regionCounts[r] = (regionCounts[r] || 0) + 1;
          });
          region = Object.keys(regionCounts).reduce((a, b) => 
            regionCounts[a] > regionCounts[b] ? a : b
          );
        }
      } else {
        // Large multi-region or global plan
        region = 'Global';
      }
    }

    // Determine plan type
    let planType = 'country';
    if (sailyPlan.covered_countries && sailyPlan.covered_countries.length > 10) {
      planType = 'regional';
    }
    if (sailyPlan.covered_countries && sailyPlan.covered_countries.length > 50) {
      planType = 'global';
    }

    // Generate a consistent ID based on plan properties
    const countryPrefix = sailyPlan.covered_countries && sailyPlan.covered_countries.length === 1 
      ? sailyPlan.covered_countries[0].toLowerCase() 
      : 'multi';
    const id = `saily-${countryPrefix}-${dataAmount}${dataUnit.toLowerCase()}-${validityDays}d-${sailyPlan.identifier.slice(-8)}`;

    return {
      id,
      identifier: sailyPlan.identifier,
      name: sailyPlan.name || `${dataAmount}${dataUnit} ${validityDays} days`,
      data_amount: dataAmount,
      data_unit: dataUnit,
      data: `${dataAmount}${dataUnit}`,
      validity_days: validityDays,
      validity: `${validityDays} days`,
      price: {
        amount_with_tax: sailyPlan.price?.amount_with_tax || 0,
        currency: sailyPlan.price?.currency || 'USD',
        identifier: sailyPlan.price?.identifier
      },
      covered_countries: sailyPlan.covered_countries || [],
      region,
      planType,
      is_unlimited: sailyPlan.is_unlimited || false,
      source: 'saily'
    };
  }

  /**
   * Get normalized plans data combining existing plans with Saily plans
   */
  public async getNormalizedPlansData(): Promise<PlansData> {
    const now = Date.now();
    
    // Return cached data if still valid
    if (this.cachedNormalizedPlans && (now - this.lastCacheTime) < this.CACHE_DURATION) {
      return this.cachedNormalizedPlans;
    }

    try {
      // Get existing plans data
      const { dataService } = await import('./dataService');
      const existingPlansData = await dataService.getPlansData();
      
      // Get Saily plans data
      const sailyPlansData = await sailyApiService.getCurrentPlansData();
      
      const normalizedPlans: NormalizedPlan[] = [];
      
      // Add existing plans (mark as local source)
      if (existingPlansData?.items) {
        existingPlansData.items.forEach((plan: any) => {
          normalizedPlans.push({
            ...plan,
            source: 'local' as const
          });
        });
      }
      
      // Add normalized Saily plans
      if (sailyPlansData?.items) {
        sailyPlansData.items.forEach((sailyPlan: any) => {
          try {
            const normalizedPlan = this.normalizeSailyPlan(sailyPlan);
            normalizedPlans.push(normalizedPlan);
          } catch (error) {
            console.warn('Failed to normalize Saily plan:', sailyPlan.identifier, error);
          }
        });
      }

      // Sort plans by price for better user experience
      normalizedPlans.sort((a, b) => {
        // First sort by covered countries (country-specific first)
        const aCountries = a.covered_countries.length;
        const bCountries = b.covered_countries.length;
        
        if (aCountries === 1 && bCountries > 1) return -1;
        if (aCountries > 1 && bCountries === 1) return 1;
        
        // Then by price
        return a.price.amount_with_tax - b.price.amount_with_tax;
      });

      const result: PlansData = { items: normalizedPlans };
      
      // Cache the result
      this.cachedNormalizedPlans = result;
      this.lastCacheTime = now;
      
      console.log(`SailyPlansService: Normalized ${normalizedPlans.length} total plans (${existingPlansData?.items?.length || 0} local + ${sailyPlansData?.items?.length || 0} Saily)`);
      
      return result;
      
    } catch (error) {
      console.error('SailyPlansService: Failed to get normalized plans data:', error);
      
      // Fallback to existing plans only
      try {
        const { dataService } = await import('./dataService');
        const existingPlansData = await dataService.getPlansData();
        
        const fallbackPlans: NormalizedPlan[] = [];
        if (existingPlansData?.items) {
          existingPlansData.items.forEach((plan: any) => {
            fallbackPlans.push({
              ...plan,
              source: 'local' as const
            });
          });
        }
        
        return { items: fallbackPlans };
      } catch (fallbackError) {
        console.error('SailyPlansService: Fallback also failed:', fallbackError);
        return { items: [] };
      }
    }
  }

  /**
   * Get plans for a specific country
   */
  public async getPlansForCountry(countryCode: string): Promise<NormalizedPlan[]> {
    const plansData = await this.getNormalizedPlansData();
    
    return plansData.items.filter(plan => 
      plan.covered_countries.includes(countryCode.toUpperCase())
    );
  }

  /**
   * Get plans for a specific region
   */
  public async getPlansForRegion(regionName: string): Promise<NormalizedPlan[]> {
    const plansData = await this.getNormalizedPlansData();
    
    // Map region names to match the constants
    const regionMapping: Record<string, string[]> = {
      'europe': ['Europe'],
      'asia': ['Asia'], 
      'north-america': ['North America'],
      'south-america': ['South America'],
      'africa': ['Africa'],
      'oceania': ['Oceania']
    };
    
    const mappedRegions = regionMapping[regionName.toLowerCase()] || [regionName];
    
    return plansData.items.filter(plan => {
      // Include plans explicitly marked for this region
      if (mappedRegions.some(region => plan.region === region)) {
        return true;
      }
      
      // Include global plans
      if (plan.planType === 'global') {
        return true;
      }
      
      // Include country-specific plans based on country-to-region mapping
      if (plan.covered_countries && plan.covered_countries.length > 0) {
        return plan.covered_countries.some(countryCode => {
          const countryRegion = COUNTRY_TO_REGION_MAP[countryCode];
          return mappedRegions.includes(countryRegion);
        });
      }
      
      return false;
    });
  }

  /**
   * Clear cache to force refresh
   */
  public clearCache(): void {
    this.cachedNormalizedPlans = null;
    this.lastCacheTime = 0;
  }

  /**
   * Get statistics about the plans data
   */
  public async getPlansStatistics(): Promise<{
    totalPlans: number;
    sailyPlans: number;
    localPlans: number;
    countriesCovered: number;
    averagePrice: number;
  }> {
    const plansData = await this.getNormalizedPlansData();
    
    const sailyPlans = plansData.items.filter(p => p.source === 'saily');
    const localPlans = plansData.items.filter(p => p.source === 'local');
    
    const allCountries = new Set<string>();
    plansData.items.forEach(plan => {
      plan.covered_countries.forEach(country => allCountries.add(country));
    });

    const totalPrice = plansData.items.reduce((sum, plan) => sum + plan.price.amount_with_tax, 0);
    const averagePrice = plansData.items.length > 0 ? totalPrice / plansData.items.length : 0;

    return {
      totalPlans: plansData.items.length,
      sailyPlans: sailyPlans.length,
      localPlans: localPlans.length,
      countriesCovered: allCountries.size,
      averagePrice: averagePrice / 100 // Convert cents to dollars
    };
  }
}

// Export singleton instance
export const sailyPlansService = SailyPlansService.getInstance();

// Export types
export type { NormalizedPlan, PlansData }; 