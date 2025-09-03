import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ChineseContactMethods: React.FC = () => {
  const { t } = useTranslation('common');
  const [showWeChatQR, setShowWeChatQR] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{t('chinese_contact.title')}</h3>
      
      <div className="space-y-4">
        {/* WeChat Contact */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 4.882-1.932 7.621-.5-.302-3.94-3.88-7.012-8.173-7.012zm-2.92 5.548c-.773 0-1.4-.671-1.4-1.5s.627-1.5 1.4-1.5 1.4.671 1.4 1.5-.627 1.5-1.4 1.5zm5.837 0c-.773 0-1.4-.671-1.4-1.5s.627-1.5 1.4-1.5 1.4.671 1.4 1.5-.627 1.5-1.4 1.5z"/>
              <path d="M24 14.318c0-3.996-3.5-7.238-7.821-7.238-4.32 0-7.821 3.242-7.821 7.238 0 3.996 3.501 7.238 7.821 7.238.98 0 1.92-.15 2.78-.42l2.54 1.49c.14.08.28.12.42.12.22 0 .4-.18.4-.4 0-.06-.02-.12-.04-.18l-.6-2.28c2.24-1.96 3.64-4.9 3.64-8.12zm-7.821-1.238c-.77 0-1.4.67-1.4 1.5s.63 1.5 1.4 1.5 1.4-.67 1.4-1.5-.63-1.5-1.4-1.5zm3.92 0c-.77 0-1.4.67-1.4 1.5s.63 1.5 1.4 1.5 1.4-.67 1.4-1.5-.63-1.5-1.4-1.5z"/>
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-800">{t('chinese_contact.wechat.title')}</p>
            <p className="text-sm text-gray-600">{t('chinese_contact.wechat.description')}</p>
            <button 
              onClick={() => setShowWeChatQR(!showWeChatQR)}
              className="text-blue-600 text-sm hover:text-blue-800 mt-1"
            >
              {showWeChatQR ? t('chinese_contact.wechat.hide_qr') : t('chinese_contact.wechat.show_qr')}
            </button>
          </div>
        </div>

        {/* WeChat QR Code */}
        {showWeChatQR && (
          <div className="ml-13 p-4 bg-gray-50 rounded-lg">
            <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">{t('chinese_contact.wechat.qr_placeholder')}</span>
                </div>
                <p className="text-xs text-gray-600">{t('chinese_contact.wechat.qr_description')}</p>
              </div>
            </div>
          </div>
        )}

        {/* QQ Contact */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.003 2c-2.265 0-6.29 1.364-6.29 7.325v1.195S3.55 13.954 3.55 17.474c0 .975.324 1.624.324 1.624s.975 1.195 2.925 1.195c.975 0 1.95-.975 1.95-.975s.975-.975 1.95-.975 1.95.975 1.95.975.975.975 1.95.975c1.95 0 2.925-1.195 2.925-1.195s.324-.649.324-1.624c0-3.52-2.163-7.954-2.163-7.954V9.325C19.293 3.364 15.268 2 12.003 2z"/>
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-800">{t('chinese_contact.qq.title')}</p>
            <p className="text-sm text-gray-600">{t('chinese_contact.qq.number')}</p>
            <p className="text-xs text-gray-500">{t('chinese_contact.qq.hours')}</p>
          </div>
        </div>

        {/* Chinese Phone Number */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-800">{t('chinese_contact.phone.title')}</p>
            <p className="text-sm text-gray-600">{t('chinese_contact.phone.number')}</p>
            <p className="text-xs text-gray-500">{t('chinese_contact.phone.description')}</p>
          </div>
        </div>

        {/* Email Contact */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-800">{t('chinese_contact.email.title')}</p>
            <p className="text-sm text-gray-600">{t('chinese_contact.email.address')}</p>
            <p className="text-xs text-gray-500">{t('chinese_contact.email.response')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChineseContactMethods; 