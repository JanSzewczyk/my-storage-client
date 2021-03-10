import { useEffect, useState } from "react";

import { UseWindowSizeArguments } from "./types";

const useWindowSize = (): UseWindowSizeArguments => {
  const [windowSize, setWindowSize] = useState<UseWindowSizeArguments>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
