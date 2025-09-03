import React, { useEffect } from 'react';
import { useChineseContext } from '../utils/chineseUtils';

// Extend Window interface for Chinese analytics
declare global {
  interface Window {
    _hmt?: any;
    _ta?: any;
  }
}

const ChineseAnalytics: React.FC = () => {
  const { isChinese } = useChineseContext();

  useEffect(() => {
    if (isChinese) {
      // Initialize Chinese analytics (Baidu Analytics, etc.)
      initializeChineseAnalytics();
    }
  }, [isChinese]);

  const initializeChineseAnalytics = () => {
    // Baidu Analytics (百度统计)
    if (typeof window !== 'undefined' && !window._hmt) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://hm.baidu.com/hm.js?YOUR_BAIDU_ANALYTICS_ID';
      document.head.appendChild(script);
    }

    // Tencent Analytics (腾讯统计)
    if (typeof window !== 'undefined' && !window._ta) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://tajs.qq.com/stats?sId=YOUR_TENCENT_ANALYTICS_ID';
      document.head.appendChild(script);
    }
  };

  // This component doesn't render anything visible
  return null;
};

export default ChineseAnalytics; 