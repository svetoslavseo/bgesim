import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { sailyPlansService, NormalizedPlan } from '../utils/sailyPlansService';
import { FaWifi, FaCalendarAlt, FaGlobe, FaTag, FaSpinner } from 'react-icons/fa';

interface SailyPlansSectionProps {
  countryCode?: string;
  regionName?: string;
  title?: string;
  maxPlans?: number;
  showSource?: boolean;
  className?: string;
}

const SailyPlansSection: React.FC<SailyPlansSectionProps> = ({
  countryCode,
  regionName,
  title,
  maxPlans = 6,
  showSource = false,
  className = ''
}) => {
  const { t } = useTranslation(['common', 'countries']);
  const [plans, setPlans] = useState<NormalizedPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        setLoading(true);
        setError(null);

        let fetchedPlans: NormalizedPlan[] = [];

        if (countryCode) {
          fetchedPlans = await sailyPlansService.getPlansForCountry(countryCode);
        } else if (regionName) {
          fetchedPlans = await sailyPlansService.getPlansForRegion(regionName);
        } else {
          // Get all plans
          const allPlans = await sailyPlansService.getNormalizedPlansData();
          fetchedPlans = allPlans.items;
        }

        // Sort by price and data amount for better UX
        fetchedPlans.sort((a, b) => {
          // Prioritize single-country plans
          if (a.covered_countries.length === 1 && b.covered_countries.length > 1) return -1;
          if (a.covered_countries.length > 1 && b.covered_countries.length === 1) return 1;
          
          // Then by price
          if (a.price.amount_with_tax !== b.price.amount_with_tax) {
            return a.price.amount_with_tax - b.price.amount_with_tax;
          }
          
          // Finally by data amount
          return b.data_amount - a.data_amount;
        });

        setPlans(fetchedPlans);
      } catch (err) {
        console.error('Failed to load Saily plans:', err);
        setError('Failed to load plans');
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, [countryCode, regionName]);

  const formatPrice = (amountInCents: number, currency: string) => {
    const amount = amountInCents / 100;
    const symbol = currency === 'USD' ? '$' : currency;
    return `${symbol}${amount.toFixed(2)}`;
  };

  const formatCoverage = (countries: string[], planType?: string) => {
    if (countries.length === 1) {
      return t('single_country', { ns: 'common' });
    } else if (planType === 'global' || countries.length > 50) {
      return t('global_coverage', { ns: 'common' });
    } else if (countries.length > 10) {
      return t('regional_coverage', { ns: 'common', count: countries.length });
    } else {
      return t('multi_country', { ns: 'common', count: countries.length });
    }
  };

  const getDisplayedPlans = () => {
    if (showAll) return plans;
    return plans.slice(0, maxPlans);
  };

  const sailyPlans = plans.filter(p => p.source === 'saily');
  const localPlans = plans.filter(p => p.source === 'local');

  if (loading) {
    return (
      <div className={`saily-plans-section ${className}`}>
        <div className="flex items-center justify-center py-8">
          <FaSpinner className="animate-spin text-2xl text-blue-600 mr-2" />
          <span className="text-gray-600">{t('loading_plans', { ns: 'common' })}</span>
        </div>
      </div>
    );
  }

  if (error || plans.length === 0) {
    return null; // Don't show anything if there's an error or no plans
  }

  return (
    <div className={`saily-plans-section ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {title || t('available_plans', { ns: 'common' })}
          </h2>
          {showSource && sailyPlans.length > 0 && (
            <div className="flex items-center text-sm text-gray-600">
              <FaWifi className="mr-1" />
              <span>
                {t('plans_powered_by_saily', { ns: 'common', count: sailyPlans.length })}
                {localPlans.length > 0 && ` • ${localPlans.length} ${t('local_plans', { ns: 'common' })}`}
              </span>
            </div>
          )}
        </div>
        
        {plans.length > maxPlans && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
          >
            {showAll ? t('show_less', { ns: 'common' }) : t('show_all_plans', { ns: 'common', count: plans.length })}
          </button>
        )}
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getDisplayedPlans().map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-lg border-2 p-6 hover:shadow-lg transition-shadow ${
              plan.source === 'saily' 
                ? 'border-blue-200 hover:border-blue-300' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Plan Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {plan.data}
                  </h3>
                  {plan.is_unlimited && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {t('unlimited', { ns: 'common' })}
                    </span>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <FaCalendarAlt className="mr-1 text-xs" />
                  <span>{plan.validity}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {formatPrice(plan.price.amount_with_tax, plan.price.currency)}
                </div>
                {plan.source === 'saily' && (
                  <div className="text-xs text-blue-500 font-medium">
                    Saily
                  </div>
                )}
              </div>
            </div>

            {/* Plan Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <FaGlobe className="mr-2 text-xs" />
                <span>{formatCoverage(plan.covered_countries, plan.planType)}</span>
              </div>
              
              {plan.covered_countries.length <= 5 && (
                <div className="flex items-center text-sm text-gray-500">
                  <FaTag className="mr-2 text-xs" />
                  <span>{plan.covered_countries.join(', ')}</span>
                </div>
              )}

              {plan.region && (
                <div className="text-xs text-gray-500">
                  {t('region', { ns: 'common' })}: {plan.region}
                </div>
              )}
            </div>

            {/* Action Button */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              {t('select_plan', { ns: 'common' })}
            </button>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      {plans.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
            <span>{t('total_plans_available', { ns: 'common', count: plans.length })}</span>
            {sailyPlans.length > 0 && (
              <span>•</span>
            )}
            {sailyPlans.length > 0 && (
              <span>{t('saily_plans', { ns: 'common', count: sailyPlans.length })}</span>
            )}
            {localPlans.length > 0 && sailyPlans.length > 0 && (
              <>
                <span>•</span>
                <span>{t('local_plans', { ns: 'common', count: localPlans.length })}</span>
              </>
            )}
            
            {/* Price range */}
            {plans.length > 1 && (
              <>
                <span>•</span>
                <span>
                  {t('price_range', { ns: 'common' })}: {formatPrice(Math.min(...plans.map(p => p.price.amount_with_tax)), 'USD')} - {formatPrice(Math.max(...plans.map(p => p.price.amount_with_tax)), 'USD')}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SailyPlansSection; 