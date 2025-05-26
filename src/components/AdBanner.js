import React, { useEffect } from 'react';

const AdBanner = ({
  slot = "1588703789",
  format = "auto",
  responsive = true,
  style = {},
  className = ""
}) => {
  useEffect(() => {
    try {
      // Load AdSense script if not already loaded
      if (!window.adsbygoogle) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2372474841998509';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);

        // Initialize the adsbygoogle array
        window.adsbygoogle = window.adsbygoogle || [];
      }

      // Push the ad to AdSense after a small delay to ensure script is loaded
      setTimeout(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
          console.log('AdSense push error:', error);
        }
      }, 100);
    } catch (error) {
      console.log('AdSense script error:', error);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          ...style
        }}
        data-ad-client="ca-pub-2372474841998509"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
};

export default AdBanner;
