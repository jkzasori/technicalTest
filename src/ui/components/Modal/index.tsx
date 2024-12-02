import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import usePortal from '@/helpers/hooks/usePortal';

/**
 * Props for the Modal component.
 */
type ModalProps = {
    /**
     * Controls whether the modal is visible
     */
    isOpen  : boolean;
    
    /**
     * The title displayed in the modal header
     */
    title   : string | React.ReactNode;
    
    /**
     * 
     * Function that is called to close the modal
     */
    onClose : () => void;

    /**
     * The content inside the modal
     */
    children: React.ReactNode;

    width?   : string | number;

    maxWidth?: string | number;
};

/**
 * Modal component that renders its content inside a React Portal.
 * Uses the `usePortal` hook to dynamically create the portal element.
 *
 * @param {ModalProps} props - The props to configure the modal.
 * @returns A JSX element representing the modal, or null if it's not open.
 */
const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children, width, maxWidth }) => {
    const portalRoot = usePortal('modal-root');

    const styles = {
        ...(width && { width}),
        ...(maxWidth && { maxWidth }),
    }
  
    if (!isOpen || !portalRoot) return null;
  
    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-container" style={styles}>
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>,
        portalRoot
    );
};
  
export default Modal;
