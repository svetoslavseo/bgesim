import React, { useState, useEffect } from 'react';
import DeviceCompatibilityChecker from '../components/DeviceCompatibilityChecker';
import { useTranslation } from 'react-i18next';

interface ESIMCompatibilityPageProps {
  navigateTo: (route: string) => void;
}

const ESIMCompatibilityPage: React.FC<ESIMCompatibilityPageProps> = () => {
  const { t } = useTranslation('compatibility');
  const [openFAQIndex, setOpenFAQIndex] = useState<number>(0);
  return (
    <div className="min-h-screen bg-white">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8">
              {t('hero.title')}
            </h1>
            
            <p className="text-lg text-gray-700 text-center leading-relaxed max-w-3xl mx-auto">
              {t('hero.description')}
            </p>
            
            <p className="text-lg text-gray-700 text-center leading-relaxed max-w-3xl mx-auto mt-4">
              {t('hero.cta')}
            </p>
          </div>
        </section>

        {/* Device Compatibility Checker */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <DeviceCompatibilityChecker />
          </div>
        </section>

        {/* What Is eSIM Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
              {t('what_is_esim.title')}
            </h2>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <a href="/what-is-esim" className="text-blue-600 hover:text-blue-800 underline">
                  eSIM (вградена SIM карта) е цифрова SIM карта
                </a>
                , вградена във вашето устройство, която може да бъде програмирана да работи с различни мобилни оператори. За разлика от традиционните SIM карти, eSIM картите не могат да се отстраняват и могат да съхраняват множество профили на оператори.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('what_is_esim.benefits')}
              </p>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              {t('faq.title')}
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: t('faq.device_support.question'),
                  answer: t('faq.device_support.answer')
                },
                {
                  question: t('faq.activation.question'),
                  answer: t('faq.activation.answer')
                },
                {
                  question: t('faq.benefits.question'),
                  answer: t('faq.benefits.answer')
                }
              ].map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFAQIndex(openFAQIndex === index ? -1 : index)}
                    className={`w-full flex justify-between items-center p-5 text-left font-semibold transition-colors duration-200 ${
                      openFAQIndex === index 
                        ? 'text-gray-900 bg-gray-50 border-b border-gray-200' 
                        : 'text-gray-900 bg-white hover:bg-gray-50'
                    } focus:outline-none`}
                  >
                    <span>{faq.question}</span>
                    <svg
                      className={`w-5 h-5 transform transition-transform duration-300 ${
                        openFAQIndex === index ? 'rotate-180 text-gray-900' : 'rotate-0 text-gray-500'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      openFAQIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-5 pt-4 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compatible Devices Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              {t('compatible_devices.title')}
            </h2>
            
            <CompatibleDevicesList />
          </div>
        </section>
      </main>
    </div>
  );
};

// Component to display the list of compatible devices
const CompatibleDevicesList: React.FC = () => {
  const { t } = useTranslation('compatibility');
  // Fallback data for SSR
  const fallbackDevices = [
    { brand: "Apple", model: "iPhone 11", year: "2019" },
    { brand: "Apple", model: "iPhone 12", year: "2020" },
    { brand: "Apple", model: "iPhone 13", year: "2021" },
    { brand: "Apple", model: "iPhone 14", year: "2022" },
    { brand: "Apple", model: "iPhone 15", year: "2023" },
    { brand: "Samsung", model: "Galaxy S20", year: "2020" },
    { brand: "Samsung", model: "Galaxy S21", year: "2021" },
    { brand: "Samsung", model: "Galaxy S22", year: "2022" },
    { brand: "Samsung", model: "Galaxy S23", year: "2023" },
    { brand: "Google", model: "Pixel 6", year: "2021" },
    { brand: "Google", model: "Pixel 7", year: "2022" },
    { brand: "Google", model: "Pixel 8", year: "2023" }
  ];

  const [devices, setDevices] = useState<any[]>(fallbackDevices);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [expandedBrands, setExpandedBrands] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadDevices = async () => {
      try {
        // Check if we're in a browser environment
        if (typeof window !== 'undefined') {
          const response = await fetch('/esim_devices.json');
          if (response.ok) {
            const data = await response.json();
            setDevices(data);
            // Set all brands as expanded by default
            const allBrands = Array.from(new Set(data.map((device: any) => device.brand))) as string[];
            setExpandedBrands(new Set(allBrands));
          } else {
            console.warn('Failed to load devices from JSON, using fallback data');
            setDevices(fallbackDevices);
            // Set fallback brands as expanded
            const fallbackBrands = Array.from(new Set(fallbackDevices.map(device => device.brand)));
            setExpandedBrands(new Set(fallbackBrands));
          }
        } else {
          // SSR environment - use fallback data
          setDevices(fallbackDevices);
          // Set fallback brands as expanded
          const fallbackBrands = Array.from(new Set(fallbackDevices.map(device => device.brand)));
          setExpandedBrands(new Set(fallbackBrands));
        }
      } catch (error) {
        console.error('Error loading devices:', error);
        setDevices(fallbackDevices);
        // Set fallback brands as expanded
        const fallbackBrands = Array.from(new Set(fallbackDevices.map(device => device.brand)));
        setExpandedBrands(new Set(fallbackBrands));
      } finally {
        setLoading(false);
      }
    };

    loadDevices();
  }, []);

  // Get unique brands
  const brands = ['all', ...Array.from(new Set(devices.map(device => device.brand)))];
  
  // Filter devices based on search term and selected brand
  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === 'all' || device.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  // Group devices by brand
  const groupedDevices = filteredDevices.reduce((acc, device) => {
    if (!acc[device.brand]) {
      acc[device.brand] = [];
    }
    acc[device.brand].push(device);
    return acc;
  }, {} as Record<string, any[]>);

  // Sort devices within each brand by year (newest first)
  Object.keys(groupedDevices).forEach(brand => {
    groupedDevices[brand].sort((a: any, b: any) => parseInt(b.year) - parseInt(a.year));
  });

  // Sort brands alphabetically
  const sortedBrands = Object.keys(groupedDevices).sort();

  const toggleBrand = (brand: string) => {
    const newExpanded = new Set(expandedBrands);
    if (newExpanded.has(brand)) {
      newExpanded.delete(brand);
    } else {
      newExpanded.add(brand);
    }
    setExpandedBrands(newExpanded);
  };

  const expandAll = () => {
    setExpandedBrands(new Set(sortedBrands));
  };

  const collapseAll = () => {
    setExpandedBrands(new Set());
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Loading compatible devices...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder={t('devices.search_placeholder', 'Search for your device...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
        <div className="md:w-48">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          >
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand === 'all' ? t('devices.all_brands', 'All Brands') : brand}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Expand/Collapse Controls */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={expandAll}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          {t('devices.expand_all', 'Expand All')}
        </button>
        <button
          onClick={collapseAll}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          {t('devices.collapse_all', 'Collapse All')}
        </button>
      </div>

      {/* Grouped Devices */}
      <div className="space-y-4">
        {sortedBrands.map(brand => {
          const devices = groupedDevices[brand];
          const isExpanded = expandedBrands.has(brand);
          const deviceCount = devices.length;
          
          return (
            <div key={brand} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleBrand(brand)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center">
                  <h3 className="text-xl font-semibold text-gray-900">{brand}</h3>
                  <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {deviceCount} {deviceCount === 1 ? t('devices.device', 'device') : t('devices.devices', 'devices')}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">
                    {isExpanded ? t('devices.hide', 'Hide') : t('devices.show', 'Show')}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {isExpanded && (
                <div className="border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                                         {devices.map((device: any, index: number) => (
                       <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{device.model}</h4>
                          <span className="text-sm text-gray-500">{device.year}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-sm text-green-600 font-medium">{t('devices.esim_compatible', 'eSIM Compatible')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {sortedBrands.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">{t('devices.no_devices_found', 'No devices found matching your search criteria.')}</p>
        </div>
      )}
    </div>
  );
};

export default ESIMCompatibilityPage; 