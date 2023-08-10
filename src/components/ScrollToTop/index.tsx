import React, { PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC<PropsWithChildren> = ({ children }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return <>{children}</>;
};

export default ScrollToTop;