import { useEffect, useState } from "react";
import useScreenSize from "@/hooks/useScreenSize";

export default function useHorizontalOverflow89(ref, dependency) {
  const [hasHorizontalOverflow, setHasHorizontalOverflow] = useState(false);

  const screenSize = useScreenSize();
  const { current } = ref;
  console.log(ref);

  useEffect(() => {
    if (!current) {
      return;
    }
    const horizontalOverflow = current?.scrollWidth > current?.clientWidth;
    console.log(current);
    setHasHorizontalOverflow(horizontalOverflow);
  }, [current, screenSize, dependency]);

  return hasHorizontalOverflow;
}
