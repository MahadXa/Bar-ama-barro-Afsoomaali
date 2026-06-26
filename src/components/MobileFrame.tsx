import React, { useState, useEffect } from 'react';
import { Smartphone, Tablet, RotateCw, Wifi, Battery, Clock, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface MobileFrameProps {
  children: React.ReactNode;
  activeTab: string;
  onBackClick?: () => void;
  showBackButton?: boolean;
}

export default function MobileFrame({ children, onBackClick, showBackButton = false }: MobileFrameProps) {
  const [deviceType, setDeviceType] = useState<'phone' | 'tablet'>('phone');
  const [isLandscape, setIsLandscape] = useState<boolean>(false);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'Galabnimo' : 'Subaxnimo';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleRotation = () => {
    setIsLandscape(!isLandscape);
  };

  const toggleDeviceType = () => {
    setDeviceType(deviceType === 'phone' ? 'tablet' : 'phone');
  };

  // Dimensions based on device type and orientation
  const getDeviceDimensions = () => {
    if (deviceType === 'phone') {
      return isLandscape 
        ? 'w-[840px] h-[420px]' 
        : 'w-[410px] h-[820px]';
    } else {
      // Tablet aspect ratio
      return isLandscape 
        ? 'w-[960px] h-[640px]' 
        : 'w-[680px] h-[920px]';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 py-6 px-4 font-sans selection:bg-rose-200">
      {/* Top Device Bar Tools */}
      <div className="flex items-center gap-4 mb-4 bg-white/80 backdrop-blur border border-slate-200 px-4 py-2 rounded-full shadow-sm z-10">
        <button
          onClick={toggleDeviceType}
          id="btn-toggle-device"
          className="flex items-center gap-2 text-xs font-medium text-slate-700 hover:text-rose-500 transition-colors px-3 py-1.5 rounded-full hover:bg-slate-50 border border-slate-100"
          title="Beddel qaabka telefoonka ama tablet-ka"
        >
          {deviceType === 'phone' ? <Tablet className="w-4 h-4 text-emerald-500" /> : <Smartphone className="w-4 h-4 text-rose-500" />}
          U beddel {deviceType === 'phone' ? 'Tablet-ka' : 'Telefoonka'}
        </button>

        <button
          onClick={toggleRotation}
          id="btn-rotate-device"
          className="flex items-center gap-2 text-xs font-medium text-slate-700 hover:text-rose-500 transition-colors px-3 py-1.5 rounded-full hover:bg-slate-50 border border-slate-100"
          title="Wareeji shaashadda"
        >
          <RotateCw className="w-4 h-4 text-indigo-500" />
          Shaashad {isLandscape ? 'Toosan' : 'Jiifta'}
        </button>

        <div className="h-4 w-[1px] bg-slate-200" />

        <span className="text-xs text-slate-400 font-mono">
          Halbeegga Af-Soomaaliga Sugan
        </span>
      </div>

      {/* Simulated Device Frame Container */}
      <div className="relative transition-all duration-500 ease-in-out">
        {/* Device Outer Frame (Simulated Android Hardware) */}
        <div
          className={`${getDeviceDimensions()} bg-slate-900 rounded-[42px] p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border-4 border-slate-800 flex flex-col transition-all duration-500 overflow-hidden relative`}
        >
          {/* Internal Camera Cutout / Notch */}
          {!isLandscape && deviceType === 'phone' && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-900 rounded-full z-30 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mr-2 border border-slate-700" />
              <div className="w-8 h-1 rounded-full bg-slate-800" />
            </div>
          )}

          {/* Screen area (The actual App Canvas) */}
          <div className="flex-1 bg-gradient-to-b from-sky-50 via-teal-50 to-amber-50 rounded-[28px] overflow-hidden flex flex-col relative border border-slate-950/20">
            {/* Simulated Android Status Bar */}
            <div className="h-7 bg-slate-900/10 backdrop-blur-xs flex items-center justify-between px-6 text-[11px] font-medium text-slate-700 z-30 select-none">
              <div className="flex items-center gap-1.5 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>{time || '12:30 PM'}</span>
              </div>
              
              {/* Center Carrier Name / Region Dialect indicator */}
              <span className="font-semibold text-[10px] uppercase tracking-wide text-teal-700 font-mono hidden sm:inline">
                Baro Afsoomaali
              </span>

              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-emerald-500/15 text-emerald-700 px-1.5 py-0.2 rounded-sm font-bold uppercase tracking-wider">
                  Khadla'aan (Offline)
                </span>
                <Wifi className="w-3.5 h-3.5 text-slate-700" />
                <Battery className="w-4 h-4 text-slate-700" />
              </div>
            </div>

            {/* Custom Interactive App Title bar inside frame if back button is needed */}
            {showBackButton && (
              <div className="h-12 flex items-center px-4 bg-white/70 backdrop-blur border-b border-rose-100 z-20">
                <button
                  onClick={onBackClick}
                  id="btn-frame-back"
                  className="p-1.5 rounded-full hover:bg-rose-100 text-rose-500 transition-colors focus:outline-hidden"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="ml-2 font-bold text-slate-800 text-sm">Ku laabo Casharrada</span>
              </div>
            )}

            {/* Simulated Screen Content Viewport */}
            <div className="flex-1 overflow-y-auto relative flex flex-col">
              {children}
            </div>

            {/* Simulated Android Software Navigation Bar (Bottom) */}
            <div className="h-9 bg-slate-950 flex items-center justify-around px-16 text-slate-500 z-30 select-none">
              {/* Back Button (Triangle) */}
              <button
                onClick={onBackClick}
                id="btn-android-back"
                className="p-1 hover:text-slate-300 transition-colors focus:outline-hidden"
                title="Ku laabo"
              >
                <div className="w-3 h-3 border-b-2 border-l-2 border-current rotate-45 transform translate-x-0.5" />
              </button>

              {/* Home Button (Circle) */}
              <div className="w-3.5 h-3.5 rounded-full border-2 border-current hover:border-slate-300 cursor-pointer transition-colors" />

              {/* Recents Button (Square) */}
              <div className="w-3 h-3 border-2 border-current rounded-xs hover:border-slate-300 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
