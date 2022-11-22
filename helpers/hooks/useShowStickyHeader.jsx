import { useEffect, useState } from "react";

export default function useStickyHeader() {
  const [showHeader, setShowHeader] = useState(false);

  const toggleVisibility = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > 350) {
      setShowHeader(true);
      return;
    }

    setShowHeader(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return { showHeader };
}


