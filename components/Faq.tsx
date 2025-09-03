
import React, { useState } from 'react';
import { FaqItem } from '../types';

interface FaqProps {
    faqs: FaqItem[];
}

const Faq: React.FC<FaqProps> = ({ faqs }) => {
    // Always start with the first FAQ open (index 0)
    const [openIndex, setOpenIndex] = useState<number>(0);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                        onClick={() => toggleFaq(index)}
                        className={`w-full flex justify-between items-center p-5 text-left font-semibold transition-colors duration-200 ${
                            openIndex === index 
                                ? 'text-gray-900 bg-gray-50 border-b border-gray-200' 
                                : 'text-gray-900 bg-white hover:bg-gray-50'
                        } focus:outline-none`}
                    >
                        <span>{faq.question}</span>
                        <svg
                            className={`w-5 h-5 transform transition-transform duration-300 ${
                                openIndex === index ? 'rotate-180 text-gray-900' : 'rotate-0 text-gray-500'
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className="p-5 pt-4 text-gray-600 leading-relaxed">
                            <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Faq;
