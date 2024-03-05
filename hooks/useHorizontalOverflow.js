import { useEffect, useState } from "react";
import useScreenSize from "@/hooks/useScreenSize";

export default function useHorizontalOverflow89(ref, ...dependencies) {
  const [hasHorizontalOverflow, setHasHorizontalOverflow] = useState(false);
  const screenSize = useScreenSize();
  const { current } = ref;

  useEffect(() => {
    if (!current) {
      return;
    }
    const horizontalOverflow = current?.scrollWidth > current?.clientWidth;
    setHasHorizontalOverflow(horizontalOverflow);
  }, [current, screenSize, dependencies]);

  return hasHorizontalOverflow;
}
