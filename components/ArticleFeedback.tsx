import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';

interface ArticleFeedbackProps {
  articleId: string;
  articleTitle: string;
}

const ArticleFeedback: React.FC<ArticleFeedbackProps> = ({ articleId, articleTitle }) => {
  const { t } = useTranslation(['help-center']);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'positive' | 'negative' | null>(null);

  const handleFeedback = async (isHelpful: boolean) => {
    const feedback = isHelpful ? 'positive' : 'negative';
    setFeedbackType(feedback);
    
    try {
      // TODO: Implement actual feedback submission to backend
      // This is a placeholder for the actual API call
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleId,
          articleTitle,
          feedback: feedback,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      });

      if (response.ok) {
        setFeedbackSubmitted(true);
        console.log('Feedback submitted successfully');
      } else {
        console.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Still show success to user even if backend fails
      setFeedbackSubmitted(true);
    }
  };

  if (feedbackSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 mb-2">
          <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          {feedbackType === 'positive' 
            ? t('feedback.thank_you_positive', 'Thank you for your feedback!') 
            : t('feedback.thank_you_negative', 'Thank you for your feedback!')}
        </h3>
        <p className="text-green-700">
          {feedbackType === 'positive' 
            ? t('feedback.positive_message', 'We\'re glad this article was helpful!') 
            : t('feedback.negative_message', 'We\'ll use your feedback to improve this article.')}
        </p>
        {feedbackType === 'negative' && (
          <div className="mt-4">
            <button
              onClick={() => {
                setFeedbackSubmitted(false);
                setFeedbackType(null);
              }}
              className="text-green-600 hover:text-green-800 underline text-sm"
            >
              {t('feedback.change_feedback', 'Change my feedback')}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {t('feedback.was_helpful', 'Was this article helpful?')}
        </h3>
        
                 <div className="flex justify-center space-x-4 mb-4">
                       <button
              onClick={() => handleFeedback(true)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors group ${
                feedbackType === 'positive' 
                  ? 'bg-green-50 border-2 border-green-500 text-green-700' 
                  : 'bg-white border-2 border-gray-300 hover:border-green-500 hover:bg-green-50'
              }`}
            >
              <MdThumbUp className={`w-5 h-5 ${
                feedbackType === 'positive' ? 'text-green-600' : 'text-gray-600 group-hover:text-green-600'
              }`} />
              <span className={`font-medium ${
                feedbackType === 'positive' ? 'text-green-700' : 'text-gray-700 group-hover:text-green-700'
              }`}>
                {t('feedback.yes', 'Yes')}
              </span>
            </button>
           
                       <button
              onClick={() => handleFeedback(false)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors group ${
                feedbackType === 'negative' 
                  ? 'bg-red-50 border-2 border-red-500 text-red-700' 
                  : 'bg-white border-2 border-gray-300 hover:border-red-500 hover:bg-red-50'
              }`}
            >
              <MdThumbDown className={`w-5 h-5 ${
                feedbackType === 'negative' ? 'text-red-600' : 'text-gray-600 group-hover:text-red-600'
              }`} />
              <span className={`font-medium ${
                feedbackType === 'negative' ? 'text-red-700' : 'text-gray-700 group-hover:text-red-700'
              }`}>
                {t('feedback.no', 'No')}
              </span>
            </button>
         </div>
        
        <p className="text-sm text-gray-600">
          {t('feedback.help_improve', 'Your feedback helps us improve our help articles. If you need additional assistance, please contact our support team.')}
        </p>
      </div>
    </div>
  );
};

export default ArticleFeedback;
