import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  onClose,
  children,
}) => {
  if (!visible) return null;

  return (
    <>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg p-8 shadow-lg w-2/4 h-auto flex flex-col justify-between">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 text-2xl"
            >
              <FontAwesomeIcon icon={faX} className="w-6 h-6"/>
            </button>

            <h2 className="text-3xl font-bold mb-4">{title}</h2>

            {children}
          </div>
        </div>
        
    </>
  );
};
