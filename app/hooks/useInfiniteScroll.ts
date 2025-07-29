import { useCallback, useRef } from "react";

export const useInfiniteScroll = (callback: () => void, hasMore: boolean) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      
      if (!node || !hasMore) return;

      observerRef.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      });

      observerRef.current.observe(node);
    },
    [callback, hasMore],
  );

  return ref;
};