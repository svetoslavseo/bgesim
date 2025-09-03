
import React, { useState, useEffect } from 'react';
import { MdCheck, MdStar, MdInfo } from 'react-icons/md';
import { Plan } from '../types';
import PaymentMethods from './PaymentMethods';
import { useTranslation, useTranslation as useI18n } from 'react-i18next';

interface PlanSelectorProps {
    plans: (Plan & { identifier?: string })[];
    selectedPlan: Plan & { identifier?: string };
    onSelectPlan: (plan: Plan & { identifier?: string }) => void;
    countryName?: string;
    bestValuePlanId?: string;
    onUpsellChange?: (checked: boolean) => void;
    onBuyNow?: (plan: Plan & { identifier?: string }) => void;
    onCheckCompatibility?: () => void;
}

// Utility function to format currency display
const formatCurrency = (currency: string) => {
    if (currency === 'USD') return '$';
    return currency;
};

// Utility function to calculate price per GB
const getPriceNumber = (plan: any): number => {
    if (typeof plan.price === 'number') {
        return plan.price; // already in correct units (e.g. USD)
    }
    if (plan.price && typeof plan.price === 'object' && typeof plan.price.amount_with_tax === 'number') {
        return plan.price.amount_with_tax / 100; // convert cents to unit currency
    }
    return NaN;
};

const getCurrency = (plan: any): string => {
    if (plan.currency) return plan.currency;
    if (plan.price && typeof plan.price === 'object' && plan.price.currency) return plan.price.currency;
    return 'USD';
};

const calculatePricePerGB = (plan: any) => {
    if (plan.data === 'Unlimited' || !plan.data) return getPriceNumber(plan);
    
    // Extract data amount from plan.data (e.g., "1 GB", "3 GB", etc.)
    const dataMatch = plan.data.match(/(\d+(?:\.\d+)?)/);
    if (!dataMatch) return getPriceNumber(plan);
    
    const dataAmount = parseFloat(dataMatch[1]);
    if (dataAmount === 0) return getPriceNumber(plan);
    
    const totalPrice = getPriceNumber(plan);
    return totalPrice / dataAmount;
};

// Utility function to format price display safely
const formatPriceDisplay = (plan: any): string => {
    const price = getPriceNumber(plan);
    if (isNaN(price)) return '0.00';
    return price.toFixed(2);
};

// Utility function to format price per GB display safely
const formatPricePerGBDisplay = (plan: any): string => {
    const pricePerGB = calculatePricePerGB(plan);
    if (isNaN(pricePerGB)) return '0.00';
    return pricePerGB.toFixed(2);
};



const PlanSelector: React.FC<PlanSelectorProps> = ({ plans, selectedPlan, onSelectPlan, countryName = 'Andorra', bestValuePlanId, onUpsellChange, onBuyNow, onCheckCompatibility }) => {
    const { t } = useTranslation('countries');
    const { i18n } = useI18n();
    const [upsellChecked, setUpsellChecked] = useState(false);
    const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);
    
    // Debug logging
    useEffect(() => {
        console.log('PlanSelector: Received plans:', plans?.length || 0, 'for country:', countryName);
        if (plans?.length > 0) {
            console.log('PlanSelector: First plan:', plans[0]);
        }
    }, [plans, countryName]);
    
    // Helper to translate data display (e.g., "1 GB" -> "1 GB" in English, "1 GB" in Chinese)
    const translateDataDisplay = (dataStr: string | undefined) => {
        if (!dataStr) return '';
        if (dataStr === 'Unlimited') {
            return t('unlimited_data');
        }
        // For now, keep GB as is since it's universally understood
        // Could be enhanced later to translate units if needed
        return dataStr;
    };

    // Helper to translate validity text to Bulgarian when language is Bulgarian
    const translateValidity = (validityStr: string | undefined) => {
        if (!validityStr) return '';
        
        // Check if the current language is Bulgarian
        const currentLang = i18n.language;
        if (currentLang === 'bg') {
            // Translate common validity patterns to Bulgarian
            if (validityStr.includes('7 days')) {
                return '7 дни';
            } else if (validityStr.includes('15 days')) {
                return '15 дни';
            } else if (validityStr.includes('30 days')) {
                return '30 дни';
            } else if (validityStr.includes('1 day')) {
                return '1 ден';
            } else if (validityStr.includes('days')) {
                // Generic pattern: replace "days" with "дни"
                return validityStr.replace('days', 'дни');
            } else if (validityStr.includes('day')) {
                // Generic pattern: replace "day" with "ден"
                return validityStr.replace('day', 'ден');
            }
        }
        
        // Return original text for other languages
        return validityStr;
    };
    
    // Helper to get plan type tooltip text
    const getPlanTypeTooltip = (planType: string) => {
        switch (planType) {
            case 'global':
                return 'Global plans work in 50+ countries worldwide';
            case 'regional':
                return 'Regional plans work in multiple countries within a specific region';
            case 'country':
                return 'Country plans work specifically in this destination';
            default:
                return 'Plan coverage information';
        }
    };
    
    if (!plans || plans.length === 0) {
        return (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 w-full mx-auto text-center">
                <p className="text-gray-700 text-lg">{t('no_plans_available')}</p>
            </div>
        );
    }
    
    // Helper to extract the label (e.g. "7 Days", "15 Days", etc.)
    const getDurationLabel = (plan: any) => {
        const days = plan.validity.split(' ')[0];
        return `${days} ${t('days')}`;
    };
    
    // Build durations from ALL plans (include unlimited as well)
    const uniqueDurations = Array.from(new Set(plans.map(getDurationLabel)));
    const sortedDurations = uniqueDurations.sort((a, b) => {
        const daysA = parseInt(a.split(' ')[0]);
        const daysB = parseInt(b.split(' ')[0]);
        return daysA - daysB;
    });
    
    // Map duration label -> number of available plans for that duration
    const durationCounts = plans.reduce((acc: Record<string, number>, plan) => {
        const label = getDurationLabel(plan);
        acc[label] = (acc[label] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const [selectedTab, setSelectedTab] = useState(sortedDurations[0]);
    const filteredPlans = plans.filter(plan => getDurationLabel(plan) === selectedTab);
    
    // Sort plans by price from low to high
    const sortedPlans = [...filteredPlans].sort((a, b) => getPriceNumber(a) - getPriceNumber(b));
    
    const [showAllPlans, setShowAllPlans] = useState(false);
    const plansToShow = showAllPlans ? sortedPlans : sortedPlans.slice(0, 4);
    
    // Find the 3rd most expensive plan (Most Popular) - using original filtered plans for this calculation
    const sortedByPrice = [...filteredPlans].sort((a, b) => getPriceNumber(b) - getPriceNumber(a));
    const mostPopularPlanId = sortedByPrice.length >= 3 ? sortedByPrice[2].id : null;

    return (
        <div id="choose-your-plan" className="bg-white p-4 sm:p-8 rounded-3xl shadow-2xl border border-gray-100 w-full max-w-[95vw] mx-auto px-2 sm:px-4">
            {/* Enhanced Header Section */}
            <div className="relative mb-6 sm:mb-8 pt-8 sm:pt-8">
                <div className="text-center">
                    <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2">{t('choose_your_plan')}</h2>
                    <p className="text-gray-600 text-sm sm:text-lg mb-4">
                        {i18n.language === 'bg' 
                            ? 'Изберете походящ план с мобилни данни за вашето пътуване'
                            : 'Select the perfect data plan for your journey'
                        }
                    </p>
                </div>
                
                {/* Enhanced Instant Activation Badge */}
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center space-x-1.5 sm:space-x-2 shadow-lg transform hover:scale-105 transition-transform">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse"></div>
                    <span>{t('instant_activation') || 'Instant Activation'}</span>
                </div>
                

            </div>
            
            {/* Enhanced Tabs */}
            <div className="flex space-x-3 mb-6 sm:mb-8 overflow-x-auto scrollbar-hide pb-2">
                {sortedDurations.map((duration) => (
                    <button
                        key={duration}
                        aria-pressed={selectedTab === duration}
                        className={`flex-shrink-0 flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border-2 font-bold text-sm transition-all duration-200 ${selectedTab === duration 
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-700 shadow-lg' 
                            : 'bg-white text-gray-800 border-gray-400 hover:border-blue-400 hover:bg-blue-50'}`}
                        onClick={() => setSelectedTab(duration)}
                    >
                        <span className="text-base font-bold">{duration}</span>
                        <div className="flex items-center gap-1">
                            <span
                                className={`${selectedTab === duration 
                                    ? 'bg-white/20 text-white' 
                                    : 'bg-blue-100 text-blue-600'} text-xs font-bold px-1.5 py-0.5 rounded-full`}
                            >
                                {durationCounts[duration] || 0}
                            </span>
                            <span className={`text-xs font-medium ${selectedTab === duration ? 'text-white/80' : 'text-gray-500'}`}>
                                {(durationCounts[duration] || 0) === 1 ? t('plan') : t('plans')}
                            </span>
                        </div>
                    </button>
                ))}
            </div>
            
            {/* Enhanced Plans Grid */}
            <div className="space-y-3 sm:space-y-4 mb-8">
                {plansToShow.map((plan) => {
                    const isSelected = selectedPlan && selectedPlan.id === plan.id;
                    const isBestValue = String(plan.identifier ?? plan.id) === String(bestValuePlanId);
                    const isMostPopular = plan.id === mostPopularPlanId;
                    
                    return (
                        <div
                            key={plan.id}
                            onClick={() => onSelectPlan(plan)}
                            className={`relative flex items-center p-4 sm:p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                                isSelected 
                                    ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg ring-4 ring-blue-200' 
                                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                            } ${isBestValue ? 'ring-2 ring-yellow-400' : ''}`}
                            style={{ minHeight: '56px' }}
                        >
                            {/* Selection Indicator */}
                            <div className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 border-2 rounded-full mr-3 sm:mr-4 flex-shrink-0 transition-all duration-200 ${
                                isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                            }`}>
                                {isSelected && (
                                    <MdCheck className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                )}
                            </div>
                            
                            {/* Plan Details */}
                                                                                            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mb-1 sm:mb-0">
                                        <div>
                                            <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                                                <span className="font-bold text-lg sm:text-2xl text-gray-900">{translateDataDisplay(plan.data)}</span>
                                            </div>
                                            <span className="block sm:inline sm:ml-2 text-gray-600 text-xs sm:text-sm font-medium">{translateValidity(plan.validity)} {t('validity')}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Enhanced Pricing Section */}
                                    <div className="text-right">
                                        <div className="flex flex-col items-end space-y-0.5 sm:space-y-1">
                                            <span className="font-bold text-xl sm:text-3xl text-blue-600">
                                                {formatCurrency(getCurrency(plan))}{formatPriceDisplay(plan)}
                                            </span>
                                            <div className="flex items-center gap-2 justify-end">
                                                {/* Plan Type Label */}
                                                {plan.planType && (
                                                    <div className="relative">
                                                        <span className={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
                                                            plan.planType === 'global' 
                                                                ? 'bg-purple-100 text-purple-700'
                                                                : plan.planType === 'regional'
                                                                ? 'bg-blue-100 text-blue-700'
                                                                : 'bg-green-100 text-green-700'
                                                        }`}>
                                                            {plan.planType === 'global' ? t('global') : 
                                                             plan.planType === 'regional' ? t('regional') : 
                                                             t('country')}
                                                            <MdInfo 
                                                                className="w-4 h-4 cursor-help"
                                                                onMouseEnter={() => setHoveredTooltip(`${plan.planType}-${plan.id}`)}
                                                                onMouseLeave={() => setHoveredTooltip(null)}
                                                            />
                                                        </span>
                                                        {/* Tooltip */}
                                                        {hoveredTooltip === `${plan.planType}-${plan.id}` && (
                                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-10">
                                                                {getPlanTypeTooltip(plan.planType)}
                                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                {plan.data === 'Unlimited' ? (
                                                    <span className="bg-yellow-100 text-black px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                                                        {t('unlimited_data')}
                                                    </span>
                                                ) : (
                                                    <span className="bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                                                        {formatCurrency(getCurrency(plan))}{formatPricePerGBDisplay(plan)}/GB
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                            {/* Best Value Badge */}
                            {isBestValue && (
                                <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 shadow-lg">
                                    <MdStar className="w-3 h-3 sm:w-4 sm:h-4" />
                                    {t('best_value')}
                                </div>
                            )}
                            
                            {/* Most Popular Badge */}
                            {isMostPopular && !isBestValue && (
                                <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 shadow-lg">
                                    <MdStar className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                                    <span className="hidden sm:inline">Most Popular</span>
                                    <span className="sm:hidden">Popular</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            
            {/* Show More/Less Button */}
            {filteredPlans.length > 4 && (
                <div className="flex justify-center mb-8">
                    <button
                        className="text-blue-600 font-bold px-6 py-3 rounded-xl border-2 border-blue-200 hover:bg-blue-50 transition-all duration-200"
                        onClick={() => setShowAllPlans(v => !v)}
                    >
                        {showAllPlans ? t('show_less_plans') : t('view_all_plans', { count: filteredPlans.length })}
                    </button>
                </div>
            )}
            
            {/* Enhanced Action Button */}
            {selectedPlan && selectedPlan.id ? (
                <button
                    className="w-full font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-2xl text-base sm:text-lg mb-6 transition-all duration-200 bg-gradient-to-r from-gray-900 to-black text-white hover:from-black hover:to-gray-800 shadow-lg hover:shadow-xl transform hover:scale-105"
                    onClick={() => {
                        if (onBuyNow) {
                            onBuyNow(selectedPlan);
                        }
                    }}
                >
                    {i18n.language === 'bg' 
                        ? `${t('continue')} - ${formatCurrency(getCurrency(selectedPlan))}${formatPriceDisplay(selectedPlan)}`
                        : `${t('buy_now')} - ${formatCurrency(getCurrency(selectedPlan))}${formatPriceDisplay(selectedPlan)}`
                    }
                </button>
            ) : (
                <button
                    className="w-full font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-2xl text-base sm:text-lg mb-6 transition-all bg-gray-200 text-gray-500 cursor-not-allowed"
                    disabled={true}
                >
                    {t('select_a_plan')}
                </button>
            )}
            
            {/* Check Compatibility Link */}
            <div className="text-center mb-8">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 text-sm sm:text-base font-semibold underline decoration-dotted underline-offset-4 hover:decoration-solid transition-all"
                  onClick={e => {
                    e.preventDefault();
                    if (onCheckCompatibility) onCheckCompatibility();
                  }}
                >
                    {t('check_phone_compatibility')}
                </a>
            </div>
            
            {/* Enhanced Trust Indicators */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 sm:p-6 mb-6">
                <div className="flex flex-col sm:flex-row items-center justify-center text-xs sm:text-sm text-gray-700 gap-4 sm:gap-6">
                    <div className="flex items-center justify-center">
                        <img 
                            src="/saily-trustpilot-rating.png" 
                            alt="Trustpilot Rating" 
                            className="h-6 sm:h-8"
                        />
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                        <MdCheck className="text-green-500 w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="font-medium text-xs sm:text-sm">{t('secure_payment_guaranteed')}</span>
                    </div>

                </div>
            </div>
            
            {/* Payment Methods */}
            <div className="flex justify-center">
                <PaymentMethods />
            </div>
        </div>
    );
};

export default PlanSelector;
