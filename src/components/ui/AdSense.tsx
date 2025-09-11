'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSenseProps {
  className?: string;
  style?: React.CSSProperties;
}

export function AdSense({ className = "", style = {} }: AdSenseProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={className} style={style}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9411264810928915"
        data-ad-slot="1284981608"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}