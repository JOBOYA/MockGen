import React, { useState } from 'react';

const presetColors = [
  '#FF5733', '#FFC300', '#FF3399', '#9B59B6', '#2ECC71',
  '#C70039', '#3498DB', '#FF9999', '#66B2FF', '#8E44AD',
  '#239B56', '#FF6B6B', '#4ECDC4', '#45B7D1', '#E74C3C'
];

const presetWallpapers = [
  'https://images.unsplash.com/photo-1557683316-973673baf926',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85',
  'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5',
  'https://images.unsplash.com/photo-1557682260-96773eb01377',
].map(url => `${url}?auto=format&fit=crop&w=300&q=80`);

interface BackgroundPickerProps {
  onColorSelect: (color: string) => void;
  onWallpaperSelect: (wallpaper: string | null) => void;
  selectedColor: string;
  selectedWallpaper: string | null;
}

export default function BackgroundPicker({
  onColorSelect,
  onWallpaperSelect,
  selectedColor,
  selectedWallpaper
}: BackgroundPickerProps) {
  const [activeTab, setActiveTab] = useState<'solid' | 'wallpaper'>(
    selectedWallpaper ? 'wallpaper' : 'solid'
  );

  const handleTabChange = (tab: 'solid' | 'wallpaper') => {
    setActiveTab(tab);
    if (tab === 'solid') {
      onWallpaperSelect(null);
    } else {
      onColorSelect('#FF5733');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <button
          onClick={() => handleTabChange('solid')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'solid'
              ? 'bg-gray-700 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
        >
          Solid Color
        </button>
        <button
          onClick={() => handleTabChange('wallpaper')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'wallpaper'
              ? 'bg-gray-700 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
        >
          Wallpaper
        </button>
      </div>

      {activeTab === 'solid' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm mb-2">Custom Color</label>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => onColorSelect(e.target.value)}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-white text-sm mb-2">Preset Colors</label>
            <div className="grid grid-cols-5 gap-2">
              {presetColors.map((color) => (
                <button
                  key={color}
                  onClick={() => onColorSelect(color)}
                  className={`w-8 h-8 rounded-lg transition-transform hover:scale-110 ${
                    selectedColor === color ? 'ring-2 ring-white' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <label className="block text-white text-sm mb-2">Select Wallpaper</label>
          <div className="grid grid-cols-2 gap-3">
            {presetWallpapers.map((wallpaper, index) => (
              <button
                key={index}
                onClick={() => onWallpaperSelect(wallpaper)}
                className={`relative aspect-video rounded-lg overflow-hidden transition-transform hover:scale-105 ${
                  selectedWallpaper === wallpaper ? 'ring-2 ring-white' : ''
                }`}
              >
                <img
                  src={wallpaper}
                  alt={`Wallpaper ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}