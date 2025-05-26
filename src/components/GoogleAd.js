import React, { useEffect, useRef } from 'react';

const GoogleAd = ({
  slot = "1588703789",
  format = "auto",
  responsive = true,
  style = {},
  className = "",
  layout = "",
  layoutKey = ""
}) => {
  const adRef = useRef(null);
  const isAdLoaded = useRef(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const loadAd = () => {
      try {
        // Check if container has proper dimensions before loading ad
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) {
            // Container is not visible, don't load ad
            return;
          }
        }

        // Ensure AdSense script is loaded
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          // Only push if this ad hasn't been loaded yet and container is visible
          if (!isAdLoaded.current && adRef.current && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
              isAdLoaded.current = true;
            }
          }
        } else {
          // If AdSense script isn't loaded yet, try again after a delay
          setTimeout(loadAd, 300);
        }
      } catch (error) {
        console.log('AdSense error:', error);
      }
    };

    // Use ResizeObserver to detect when container becomes visible (with fallback)
    let resizeObserver;
    if (containerRef.current && typeof ResizeObserver !== 'undefined') {
      try {
        resizeObserver = new ResizeObserver((entries) => {
          for (let entry of entries) {
            if (entry.contentRect.width > 0 && entry.contentRect.height > 0 && !isAdLoaded.current) {
              setTimeout(loadAd, 100);
            }
          }
        });
        resizeObserver.observe(containerRef.current);
      } catch (error) {
        console.log('ResizeObserver not supported, using fallback');
        // Fallback: check visibility periodically
        const intervalId = setInterval(() => {
          if (containerRef.current && !isAdLoaded.current) {
            const rect = containerRef.current.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
              loadAd();
              clearInterval(intervalId);
            }
          }
        }, 1000);

        // Clean up interval after 10 seconds
        setTimeout(() => clearInterval(intervalId), 10000);
      }
    }

    // Initial load attempt
    const timer = setTimeout(loadAd, 500);

    return () => {
      clearTimeout(timer);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  const adStyle = {
    display: 'block',
    minHeight: '50px',
    ...style
  };

  const containerStyle = {
    textAlign: 'center',
    ...style
  };

  return (
    <div ref={containerRef} className={`google-ad-container ${className}`} style={containerStyle}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={adStyle}
        data-ad-client="ca-pub-2372474841998509"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
        data-ad-layout={layout}
        data-ad-layout-key={layoutKey}
      />
    </div>
  );
};

// Specific ad components for different placements
export const BannerAd = (props) => (
  <GoogleAd
    {...props}
    className={`banner-ad ${props.className || ''}`}
    style={{ minHeight: '90px', ...props.style }}
  />
);

export const SquareAd = (props) => (
  <GoogleAd
    {...props}
    className={`square-ad ${props.className || ''}`}
    format="rectangle"
    style={{ minHeight: '250px', ...props.style }}
  />
);

export const ResponsiveAd = (props) => (
  <GoogleAd
    {...props}
    className={`responsive-ad ${props.className || ''}`}
    format="auto"
    responsive={true}
    style={{ minHeight: '100px', ...props.style }}
  />
);

export default GoogleAd;
