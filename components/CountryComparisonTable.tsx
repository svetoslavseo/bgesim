import React from 'react';
import { useTranslation } from 'react-i18next';

interface CountryComparisonTableProps {
    countryName: string;
}

const CountryComparisonTable: React.FC<CountryComparisonTableProps> = ({ countryName }) => {
  const { t } = useTranslation('comparison');
    const comparisonData = [
        {
            feature: t('features.activation'),
            eSim: t('esim.activation'),
            roaming: t('roaming.activation'),
            localSim: t('local_sim.activation')
        },
        {
            feature: t('features.cost'),
            eSim: t('esim.cost'),
            roaming: t('roaming.cost'),
            localSim: t('local_sim.cost')
        },
        {
            feature: t('features.data_speeds'),
            eSim: t('esim.data_speeds'),
            roaming: t('roaming.data_speeds'),
            localSim: t('local_sim.data_speeds')
        },
        {
            feature: t('features.phone_number'),
            eSim: t('esim.phone_number'),
            roaming: t('roaming.phone_number'),
            localSim: t('local_sim.phone_number', { country: countryName })
        },
        {
            feature: t('features.setup'),
            eSim: t('esim.setup'),
            roaming: t('roaming.setup'),
            localSim: t('local_sim.setup')
        },
        {
            feature: t('features.best_for'),
            eSim: t('esim.best_for'),
            roaming: t('roaming.best_for'),
            localSim: t('local_sim.best_for')
        }
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4 px-4">
                {t('title', { country: countryName })}
            </h2>
            <p className="text-center text-gray-600 mb-8">
                {t('description', { country: countryName })}
            </p>
            
            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="p-4 text-left font-semibold text-gray-700 border-b border-gray-200">
                                {t('table.feature')}
                            </th>
                            <th className="p-4 text-center font-semibold text-blue-600 border-b border-gray-200">
                                {t('table.esim_for', { country: countryName })}
                            </th>
                            <th className="p-4 text-center font-semibold text-gray-600 border-b border-gray-200">
                                {t('table.international_roaming')}
                            </th>
                            <th className="p-4 text-center font-semibold text-gray-600 border-b border-gray-200">
                                {t('table.local_sim', { country: countryName })}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {comparisonData.map((row, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-4 font-medium text-gray-900">
                                    {row.feature}
                                </td>
                                <td className="p-4 text-center text-gray-800 bg-blue-50">
                                    {row.eSim}
                                </td>
                                <td className="p-4 text-center text-gray-700">
                                    {row.roaming}
                                </td>
                                <td className="p-4 text-center text-gray-700">
                                    {row.localSim}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CountryComparisonTable; 