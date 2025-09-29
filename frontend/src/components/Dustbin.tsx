import React from 'react';
import { Trash2, Recycle, AlertTriangle } from 'lucide-react';

interface DustbinProps {
  type: 'wet' | 'dry' | 'toxic';
  onDrop: (type: string) => void;
  isHighlighted: boolean;
}

export const Dustbin: React.FC<DustbinProps> = ({ type, onDrop, isHighlighted }) => {
  const config = {
    wet: {
      color: 'green',
      icon: Trash2,
      label: 'Wet Waste',
      bgColor: 'bg-green-500',
      borderColor: 'border-green-600',
      hoverColor: 'hover:bg-green-600'
    },
    dry: {
      color: 'blue',
      icon: Recycle,
      label: 'Dry Waste',
      bgColor: 'bg-blue-500',
      borderColor: 'border-blue-600',
      hoverColor: 'hover:bg-blue-600'
    },
    toxic: {
      color: 'red',
      icon: AlertTriangle,
      label: 'Toxic Waste',
      bgColor: 'bg-red-500',
      borderColor: 'border-red-600',
      hoverColor: 'hover:bg-red-600'
    }
  };

  const { icon: Icon, label, bgColor, borderColor, hoverColor } = config[type];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop(type);
  };

  return (
    <div
      className={`
        ${bgColor} ${borderColor} ${hoverColor}
        w-32 h-40 rounded-3xl border-4 flex flex-col items-center justify-center
        text-white font-bold shadow-2xl transition-all duration-300 cursor-pointer
        ${isHighlighted ? 'scale-110 ring-4 ring-yellow-300' : 'hover:scale-105'}
      `}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Icon size={40} className="mb-2" />
      <span className="text-sm text-center px-2">{label}</span>
    </div>
  );
};