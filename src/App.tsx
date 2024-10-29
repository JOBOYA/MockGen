import React, { useState, useRef } from 'react';
import { ImageIcon } from 'lucide-react';
import Sidebar from './components/Sidebar';
import { overlays } from './components/ShadowOverlay';

interface ImagePosition {
  x: number;
  y: number;
}

export function App() {
  const [backgroundColor, setBackgroundColor] = useState('#FF5733');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('image');
  const [selectedWallpaper, setSelectedWallpaper] = useState<string | null>(null);
  const [overlayOpacity, setOverlayOpacity] = useState(50);
  const [selectedOverlay, setSelectedOverlay] = useState('none');
  const [imagePosition, setImagePosition] = useState<ImagePosition>({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  const [imageTilt, setImageTilt] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
      setProcessedImage(reader.result as string);
      setIsProcessing(true);
      setTimeout(() => setIsProcessing(false), 1500);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveBackground = async () => {
    if (!uploadedImage) return;

    const apiKey = import.meta.env.VITE_REMOVE_BG_API_KEY;
    
    if (!apiKey) {
      console.error('API key not configured');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch(uploadedImage);
      const blob = await response.blob();
      
      const formData = new FormData();
      formData.append('image_file', blob, 'image.png');
      formData.append('size', 'auto');
      formData.append('format', 'png');

      const apiResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
        },
        body: formData,
      });

      if (!apiResponse.ok) {
        throw new Error('Failed to remove background');
      }

      const buffer = await apiResponse.arrayBuffer();
      const base64 = btoa(
        new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      setProcessedImage(`data:image/png;base64,${base64}`);
    } catch (error) {
      console.error('Error removing background:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = async (format: 'png' | 'jpg' | 'svg') => {
    if (!previewRef.current) return;
    setIsProcessing(true);

    try {
      if (format === 'svg') {
        const div = previewRef.current;
        const rect = div.getBoundingClientRect();
        const svgContent = `
          <svg width="${rect.width}" height="${rect.height}" xmlns="http://www.w3.org/2000/svg">
            <style>
              .preview-content { transform-origin: center center; }
              @keyframes scanning {
                0% { transform: translateX(-300%); }
                100% { transform: translateX(300%); }
              }
            </style>
            <foreignObject width="100%" height="100%">
              <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%;">
                ${div.innerHTML}
              </div>
            </foreignObject>
          </svg>
        `;

        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'mockup.svg';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      } else {
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(previewRef.current, {
          allowTaint: true,
          useCORS: true,
          backgroundColor: null,
          scale: 2,
          logging: false,
        });

        const link = document.createElement('a');
        link.download = `mockup.${format}`;
        link.href = canvas.toDataURL(`image/${format}`, 1.0);
        link.click();
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getOverlayStyle = () => {
    const overlay = overlays.find(o => o.id === selectedOverlay);
    if (!overlay || selectedOverlay === 'none') return {};
    
    const style = { ...overlay.style };
    if (style.background) {
      const matches = style.background.match(/(linear|radial)-gradient\((.*)\)/);
      if (matches) {
        const [_, type, content] = matches;
        const newContent = content.replace(/rgba\((\d+,\s*\d+,\s*\d+),\s*[\d.]+\)/g, 
          (_, rgb) => `rgba(${rgb}, ${overlayOpacity / 100})`
        );
        style.background = `${type}-gradient(${newContent})`;
      }
    }
    return style;
  };

  const getTransformStyle = () => {
    return {
      transform: `
        translate(-50%, -50%)
        scale(${imageScale})
        rotate(${imageRotation}deg)
        perspective(1000px)
        rotateY(${imageTilt}deg)
      `,
      transformOrigin: 'center center',
      position: 'absolute' as const,
      top: `calc(50% + ${imagePosition.y}px)`,
      left: `calc(50% + ${imagePosition.x}px)`,
    };
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onExport={handleExport}
        imagePosition={imagePosition}
        scale={imageScale}
        rotation={imageRotation}
        tilt={imageTilt}
        onPositionChange={setImagePosition}
        onScaleChange={setImageScale}
        onRotationChange={setImageRotation}
        onTiltChange={setImageTilt}
        backgroundColor={backgroundColor}
        selectedWallpaper={selectedWallpaper}
        onColorSelect={setBackgroundColor}
        onWallpaperSelect={setSelectedWallpaper}
        overlayOpacity={overlayOpacity}
        selectedOverlay={selectedOverlay}
        onOpacityChange={setOverlayOpacity}
        onOverlaySelect={setSelectedOverlay}
        onImageUpload={handleImageUpload}
        onRemoveBackground={handleRemoveBackground}
        isProcessing={isProcessing}
        isExpanded={isExpanded}
        onExpandedChange={setIsExpanded}
      />
      
      <div className={`pl-16 transition-all duration-300 ${isExpanded ? 'pl-80' : ''}`}>
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h1 className="text-4xl font-bold text-white font-space-grotesk tracking-tight">MockGen</h1>
              <img
                src="https://raw.githubusercontent.com/unsplash/presskit/master/app-icon.png"
                alt="Unsplash Logo"
                className="w-8 h-8"
              />
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <div
                ref={previewRef}
                className="w-full aspect-[16/9] rounded-lg transition-all relative overflow-hidden"
                style={{
                  background: selectedWallpaper
                    ? `url(${selectedWallpaper}) center/cover`
                    : backgroundColor,
                }}
              >
                {processedImage || uploadedImage ? (
                  <img
                    src={processedImage || uploadedImage}
                    alt="Preview"
                    className="preview-content max-w-[80%] max-h-[80%] rounded-lg shadow-xl transition-all select-none"
                    style={getTransformStyle()}
                    draggable={false}
                  />
                ) : (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <ImageIcon className="w-16 h-16 text-white/20" />
                  </div>
                )}
                {selectedOverlay !== 'none' && (
                  <div
                    className="absolute inset-0 transition-opacity"
                    style={getOverlayStyle()}
                  />
                )}
                {isProcessing && (
                  <>
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute h-full w-1 bg-blue-500/30 backdrop-blur-sm animate-scanning-light" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}