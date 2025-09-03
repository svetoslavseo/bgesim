import React, { useState, useEffect, useRef } from 'react';
import { COUNTRIES, REGIONS } from '../constants';
import { FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface SearchResult {
  id: string;
  name: string;
  type: 'country' | 'region';
  route: string;
  flag: string;
}

interface SearchWithDropdownProps {
  placeholder?: string;
  onSelect: (route: string) => void;
  className?: string;
  showSearchIcon?: boolean;
}

const SearchWithDropdown: React.FC<SearchWithDropdownProps> = ({
  placeholder,
  onSelect,
  className = "",
  showSearchIcon = true
}) => {
  const { t } = useTranslation('home');
  const defaultPlaceholder = t('search_placeholder');
  const finalPlaceholder = placeholder || defaultPlaceholder;
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isClient, setIsClient] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Set client flag after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filter countries and regions based on search
  const filteredCountries = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRegions = REGIONS.filter(region =>
    region.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const searchResults: SearchResult[] = [
    ...filteredRegions.map(region => ({
      id: region.id,
      name: region.name,
      type: 'region' as const,
      route: `/${region.id}`,
      flag: 'globe',
    })),
    ...filteredCountries.map(country => ({
      id: country.id,
      name: country.name,
      type: 'country' as const,
      route: `/${country.regionId}/${country.slug}`,
      flag: country.countryCode || country.id,
    }))
  ];

  // Close dropdown when clicking outside (client-side only)
  useEffect(() => {
    if (!isClient) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isClient]);

  // Handle keyboard navigation (client-side only)
  useEffect(() => {
    if (!isClient) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isDropdownOpen || searchResults.length === 0) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex(prev => 
            prev < searchResults.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          event.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
            handleSelect(searchResults[selectedIndex]);
          }
          break;
        case 'Escape':
          setIsDropdownOpen(false);
          setSelectedIndex(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isClient, isDropdownOpen, searchResults, selectedIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsDropdownOpen(value.length > 0);
    setSelectedIndex(-1);
  };

  const handleInputFocus = () => {
    if (searchQuery.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  const handleSelect = (result: SearchResult) => {
    onSelect(result.route);
    setSearchQuery('');
    setIsDropdownOpen(false);
    setSelectedIndex(-1);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleInputClick = () => {
    if (searchQuery.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        {showSearchIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          placeholder={finalPlaceholder}
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onClick={handleInputClick}
          className={`block w-full ${showSearchIcon ? 'pl-10' : 'pl-3'} pr-3 py-3 border border-blue-300 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        />
      </div>

      {/* Dropdown - only render on client to avoid hydration issues */}
      {isClient && isDropdownOpen && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {searchResults.map((result, index) => (
            <button
              key={`${result.type}-${result.id}`}
              onClick={() => handleSelect(result)}
              className={`w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 transition-colors ${
                index === selectedIndex ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
            >
              <span className="text-lg">
                {result.type === 'country' ? (
                  <img 
                    src={`https://flagcdn.com/w20/${result.id.toLowerCase()}.png`} 
                    alt={`${result.name} flag`} 
                    className="w-5 h-auto rounded-sm"
                  />
                ) : (
                  <FaGlobe className="text-blue-500" />
                )}
              </span>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{result.name}</div>
                <div className="text-xs text-gray-500 capitalize">{t(`search_result_type_${result.type}`)}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message - only render on client */}
      {isClient && isDropdownOpen && searchQuery.length > 0 && searchResults.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-3 text-gray-500 text-center">
            {t('no_destinations_found', { query: searchQuery })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchWithDropdown; 