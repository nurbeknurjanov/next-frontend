import { useState } from 'react';

export const useHeader = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return {
    showSidebar,
    setShowSidebar,
  };
};
