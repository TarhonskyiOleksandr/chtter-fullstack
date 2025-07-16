import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '../lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export const Modal = ({ isOpen, onClose, title, children, className }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal modal-open" onClick={onClose}>
      <div
        className={cn(
          `modal-box w-full max-w-lg bg-base-100 shadow-xl transition-all duration-300 ease-in-out 
          sm:rounded-2xl sm:max-h-[90vh] overflow-auto`,
          className,
          "sm:w-[90%] sm:max-w-xl",
          "mobile:!w-full mobile:!h-full mobile:rounded-none"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          {title && <h3 className="font-bold text-lg">{title}</h3>}
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.body
  );
};
