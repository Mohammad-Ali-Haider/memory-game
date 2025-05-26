import React, { useEffect, useState } from 'react';

const AdSenseDebugger = () => {
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    const checkAdSenseStatus = () => {
      const info = {
        // Script loading
        scriptLoaded: !!window.adsbygoogle,
        adsbygoogleArray: window.adsbygoogle?.length || 0,
        
        // Environment
        hostname: window.location.hostname,
        protocol: window.location.protocol,
        isLocalhost: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
        
        // Browser info
        userAgent: navigator.userAgent,
        
        // AdSense specific
        clientId: 'ca-pub-2372474841998509',
        
        // Page info
        pageTitle: document.title,
        pageUrl: window.location.href,
        
        // Timing
        timestamp: new Date().toISOString()
      };
      
      setDebugInfo(info);
    };

    checkAdSenseStatus();
    
    // Check periodically
    const interval = setInterval(checkAdSenseStatus, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (condition) => {
    return condition ? 'text-green-400' : 'text-red-400';
  };

  const getStatusIcon = (condition) => {
    return condition ? '✅' : '❌';
  };

  return (
    <div className="fixed bottom-4 right-4 bg-slate-900 border border-slate-700 rounded-lg p-4 text-sm font-mono max-w-md z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-bold">AdSense Debug</h3>
        <button 
          onClick={() => setDebugInfo({})}
          className="text-slate-400 hover:text-white"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="grid grid-cols-2 gap-2">
          <div className={getStatusColor(debugInfo.scriptLoaded)}>
            {getStatusIcon(debugInfo.scriptLoaded)} Script Loaded
          </div>
          <div className={getStatusColor(!debugInfo.isLocalhost)}>
            {getStatusIcon(!debugInfo.isLocalhost)} Live Domain
          </div>
        </div>
        
        <div className="border-t border-slate-700 pt-2">
          <div className="text-slate-300">Environment:</div>
          <div className="text-slate-400">
            {debugInfo.hostname} ({debugInfo.protocol})
          </div>
        </div>
        
        <div className="border-t border-slate-700 pt-2">
          <div className="text-slate-300">AdSense Array:</div>
          <div className="text-slate-400">
            {debugInfo.adsbygoogleArray} items
          </div>
        </div>
        
        <div className="border-t border-slate-700 pt-2">
          <div className="text-slate-300">Client ID:</div>
          <div className="text-slate-400 break-all">
            {debugInfo.clientId}
          </div>
        </div>
        
        {debugInfo.isLocalhost && (
          <div className="border-t border-slate-700 pt-2">
            <div className="text-yellow-400">
              ⚠️ Localhost detected - real ads won't show
            </div>
          </div>
        )}
        
        <div className="border-t border-slate-700 pt-2 text-slate-500">
          Last check: {debugInfo.timestamp?.split('T')[1]?.split('.')[0]}
        </div>
      </div>
    </div>
  );
};

export default AdSenseDebugger;
