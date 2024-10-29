import React, { useState } from 'react';
import { Layers, Image as ImageIcon, PaintBucket, Download, Settings, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import ImageUpload from './ImageUpload';
import BackgroundPicker from './BackgroundPicker';
import ShadowOverlay from './ShadowOverlay';
import ImageSettings from './ImageSettings';
import DeviceFrame from './DeviceFrame';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onExport: (format: 'png' | 'jpg' | 'svg') => void;
  imagePosition: { x: number; y: number };
  scale: number;
  rotation: number;
  tilt: number;
  onPositionChange: (position: { x: number; y: number }) => void;
  onScaleChange: (scale: number) => void;
  onRotationChange: (rotation: number) => void;
  onTiltChange: (tilt: number) => void;
  backgroundColor: string;
  selectedWallpaper: string | null;
  onColorSelect: (color: string) => void;
  onWallpaperSelect: (wallpaper: string | null) => void;
  overlayOpacity: number;
  selectedOverlay: string;
  onOpacityChange: (opacity: number) => void;
  onOverlaySelect: (overlayId: string) => void;
  onImageUpload: (file: File) => void;
  onRemoveBackground: () => void;
  isProcessing: boolean;
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

export default function Sidebar({
  activeTab,
  onTabChange,
  onExport,
  imagePosition,
  scale,
  rotation,
  tilt,
  onPositionChange,
  onScaleChange,
  onRotationChange,
  onTiltChange,
  backgroundColor,
  selectedWallpaper,
  onColorSelect,
  onWallpaperSelect,
  overlayOpacity,
  selectedOverlay,
  onOpacityChange,
  onOverlaySelect,
  onImageUpload,
  onRemoveBackground,
  isProcessing,
  isExpanded,
  onExpandedChange,
}: SidebarProps) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [expandedTabs, setExpandedTabs] = useState<Record<string, boolean>>({
    image: true,
    settings: false,
    background: false,
    overlay: false,
  });

  const toggleTab = (tabId: string) => {
    if (!isExpanded) {
      onExpandedChange(true);
      setExpandedTabs(prev => ({ ...prev, [tabId]: true }));
    } else {
      setExpandedTabs(prev => ({ ...prev, [tabId]: !prev[tabId] }));
    }
  };

  const tabs = [
    {
      id: 'image',
      icon: ImageIcon,
      label: 'Image',
      content: (
        <div className="overflow-hidden transition-all duration-300 ease-in-out"
             style={{ maxHeight: expandedTabs['image'] ? '1000px' : '0' }}>
          <div className="p-4 space-y-4">
            <ImageUpload onImageUpload={onImageUpload} />
            {activeTab === 'image' && (
              <button
                onClick={onRemoveBackground}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ImageIcon className="w-4 h-4" />
                {isProcessing ? 'Processing...' : 'Remove Background'}
              </button>
            )}
          </div>
        </div>
      ),
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      content: (
        <div className="overflow-hidden transition-all duration-300 ease-in-out"
             style={{ maxHeight: expandedTabs['settings'] ? '1000px' : '0' }}>
          <div className="p-4">
            <ImageSettings
              position={imagePosition}
              scale={scale}
              rotation={rotation}
              tilt={tilt}
              onPositionChange={onPositionChange}
              onScaleChange={onScaleChange}
              onRotationChange={onRotationChange}
              onTiltChange={onTiltChange}
            />
          </div>
        </div>
      ),
    },
    {
      id: 'background',
      icon: PaintBucket,
      label: 'Background',
      content: (
        <div className="overflow-hidden transition-all duration-300 ease-in-out"
             style={{ maxHeight: expandedTabs['background'] ? '1000px' : '0' }}>
          <div className="p-4">
            <BackgroundPicker
              selectedColor={backgroundColor}
              onColorSelect={onColorSelect}
              selectedWallpaper={selectedWallpaper}
              onWallpaperSelect={onWallpaperSelect}
            />
          </div>
        </div>
      ),
    },
    {
      id: 'overlay',
      icon: Layers,
      label: 'Overlay',
      content: (
        <div className="overflow-hidden transition-all duration-300 ease-in-out"
             style={{ maxHeight: expandedTabs['overlay'] ? '1000px' : '0' }}>
          <div className="p-4">
            <ShadowOverlay
              opacity={overlayOpacity}
              selectedOverlay={selectedOverlay}
              onOpacityChange={onOpacityChange}
              onOverlaySelect={onOverlaySelect}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div
        className={`fixed left-0 top-0 h-screen bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-80' : 'w-16'
        }`}
      >
        <div className="flex-1 overflow-y-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isTabExpanded = expandedTabs[tab.id];
            
            return (
              <div key={tab.id} className="border-b border-gray-800">
                <button
                  onClick={() => {
                    onTabChange(tab.id);
                    toggleTab(tab.id);
                  }}
                  className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                  title={!isExpanded ? tab.label : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {isExpanded && (
                    <>
                      <span className="text-sm font-medium flex-1 text-left">{tab.label}</span>
                      {isTabExpanded ? (
                        <ChevronUp className="w-4 h-4 transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                      )}
                    </>
                  )}
                </button>
                {isExpanded && tab.content}
              </div>
            );
          })}
        </div>

        <div className="relative border-t border-gray-800">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="w-full px-4 py-3 flex items-center gap-3 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            title={!isExpanded ? 'Export' : undefined}
          >
            <Download className="w-5 h-5 shrink-0" />
            {isExpanded && <span className="text-sm font-medium">Export</span>}
          </button>
        </div>

        <button
          onClick={() => onExpandedChange(!isExpanded)}
          className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors z-50"
        >
          {isExpanded ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Export Menu Portal */}
      {showExportMenu && (
        <div 
          className="fixed bg-gray-800 rounded-lg shadow-xl p-2 w-24 z-[1000]"
          style={{
            left: isExpanded ? '320px' : '64px',
            bottom: '60px',
          }}
        >
          {['PNG', 'JPG', 'SVG'].map((format) => (
            <button
              key={format}
              onClick={() => {
                onExport(format.toLowerCase() as any);
                setShowExportMenu(false);
              }}
              className="w-full px-3 py-2 text-sm text-white hover:bg-gray-700 rounded"
            >
              {format}
            </button>
          ))}
        </div>
      )}
    </>
  );
}