import React, { useCallback, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiX } from 'react-icons/fi';

// Extracted notice item component for better code organization
const NoticeItem = memo(({ notice }) => (
  <div className="bg-indigo-50 rounded-xl p-5 border-l-4 border-indigo-500">
    <h3 className="md:text-xl  font-bold text-indigo-900 mb-2">{notice.title}</h3>
    <p className="text-gray-700 lg:block hidden mb-3">{notice.details || "Please check the attached document for details."}</p>
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{notice.date}</span>
      {notice.file && (
        <a 
          href={notice.file}
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
          aria-label={`View document for ${notice.title}`}
        >
          <FiDownload className="md:mr-2 " />
          <span className="hidden md:inline-block">
            View Document
          </span>
          
        </a>
      )}
    </div>
  </div>
));

// Loading component
const LoadingState = () => (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600" aria-label="Loading notices"></div>
  </div>
);

// Error component
const ErrorState = ({ message }) => (
  <div className="text-center text-red-500 p-6">
    <p className="text-xl font-medium">Unable to load notices</p>
    <p className="mt-2">{message}</p>
  </div>
);

// Empty state component
const EmptyState = () => (
  <div className="text-center text-gray-500 p-6">
    <p className="text-xl">No notices available at this time</p>
  </div>
);

const NoticeModal = ({ isOpen, onClose, notices = [], loading, error }) => {
  // Handle ESC key press to close modal
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  // Handle outside click
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  // Add event listeners when modal is open
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'auto';
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="notice-modal-title"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 id="notice-modal-title" className="text-3xl font-bold text-indigo-900">Important Notice</h2>
            <p className="text-gray-500">Latest updates from the department</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close notices"
          >
            <FiX className="text-2xl text-gray-600" />
          </button>
        </div>
        
        <div className="max-h-[70vh] overflow-y-auto">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} />
          ) : notices.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="space-y-6">
                {notices.map((notice) => (
                  <NoticeItem key={notice.id} notice={notice} />
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button 
                  onClick={onClose}
                  className="w-full py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors"
                >
                  Close All Notices
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default memo(NoticeModal);