import React from 'react';
import { WasteItem as WasteItemType } from '../types';

interface WasteItemProps {
  item: WasteItemType;
  position: { x: number; y: number };
  onDragStart: (item: WasteItemType) => void;
  onDragEnd: () => void;
  speed: number;
}

export const WasteItem: React.FC<WasteItemProps> = ({ 
  item, 
  position, 
  onDragStart, 
  onDragEnd,
  speed 
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="absolute cursor-grab active:cursor-grabbing transform hover:scale-110 transition-transform duration-200"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: `top ${speed}ms linear`,
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="bg-white rounded-2xl shadow-lg p-4 border-2 border-gray-200 hover:border-gray-300 min-w-[80px] text-center">
        <div className="text-3xl mb-2">{item.icon}</div>
        <div className="text-xs font-semibold text-gray-700">{item.name}</div>
      </div>
    </div>
  );
};