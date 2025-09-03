import React from 'react';
import { useTranslation } from 'react-i18next';

interface PrivacyPolicyProps {
    navigateTo: (route: string) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ navigateTo }) => {
    const { t } = useTranslation('legal');
    const lastUpdatedDate = t('privacy.last_updated_date');

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {t('privacy.title')}
                    </h1>
                    <p className="text-gray-600">
                        {t('privacy.last_updated')}: {lastUpdatedDate}
                    </p>
                </div>

                {/* Introduction */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                    <div className="text-gray-700 leading-relaxed space-y-4">
                        <p>
                            {t('privacy.introduction.welcome')}
                        </p>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-blue-800">
                                <strong>{t('privacy.introduction.note_label')}:</strong> {t('privacy.introduction.note_content')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* Who We Are */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.who_we_are.title')}</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>
                                {t('privacy.who_we_are.description')}
                            </p>
                            <p>
                                {t('privacy.who_we_are.saily_info')}
                            </p>
                        </div>
                    </div>

                    {/* What Data We Collect */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.data_collection.title')}</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>{t('privacy.data_collection.description')}</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><strong>{t('privacy.data_collection.points.contact')}</strong></li>
                                <li><strong>{t('privacy.data_collection.points.usage')}</strong></li>
                                <li><strong>{t('privacy.data_collection.points.transaction')}</strong></li>
                                <li><strong>{t('privacy.data_collection.points.device')}</strong></li>
                                <li><strong>{t('privacy.data_collection.points.marketing')}</strong></li>
                            </ul>
                            <p>
                                {t('privacy.data_collection.saily_note')}
                            </p>
                        </div>
                    </div>

                    {/* How Your Data is Used */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.data_usage.title')}</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>{t('privacy.data_usage.description')}</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>{t('privacy.data_usage.points.0')}</li>
                                <li>{t('privacy.data_usage.points.1')}</li>
                                <li>{t('privacy.data_usage.points.2')}</li>
                                <li>{t('privacy.data_usage.points.3')}</li>
                                <li>{t('privacy.data_usage.points.4')}</li>
                            </ul>
                        </div>
                    </div>

                    {/* Who We Share Data With */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.data_sharing.title')}</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>{t('privacy.data_sharing.description')}</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><strong>{t('privacy.data_sharing.points.saily')}</strong></li>
                                <li><strong>{t('privacy.data_sharing.points.1global')}</strong></li>
                                <li><strong>{t('privacy.data_sharing.points.third_party')}</strong></li>
                                <li><strong>{t('privacy.data_sharing.points.law_enforcement')}</strong></li>
                            </ul>
                            <p>
                                {t('privacy.data_sharing.note')}
                            </p>
                        </div>
                    </div>

                    {/* Your Rights */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.your_rights.title')}</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>{t('privacy.your_rights.description')}</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>{t('privacy.your_rights.points.0')}</li>
                                <li>{t('privacy.your_rights.points.1')}</li>
                                <li>{t('privacy.your_rights.points.2')}</li>
                                <li>{t('privacy.your_rights.points.3')}</li>
                                <li>{t('privacy.your_rights.points.4')}</li>
                            </ul>
                            <p>
                                {t('privacy.your_rights.contact_info')}
                            </p>
                        </div>
                    </div>

                    {/* Data Security */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.data_security.title')}</h2>
                        <div className="text-gray-700 leading-relaxed">
                            <p>
                                {t('privacy.data_security.description')}
                            </p>
                        </div>
                    </div>

                    {/* Data Retention */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.data_retention.title')}</h2>
                        <div className="text-gray-700 leading-relaxed">
                            <p>
                                {t('privacy.data_retention.description')}
                            </p>
                        </div>
                    </div>

                    {/* Cookies */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.cookies.title')}</h2>
                        <div className="text-gray-700 leading-relaxed">
                            <p>
                                {t('privacy.cookies.description')}
                            </p>
                        </div>
                    </div>

                    {/* Children's Data */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.children_data.title')}</h2>
                        <div className="text-gray-700 leading-relaxed">
                            <p>
                                {t('privacy.children_data.description')}
                            </p>
                        </div>
                    </div>

                    {/* Changes to This Policy */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.changes_policy.title')}</h2>
                        <div className="text-gray-700 leading-relaxed">
                            <p>
                                {t('privacy.changes_policy.description')}
                            </p>
                        </div>
                    </div>

                    {/* Contact Us */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.contact_us.title')}</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>{t('privacy.contact_us.description')}</p>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="flex items-center mb-2">
                                    <span className="mr-2">📧</span>
                                    <a href={`mailto:${t('privacy.contact_us.travel_esimple.email')}`} className="text-blue-600 hover:underline">
                                        {t('privacy.contact_us.travel_esimple.email')}
                                    </a>
                                </p>
                                <p className="flex items-center">
                                    <span className="mr-2">🌐</span>
                                    <a href={t('privacy.contact_us.travel_esimple.website')} className="text-blue-600 hover:underline">
                                        {t('privacy.contact_us.travel_esimple.website')}
                                    </a>
                                </p>
                            </div>
                            <p>{t('privacy.contact_us.saily_note')}</p>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <p className="flex items-center">
                                    <span className="mr-2">📧</span>
                                    <a href={`mailto:${t('privacy.contact_us.saily_email')}`} className="text-green-600 hover:underline">
                                        {t('privacy.contact_us.saily_email')}
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

export default PrivacyPolicy; 