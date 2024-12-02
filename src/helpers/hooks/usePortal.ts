import { useState, useEffect } from 'react';

/**
 * Custom hook to create a portal DOM element dynamically
 * It ensures that the portal root element is created only in the browser
 *
 * @param id - The id of the portal root element (e.g., 'modal-root')
 * @returns The portal DOM element or null if not available
 */
const usePortal = (id: string): HTMLElement | null => {
      const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
    
      useEffect(() => {
        let element = document.getElementById(id);
        let created = false;
    
        // If the element doesn't exist, create it
        if (!element) {
          created = true;
          element = document.createElement('div');
          element.setAttribute('id', id);
          document.body.appendChild(element);
        }
    
        setPortalElement(element);
    
        // Cleanup: If we created the element, remove it when the component unmounts
        return () => {
          if (created && element?.parentNode) {
            element.parentNode.removeChild(element);
          }
        };
      }, [id]);
    
      return portalElement;
};

export default usePortal;