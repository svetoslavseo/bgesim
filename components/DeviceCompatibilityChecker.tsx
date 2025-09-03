import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

interface Device {
  brand: string;
  model: string;
  year: string;
}

// Fallback data for SSR
const fallbackDevices: Device[] = [
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

const DeviceCompatibilityChecker: React.FC = () => {
  const { t } = useTranslation('compatibility');
  const isChinese = i18n.language === 'zh';
  const [devices, setDevices] = useState<Device[]>(fallbackDevices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isCompatible, setIsCompatible] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);

  useEffect(() => {
    const loadDevices = async () => {
      try {
        // Check if we're in a browser environment
        if (typeof window !== 'undefined') {
          const response = await fetch('/esim_devices.json');
          if (response.ok) {
            const data = await response.json();
            setDevices(data);
          } else {
            console.warn('Failed to load devices from JSON, using fallback data');
            setDevices(fallbackDevices);
          }
        } else {
          // SSR environment - use fallback data
          setDevices(fallbackDevices);
        }
      } catch (error) {
        console.error('Error loading devices:', error);
        setDevices(fallbackDevices);
      } finally {
        setLoading(false);
      }
    };

    loadDevices();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredDevices([]);
      return;
    }

    const filtered = devices.filter(device => 
      device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.brand.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 10); // Limit to 10 results for better UX

    setFilteredDevices(filtered);
  }, [searchTerm, devices]);

  const handleDeviceSelect = (device: Device) => {
    setSelectedDevice(device);
    setIsCompatible(true); // All devices in our list are compatible
    setSearchTerm('');
    setFilteredDevices([]);
  };

  const resetChecker = () => {
    setSelectedDevice(null);
    setIsCompatible(null);
    setSearchTerm('');
    setFilteredDevices([]);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">{t('loading', 'Loading device database...')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gray-100 border-2 border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {t('checker.title', 'Check Your Device Compatibility')}
        </h3>
        <p className="text-gray-600">
          {t('checker.subtitle', 'Enter your phone model to check if it supports eSIM')}
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder={t('checker.search_placeholder', 'Search for your device (e.g., iPhone 14, Samsung Galaxy S23)...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent pr-10"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Search Results Dropdown */}
        {filteredDevices.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredDevices.map((device, index) => (
              <button
                key={index}
                onClick={() => handleDeviceSelect(device)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              >
                <div className="font-medium text-gray-900">{device.brand} {device.model}</div>
                <div className="text-sm text-gray-500">{device.year}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Device Display */}
      {selectedDevice && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">
                {selectedDevice.brand} {selectedDevice.model}
              </h4>
              <p className="text-sm text-gray-600">{selectedDevice.year}</p>
            </div>
            <button
              onClick={resetChecker}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Compatibility Result */}
      {isCompatible !== null && selectedDevice && (
        <div className={`p-6 rounded-lg border-2 ${
          isCompatible 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
              isCompatible ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {isCompatible ? (
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <h4 className={`text-lg font-semibold ${
              isCompatible ? 'text-green-800' : 'text-red-800'
            }`}>
              {isCompatible ? t('result.compatible', '✅ Compatible!') : t('result.not_compatible', '❌ Not Compatible')}
            </h4>
          </div>
          
          <p className={`text-sm leading-relaxed ${
            isCompatible ? 'text-green-700' : 'text-red-700'
          }`}>
            {isCompatible 
              ? t('result.compatible_message', `Great news! Your ${selectedDevice.brand} ${selectedDevice.model} supports eSIM technology. You can use eSIM for international travel, multiple carriers, and more.`, { brand: selectedDevice.brand, model: selectedDevice.model })
              : t('result.not_compatible_message', `Unfortunately, your device doesn't support eSIM technology. You'll need to use a physical SIM card for mobile connectivity.`)
            }
          </p>

          {isCompatible && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
              <h5 className="font-semibold text-green-800 mb-2">{t('result.next_steps_title', 'Next Steps:')}</h5>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• {t('result.step_1', 'Choose your travel destination and prepaid plan')}</li>
                <li>• {t('result.step_2', 'Scan QR code provided by your carrier')}</li>
                <li>• {t('result.step_3', 'Configure eSIM in your device settings')}</li>
                <li>• {t('result.step_4', 'Enjoy seamless international connectivity')}</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-green-200">
                <a
                  href={isChinese ? '/zh/all-destinations' : '/all-destinations'}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = isChinese ? '/zh/all-destinations' : '/all-destinations';
                  }}
                  className="inline-block bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  {t('result.choose_esim', 'Choose your eSIM')}
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">{t('instructions.title', 'How to use this checker:')}</h4>
        <ol className="text-sm text-gray-700 space-y-1">
          <li>1. {t('instructions.step_1', 'Start typing your device brand or model name')}</li>
          <li>2. {t('instructions.step_2', 'Select your device from the dropdown list')}</li>
          <li>3. {t('instructions.step_3', 'Click "Check Compatibility" to see the result')}</li>
          <li>4. {t('instructions.step_4', 'Follow the instructions if your device is compatible')}</li>
        </ol>
      </div>
    </div>
  );
};

export default DeviceCompatibilityChecker; 