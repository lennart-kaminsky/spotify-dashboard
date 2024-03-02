import { useEffect, useState } from "react";
import useScreenSize from "@/hooks/useScreenSize";

export default function useHorizontalOverflow89(ref, playbackState) {
  const [hasHorizontalOverflow, setHasHorizontalOverflow] = useState(false);

  const screenSize = useScreenSize();
  const { current } = ref;

  useEffect(() => {
    if (!current) {
      return;
    }
    const horizontalOverflow = current?.scrollWidth > current?.clientWidth;

    setHasHorizontalOverflow(horizontalOverflow);
  }, [current, screenSize, playbackState]);

  return hasHorizontalOverflow;
}
