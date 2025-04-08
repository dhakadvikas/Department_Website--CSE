import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const StudentFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How do I register for courses?",
            answer: "You can register for courses through the student portal. Navigate to 'Course Registration' section, select your desired courses, and click on 'Register'. Make sure to check the academic calendar for registration deadlines."
        },
        {
            question: "What are the payment options for tuition fees?",
            answer: "We offer multiple payment options including credit/debit cards, bank transfers, and installment plans. Visit the Finance section of the student portal for detailed information and to make payments."
        },
        {
            question: "How can I access my academic records?",
            answer: "Your academic records, including transcripts and grades, are available in the 'Academic Records' section of the student portal. For official transcripts, you need to submit a request through the portal."
        },
        {
            question: "What resources are available for academic support?",
            answer: "We offer tutoring services, study groups, academic advisors, and a learning resource center. Check the 'Academic Support' section of our website for schedules and booking information."
        },
        {
            question: "How do I apply for scholarships?",
            answer: "Scholarship applications can be submitted through the 'Financial Aid' section of the student portal. Make sure to review eligibility criteria and deadlines for each scholarship opportunity."
        },
        {
            question: "What extracurricular activities are available?",
            answer: "We have various clubs, sports teams, student organizations, and volunteer opportunities. Visit the 'Student Life' section on our website to explore all options and how to join."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-3">Frequently Asked Questions</h1>
                <p className="text-gray-600">Find answers to common questions about student life and academics</p>
            </div>
            
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div 
                        className={`border rounded-lg overflow-hidden ${activeIndex === index ? 'border-blue-500 shadow-md' : 'border-gray-200'}`} 
                        key={index}
                    >
                        <div 
                            className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                            onClick={() => toggleFAQ(index)}
                        >
                            <h3 className="font-medium text-gray-800">{faq.question}</h3>
                            <span className="text-blue-500">
                                {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                            </span>
                        </div>
                        <div className={`px-4 overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-96 pb-4' : 'max-h-0'}`}>
                            <p className="text-gray-600">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-12 text-center p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
                <p className="mb-4">Contact our student support team at <a href="mailto:satish.soni127@gmail.com" className="text-blue-500 hover:underline">support@example.edu</a></p>
                <NavLink to="/contact" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors">
                    Contact Us
                </NavLink> 
            </div>
        </div>
    );
};

export default StudentFAQ;