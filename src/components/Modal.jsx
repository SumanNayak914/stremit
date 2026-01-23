import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({
  isOpen,
  onClose,
  title,
  icon: Icon,
  headerColor = 'bg-purple-600',
  children,
  footer,
  maxWidth = 'max-w-[700px]',
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`bg-white rounded-2xl w-full ${maxWidth} max-h-[90vh] overflow-hidden shadow-2xl`}
          >
            {/* Modal Header */}
            <div className={`${headerColor} px-6 py-4 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                {Icon && (
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Icon size={24} className="text-white" />
                  </div>
                )}
                <h2 className="text-xl font-bold text-white">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">{children}</div>

            {/* Modal Footer */}
            {footer && (
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
