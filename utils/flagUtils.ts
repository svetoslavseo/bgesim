/**
 * Utility functions for handling self-hosted country flags
 */

/**
 * Get the self-hosted flag URL for a country code
 * @param countryCode - ISO 3166-1 alpha-2 country code (e.g., 'us', 'gb', 'de')
 * @param format - Flag format ('svg' or 'png'), defaults to 'svg'
 * @returns The local flag URL
 */
export const getFlagUrl = (countryCode: string, format: 'svg' | 'png' = 'svg'): string => {
  if (!countryCode) {
    return '/esim-data/flags/globe.svg'; // Fallback for missing country code
  }
  
  const code = countryCode.toLowerCase();
  return `/esim-data/flags/${code}.${format}`;
};

/**
 * Get flag URL with fallback to external provider if local flag doesn't exist
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @param format - Flag format ('svg' or 'png'), defaults to 'svg'
 * @returns The flag URL with fallback
 */
export const getFlagUrlWithFallback = (countryCode: string, format: 'svg' | 'png' = 'svg'): string => {
  if (!countryCode) {
    return '/esim-data/flags/globe.svg';
  }
  
  const code = countryCode.toLowerCase();
  const localUrl = `/esim-data/flags/${code}.${format}`;
  
  // For now, just return the local URL since we have all flags
  // In the future, you could add logic to check if file exists
  return localUrl;
};

/**
 * Get flag component props for img elements
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @param countryName - Country name for alt text
 * @param className - CSS classes
 * @returns Object with src, alt, and className properties
 */
export const getFlagProps = (
  countryCode: string, 
  countryName: string, 
  className: string = "w-10 h-auto rounded-md"
) => ({
  src: getFlagUrl(countryCode),
  alt: `${countryName} flag`,
  className,
  loading: 'lazy' as const,
  onError: (e: any) => {
    // Fallback to external provider if local flag fails
    const target = e.target as HTMLImageElement;
    if (!target.src.includes('flagcdn.com')) {
      target.src = `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
    }
  },
  onLoad: (e: any) => {
    // Ensure the image is visible when loaded
    const target = e.target as HTMLImageElement;
    target.style.opacity = '1';
  }
});

/**
 * Special flag URL for global/world regions
 */
export const getGlobalFlagUrl = (): string => {
  return '/esim-data/flags/globe.svg';
};

/**
 * Check if a flag file exists by attempting to load it
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns Promise that resolves to true if flag exists, false otherwise
 */
export const checkFlagExists = async (countryCode: string): Promise<boolean> => {
  if (!countryCode) return false;
  
  try {
    const response = await fetch(getFlagUrl(countryCode), { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Get flag URL with validation and fallback
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @param format - Flag format ('svg' or 'png'), defaults to 'svg'
 * @returns Promise that resolves to the best available flag URL
 */
export const getValidatedFlagUrl = async (countryCode: string, format: 'svg' | 'png' = 'svg'): Promise<string> => {
  if (!countryCode) {
    return '/esim-data/flags/globe.svg';
  }
  
  const localUrl = getFlagUrl(countryCode, format);
  const exists = await checkFlagExists(countryCode);
  
  if (exists) {
    return localUrl;
  }
  
  // Fallback to external provider
  return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
}; 