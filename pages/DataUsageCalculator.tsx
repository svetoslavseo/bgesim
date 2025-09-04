import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { dataService, type Plan } from '../utils/dataService';
import { COUNTRIES, REGIONS } from '../constants';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { Helmet } from 'react-helmet-async';
import { 
  FaMobile, 
  FaLaptop, 
  FaCog, 
  FaInstagram, 
  FaYoutube, 
  FaSpotify, 
  FaMapMarkedAlt, 
  FaGlobe, 
  FaEnvelope, 
  FaVideo, 
  FaDownload,
  FaChartLine,
  FaGlobeAmericas,
  FaGlobeEurope,
  FaGlobeAsia,
  FaQuestionCircle,
  FaArrowDown
} from 'react-icons/fa';
import { 
  MdSmartphone, 
  MdWork, 
  MdSettings,
  MdSocialDistance,
  MdMovie,
  MdMusicNote,
  MdNavigation,
  MdWeb,
  MdEmail,
  MdVideoCall,
  MdGetApp,
  MdTrendingUp,
  MdLocationOn,
  MdPublic,
  MdLanguage,
  MdHelp,
  MdExpandMore,
  MdExpandLess,
  MdInfo
} from 'react-icons/md';

interface UsageProfile {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  defaultUsage: Record<string, number>;
  color: string;
}

interface ActivityCategory {
  id: string;
  name: string;
  apps: string[];
  dataPerHour: number;
  unit: string;
  icon: React.ReactNode;
  description: string;
}

interface UsageData {
  [key: string]: number;
}

interface EstimatedData {
  total: number;
  monthly: number;
  weekly: number;
  daily: number;
  breakdown: Record<string, number>;
}

interface RecommendedPlan {
  plan: Plan;
  relevance: number;
  matchType: 'exact' | 'close' | 'unlimited';
}

const DataUsageCalculator: React.FC<{ navigateTo: (route: string) => void }> = ({ navigateTo }) => {
  const { t } = useTranslation('calculator');
  const [selectedProfile, setSelectedProfile] = useState('casual');
  const [usageData, setUsageData] = useState<UsageData>({});
  const [estimatedData, setEstimatedData] = useState<EstimatedData>({
    total: 0,
    monthly: 0,
    weekly: 0,
    daily: 0,
    breakdown: {}
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [recommendedPlans, setRecommendedPlans] = useState<RecommendedPlan[]>([]);
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);
  const [openFAQ, setOpenFAQ] = useState(0); // Track which FAQ is open (0 = first one)

  const profiles: UsageProfile[] = [
    {
      id: 'casual',
      name: t('profiles.casual.name'),
      description: t('profiles.casual.description'),
      icon: <MdSmartphone className="w-8 h-8 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200',
      defaultUsage: {
        socialMedia: 1,
        webBrowsing: 1,
        emails: 0.5,
        navigation: 0.5,
        music: 0.5,
        video: 0,
        videoCalling: 0,
        downloads: 0.5
      }
    },
    {
      id: 'remote',
      name: t('profiles.remote.name'),
      description: t('profiles.remote.description'),
      icon: <MdWork className="w-8 h-8 text-green-600" />,
      color: 'bg-green-50 border-green-200',
      defaultUsage: {
        socialMedia: 0.5,
        webBrowsing: 3,
        emails: 2,
        navigation: 0.5,
        music: 1,
        video: 2,
        videoCalling: 2,
        downloads: 1
      }
    },
    {
      id: 'personalized',
      name: t('profiles.personalized.name'),
      description: t('profiles.personalized.description'),
      icon: <MdSettings className="w-8 h-8 text-purple-600" />,
      color: 'bg-purple-50 border-purple-200',
      defaultUsage: {
        socialMedia: 0,
        webBrowsing: 0,
        emails: 0,
        navigation: 0,
        music: 0,
        video: 0,
        videoCalling: 0,
        downloads: 0
      }
    }
  ];

  const activityCategories: ActivityCategory[] = [
    {
      id: 'socialMedia',
      name: t('activities.social_media.name'),
      apps: t('activities.social_media.apps').split(', '),
      dataPerHour: 150,
      unit: 'MB',
      icon: <MdSocialDistance className="w-6 h-6 text-pink-500" />,
      description: t('activities.social_media.description')
    },
    {
      id: 'video',
      name: t('activities.video.name'),
      apps: t('activities.video.apps').split(', '),
      dataPerHour: 1500,
      unit: 'MB',
      icon: <MdMovie className="w-6 h-6 text-red-500" />,
      description: t('activities.video.description')
    },
    {
      id: 'music',
      name: t('activities.music.name'),
      apps: t('activities.music.apps').split(', '),
      dataPerHour: 100,
      unit: 'MB',
      icon: <MdMusicNote className="w-6 h-6 text-green-500" />,
      description: t('activities.music.description')
    },
    {
      id: 'navigation',
      name: t('activities.navigation.name'),
      apps: t('activities.navigation.apps').split(', '),
      dataPerHour: 10,
      unit: 'MB',
      icon: <MdNavigation className="w-6 h-6 text-blue-500" />,
      description: t('activities.navigation.description')
    },
    {
      id: 'webBrowsing',
      name: t('activities.web_browsing.name'),
      apps: t('activities.web_browsing.apps').split(', '),
      dataPerHour: 50,
      unit: 'MB',
      icon: <MdWeb className="w-6 h-6 text-indigo-500" />,
      description: t('activities.web_browsing.description')
    },
    {
      id: 'emails',
      name: t('activities.emails.name'),
      apps: t('activities.emails.apps').split(', '),
      dataPerHour: 4,
      unit: 'MB',
      icon: <MdEmail className="w-6 h-6 text-gray-500" />,
      description: t('activities.emails.description')
    },
    {
      id: 'videoCalling',
      name: t('activities.video_calling.name'),
      apps: t('activities.video_calling.apps').split(', '),
      dataPerHour: 1000,
      unit: 'MB',
      icon: <MdVideoCall className="w-6 h-6 text-purple-500" />,
      description: t('activities.video_calling.description')
    },
    {
      id: 'downloads',
      name: t('activities.downloads.name'),
      apps: t('activities.downloads.apps').split(', '),
      dataPerHour: 300,
      unit: 'MB',
      icon: <MdGetApp className="w-6 h-6 text-orange-500" />,
      description: t('activities.downloads.description')
    }
  ];

  const timeOptions = [0, 0.5, 1, 2, 3, 5];

  // Load plans data
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const plansData = await dataService.getPlansData();
        setPlans(plansData.items || []);
      } catch (error) {
        console.error('Failed to load plans:', error);
        setPlans([]);
      }
    };
    loadPlans();
  }, []);

  useEffect(() => {
    const profile = profiles.find(p => p.id === selectedProfile);
    if (profile) {
      console.log(`Setting profile: ${selectedProfile}`, profile.defaultUsage);
      setUsageData(profile.defaultUsage);
    }
  }, [selectedProfile]);

  useEffect(() => {
    calculateDataUsage();
  }, [usageData]);

  const calculateDataUsage = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      let totalMB = 0;
      const breakdown: Record<string, number> = {};
      
      activityCategories.forEach(category => {
        const hours = usageData[category.id] || 0;
        const dataUsed = hours * category.dataPerHour;
        breakdown[category.id] = dataUsed;
        totalMB += dataUsed;
      });

      const dailyMB = totalMB;
      const weeklyMB = dailyMB * 7;
      const monthlyMB = dailyMB * 30;
      const dailyGB = dailyMB / 1024;
      const weeklyGB = weeklyMB / 1024;
      const monthlyGB = monthlyMB / 1024;

      setEstimatedData({
        total: dailyGB,
        monthly: monthlyGB,
        weekly: weeklyGB,
        daily: dailyMB,
        breakdown
      });
      
      setIsCalculating(false);
    }, 300);
  };

  // Calculate recommended plans based on usage
  useEffect(() => {
    if (plans.length > 0 && estimatedData.monthly > 0) {
      const recommendations = getRecommendedPlans(estimatedData.monthly);
      setRecommendedPlans(recommendations);
    }
  }, [plans, estimatedData.monthly]);

  const getRecommendedPlans = (monthlyUsageGB: number): RecommendedPlan[] => {
    const recommendations: RecommendedPlan[] = [];
    
    plans.forEach(plan => {
      if (!plan.data_amount) return;
      
      const planDataGB = plan.data_amount;
      const priceUSD = plan.price.amount_with_tax / 100; // Convert cents to dollars
      
      let relevance = 0;
      let matchType: 'exact' | 'close' | 'unlimited' = 'close';
      
      // Calculate relevance based on how well the plan matches the usage
      if (plan.data_limit.is_unlimited) {
        relevance = 0.8; // High relevance for unlimited plans
        matchType = 'unlimited';
      } else if (Math.abs(planDataGB - monthlyUsageGB) <= 2) {
        relevance = 1.0; // Exact match
        matchType = 'exact';
      } else if (planDataGB >= monthlyUsageGB * 0.8 && planDataGB <= monthlyUsageGB * 1.5) {
        relevance = 0.9; // Close match
        matchType = 'close';
      } else if (planDataGB >= monthlyUsageGB * 0.5 && planDataGB <= monthlyUsageGB * 2) {
        relevance = 0.7; // Reasonable match
      } else {
        relevance = 0.3; // Poor match
      }
      
      // Boost relevance for plans with good value (more data for similar price)
      const valueRatio = planDataGB / priceUSD;
      relevance += Math.min(valueRatio / 10, 0.2);
      
      if (relevance > 0.5) {
        recommendations.push({
          plan,
          relevance,
          matchType
        });
      }
    });
    
    // Sort by relevance and return top 3
    return recommendations
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 3);
  };

  // Helper function to determine plan type
  const getPlanType = (plan: any): 'country' | 'regional' | 'global' => {
    if (plan.region === 'GLB' || plan.covered_countries.length >= 50) {
      return 'global';
    } else if (plan.region || plan.covered_countries.length > 5) {
      return 'regional';
    } else {
      return 'country';
    }
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

  const handleUsageChange = (categoryId: string, hours: number) => {
    console.log(`Setting ${categoryId} to ${hours} hours`);
    setUsageData(prev => {
      const newData = {
        ...prev,
        [categoryId]: hours
      };
      console.log('Updated usage data:', newData);
      return newData;
    });
  };

  const resetCalculator = () => {
    setSelectedProfile('casual');
    setUsageData({});
  };

  const formatData = (value: number, unit: 'MB' | 'GB') => {
    if (unit === 'GB') {
      return value >= 1 ? `${value.toFixed(1)} GB` : `${(value * 1024).toFixed(0)} MB`;
    }
    return value >= 1024 ? `${(value / 1024).toFixed(1)} GB` : `${value.toFixed(0)} MB`;
  };

  const getUsagePercentage = (categoryId: string) => {
    const category = activityCategories.find(c => c.id === categoryId);
    if (!category) return 0;
    
    const hours = usageData[categoryId] || 0;
    const dataUsed = hours * category.dataPerHour;
    const totalData = estimatedData.daily; // Use daily MB
    
    return totalData > 0 ? (dataUsed / totalData) * 100 : 0;
  };

  const formatPrice = (priceCents: number) => {
    return `US$${(priceCents / 100).toFixed(2)}`;
  };

  const getCountryFlag = (countryCode: string) => {
    // Use self-hosted flags
    const flagUrl = `/esim-data/flags/${countryCode.toLowerCase()}.svg`;
    return (
      <img 
        src={flagUrl} 
        alt={`${countryCode} flag`} 
        className="w-6 h-auto rounded-sm"
        width="24"
        height="18"
        loading="lazy"
      />
    );
  };

  const getRegionName = (countryCodes: string[]) => {
    const regions: Record<string, string> = {
      // Major countries
      'GB': 'United Kingdom',
      'US': 'United States',
      'CA': 'Canada',
      'AU': 'Australia',
      'DE': 'Germany',
      'FR': 'France',
      'JP': 'Japan',
      'SG': 'Singapore',
      'NZ': 'New Zealand',
      'IT': 'Italy',
      'ES': 'Spain',
      'NL': 'Netherlands',
      'SE': 'Sweden',
      'NO': 'Norway',
      'DK': 'Denmark',
      'FI': 'Finland',
      'CH': 'Switzerland',
      'AT': 'Austria',
      'BE': 'Belgium',
      'IE': 'Ireland',
      
      // Asia
      'TH': 'Thailand',
      'MY': 'Malaysia',
      'AE': 'United Arab Emirates',
      'IN': 'India',
      'KR': 'South Korea',
      'CN': 'China',
      'HK': 'Hong Kong',
      'TW': 'Taiwan',
      'ID': 'Indonesia',
      'PH': 'Philippines',
      'VN': 'Vietnam',
      'BD': 'Bangladesh',
      'PK': 'Pakistan',
      'LK': 'Sri Lanka',
      'NP': 'Nepal',
      'MM': 'Myanmar',
      'KH': 'Cambodia',
      'LA': 'Laos',
      'BN': 'Brunei',
      'MN': 'Mongolia',
      'KZ': 'Kazakhstan',
      'UZ': 'Uzbekistan',
      'KG': 'Kyrgyzstan',
      'TJ': 'Tajikistan',
      'TM': 'Turkmenistan',
      'AF': 'Afghanistan',
      'IR': 'Iran',
      'IQ': 'Iraq',
      'SA': 'Saudi Arabia',
      'QA': 'Qatar',
      'KW': 'Kuwait',
      'BH': 'Bahrain',
      'OM': 'Oman',
      'YE': 'Yemen',
      'JO': 'Jordan',
      'LB': 'Lebanon',
      'SY': 'Syria',
      'IL': 'Israel',
      'PS': 'Palestine',
      'TR': 'Turkey',
      'CY': 'Cyprus',
      'AM': 'Armenia',
      'AZ': 'Azerbaijan',
      'GE': 'Georgia',
      
      // Europe
      'PL': 'Poland',
      'CZ': 'Czech Republic',
      'HU': 'Hungary',
      'RO': 'Romania',
      'BG': 'Bulgaria',
      'HR': 'Croatia',
      'SI': 'Slovenia',
      'SK': 'Slovakia',
      'LT': 'Lithuania',
      'LV': 'Latvia',
      'EE': 'Estonia',
      'MT': 'Malta',
      'GR': 'Greece',
      'PT': 'Portugal',
      'IS': 'Iceland',
      'LU': 'Luxembourg',
      'MC': 'Monaco',
      'LI': 'Liechtenstein',
      'AD': 'Andorra',
      'SM': 'San Marino',
      'VA': 'Vatican City',
      'AL': 'Albania',
      'MK': 'North Macedonia',
      'RS': 'Serbia',
      'ME': 'Montenegro',
      'BA': 'Bosnia and Herzegovina',
      'XK': 'Kosovo',
      'UA': 'Ukraine',
      'BY': 'Belarus',
      'MD': 'Moldova',
      'RU': 'Russia',
      
      // North America
      'MX': 'Mexico',
      'CU': 'Cuba',
      'JM': 'Jamaica',
      'HT': 'Haiti',
      'DO': 'Dominican Republic',
      'PR': 'Puerto Rico',
      'GT': 'Guatemala',
      'BZ': 'Belize',
      'SV': 'El Salvador',
      'HN': 'Honduras',
      'NI': 'Nicaragua',
      'CR': 'Costa Rica',
      'PA': 'Panama',
      'BB': 'Barbados',
      'TT': 'Trinidad and Tobago',
      'GD': 'Grenada',
      'LC': 'Saint Lucia',
      'VC': 'Saint Vincent and the Grenadines',
      'AG': 'Antigua and Barbuda',
      'KN': 'Saint Kitts and Nevis',
      'DM': 'Dominica',
      'BS': 'Bahamas',
      'AI': 'Anguilla',
      'VG': 'British Virgin Islands',
      'VI': 'U.S. Virgin Islands',
      'AW': 'Aruba',
      'CW': 'Curaçao',
      'SX': 'Sint Maarten',
      'BM': 'Bermuda',
      'TC': 'Turks and Caicos Islands',
      'KY': 'Cayman Islands',
      'GL': 'Greenland',
      
      // South America
      'BR': 'Brazil',
      'AR': 'Argentina',
      'CL': 'Chile',
      'PE': 'Peru',
      'CO': 'Colombia',
      'VE': 'Venezuela',
      'EC': 'Ecuador',
      'BO': 'Bolivia',
      'PY': 'Paraguay',
      'UY': 'Uruguay',
      'GY': 'Guyana',
      'SR': 'Suriname',
      'GF': 'French Guiana',
      
      // Africa
      'ZA': 'South Africa',
      'EG': 'Egypt',
      'NG': 'Nigeria',
      'KE': 'Kenya',
      'GH': 'Ghana',
      'ET': 'Ethiopia',
      'TZ': 'Tanzania',
      'UG': 'Uganda',
      'DZ': 'Algeria',
      'MA': 'Morocco',
      'TN': 'Tunisia',
      'LY': 'Libya',
      'SD': 'Sudan',
      'SS': 'South Sudan',
      'CM': 'Cameroon',
      'CI': 'Ivory Coast',
      'BF': 'Burkina Faso',
      'ML': 'Mali',
      'NE': 'Niger',
      'TD': 'Chad',
      'CF': 'Central African Republic',
      'CG': 'Republic of the Congo',
      'CD': 'Democratic Republic of the Congo',
      'GA': 'Gabon',
      'GQ': 'Equatorial Guinea',
      'ST': 'São Tomé and Príncipe',
      'AO': 'Angola',
      'ZM': 'Zambia',
      'ZW': 'Zimbabwe',
      'BW': 'Botswana',
      'NA': 'Namibia',
      'SZ': 'Eswatini',
      'LS': 'Lesotho',
      'MG': 'Madagascar',
      'MU': 'Mauritius',
      'SC': 'Seychelles',
      'KM': 'Comoros',
      'DJ': 'Djibouti',
      'SO': 'Somalia',
      'ER': 'Eritrea',
      'RW': 'Rwanda',
      'BI': 'Burundi',
      'MW': 'Malawi',
      'MZ': 'Mozambique',
      
      // Oceania
      'FJ': 'Fiji',
      'PG': 'Papua New Guinea',
      'NC': 'New Caledonia',
      'VU': 'Vanuatu',
      'SB': 'Solomon Islands',
      'TO': 'Tonga',
      'WS': 'Samoa',
      'KI': 'Kiribati',
      'TV': 'Tuvalu',
      'NR': 'Nauru',
      'PW': 'Palau',
      'FM': 'Micronesia',
      'MH': 'Marshall Islands',
      'CK': 'Cook Islands',
      'NU': 'Niue',
      'TK': 'Tokelau',
      'AS': 'American Samoa',
      'GU': 'Guam',
      'MP': 'Northern Mariana Islands',
      'PF': 'French Polynesia',
      'WF': 'Wallis and Futuna',
      'PN': 'Pitcairn Islands',
      'NF': 'Norfolk Island',
      'CC': 'Cocos Islands',
      'CX': 'Christmas Island',
      'HM': 'Heard and McDonald Islands',
      'AQ': 'Antarctica'
    };
    
    if (countryCodes.length === 1) {
      return regions[countryCodes[0]] || countryCodes[0];
    } else if (countryCodes.length > 3) {
      return 'Global';
    } else {
      return countryCodes.map(code => regions[code] || code).join(', ');
    }
  };

  return (
    <>
      <Helmet>
        <html lang={i18n.language === 'bg' ? 'bg' : 'en'} />
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={t('meta.keywords')} />
        <meta property="og:title" content={t('meta.og_title')} />
        <meta property="og:description" content={t('meta.og_description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://travelesim.bg/data-usage-calculator" />
        <meta property="og:image" content="https://travelesim.bg/esim-data/travelesim-logo.png" />
        <meta property="og:locale" content="zh_CN" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('meta.twitter_title')} />
        <meta name="twitter:description" content={t('meta.twitter_description')} />
        <link rel="canonical" href={`https://travelesim.bg${i18n.language === 'en' ? '/en' : ''}/data-usage-calculator`} />
        <link rel="alternate" hrefLang="bg" href="https://travelesim.bg/data-usage-calculator" />
        <link rel="alternate" hrefLang="en" href="https://travelesim.bg/en/data-usage-calculator" />
        <link rel="alternate" hrefLang="x-default" href="https://travelesim.bg/data-usage-calculator" />
      </Helmet>
      <div className="min-h-screen bg-brand-primary">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-secondary mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto px-4 mb-6">
            {t('hero.description')}
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-blue-800">
              <strong>{t('hero.pro_tip_label')}</strong> {t('hero.pro_tip_content')}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 max-w-7xl mx-auto">
          {/* Left Panel - Usage Calculator */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-secondary mb-4 sm:mb-6">
              {t('calculator.title')}
            </h2>
            
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              {t('calculator.description')}
            </p>
            
            {/* Profile Selection */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-brand-secondary mb-3 sm:mb-4">
                {t('profiles.title')}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {t('profiles.description')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {profiles.map(profile => (
                  <button
                    key={profile.id}
                    onClick={() => setSelectedProfile(profile.id)}
                    className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedProfile === profile.id
                        ? 'border-brand-accent bg-brand-accent/10 shadow-lg transform scale-105'
                        : 'border-gray-200 hover:border-brand-accent/50 hover:shadow-md'
                    } ${profile.color}`}
                  >
                    <div className="flex justify-center mb-2">{profile.icon}</div>
                    <div className="font-semibold text-brand-secondary text-sm sm:text-base">{profile.name}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{profile.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Activity Categories */}
            <div className="space-y-4 sm:space-y-6">
              {activityCategories.map(category => (
                <div key={category.id} className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <div className="flex-shrink-0 mt-1">{category.icon}</div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-brand-secondary text-sm sm:text-base">{category.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{category.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {category.apps.join(', ')} • ~{category.dataPerHour} {category.unit}/hour
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                    {timeOptions.map(hours => {
                      const currentValue = usageData[category.id] || 0;
                      const isSelected = Math.abs(currentValue - hours) < 0.01;
                      console.log(`Category: ${category.id}, Hours: ${hours}, CurrentValue: ${currentValue}, IsSelected: ${isSelected}`);
                      return (
                        <button
                          key={hours}
                          onClick={() => handleUsageChange(category.id, hours)}
                          className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border-2 ${
                            isSelected
                              ? 'bg-black text-white border-black shadow-lg transform scale-105'
                              : 'bg-white text-brand-secondary border-gray-300 hover:bg-gray-50 hover:border-brand-accent/50'
                          }`}
                          title={`${hours} hours per day`}
                        >
                          {hours === 0 ? '0h' : hours === 0.5 ? '0.5h' : `${hours}h`}
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={usageData[category.id] || ''}
                      onChange={(e) => handleUsageChange(category.id, parseFloat(e.target.value) || 0)}
                      className={`flex-1 px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-colors text-sm ${
                        usageData[category.id] && !timeOptions.some(option => Math.abs(usageData[category.id] - option) < 0.01)
                          ? 'border-brand-accent bg-brand-accent/5'
                          : 'border-gray-300'
                      }`}
                      placeholder={t('results.custom_hours')}
                    />
                    <div className="flex items-center justify-between sm:justify-start">
                      <span className="text-xs sm:text-sm text-gray-600">{t('results.hours_per_day')}</span>
                      {usageData[category.id] !== undefined && usageData[category.id] > 0 && (
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ml-2 ${
                          timeOptions.some(option => Math.abs(usageData[category.id] - option) < 0.01)
                            ? 'bg-brand-accent/10 text-brand-accent'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {t('results.selected')} {usageData[category.id]}h
                          {!timeOptions.some(option => Math.abs(usageData[category.id] - option) < 0.01) && ` ${t('results.custom')}`}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Usage Progress Bar */}
                  {usageData[category.id] > 0 && (
                    <div className="mt-3">
                                              <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>{t('results.usage')} {formatData((usageData[category.id] || 0) * category.dataPerHour, 'MB')}</span>
                          <span>{getUsagePercentage(category.id).toFixed(1)}% {t('results.of_total')}</span>
                        </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-brand-accent h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getUsagePercentage(category.id)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-secondary mb-4 sm:mb-6">
              {t('results.title')}
            </h2>
            
            {/* Main Result */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="relative">
                <div className={`text-4xl sm:text-5xl font-bold text-brand-accent mb-2 transition-all duration-300 ${
                  isCalculating ? 'opacity-50' : ''
                }`}>
                  {isCalculating ? '...' : formatData(estimatedData.monthly, 'GB')}
                </div>
                <p className="text-gray-600 text-sm sm:text-base">{t('results.monthly_usage')}</p>
                <p className="text-xs text-gray-500 mt-1">{t('results.based_on_daily')}</p>
                {isCalculating && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-accent"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex justify-between items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-brand-secondary text-sm sm:text-base">{t('results.weekly_usage')}</span>
                <span className="font-bold text-brand-accent text-sm sm:text-base">
                  {formatData(estimatedData.weekly, 'GB')}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-brand-secondary text-sm sm:text-base">{t('results.daily_usage')}</span>
                <span className="font-bold text-brand-accent text-sm sm:text-base">
                  {formatData(estimatedData.daily, 'MB')}
                </span>
              </div>
            </div>

            {/* Usage Graph */}
            <div className="mb-6 sm:mb-8">
              <h3 className="font-semibold text-brand-secondary mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                <MdTrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-brand-accent" />
                {t('results.breakdown_title')}
              </h3>
              
              {/* Donut Chart */}
              {estimatedData.daily > 0 && (
                <div className="mb-4 sm:mb-6">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto">
                    <svg className="w-24 h-24 sm:w-32 sm:h-32 transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="10"
                      />
                      {(() => {
                        let currentOffset = 0;
                        const total = estimatedData.daily;
                        const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16'];
                        
                        return activityCategories
                          .filter(category => estimatedData.breakdown[category.id] > 0)
                          .map((category, index) => {
                            const dataUsed = estimatedData.breakdown[category.id];
                            const percentage = (dataUsed / total) * 100;
                            const circumference = 2 * Math.PI * 50;
                            const strokeDasharray = (percentage / 100) * circumference;
                            const strokeDashoffset = circumference - strokeDasharray;
                            
                            const color = colors[index % colors.length];
                            
                            return (
                              <circle
                                key={category.id}
                                cx="60"
                                cy="60"
                                r="50"
                                fill="none"
                                stroke={color}
                                strokeWidth="10"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                style={{
                                  transformOrigin: 'center',
                                  transform: `rotate(${currentOffset}deg)`
                                }}
                              />
                            );
                          });
                      })()}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-sm sm:text-lg font-bold text-brand-secondary">
                          {formatData(estimatedData.daily, 'MB')}
                        </div>
                        <div className="text-xs text-gray-500">Daily</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-2 sm:space-y-3">
                {activityCategories.map(category => {
                  const dataUsed = estimatedData.breakdown[category.id] || 0;
                  const percentage = getUsagePercentage(category.id);
                  
                  if (dataUsed === 0) return null;
                  
                  return (
                    <div key={category.id} className="flex items-center space-x-2 sm:space-x-3">
                      <div className="flex-shrink-0">{category.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between text-xs sm:text-sm mb-1">
                          <span className="text-brand-secondary truncate">{category.name}</span>
                          <span className="text-brand-accent font-medium flex-shrink-0">
                            {formatData(dataUsed, 'MB')}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                          <div
                            className="bg-brand-accent h-1.5 sm:h-2 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {Object.keys(estimatedData.breakdown).filter(key => estimatedData.breakdown[key] > 0).length === 0 && (
                <div className="text-center py-6 sm:py-8 text-gray-500">
                  <MdTrendingUp className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm sm:text-base">{t('results.adjust_usage')}</p>
                </div>
              )}
            </div>

            {/* Recommended Plans */}
            <div className="mb-4 sm:mb-6">
              <h3 className="font-semibold text-brand-secondary mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                <MdLocationOn className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-brand-accent" />
                {t('results.recommended_plans_title')}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {t('results.recommended_plans_description')}
              </p>
              {recommendedPlans.length > 0 ? (
                <div className="space-y-2 sm:space-y-3">
                  {recommendedPlans.map((recommendation, index) => {
                    const { plan } = recommendation;
                    const primaryCountry = plan.covered_countries[0];
                    const flag = getCountryFlag(primaryCountry);
                    const regionName = getRegionName(plan.covered_countries);
                    const price = formatPrice(plan.price.amount_with_tax);
                    const dataAmount = plan.data_limit?.is_unlimited ? 'Unlimited' : `${plan.data_limit?.amount} GB`;
                    const planType = getPlanType(plan);
                    
                    return (
                      <div 
                        key={plan.identifier}
                        className={`flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                          recommendation.matchType === 'exact' ? 'bg-green-50 border border-green-200' :
                          recommendation.matchType === 'unlimited' ? 'bg-blue-50 border border-blue-200' :
                          'bg-gray-50 border border-gray-200'
                        }`}
                        onClick={() => {
                          const primaryCountry = plan.covered_countries[0];
                          if (primaryCountry) {
                            // Convert to lowercase to match constants
                            const countryCode = primaryCountry.toLowerCase();
                            console.log('Navigating to country:', countryCode, 'from plan:', plan.name);
                            
                            // Find the country in the constants
                            const country = COUNTRIES.find(c => c.id === countryCode);
                            if (country) {
                              console.log('Found country:', country.name, 'navigating to:', `/${country.regionId}/${country.slug}`);
                              navigateTo(`/${country.regionId}/${country.slug}`);
                            } else {
                              console.log('Country not found, trying region:', countryCode);
                              // Fallback to region page if country not found
                              const region = REGIONS.find(r => r.id === countryCode);
                              if (region) {
                                console.log('Found region:', region.name, 'navigating to:', `/${region.id}`);
                                navigateTo(`/${region.id}`);
                              } else {
                                console.log('Neither country nor region found for:', countryCode);
                                // Final fallback - try to navigate to a general page
                                navigateTo('/all-destinations');
                              }
                            }
                          }
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-base sm:text-lg">{flag}</span>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm sm:text-base text-brand-secondary">{regionName}</span>
                              {/* Plan Type Label */}
                              <div className="relative">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                  planType === 'global' 
                                    ? 'bg-purple-100 text-purple-700'
                                    : planType === 'regional'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-green-100 text-green-700'
                                }`}>
                                  {planType === 'global' ? t('global') : 
                                   planType === 'regional' ? t('regional') : 
                                   t('country')}
                                  <MdInfo 
                                    className="w-3 h-3 cursor-help"
                                    onMouseEnter={() => setHoveredTooltip(`${planType}-${plan.identifier}`)}
                                    onMouseLeave={() => setHoveredTooltip(null)}
                                  />
                                </span>
                                {/* Tooltip */}
                                {hoveredTooltip === `${planType}-${plan.identifier}` && (
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-10">
                                    {getPlanTypeTooltip(planType)}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">{plan.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-brand-accent text-sm sm:text-base">{price}</div>
                          <div className="text-xs sm:text-sm text-gray-600">{dataAmount}</div>
                          {recommendation.matchType === 'exact' && (
                            <div className="text-xs text-green-600 font-medium">{t('results.perfect_match')}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <p className="text-sm">{t('results.calculate_usage')}</p>
                </div>
              )}
            </div>

            <button
              onClick={resetCalculator}
              className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-gray-100 text-brand-secondary font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center text-sm sm:text-base"
            >
              <FaArrowDown className="w-3 h-3 sm:w-4 sm:h-4 mr-2 transform rotate-90" />
              {t('results.reset_calculator')}
            </button>
          </div>
        </div>

        {/* How We Calculate Section */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-secondary text-center mb-6 sm:mb-8">
            {t('how_it_works.title')}
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              {t('how_it_works.description')}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">{t('how_it_works.calculation_method')}</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>{t('how_it_works.daily_usage')}</strong></li>
                <li>• <strong>{t('how_it_works.weekly_usage')}</strong></li>
                <li>• <strong>{t('how_it_works.monthly_usage')}</strong></li>
                <li>• <strong>{t('how_it_works.recommendations')}</strong></li>
              </ul>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 sm:py-3 font-semibold text-brand-secondary text-sm sm:text-base">{t('how_it_works.activity')}</th>
                    <th className="text-right py-2 sm:py-3 font-semibold text-brand-secondary text-sm sm:text-base">{t('how_it_works.data_per_hour')}</th>
                    <th className="text-left py-2 sm:py-3 font-semibold text-brand-secondary text-sm sm:text-base">{t('how_it_works.typical_usage')}</th>
                  </tr>
                </thead>
                <tbody>
                  {activityCategories.map(category => (
                    <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 sm:py-3 text-brand-secondary">
                        <div className="flex items-center space-x-2">
                          {category.icon}
                          <span className="text-sm sm:text-base">{category.name}</span>
                        </div>
                      </td>
                      <td className="py-2 sm:py-3 text-right font-medium text-brand-accent text-sm sm:text-base">
                        {category.dataPerHour} {category.unit}
                      </td>
                      <td className="py-2 sm:py-3 text-gray-600 text-xs sm:text-sm">
                        {category.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs sm:text-sm text-yellow-800">
                <strong>{t('how_it_works.important_note')}</strong> {t('how_it_works.important_note_content')}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-secondary text-center mb-6 sm:mb-8">
            {t('faq.title')}
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {[
              {
                question: t('faq.international_travel.question'),
                answer: t('faq.international_travel.answer')
              },
              {
                question: t('faq.apps_most_data.question'),
                answer: t('faq.apps_most_data.answer')
              },
              {
                question: t('faq.reduce_data_usage.question'),
                answer: t('faq.reduce_data_usage.answer')
              },
              {
                question: t('faq.average_monthly.question'),
                answer: t('faq.average_monthly.answer')
              },
              {
                question: t('faq.how_long_1gb.question'),
                answer: t('faq.how_long_1gb.answer')
              },
              {
                question: t('faq.wifi_vs_mobile.question'),
                answer: t('faq.wifi_vs_mobile.answer')
              },
              {
                question: t('faq.week_long_trip.question'),
                answer: t('faq.week_long_trip.answer')
              },
              {
                question: t('faq.mb_vs_gb.question'),
                answer: t('faq.mb_vs_gb.answer')
              },
              {
                question: t('faq.calculator_accuracy.question'),
                answer: t('faq.calculator_accuracy.answer')
              },
              {
                question: t('faq.unlimited_for_travel.question'),
                answer: t('faq.unlimited_for_travel.answer')
              },
              {
                question: t('faq.video_call_data.question'),
                answer: t('faq.video_call_data.answer')
              },
              {
                question: t('faq.best_esim_plan.question'),
                answer: t('faq.best_esim_plan.answer')
              }
            ].map((faq, index) => {
              const isOpen = index === openFAQ; // Use state to control which is open
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <button
                    className="w-full p-4 sm:p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFAQ(isOpen ? -1 : index)} // Toggle open/close
                  >
                    <h3 className="font-semibold text-brand-secondary text-sm sm:text-base pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {isOpen ? (
                        <MdExpandLess className="w-4 h-4 sm:w-5 sm:h-5 text-brand-accent" />
                      ) : (
                        <MdExpandMore className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default DataUsageCalculator; 