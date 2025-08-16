import { useEffect, useState } from 'react';

/**
 * Zustand persist hydration을 기다리는 훅
 * SSR/SSG에서 클라이언트 상태가 완전히 로드될 때까지 기다림
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트되면 hydration 완료로 간주
    setIsHydrated(true);
  }, []);

  return isHydrated;
}