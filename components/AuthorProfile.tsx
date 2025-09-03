
import React from 'react';
import { Author } from '../types';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

interface AuthorProfileProps {
    author: Author;
    navigateTo?: (route: string) => void;
}

const AuthorProfile: React.FC<AuthorProfileProps> = ({ author, navigateTo }) => {
  const { t } = useTranslation('author');
  const isChinese = i18n.language === 'zh';
    return (
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                    <img 
                        src={author.avatarUrl} 
                        alt={t('name')} 
                        className="w-24 h-24 rounded-full object-cover"
                        loading="lazy"
                    />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                    <h3 className="text-blue-600 font-bold text-lg mb-2">{t('about_author')}</h3>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{t('name')}</h4>
                    <p className="text-gray-900 mb-4">{t('title')}</p>
                    <a 
                        href={isChinese ? "/zh/author/vasil-andreev" : "/author/vasil-andreev"}
                        className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center cursor-pointer"
                    >
                        {t('read_full_bio')} →
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AuthorProfile;
