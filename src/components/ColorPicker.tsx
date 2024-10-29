import React from 'react';

const presetColors = [
  '#FF5733', '#FFC300', '#FF3399', '#9B59B6', '#2ECC71',
  '#C70039', '#3498DB', '#FF9999', '#66B2FF', '#8E44AD',
  '#239B56', '#FF6B6B', '#4ECDC4', '#45B7D1', '#E74C3C'
];

interface ColorPickerProps {
  onColorSelect: (color: string) => void;
  selectedColor: string;
}

export default function ColorPicker({ onColorSelect, selectedColor }: ColorPickerProps) {
  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <div className="mb-4">
        <h3 className="text-white text-sm font-medium mb-2">Custom Color</h3>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => onColorSelect(e.target.value)}
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>
      <div>
        <h3 className="text-white text-sm font-medium mb-2">Preset Colors</h3>
        <div className="grid grid-cols-5 gap-2">
          {presetColors.map((color, index) => (
            <button
              key={`${color}-${index}`}
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
  );
}