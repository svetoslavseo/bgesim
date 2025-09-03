import React from 'react';
import { useTranslation } from 'react-i18next';

interface RefundPolicyProps {
    navigateTo: (route: string) => void;
}

const RefundPolicy: React.FC<RefundPolicyProps> = ({ navigateTo }) => {
    const { t } = useTranslation('legal');
    const lastUpdatedDate = "December 2024";

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {t('refund.title')}
                    </h1>
                    <p className="text-gray-600">
                        {t('refund.last_updated')}: {lastUpdatedDate}
                    </p>
                </div>

                {/* Introduction */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                    <div className="text-gray-700 leading-relaxed space-y-4">
                        <p>
                            {t('refund.introduction.description')}
                        </p>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-blue-800">
                                <strong>{t('refund.introduction.important_note')}</strong>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* Refunds for Non-Activated Data Plans */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            {t('refund.non_activated.title')}
                        </h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>
                                {t('refund.non_activated.description')}
                            </p>
                        </div>
                    </div>

                    {/* Refunds for Minimally Used Data Plans or Activated Data Plans */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            {t('refund.minimally_used.title')}
                        </h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>
                                {t('refund.minimally_used.description')}
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>
                                    {t('refund.minimally_used.conditions.0')}
                                </li>
                                <li>
                                    {t('refund.minimally_used.conditions.1')}
                                </li>
                            </ul>
                            <p>
                                {t('refund.minimally_used.terms_reference')}
                            </p>
                        </div>
                    </div>

                    {/* How to Request a Refund */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            {t('refund.how_to_request.title')}
                        </h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>
                                {t('refund.how_to_request.description')}
                            </p>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <p className="text-green-800">
                                    <strong>{t('refund.how_to_request.contact_info')}</strong>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            {t('refund.additional_info.title')}
                        </h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>
                                {t('refund.additional_info.description')}
                            </p>
                            <p>
                                {t('refund.additional_info.support_note')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RefundPolicy;
