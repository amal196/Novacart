import { useState, useCallback, useRef } from "react";

export function useInView(options = { threshold: 0.15 }) {
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef(null);

  const ref = useCallback((node) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (node) {
      observerRef.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      }, options);
      observerRef.current.observe(node);
    }
    
  }, []);

  return [ref, isInView];
}