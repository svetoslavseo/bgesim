import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useChineseContext } from '../utils/chineseUtils';

const ChineseCheckoutFeatures: React.FC = () => {
  const { t } = useTranslation('checkout');
  const { isChinese } = useChineseContext();
  const [showQRCode, setShowQRCode] = useState<string | null>(null);

  if (!isChinese) {
    return null;
  }

  const handleQRCodeClick = (paymentType: string) => {
    setShowQRCode(showQRCode === paymentType ? null : paymentType);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        {t('chinese_features.chinese_support')}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Chinese Payment Methods */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">{t('payment.methods.chinese')}</h4>
          
          <div className="space-y-2">
            <button
              onClick={() => handleQRCodeClick('wechat')}
              className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-green-500 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 4.882-1.932 7.621-.5-.302-3.94-3.88-7.012-8.173-7.012zm-2.92 5.548c-.773 0-1.4-.671-1.4-1.5s.627-1.5 1.4-1.5 1.4.671 1.4 1.5-.627 1.5-1.4 1.5zm5.837 0c-.773 0-1.4-.671-1.4-1.5s.627-1.5 1.4-1.5 1.4.671 1.4 1.5-.627 1.5-1.4 1.5z"/>
                    <path d="M24 14.318c0-3.996-3.5-7.238-7.821-7.238-4.32 0-7.821 3.242-7.821 7.238 0 3.996 3.501 7.238 7.821 7.238.98 0 1.92-.15 2.78-.42l2.54 1.49c.14.08.28.12.42.12.22 0 .4-.18.4-.4 0-.06-.02-.12-.04-.18l-.6-2.28c2.24-1.96 3.64-4.9 3.64-8.12zm-7.821-1.238c-.77 0-1.4.67-1.4 1.5s.63 1.5 1.4 1.5 1.4-.67 1.4-1.5-.63-1.5-1.4-1.5zm3.92 0c-.77 0-1.4.67-1.4 1.5s.63 1.5 1.4 1.5 1.4-.67 1.4-1.5-.63-1.5-1.4-1.5z"/>
                  </svg>
                </div>
                <span className="text-gray-800">{t('payment.methods.wechat_pay')}</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <button
              onClick={() => handleQRCodeClick('alipay')}
              className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.319 4.369a19.791 19.791 0 00-4.885-1.515a.704.704 0 00-.609.207L15.099 4.5a.706.706 0 00-.207.609c.019.342.036.684.036 1.036 0 2.893-.995 5.601-2.687 7.712a19.714 19.714 0 01-7.712 2.687c-.352 0-.694-.017-1.036-.036a.704.704 0 00-.609.207L4.5 15.099a.706.706 0 00-.207.609c.342.019.684.036 1.036.036 2.893 0 5.601-.995 7.712-2.687a19.714 19.714 0 012.687-7.712c0-.352-.017-.694-.036-1.036a.704.704 0 00-.207-.609L15.099 4.5a.706.706 0 00-.609-.207c-.342.019-.684.036-1.036.036z"/>
                  </svg>
                </div>
                <span className="text-gray-800">{t('payment.methods.alipay')}</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <button
              onClick={() => handleQRCodeClick('unionpay')}
              className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-red-500 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                  </svg>
                </div>
                <span className="text-gray-800">{t('payment.methods.unionpay')}</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chinese Customer Support */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">{t('chinese_features.chinese_support')}</h4>
          
          <div className="space-y-2">
            <div className="p-3 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{t('chinese_features.chinese_phone')}</p>
                  <p className="text-sm text-gray-600">400-123-4567</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{t('chinese_features.chinese_hours')}</p>
                  <p className="text-sm text-gray-600">周一至周五</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Display */}
      {showQRCode && (
        <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
          <div className="text-center">
            <h5 className="font-medium text-gray-800 mb-3">
              {showQRCode === 'wechat' && t('chinese_features.wechat_qr')}
              {showQRCode === 'alipay' && t('chinese_features.alipay_qr')}
              {showQRCode === 'unionpay' && t('chinese_features.unionpay_qr')}
            </h5>
            <div className="w-48 h-48 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center mx-auto">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">
                    {showQRCode === 'wechat' && '微信二维码'}
                    {showQRCode === 'alipay' && '支付宝二维码'}
                    {showQRCode === 'unionpay' && '银联二维码'}
                  </span>
                </div>
                <p className="text-xs text-gray-600">扫描二维码完成支付</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChineseCheckoutFeatures; 