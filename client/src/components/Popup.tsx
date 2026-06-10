import { useEffect } from 'react';
import { useUIStore } from '@/store';

export default function Popup() {
  const { popup, hidePopup } = useUIStore();

  useEffect(() => {
    if (!popup) return;
    const timer = setTimeout(hidePopup, 5000);
    return () => clearTimeout(timer);
  }, [popup, hidePopup]);

  if (!popup) return null;

  const isSuccess = popup.type === 'success';
  return (
    <div
      className={`popup-toast flex items-start gap-3 ${
        isSuccess
          ? 'bg-green text-white'
          : 'bg-orange text-white'
      }`}
      role="alert"
    >
      <span className="text-xl mt-0.5">{isSuccess ? '✓' : '⚠'}</span>
      <p className="flex-1 text-sm">{popup.message}</p>
      <button onClick={hidePopup} className="text-white/70 hover:text-white transition-colors ml-2 text-base leading-none">
        ✕
      </button>
    </div>
  );
}
