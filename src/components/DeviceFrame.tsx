import React from 'react';
import { Smartphone, Laptop, Monitor } from 'lucide-react';

export const devices = [
  {
    id: 'none',
    label: 'None',
    icon: Monitor,
    frame: null,
    contentClass: '',
  },
  {
    id: 'iphone',
    label: 'iPhone',
    icon: Smartphone,
    frame: 'https://raw.githubusercontent.com/pixsellz/device-frames/main/assets/iphone-14-pro.png',
    contentClass: 'w-[88.5%] h-[96%] rounded-[6%] top-[2%] left-[5.75%]',
  },
  {
    id: 'macbook',
    label: 'MacBook',
    icon: Laptop,
    frame: 'https://raw.githubusercontent.com/pixsellz/device-frames/main/assets/macbook-pro.png',
    contentClass: 'w-[75.5%] h-[76%] top-[6%] left-[12.25%] rounded-lg',
  },
  {
    id: 'laptop',
    label: 'Windows Laptop',
    icon: Monitor,
    frame: 'https://raw.githubusercontent.com/pixsellz/device-frames/main/assets/surface-laptop.png',
    contentClass: 'w-[71.5%] h-[72%] top-[7%] left-[14.25%] rounded-lg',
  },
];

interface DeviceFrameProps {
  selectedDevice: string;
  onDeviceSelect: (deviceId: string) => void;
}

export default function DeviceFrame({ selectedDevice, onDeviceSelect }: DeviceFrameProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {devices.map((device) => {
          const Icon = device.icon;
          return (
            <button
              key={device.id}
              onClick={() => onDeviceSelect(device.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                selectedDevice === device.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{device.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}