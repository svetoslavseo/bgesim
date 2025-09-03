import { useTranslation } from 'react-i18next';

// Chinese currency formatting
export const formatChineseCurrency = (amount: number, currency: string = 'USD'): string => {
  if (currency === 'CNY' || currency === 'RMB') {
    return `¥${amount.toFixed(2)}`;
  }
  return `$${amount.toFixed(2)}`;
};

// Chinese date formatting
export const formatChineseDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
};

// Chinese number formatting
export const formatChineseNumber = (num: number): string => {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}万`;
  }
  return num.toString();
};

// Chinese phone number formatting
export const formatChinesePhone = (phone: string): string => {
  // Format: +86 138 1234 5678
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('86')) {
    return `+86 ${cleaned.slice(2, 5)} ${cleaned.slice(5, 9)} ${cleaned.slice(9)}`;
  }
  return phone;
};

// Chinese address formatting
export const formatChineseAddress = (address: string): string => {
  // Chinese addresses typically go from largest to smallest: Country, Province, City, District, Street
  return address;
};

// Get Chinese language context
export const useChineseContext = () => {
  const { i18n } = useTranslation();
  return {
    isChinese: i18n.language === 'zh',
    currentLanguage: i18n.language,
  };
}; 