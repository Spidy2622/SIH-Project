import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Heart, Star, Zap } from 'lucide-react';
import { WasteItem } from './WasteItem';
import { Dustbin } from './Dustbin';
import { wasteItems } from '../data/wasteItems';
import { WasteItem as WasteItemType, GameState, Mistake } from '../types';

interface GamePageProps {
  onNavigate: (page: string, gameState?: GameState) => void;
}

interface FallingItem {
  item: WasteItemType;
  id: string;
  x: number;
  y: number;
}

export const GamePage: React.FC<GamePageProps> = ({ onNavigate }) => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    lives: 3,
    mistakes: [],
    isGameOver: false,
    itemsFallen: 0
  });
  
  const [fallingItems, setFallingItems] = useState<FallingItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<WasteItemType | null>(null);
  const [showFeedback, setShowFeedback] = useState<{ show: boolean; correct: boolean; item?: WasteItemType; correctBin?: string }>({ show: false, correct: false });
  const [highlightedBin, setHighlightedBin] = useState<string | null>(null);

  const gameSpeed = Math.max(1000 - (gameState.level - 1) * 150, 300);
  const spawnRate = Math.max(2000 - (gameState.level - 1) * 200, 800);

  const getRandomItem = () => {
    return wasteItems[Math.floor(Math.random() * wasteItems.length)];
  };

  const spawnItem = useCallback(() => {
    if (gameState.isGameOver) return;

    const item = getRandomItem();
    const newItem: FallingItem = {
      item,
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * (window.innerWidth - 100),
      y: -100
    };

    setFallingItems(prev => [...prev, newItem]);
  }, [gameState.isGameOver]);

  const moveItems = useCallback(() => {
    setFallingItems(prev => {
      const updated = prev.map(item => ({
        ...item,
        y: item.y + (100 / gameSpeed) * 16
      })).filter(item => {
        if (item.y > window.innerHeight) {
          setGameState(prevState => ({
            ...prevState,
            lives: prevState.lives - 1,
            itemsFallen: prevState.itemsFallen + 1
          }));
          return false;
        }
        return true;
      });
      
      return updated;
    });
  }, [gameSpeed]);

  useEffect(() => {
    const spawnInterval = setInterval(spawnItem, spawnRate);
    const moveInterval = setInterval(moveItems, 16);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(moveInterval);
    };
  }, [spawnItem, moveItems, spawnRate]);

  useEffect(() => {
    if (gameState.lives <= 0) {
      setGameState(prev => ({ ...prev, isGameOver: true }));
      setTimeout(() => {
        onNavigate('results', gameState);
      }, 2000);
    }

    if (gameState.itemsFallen > 0 && gameState.itemsFallen % 10 === 0 && gameState.itemsFallen / 10 === gameState.level) {
      setGameState(prev => ({ ...prev, level: prev.level + 1 }));
    }
  }, [gameState.lives, gameState.itemsFallen, gameState.level, onNavigate, gameState]);

  const handleDrop = (binType: string) => {
    if (!draggedItem) return;

    const isCorrect = draggedItem.type === binType;
    
    setFallingItems(prev => prev.filter(item => item.item.id !== draggedItem.id));
    
    if (isCorrect) {
      setGameState(prev => ({ ...prev, score: prev.score + 5 }));
      setShowFeedback({ show: true, correct: true });
    } else {
      const mistake: Mistake = {
        item: draggedItem,
        selectedBin: binType,
        correctBin: draggedItem.type
      };
      
      setGameState(prev => ({
        ...prev,
        score: prev.score - 5,
        mistakes: [...prev.mistakes, mistake]
      }));
      
      setShowFeedback({ 
        show: true, 
        correct: false, 
        item: draggedItem, 
        correctBin: draggedItem.type 
      });
      
      setHighlightedBin(draggedItem.type);
    }

    setDraggedItem(null);
    
    setTimeout(() => {
      setShowFeedback({ show: false, correct: false });
      setHighlightedBin(null);
    }, 2000);
  };

  const handleDragStart = (item: WasteItemType) => {
    setDraggedItem(item);
  };

  const handleDragEnd = () => {
    // Item will be handled in drop
  };

  if (gameState.isGameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Game Over!</h2>
          <p className="text-gray-600 mb-4">Final Score: {gameState.score}</p>
          <p className="text-gray-600">Redirecting to results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-sm">
        <button
          onClick={() => onNavigate('home')}
          className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-all flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Home
        </button>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Star className="text-yellow-500" size={24} />
            <span className="font-bold text-xl">{gameState.score}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Zap className="text-purple-500" size={24} />
            <span className="font-bold">Level {gameState.level}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Heart className="text-red-500" size={24} />
            <span className="font-bold">{gameState.lives}</span>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative h-full">
        {fallingItems.map((fallingItem) => (
          <WasteItem
            key={fallingItem.id}
            item={fallingItem.item}
            position={{ x: fallingItem.x, y: fallingItem.y }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            speed={gameSpeed}
          />
        ))}
      </div>

      {/* Dustbins */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-8">
        <Dustbin 
          type="wet" 
          onDrop={handleDrop} 
          isHighlighted={highlightedBin === 'wet'} 
        />
        <Dustbin 
          type="dry" 
          onDrop={handleDrop} 
          isHighlighted={highlightedBin === 'dry'} 
        />
        <Dustbin 
          type="toxic" 
          onDrop={handleDrop} 
          isHighlighted={highlightedBin === 'toxic'} 
        />
      </div>

      {/* Feedback */}
      {showFeedback.show && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className={`${showFeedback.correct ? 'bg-green-500' : 'bg-red-500'} text-white p-6 rounded-3xl shadow-2xl max-w-sm text-center animate-bounce`}>
            <div className="text-4xl mb-2">
              {showFeedback.correct ? '✅' : '❌'}
            </div>
            <h3 className="text-xl font-bold mb-2">
              {showFeedback.correct ? 'Correct!' : 'Oops!'}
            </h3>
            {!showFeedback.correct && showFeedback.item && (
              <div>
                <p className="mb-2">
                  {showFeedback.item.name} goes in the{' '}
                  <span className="font-bold capitalize">{showFeedback.correctBin}</span> bin
                </p>
                <p className="text-sm opacity-90">
                  {showFeedback.item.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};