
import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  navigateTo?: (route: string) => void;
}

const Footer: React.FC<FooterProps> = ({ }) => {
    const { t, i18n } = useTranslation('footer');
    const { isBulgarian } = useLanguage();
    
    return (
        <footer className="bg-black text-white py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
                    {/* Logo and Description */}
                    <div className="md:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <img 
                              src="/esim-data/travelesim-logo.png" 
                              alt="Travel eSIM Global Logo" 
                              className="h-32 w-auto" 
                              width="224" 
                              height="128"
                              loading="lazy"
                            />
                        </div>
                        <p className="text-white text-sm leading-relaxed">
                            {t('description')}
                        </p>
                    </div>

                    {/* Regions */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">{t('regions')}</h3>
                        <ul className="space-y-2 text-sm text-white">
                            <li><a href={isBulgarian ? "/europe" : "/en/europe"} className="hover:text-gray-300 transition-colors">{isBulgarian ? t('regions_list.europe') : 'Europe'}</a></li>
                            <li><a href={isBulgarian ? "/asia" : "/en/asia"} className="hover:text-gray-300 transition-colors">{isBulgarian ? t('regions_list.asia') : 'Asia'}</a></li>
                            <li><a href={isBulgarian ? "/north-america" : "/en/north-america"} className="hover:text-gray-300 transition-colors">{isBulgarian ? t('regions_list.north_america') : 'North America'}</a></li>
                            <li><a href={isBulgarian ? "/south-america" : "/en/south-america"} className="hover:text-gray-300 transition-colors">{isBulgarian ? t('regions_list.south_america') : 'South America'}</a></li>
                            <li><a href={isBulgarian ? "/africa" : "/en/africa"} className="hover:text-gray-300 transition-colors">{isBulgarian ? t('regions_list.africa') : 'Africa'}</a></li>
                            <li><a href={isBulgarian ? "/oceania" : "/en/oceania"} className="hover:text-gray-300 transition-colors">{isBulgarian ? t('regions_list.oceania') : 'Oceania'}</a></li>
                        </ul>
                    </div>

                    {/* Popular Destinations */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">{t('popular_destinations')}</h3>
                        <ul className="space-y-2 text-sm text-white">
                            <li><a href={isBulgarian ? "/north-america/united-states" : "/en/north-america/united-states"} className="hover:text-gray-300 transition-colors">{isBulgarian ? t('popular_destinations_list.united_states') : 'United States'}</a></li>
                            <li><a href={isBulgarian ? "/europe/united-kingdom" : "/en/europe/united-kingdom"} className="hover:text-gray-300 transition-colors">{isBulgarian ? t('popular_destinations_list.united_kingdom') : 'United Kingdom'}</a></li>
                            <li><a href={isBulgarian ? "/europe/turkey" : "/en/europe/turkey"} className="hover:text-gray-300 transition-colors">{isBulgarian ? t('popular_destinations_list.turkey') : 'Turkey'}</a></li>
                            <li><a href={isBulgarian ? "/asia/japan" : "/en/asia/japan"} className="hover:text-gray-300 transition-colors">{isBulgarian ? t('popular_destinations_list.japan') : 'Japan'}</a></li>
                            <li><a href={isBulgarian ? "/europe/france" : "/en/europe/france"} className="hover:text-gray-300 transition-colors">{isBulgarian ? t('popular_destinations_list.france') : 'France'}</a></li>
                            <li><a href={isBulgarian ? "/asia/china" : "/en/asia/china"} className="hover:text-gray-300 transition-colors">{isBulgarian ? t('popular_destinations_list.china') : 'China'}</a></li>
                            <li><a href={isBulgarian ? "/europe/italy" : "/en/europe/italy"} className="hover:text-gray-300 transition-colors">{isBulgarian ? t('popular_destinations_list.italy') : 'Italy'}</a></li>
                            <li><a href={isBulgarian ? "/europe/spain" : "/en/europe/spain"} className="hover:text-gray-300 transition-colors">{isBulgarian ? t('popular_destinations_list.spain') : 'Spain'}</a></li>
                            <li><a href={isBulgarian ? "/asia/united-arab-emirates" : "/en/asia/united-arab-emirates"} className="hover:text-gray-300 transition-colors">{isBulgarian ? t('popular_destinations_list.united_arab_emirates') : 'United Arab Emirates'}</a></li>
                            <li><a href={isBulgarian ? "/north-america/canada" : "/en/north-america/canada"} className="hover:text-gray-300 transition-colors">{isBulgarian ? t('popular_destinations_list.canada') : 'Canada'}</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">{t('company.title')}</h3>
                        <ul className="space-y-2 text-sm text-white">
                            <li><a href={isBulgarian ? "/about-us" : "/en/about-us"} className="hover:text-gray-300 transition-colors">{t('company.about')}</a></li>
                            <li><a href={isBulgarian ? "/articles" : "/en/articles"} className="hover:text-gray-300 transition-colors">{isBulgarian ? t('company_links.articles') : 'Articles'}</a></li>
                            <li><a href="/regions" className="hover:text-gray-300 transition-colors">{isBulgarian ? t('company_links.global_esim') : 'Global eSIM'}</a></li>
                            <li><a href={isBulgarian ? "/refund-policy" : "/en/refund-policy"} className="hover:text-gray-300 transition-colors">{isBulgarian ? t('company_links.refund_policy') : 'Refund Policy'}</a></li>
                            <li><a href="https://travelesim.dk/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Travel eSIM DK</a></li>
                            <li><a href="https://travelesim.bg/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Travel eSIM BG</a></li>
                            <li><a href="https://travelesim.ro/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Travel eSIM RO</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">{t('support.title')}</h3>
                        <ul className="space-y-2 text-sm text-white">
                            <li><a href={isBulgarian ? "/help-center" : "/en/help-center"} className="hover:text-gray-300 transition-colors">{t('support.help_center')}</a></li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mb-8"></div>

                {/* Legal Links */}
                <div className="flex justify-center mb-6">
                    <div className="flex items-center space-x-6 text-sm">
                        <a href={isBulgarian ? "/privacy-policy" : "/en/privacy-policy"} className="text-gray-300 hover:text-white transition-colors" rel="nofollow">
                            {t('legal.privacy')}
                        </a>
                        <span className="text-gray-500">|</span>
                        <a href={isBulgarian ? "/terms-and-conditions" : "/en/terms-and-conditions"} className="text-gray-300 hover:text-white transition-colors" rel="nofollow">
                            {t('legal.terms')}
                        </a>
                    </div>
                </div>

                {/* Language Selector */}
                <div className="flex justify-center mb-6">
                    <LanguageSwitcher />
                </div>

                {/* Payment Methods */}
                <div className="flex justify-center mb-6">
                    <div className="flex items-center space-x-4">
                        {/* Apple Pay */}
                        <img src="/esim-data/logos/apple-pay.svg" alt="Apple Pay" className="h-7 w-auto" width="56" height="28" loading="lazy" />
                        {/* Google Pay */}
                        <img src="/esim-data/logos/google-pay.svg" alt="Google Pay" className="h-7 w-auto" width="56" height="28" loading="lazy" />
                        {/* VISA */}
                        <img src="/esim-data/logos/visa.svg" alt="Visa" className="h-7 w-auto" width="56" height="28" loading="lazy" />
                        {/* Mastercard */}
                        <img src="/esim-data/logos/mastercard.svg" alt="Mastercard" className="h-7 w-auto" width="56" height="28" loading="lazy" />
                        {/* American Express */}
                        <img src="/esim-data/logos/amex.svg" alt="American Express" className="h-7 w-auto" width="56" height="28" loading="lazy" />
                        {/* JCB */}
                        <img src="/esim-data/logos/jcb.svg" alt="JCB" className="h-7 w-auto" width="56" height="28" loading="lazy" />
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="text-center mb-6">
                    <p className="text-xs text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {t('affiliate_disclaimer')}
                    </p>
                </div>

                {/* Copyright */}
                <div className="text-center">
                    <p className="text-xs text-gray-300">
                        {t('copyright')}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;