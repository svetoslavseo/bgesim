import React, { useState, useEffect } from 'react';
import { Country } from '../types';
import { useTranslation } from 'react-i18next';
// Remove static imports to reduce bundle size
// import globalSpeedTestData from '../src/data/global-speed-test.json';
// import openSignalData from '../src/data/opensignaldata.json';


interface CountryESIMInfoProps {
  country: Country;
}

const CountryESIMInfo: React.FC<CountryESIMInfoProps> = ({ country }) => {
  const { t, i18n } = useTranslation('esim_info');
  const [globalSpeedTestData, setGlobalSpeedTestData] = useState<any>(null);
  const [openSignalData, setOpenSignalData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load language-specific speedtest data
        let fileName = 'global-speed-test.json';
        if (i18n.language === 'zh') {
          fileName = 'global-speed-test-zh.json';
        } else if (i18n.language === 'bg') {
          fileName = 'global-speed-test-bg.json';
        }
        const response = await fetch(`/data/${fileName}`);
        if (!response.ok) {
          // Fallback to English version if Chinese version fails
          const fallbackResponse = await fetch('/data/global-speed-test.json');
          if (fallbackResponse.ok) {
            const data = await fallbackResponse.json();
            setGlobalSpeedTestData(data);
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          const data = await response.json();
          setGlobalSpeedTestData(data);
        }
      } catch (error) {
        console.error("Failed to load global speed test data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [i18n.language]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load the appropriate language version
        let fileName = 'opensignaldata.json';
        if (i18n.language === 'zh') {
          fileName = 'opensignaldata-zh.json';
        } else if (i18n.language === 'bg') {
          fileName = 'opensignaldata-bg.json';
        }
        const response = await fetch(`/data/${fileName}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOpenSignalData(data);
      } catch (error) {
        console.error("Failed to load OpenSignal data:", error);
      }
    };

    loadData();
  }, [i18n.language]);

  // Retrieve network performance (rank & median speed) for the given country
  const getNetworkPerformance = (countryName: string) => {
    // Find matching entry from the JSON file (case-insensitive match on country name)
    const entry = globalSpeedTestData?.country_rankings?.find((r: any) =>
      r.country.toLowerCase() === countryName.toLowerCase()
    );

    if (entry) {
      return { rank: entry.rank, speed: entry.speed_mbps } as const;
    }

    // No entry found – return null so the UI can show a fallback message
    return null;
  };

  // Get OpenSignal description for the country
  const getOpenSignalDescription = (countryName: string) => {
    // Try exact match first
    const exactMatch = openSignalData?.[countryName];
    if (exactMatch) {
      return exactMatch;
    }

    // Try case-insensitive match
    const lowerCountryName = countryName.toLowerCase();
    const matchedKey = Object.keys(openSignalData || {}).find(key => 
      key.toLowerCase() === lowerCountryName
    );
    
    if (matchedKey) {
      return openSignalData[matchedKey];
    }

    // Return null if no match found
    return null;
  };

  // Get translated country name for display
  const translatedCountryName = t(`countries.${country.id}`, { ns: 'countries' }) || country.name;
  
  // Use the original English country name for data lookup (since speed test data is in English)
  const networkData = getNetworkPerformance(country.name);
  const openSignalDescription = getOpenSignalDescription(country.name);

  // Debug logging
  useEffect(() => {
    console.log('CountryESIMInfo: Country:', translatedCountryName);
    console.log('CountryESIMInfo: Speed data loaded:', !!globalSpeedTestData);
    console.log('CountryESIMInfo: Network data found:', !!networkData);
    if (networkData) {
      console.log('CountryESIMInfo: Network data:', networkData);
    }
  }, [translatedCountryName, globalSpeedTestData, networkData]);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            {/* About eSIM Section */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                {t('about_esim_title', { country: translatedCountryName })}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('about_esim_description', { country: translatedCountryName })}
              </p>
              
              {/* Loading State */}
              {isLoading && (
                <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-400 mb-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              )}
              
              {/* Network Performance Data in About Section */}
              {networkData && (
                <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('network_performance.title')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">{t('network_performance.global_rank')}</div>
                      <div className="text-xl font-bold text-gray-900">#{networkData.rank}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">{t('network_performance.median_speed')}</div>
                      <div className="text-xl font-bold text-gray-900">{networkData.speed} Mbps</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {t('network_performance.source')}: <a 
                      href="https://www.speedtest.net/global-index" 
                      target="_blank" 
                      rel="nofollow noopener noreferrer"
                      className="underline decoration-green-300 decoration-dotted hover:text-green-600 transition-colors"
                    >
                      {t('network_performance.speedtest_global_index')}
                    </a>
                  </div>
                </div>
              )}
              
              {/* OpenSignal Network Analysis */}
              {openSignalDescription && (
                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('network_analysis.title')}</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {openSignalDescription}
                  </p>
                  <div className="text-xs text-gray-500 mt-3">
                    {t('network_analysis.source')}: <a 
                      href="https://www.opensignal.com/2025/07/22/global-network-excellence-index-q2-2025-update/dt" 
                      target="_blank" 
                      rel="nofollow noopener noreferrer"
                      className="underline decoration-blue-300 decoration-dotted hover:text-blue-600 transition-colors"
                    >
                      {t('network_analysis.opensignal_index')}
                    </a>
                  </div>
                </div>
              )}
              

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryESIMInfo; 