'use client';

import { useEffect, useRef, type CSSProperties } from 'react';

interface AdsterraBannerProps {
  className?: string;
  style?: CSSProperties;
  scriptSrc?: string;
}

const DEFAULT_ADSTERRA_SRC = '//pl27945413.effectivegatecpm.com/27/23/be/2723be74bc8a913990e841a924f21e3b.js';

export function AdsterraBanner({ className = '', style, scriptSrc }: AdsterraBannerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fallbackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const fallback = fallbackRef.current;
    console.log('AdsterraBanner: useEffect triggered. Container:', container);

    if (!container) {
      console.error('AdsterraBanner: Container ref is not available.');
      return;
    }

    // Clear previous ad content and scripts
    const existingScript = container.querySelector('script[data-adsterra]');
    if (existingScript) {
      console.log('AdsterraBanner: Removing existing script.');
      existingScript.remove();
    }

    if (fallback) {
      fallback.classList.remove('hidden');
      fallback.textContent = '광고 로딩 중...';
      console.log('AdsterraBanner: Fallback shown.');
    }

    // Remove any leftover ad elements from previous renders
    Array.from(container.children).forEach((child) => {
      if (child !== fallback && child.tagName !== 'SCRIPT') {
        console.log('AdsterraBanner: Removing leftover child:', child);
        child.remove();
      }
    });

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptSrc || DEFAULT_ADSTERRA_SRC;
    script.dataset.adsterra = 'true';
    script.async = true;

    console.log(`AdsterraBanner: Creating and appending new script with src: ${script.src}`);

    script.addEventListener('load', () => {
      console.log('AdsterraBanner: Script LOADED successfully.');
      if (fallback) {
        // The script loaded, but it might not have placed an ad.
        // We hide the fallback to prevent overlap if an ad does render.
        fallback.classList.add('hidden');
        console.log('AdsterraBanner: Fallback hidden on script load.');
      }
      // Check if the ad script added any content.
      const adContent = Array.from(container.children).filter(
        (child) => child !== fallback && child !== script
      );
      if (adContent.length > 0) {
        console.log('AdsterraBanner: Ad content detected.', adContent);
      } else {
        console.warn('AdsterraBanner: Script loaded, but NO ad content was added by the script.');
      }
    });

    script.addEventListener('error', (e) => {
      console.error('AdsterraBanner: Script FAILED to load.', e);
      if (fallback) {
        fallback.textContent = '광고 로드 실패';
        console.log('AdsterraBanner: Fallback text updated to "error".');
      }
    });

    container.appendChild(script);

    return () => {
      console.log('AdsterraBanner: Cleanup function running.');
      if (script && script.parentElement) {
        console.log('AdsterraBanner: Removing script on cleanup.');
        script.remove();
      }
      if (fallback) {
        fallback.classList.remove('hidden');
        fallback.textContent = '광고 로딩 중...';
      }
    };
  }, [scriptSrc]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width: '100%', minHeight: '64px', ...style }}
    >
      <div
        ref={fallbackRef}
        data-adsterra-fallback
        className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 pointer-events-none"
      >
        광고 로딩 중...
      </div>
    </div>
  );
}
