import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

interface AboutUsProps {
    navigateTo: (route: string) => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ navigateTo }) => {
    const { t } = useTranslation('about');
    const isBulgarian = i18n.language === 'bg';
    
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        {t('hero.title')} <span className="text-blue-600">{t('hero.highlight')}</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t('hero.subtitle')}
                    </p>
                </div>

                {/* Saily Partnership Section */}
                <div className="bg-black rounded-2xl p-12 mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            {t('saily.title')}
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            {t('saily.subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {/* Built for Travelers */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{t('saily.built_for_travelers.title')}</h3>
                            <p className="text-gray-300 leading-relaxed">
                                {t('saily.built_for_travelers.description')}
                            </p>
                        </div>

                        {/* Backed by the Best */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{t('saily.backed_by_best.title')}</h3>
                            <p className="text-gray-300 leading-relaxed">
                                {t('saily.backed_by_best.description')}
                            </p>
                        </div>
                    </div>

                    <div className="text-center">
                        <button 
                            onClick={() => window.open('https://saily.com/', '_blank')}
                            className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors mb-6"
                        >
                            {t('saily.visit_website')}
                        </button>
                        <img src="/esim-data/logos/saily-logo-dark-mode.svg" alt="Saily" className="h-12 w-auto mx-auto" />
                    </div>
                </div>

                {/* Mission and Vision Section */}
                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    {/* Our Mission */}
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('mission.title')}</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {t('mission.description')}
                        </p>
                    </div>

                    {/* Our Vision */}
                    <div className="text-center">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('vision.title')}</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {t('vision.description')}
                        </p>
                    </div>
                </div>

                {/* Why Stick With Us Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-12">{t('why_stick_with_us.title')}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Global Coverage */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('why_stick_with_us.global_coverage.title')}</h3>
                            <p className="text-gray-600">
                                {t('why_stick_with_us.global_coverage.description')}
                            </p>
                        </div>

                        {/* Simple & Instant */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('why_stick_with_us.simple_instant.title')}</h3>
                            <p className="text-gray-600">
                                {t('why_stick_with_us.simple_instant.description')}
                            </p>
                        </div>

                        {/* Fair Prices */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('why_stick_with_us.fair_prices.title')}</h3>
                            <p className="text-gray-600">
                                {t('why_stick_with_us.fair_prices.description')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Call to Action Section */}
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('cta.title')}</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        {t('cta.subtitle')}
                    </p>
                    <a 
                        href={isBulgarian ? '/regions' : '/en/regions'}
                        className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg inline-block"
                    >
                        {t('cta.button')} →
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AboutUs; 