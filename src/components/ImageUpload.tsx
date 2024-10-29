import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    setUploadedImage(file);
    onImageUpload(file);
    setError(null);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div
        onClick={handleClick}
        className="relative w-full h-64 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer overflow-hidden touch-manipulation"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept="image/*"
          capture="environment"
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 p-4">
          {uploadedImage ? (
            <div className="relative w-full h-full">
              <img
                src={URL.createObjectURL(uploadedImage)}
                alt="Preview"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                <p className="text-white text-sm font-medium">Click to change image</p>
              </div>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 mb-2" />
              <p className="text-lg font-medium text-center">Click here or drop an image</p>
              <p className="text-sm text-center mt-1">Supports JPG, PNG, WebP</p>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
}