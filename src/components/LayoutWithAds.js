import React from 'react';
import { ResponsiveAd } from './GoogleAd';

const LayoutWithAds = ({ children, showAds = true }) => {
  if (!showAds) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Ad Banner */}
      <div className="hidden lg:block w-40 xl:w-48 2xl:w-56 flex-shrink-0">
        <div className="sticky top-0 h-screen p-4">
          <div className="relative h-full bg-slate-800 rounded-lg overflow-hidden" style={{ minHeight: '600px', minWidth: '160px' }}>
            <ResponsiveAd
              slot="1588703789"
              className="w-full h-full"
              style={{ minHeight: '600px', minWidth: '160px' }}
            />
            {/* Fallback content when ads don't load */}
            <div className="absolute inset-4 flex items-center justify-center text-slate-400 text-sm text-center pointer-events-none">
              <div>
                <div className="material-icons text-4xl mb-2 opacity-50">ads_click</div>
                <p className="opacity-75">Advertisement</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {children}
      </div>

      {/* Right Ad Banner */}
      <div className="hidden lg:block w-40 xl:w-48 2xl:w-56 flex-shrink-0">
        <div className="sticky top-0 h-screen p-4">
          <div className="relative h-full bg-slate-800 rounded-lg overflow-hidden" style={{ minHeight: '600px', minWidth: '160px' }}>
            <ResponsiveAd
              slot="1588703789"
              className="w-full h-full"
              style={{ minHeight: '600px', minWidth: '160px' }}
            />
            {/* Fallback content when ads don't load */}
            <div className="absolute inset-4 flex items-center justify-center text-slate-400 text-sm text-center pointer-events-none">
              <div>
                <div className="material-icons text-4xl mb-2 opacity-50">ads_click</div>
                <p className="opacity-75">Advertisement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutWithAds;
