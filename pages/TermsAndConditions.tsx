import React from 'react';
import { useTranslation } from 'react-i18next';

interface TermsAndConditionsProps {
    navigateTo: (route: string) => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ navigateTo }) => {
    const { t } = useTranslation('legal');
    const lastUpdatedDate = t('terms.last_updated_date');

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {t('terms.title')}
                    </h1>
                    <p className="text-gray-600">
                        {t('terms.last_updated')}: {lastUpdatedDate}
                    </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* Introduction */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.introduction.title')}</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>
                                {t('terms.introduction.welcome')}
                            </p>
                            <p>
                                {t('terms.introduction.services')}
                            </p>
                        </div>
                    </div>

                    {/* Affiliate Disclaimer */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.affiliate_disclaimer.title')}</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>
                                {t('terms.affiliate_disclaimer.description')}
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>{t('terms.affiliate_disclaimer.points.0')}</li>
                                <li>{t('terms.affiliate_disclaimer.points.1')}</li>
                                <li>{t('terms.affiliate_disclaimer.points.2')}</li>
                            </ul>
                        </div>
                    </div>

                    {/* Who Provides the Service */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.service_provider.title')}</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>
                                {t('terms.service_provider.description')}
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-semibold">{t('terms.service_provider.saily_info.name')}</p>
                                <p>{t('terms.service_provider.saily_info.address')}</p>
                                <p>{t('terms.service_provider.saily_info.registration')}</p>
                            </div>
                            <p>
                                {t('terms.service_provider.partner_info')}
                            </p>
                            <p>
                                {t('terms.service_provider.referral')}
                            </p>
                        </div>
                    </div>

                    {/* Your Responsibilities */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.responsibilities.title')}</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>{t('terms.responsibilities.description')}</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>{t('terms.responsibilities.points.0')}</li>
                                <li>{t('terms.responsibilities.points.1')}</li>
                                <li>{t('terms.responsibilities.points.2')}</li>
                            </ul>
                        </div>
                    </div>

                    {/* No Liability for Service Issues */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.no_liability.title')}</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>{t('terms.no_liability.description')}</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>{t('terms.no_liability.points.0')}</li>
                                <li>{t('terms.no_liability.points.1')}</li>
                                <li>{t('terms.no_liability.points.2')}</li>
                                <li>{t('terms.no_liability.points.3')}</li>
                                <li>{t('terms.no_liability.points.4')}</li>
                            </ul>
                            <p>
                                {t('terms.no_liability.support')}
                            </p>
                        </div>
                    </div>

                    {/* Payments and Refunds */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.payments_refunds.title')}</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>
                                {t('terms.payments_refunds.description')}
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>{t('terms.payments_refunds.points.0')}</li>
                                <li>{t('terms.payments_refunds.points.1')}</li>
                                <li>{t('terms.payments_refunds.points.2')}</li>
                            </ul>
                            <p>
                                {t('terms.payments_refunds.support_note')}
                            </p>
                            <p>
                                {t('terms.payments_refunds.disclaimer')}
                            </p>
                        </div>
                    </div>

                    {/* Intellectual Property */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.intellectual_property.title')}</h2>
                        <div className="text-gray-700 leading-relaxed">
                            <p>
                                {t('terms.intellectual_property.description')}
                            </p>
                        </div>
                    </div>

                    {/* Governing Law */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.governing_law.title')}</h2>
                        <div className="text-gray-700 leading-relaxed">
                            <p>
                                {t('terms.governing_law.description')}
                            </p>
                        </div>
                    </div>

                    {/* Changes to These Terms */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.changes_terms.title')}</h2>
                        <div className="text-gray-700 leading-relaxed">
                            <p>
                                {t('terms.changes_terms.description')}
                            </p>
                        </div>
                    </div>

                    {/* Contact Us */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.contact_us.title')}</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>{t('terms.contact_us.travel_esimple_note')}</p>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="flex items-center mb-2">
                                    <span className="mr-2">📧</span>
                                    <a href={`mailto:${t('terms.contact_us.travel_esimple.email')}`} className="text-blue-600 hover:underline">
                                        {t('terms.contact_us.travel_esimple.email')}
                                    </a>
                                </p>
                                <p className="flex items-center">
                                    <span className="mr-2">🌍</span>
                                    <a href={t('terms.contact_us.travel_esimple.website')} className="text-blue-600 hover:underline">
                                        {t('terms.contact_us.travel_esimple.website')}
                                    </a>
                                </p>
                            </div>
                            <p>{t('terms.contact_us.saily_note')}</p>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <p className="flex items-center mb-2">
                                    <span className="mr-2">📧</span>
                                    <a href={`mailto:${t('terms.contact_us.saily.email')}`} className="text-green-600 hover:underline">
                                        {t('terms.contact_us.saily.email')}
                                    </a>
                                </p>
                                <p className="flex items-center">
                                    <span className="mr-2">🌍</span>
                                    <a href={t('terms.contact_us.saily.website')} className="text-green-600 hover:underline">
                                        {t('terms.contact_us.saily.website')}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions; 