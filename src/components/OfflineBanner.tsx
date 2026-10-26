import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff, CheckCircle } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm rounded-xl bg-amber-600 text-white p-3.5 shadow-xl border border-amber-500/50 flex items-start gap-3 text-xs animate-in slide-in-from-bottom duration-300">
      <WifiOff className="w-4 h-4 shrink-0 mt-0.5" />
      <div>
        <p className="font-bold">Offline Mode Active</p>
        <p className="text-[11px] text-amber-100 mt-0.5">
          Local database active. You can still view your scheduled passes and consulting hours without internet.
        </p>
      </div>
    </div>
  );
};
