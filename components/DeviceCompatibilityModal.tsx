import React, { useState, useEffect } from 'react';
import devices from '../esim_devices.json';
import { useTranslation } from 'react-i18next';

interface DeviceCompatibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Device {
  brand: string;
  model: string;
  year: string;
}

const DeviceCompatibilityModal: React.FC<DeviceCompatibilityModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation('home');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [result, setResult] = useState<null | 'compatible' | 'not-compatible' | 'not-found'>(null);
  const [isClient, setIsClient] = useState(false);

  // Set client flag after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render anything on server side
  if (!isClient || !isOpen) return null;

  // Get unique brands
  const brands = Array.from(new Set((devices as Device[]).map(d => d.brand))).sort();
  // Get models for selected brand
  const models = brand ? (devices as Device[]).filter(d => d.brand === brand).map(d => d.model) : [];

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand || !model) return;
    const found = (devices as Device[]).find(d => d.brand === brand && d.model === model);
    if (found) {
      setResult('compatible');
    } else if ((devices as Device[]).some(d => d.brand === brand)) {
      setResult('not-compatible');
    } else {
      setResult('not-found');
    }
  };

  const handleClose = () => {
    setBrand('');
    setModel('');
    setResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
        <h3 className="text-2xl font-bold mb-4 text-center">{t('device_compatibility_checker')}</h3>
        <form onSubmit={handleCheck} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">{t('brand')}</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={brand}
              onChange={e => { setBrand(e.target.value); setModel(''); setResult(null); }}
              required
            >
              <option value="">{t('select_brand')}</option>
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">{t('model')}</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={model}
              onChange={e => { setModel(e.target.value); setResult(null); }}
              required
              disabled={!brand}
            >
              <option value="">{brand ? t('select_model') : t('select_brand_first')}</option>
              {models.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-2">{t('check_compatibility')}</button>
        </form>
        {result === 'compatible' && (
          <div className="mt-6 text-green-600 text-center font-bold text-lg">✅ {t('device_compatible')}</div>
        )}
        {result === 'not-compatible' && (
          <div className="mt-6 text-red-600 text-center font-bold text-lg">❌ {t('device_not_compatible')}</div>
        )}
        {result === 'not-found' && (
          <div className="mt-6 text-yellow-600 text-center font-bold text-lg">⚠️ {t('device_not_found')}</div>
        )}
      </div>
    </div>
  );
};

export default DeviceCompatibilityModal; 