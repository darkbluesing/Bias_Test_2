'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';

type AdsterraOptions = {
  key: string;
  format: string;
  height: number;
  width: number;
  params: Record<string, unknown>;
};

interface AdsterraBannerProps {
  className?: string;
  style?: CSSProperties;
  placementKey?: string;
  scriptUrl?: string;
  containerId?: string;
  options?: Partial<Omit<AdsterraOptions, 'key'>> & { key?: string };
  enableResponsive?: boolean;
  breakpoints?: Array<{
    maxWidth: number;
    key: string;
    width: number;
    height: number;
    params?: Record<string, unknown>;
  }>;
}

const DEFAULT_KEY = '5aec263b46cce11388d8da8c1ee59913';
const DEFAULT_OPTIONS: AdsterraOptions = {
  key: DEFAULT_KEY,
  format: 'iframe',
  height: 60,
  width: 468,
  params: {},
};

const buildScriptSrc = (key: string) => `https://www.highperformanceformat.com/${key}/invoke.js`;

let loadQueue: Promise<void> = Promise.resolve();

const enqueueAdLoad = (task: () => Promise<void>) => {
  loadQueue = loadQueue.then(task).catch((error) => {
    console.warn('AdsterraBanner: queued load failed', error);
  });
  return loadQueue;
};

export function AdsterraBanner({
  className = '',
  style,
  placementKey,
  scriptUrl,
  containerId,
  options,
  enableResponsive = false,
  breakpoints = [],
}: AdsterraBannerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fallbackRef = useRef<HTMLDivElement | null>(null);
  const slotRef = useRef<HTMLDivElement | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const generatedContainerIdRef = useRef(`adsterra-slot-${Math.random().toString(36).slice(2, 10)}`);

  const baseOptions = useMemo(() => {
    const params = {
      ...DEFAULT_OPTIONS.params,
      ...(options?.params ?? {}),
    };

    return {
      key: placementKey ?? options?.key ?? DEFAULT_OPTIONS.key,
      format: options?.format ?? DEFAULT_OPTIONS.format,
      height: options?.height ?? DEFAULT_OPTIONS.height,
      width: options?.width ?? DEFAULT_OPTIONS.width,
      params,
    } satisfies AdsterraOptions;
  }, [placementKey, options?.format, options?.height, options?.width, options?.key, JSON.stringify(options?.params ?? {})]);

  const [activeOptions, setActiveOptions] = useState<AdsterraOptions>(baseOptions);

  const computeResponsiveOptions = useCallback(
    (availableWidth: number): AdsterraOptions => {
      if (!enableResponsive || breakpoints.length === 0) {
        return baseOptions;
      }

      const sorted = [...breakpoints].sort((a, b) => a.maxWidth - b.maxWidth);
      const match = sorted.find((bp) => availableWidth <= bp.maxWidth);

      if (!match) {
        return baseOptions;
      }

      return {
        key: match.key,
        format: baseOptions.format,
        height: match.height,
        width: match.width,
        params: {
          ...DEFAULT_OPTIONS.params,
          ...(options?.params ?? {}),
          ...(match.params ?? {}),
        },
      } satisfies AdsterraOptions;
    },
    [baseOptions, breakpoints, enableResponsive, options?.params]
  );

  useEffect(() => {
    setActiveOptions(baseOptions);
  }, [baseOptions]);

  useEffect(() => {
    if (!enableResponsive || breakpoints.length === 0) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const update = () => {
      const availableWidth = container.clientWidth || window.innerWidth || baseOptions.width;
      setActiveOptions((current) => {
        const next = computeResponsiveOptions(availableWidth);
        if (
          current.key === next.key &&
          current.width === next.width &&
          current.height === next.height &&
          JSON.stringify(current.params) === JSON.stringify(next.params)
        ) {
          return current;
        }
        return next;
      });
    };

    update();

    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => update()) : undefined;
    resizeObserver?.observe(container);

    const handleResize = () => update();
    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [baseOptions.width, baseOptions, breakpoints, computeResponsiveOptions, enableResponsive]);

  const { key, format, height, width, params } = activeOptions;
  const paramsSignature = useMemo(() => JSON.stringify(params ?? {}), [params]);
  const finalScriptSrc = scriptUrl ?? buildScriptSrc(key);
  const shouldUseOptions = !scriptUrl;

  const [desiredHeight, setDesiredHeight] = useState(height);

  const adjustIframe = useCallback(
    (iframe: HTMLIFrameElement, explicitContainerWidth?: number) => {
      const containerWidth = explicitContainerWidth ?? containerRef.current?.clientWidth ?? width;
      if (containerWidth <= 0 || width <= 0) {
        return height;
      }

      const aspectRatio = height / width;
      const targetHeight = Math.max(1, Math.round(containerWidth * aspectRatio));

      iframe.style.display = 'block';
      iframe.style.width = '100%';
      iframe.style.height = `${targetHeight}px`;
      iframe.setAttribute('width', '100%');
      iframe.setAttribute('height', `${targetHeight}`);
      iframe.style.transform = 'none';
      iframe.style.maxWidth = '100%';

      const parent = iframe.parentElement as HTMLElement | null;
      if (parent) {
        parent.style.height = `${targetHeight}px`;
        parent.style.maxWidth = '100%';
        parent.style.overflow = 'hidden';
      }

      return targetHeight;
    },
    [height, width]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const ratio = width > 0 ? height / width : 0;
    const updateSize = () => {
      const available = container.clientWidth || width;
      const nextHeight = ratio > 0 ? Math.max(1, Math.round(available * ratio)) : height;
      setDesiredHeight((current) => (current === nextHeight ? current : nextHeight));

      const slot = slotRef.current;
      if (slot) {
        slot.querySelectorAll('iframe').forEach((iframe) => adjustIframe(iframe as HTMLIFrameElement, available));
      }
    };

    updateSize();

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [adjustIframe, height, width]);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) {
      return;
    }
    slot.querySelectorAll('iframe').forEach((iframe) => {
      const nextHeight = adjustIframe(iframe as HTMLIFrameElement);
      if (typeof nextHeight === 'number' && !Number.isNaN(nextHeight)) {
        setDesiredHeight((current) => (current === nextHeight ? current : nextHeight));
      }
    });
  }, [adjustIframe, desiredHeight]);

  useEffect(() => {
    const container = containerRef.current;
    const fallback = fallbackRef.current;
    const slot = slotRef.current;

    if (!container || !slot) {
      return;
    }

    cleanupRef.current?.();
    const targetContainerId = containerId ?? generatedContainerIdRef.current;
    slot.id = targetContainerId;
    slot.innerHTML = '';
    slot.style.height = '';
    slot.style.maxWidth = '';
    slot.style.overflow = '';

    if (fallback) {
      fallback.classList.remove('hidden');
      fallback.textContent = 'Loading ad...';
    }

    let cancelled = false;

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLIFrameElement) {
            adjustIframe(node);
          } else if (node instanceof HTMLElement) {
            node.querySelectorAll('iframe').forEach((iframe) => adjustIframe(iframe as HTMLIFrameElement));
          }
        });
      });
    });
    mutationObserver.observe(slot, { childList: true, subtree: true });

    const task = () =>
      new Promise<void>((resolve) => {
        if (cancelled) {
          mutationObserver.disconnect();
          resolve();
          return;
        }

        let payload: AdsterraOptions | undefined;
        let previousOptions: unknown | undefined;

        if (shouldUseOptions) {
          payload = { key, format, height, width, params } satisfies AdsterraOptions;
          previousOptions = (window as unknown as { atOptions?: unknown }).atOptions;
          (window as unknown as { atOptions?: unknown }).atOptions = payload;
        }

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = finalScriptSrc;
        script.async = true;
        script.dataset.adsterra = 'invoke';

        const restoreOptions = () => {
          if (!shouldUseOptions || !payload) {
            return;
          }
          const globalRef = (window as unknown as { atOptions?: unknown });
          if (globalRef.atOptions === payload) {
            if (previousOptions === undefined) {
              delete globalRef.atOptions;
            } else {
              globalRef.atOptions = previousOptions;
            }
          }
        };

        const finalize = () => {
          script.removeEventListener('load', handleLoad);
          script.removeEventListener('error', handleError);
          restoreOptions();
          resolve();
        };

        const handleLoad = () => {
          if (!cancelled && fallback) {
            fallback.classList.add('hidden');
          }
          finalize();
        };

        const handleError = (event: Event) => {
          if (!cancelled) {
            console.warn('AdsterraBanner: Script failed to load.', event);
            if (fallback) {
              fallback.classList.remove('hidden');
              fallback.textContent = 'Ad failed to load';
            }
          }
          finalize();
        };

        script.addEventListener('load', handleLoad, { once: true });
        script.addEventListener('error', handleError, { once: true });

        slot.appendChild(script);

        cleanupRef.current = () => {
          script.removeEventListener('load', handleLoad);
          script.removeEventListener('error', handleError);
          if (script.parentElement) {
            script.remove();
          }
          mutationObserver.disconnect();
          restoreOptions();
        };

        if (cancelled) {
          cleanupRef.current?.();
          resolve();
        }
      });

    enqueueAdLoad(task);

    return () => {
      cancelled = true;
      mutationObserver.disconnect();
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      slot.innerHTML = '';
      slot.style.height = '';
      slot.style.maxWidth = '';
      slot.style.overflow = '';
      if (fallback) {
        fallback.classList.remove('hidden');
        fallback.textContent = 'Loading ad...';
      }
    };
  }, [adjustIframe, containerId, enableResponsive, format, height, key, params, paramsSignature, scriptUrl, width]);

  const computedStyle: CSSProperties = {
    width: '100%',
    minHeight: `${desiredHeight}px`,
    overflow: 'hidden',
    ...style,
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={computedStyle}
    >
      <div
        ref={slotRef}
        className="flex w-full items-center justify-center"
        style={{ minHeight: `${desiredHeight}px` }}
      />
      <div
        ref={fallbackRef}
        data-adsterra-fallback
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs text-gray-400"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}
      >
        Loading ad...
      </div>
    </div>
  );
}
