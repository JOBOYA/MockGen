import React from 'react';

export const overlays = [
  { id: 'none', label: 'None', style: { background: 'none' } },
  { 
    id: 'overlay1', 
    label: 'Diagonal Fade',
    style: { background: 'linear-gradient(45deg, rgba(0,0,0,1) 0%, transparent 100%)' } 
  },
  { 
    id: 'overlay2',
    label: 'Bottom Fade', 
    style: { background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 100%)' } 
  },
  { 
    id: 'overlay3',
    label: 'Side Fade', 
    style: { background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, transparent 100%)' } 
  },
  { 
    id: 'overlay4',
    label: 'Radial', 
    style: { background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,1) 100%)' } 
  },
  { 
    id: 'overlay5',
    label: 'Cross Fade', 
    style: { background: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, transparent 50%, rgba(0,0,0,1) 100%)' } 
  },
  { 
    id: 'overlay6',
    label: 'Double Fade', 
    style: { background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 50%, rgba(0,0,0,1) 100%)' } 
  },
  { 
    id: 'overlay7',
    label: 'Corner Fade', 
    style: { background: 'radial-gradient(circle at top right, transparent 0%, rgba(0,0,0,1) 100%)' } 
  },
];

interface ShadowOverlayProps {
  opacity: number;
  selectedOverlay: string;
  onOpacityChange: (opacity: number) => void;
  onOverlaySelect: (overlayId: string) => void;
}

export default function ShadowOverlay({
  opacity,
  selectedOverlay,
  onOpacityChange,
  onOverlaySelect,
}: ShadowOverlayProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-sm mb-2">Opacity</label>
        <input
          type="range"
          min="0"
          max="100"
          value={opacity}
          onChange={(e) => onOpacityChange(Number(e.target.value))}
          className="w-full accent-blue-500"
        />
        <div className="text-right text-sm text-gray-400">{opacity}%</div>
      </div>

      <div>
        <label className="block text-white text-sm mb-2">Overlay Style</label>
        <div className="grid grid-cols-4 gap-2">
          {overlays.map((overlay) => (
            <button
              key={overlay.id}
              onClick={() => onOverlaySelect(overlay.id)}
              className={`relative w-full aspect-square rounded-lg overflow-hidden transition-all hover:scale-105 ${
                selectedOverlay === overlay.id ? 'ring-2 ring-white' : ''
              }`}
              title={overlay.label}
            >
              <div 
                className="absolute inset-0 bg-gray-700"
                style={overlay.style}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}