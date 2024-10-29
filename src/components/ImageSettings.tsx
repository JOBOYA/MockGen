import React from 'react';
import { RotateCw, Move, Maximize2, Box, RefreshCw } from 'lucide-react';

interface ImageSettingsProps {
  position: { x: number; y: number };
  scale: number;
  rotation: number;
  tilt: number;
  onPositionChange: (position: { x: number; y: number }) => void;
  onScaleChange: (scale: number) => void;
  onRotationChange: (rotation: number) => void;
  onTiltChange: (tilt: number) => void;
}

export default function ImageSettings({
  position,
  scale,
  rotation,
  tilt,
  onPositionChange,
  onScaleChange,
  onRotationChange,
  onTiltChange,
}: ImageSettingsProps) {
  const handleReset = () => {
    onPositionChange({ x: 0, y: 0 });
    onScaleChange(1);
    onRotationChange(0);
    onTiltChange(0);
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Transform Controls</h3>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
        >
          <RefreshCw className="w-3 h-3" /> Reset All
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-3">
            <Move className="w-4 h-4" /> Position
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="absolute -top-2.5 left-2 px-1 bg-gray-800 text-xs text-gray-400">X</label>
              <input
                type="number"
                value={position.x}
                onChange={(e) => onPositionChange({ ...position, x: Number(e.target.value) })}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">px</span>
            </div>
            <div className="relative">
              <label className="absolute -top-2.5 left-2 px-1 bg-gray-800 text-xs text-gray-400">Y</label>
              <input
                type="number"
                value={position.y}
                onChange={(e) => onPositionChange({ ...position, y: Number(e.target.value) })}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">px</span>
            </div>
          </div>
        </div>

        <div>
          <label className="flex items-center justify-between text-sm font-medium mb-3">
            <div className="flex items-center gap-2">
              <Maximize2 className="w-4 h-4" /> Scale
            </div>
            <span className="text-xs text-gray-400 tabular-nums">{(scale * 100).toFixed(0)}%</span>
          </label>
          <div className="relative group">
            <div className="absolute -top-2 left-0 w-full px-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex justify-between text-xs text-gray-500">
                <span>10%</span>
                <span>100%</span>
                <span>200%</span>
              </div>
            </div>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={scale}
              onChange={(e) => onScaleChange(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center justify-between text-sm font-medium mb-3">
            <div className="flex items-center gap-2">
              <RotateCw className="w-4 h-4" /> Rotation
            </div>
            <span className="text-xs text-gray-400 tabular-nums">{rotation}°</span>
          </label>
          <div className="relative group">
            <div className="absolute -top-2 left-0 w-full px-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex justify-between text-xs text-gray-500">
                <span>-180°</span>
                <span>0°</span>
                <span>180°</span>
              </div>
            </div>
            <input
              type="range"
              min="-180"
              max="180"
              value={rotation}
              onChange={(e) => onRotationChange(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center justify-between text-sm font-medium mb-3">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4" /> 3D Tilt
            </div>
            <span className="text-xs text-gray-400 tabular-nums">{tilt}°</span>
          </label>
          <div className="relative group">
            <div className="absolute -top-2 left-0 w-full px-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex justify-between text-xs text-gray-500">
                <span>-45°</span>
                <span>0°</span>
                <span>45°</span>
              </div>
            </div>
            <input
              type="range"
              min="-45"
              max="45"
              value={tilt}
              onChange={(e) => onTiltChange(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}