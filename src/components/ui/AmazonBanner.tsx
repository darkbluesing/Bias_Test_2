'use client';

interface AmazonBannerProps {
  className?: string;
  href: string;
  label?: string;
  title: string;
  description: string;
  dense?: boolean;
  imageSrc?: string;
  imageAlt?: string;
}

export function AmazonBanner({ className = '', href, label = 'Sponsored', title, description, dense = false, imageSrc, imageAlt }: AmazonBannerProps) {
  const spacing = dense ? 'px-3 py-1 sm:px-4 sm:py-1.5' : 'p-4';
  const layout = dense
    ? 'flex w-full items-center gap-2 text-left sm:gap-3'
    : 'flex flex-col items-center gap-3 text-center';
  const badgeSize = dense ? 'text-[9px] uppercase tracking-[0.18em]' : 'text-xs uppercase tracking-widest';
  const titleSize = dense ? 'text-[12px] font-semibold text-gray-900 sm:text-[13px]' : 'text-lg font-bold text-gray-900';
  const descriptionSize = dense ? 'text-[10px] leading-tight text-gray-600 sm:text-[11px]' : 'text-sm text-gray-600';
  const textContainerClass = dense ? 'flex-1 leading-tight space-y-0' : 'flex-1 flex flex-col items-center space-y-1';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`block rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 via-yellow-100 to-amber-200 ${spacing} shadow-inner transition hover:from-amber-200 hover:to-yellow-200 ${className}`}
    >
      <div className={layout}>
        {imageSrc && (
          <div
            className={dense ? 'flex-shrink-0 overflow-hidden rounded-md bg-white/70 p-0.5' : 'flex-shrink-0 overflow-hidden rounded-md bg-white/60 p-1'}
            style={{ minWidth: dense ? '44px' : '64px' }}
          >
            <img
              src={imageSrc}
              alt={imageAlt ?? title}
              loading="lazy"
              referrerPolicy="no-referrer"
              width={dense ? 40 : 64}
              height={dense ? 40 : 64}
              className={dense ? 'h-10 w-10 rounded-sm object-cover sm:h-12 sm:w-12' : 'h-16 w-16 rounded-md object-cover'}
            />
          </div>
        )}
        <div className={textContainerClass}>
          <span className={`${badgeSize} text-amber-600 block`}>{label}</span>
          <h2 className={titleSize}>{title}</h2>
          <p className={descriptionSize}>{description}</p>
        </div>
      </div>
    </a>
  );
}
