
import React from 'react';
import { MdShoppingCart, MdQrCodeScanner, MdWifi } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const HowItWorks: React.FC = () => {
    const { t } = useTranslation('how_it_works');
    
    return (
        <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">{t('title')}</h2>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-center">
                <Step
                    icon={<MdShoppingCart className="w-12 h-12 text-blue-600" />}
                    title={t('steps.choose_plan.title')}
                    description={t('steps.choose_plan.description')}
                />
                <Step
                    icon={<MdQrCodeScanner className="w-12 h-12 text-blue-600" />}
                    title={t('steps.install_qr.title')}
                    description={t('steps.install_qr.description')}
                />
                <Step
                    icon={<MdWifi className="w-12 h-12 text-blue-600" />}
                    title={t('steps.activate.title')}
                    description={t('steps.activate.description')}
                />
            </div>
        </div>
    );
};

interface StepProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const Step: React.FC<StepProps> = ({ icon, title, description }) => (
    <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-24 h-24 bg-blue-100 text-brand-accent rounded-full mb-4">
            {icon}
        </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

export default HowItWorks;
