import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalButton {
  label: string;
  onClick: () => void;
  className?: string; // Optional for custom styling
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  footerButtons?: ModalButton[]; // Accepts an array of buttons
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  footerButtons = [], // Default to an empty array if no buttons provided
}) => {
  const modalSize = {
    sm: "w-[350px]",
    md: "w-[500px]",
    lg: "w-[800px]",
  }[size];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center backdrop-blur-sm">
          <motion.div
            className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className={`relative bg-white rounded-lg shadow-lg w-[90%] ${modalSize} p-6 mt-10`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-4">{children}</div>

            {/* Modal Footer */}
            <div className="mt-4 flex justify-end space-x-3">
              {footerButtons.map((btn, index) => (
                <button
                  key={index}
                  onClick={btn.onClick}
                  className={`px-4 py-2 rounded-md ${btn.className || "bg-gray-200 hover:bg-gray-300"}`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
