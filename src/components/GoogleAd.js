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

  useEffect(() => {
    const loadAd = () => {
      try {
        // Ensure AdSense script is loaded
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          // Only push if this ad hasn't been loaded yet
          if (!isAdLoaded.current && adRef.current) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            isAdLoaded.current = true;
          }
        } else {
          // If AdSense script isn't loaded yet, try again after a delay
          setTimeout(loadAd, 300);
        }
      } catch (error) {
        console.log('AdSense error:', error);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(loadAd, 100);

    return () => {
      clearTimeout(timer);
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
    <div className={`google-ad-container ${className}`} style={containerStyle}>
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
