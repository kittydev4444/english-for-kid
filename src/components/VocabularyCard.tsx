'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { TTSButton } from './TTSButton';
import { VocabularyWord } from '@/types';
import { cn } from '@/lib/utils';
import { Check, Edit, Trash } from 'lucide-react';
import { Button } from './ui/button';
import { useAppStore } from '@/store/useAppStore';

interface VocabularyCardProps {
  word: VocabularyWord;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({
  word,
  onEdit,
  onDelete,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const toggleMastered = useAppStore((state) => state.toggleMastered);
  const incrementPracticeCount = useAppStore(
    (state) => state.incrementPracticeCount
  );

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleToggleMastered = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleMastered(word.id);
  };

  const handlePlay = () => {
    incrementPracticeCount(word.id);
  };

  return (
    <div className="perspective-1000">
      <motion.div
        className="relative h-64 cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onClick={handleCardClick}
      >
        {/* Front of card */}
        <Card
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center p-6 backface-hidden card-glow',
            word.mastered && 'border-secondary border-2'
          )}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-center justify-between w-full mb-4">
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
              {word.category}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleMastered}
              className={cn(
                word.mastered && 'text-green-600'
              )}
            >
              <Check className="h-4 w-4" />
            </Button>
          </div>

          <h2 className="text-4xl font-bold text-center mb-4">
            {word.englishWord}
          </h2>

          <TTSButton
            text={word.englishWord}
            size="lg"
            variant="default"
            className="mb-4"
            onStart={handlePlay}
          />

          {word.exampleSentence && (
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground italic">
                {word.exampleSentence}
              </p>
              <TTSButton
                text={word.exampleSentence}
                size="sm"
                variant="outline"
                className="mt-2"
              />
            </div>
          )}

          <p className="text-xs text-muted-foreground mt-4">
            Click to flip • Week {word.weekLearned}
          </p>
        </Card>

        {/* Back of card */}
        <Card
          className="absolute inset-0 flex flex-col items-center justify-center p-6 backface-hidden card-glow border-secondary/30"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <h3 className="text-2xl font-semibold text-center mb-2">
            {word.thaiTranslation}
          </h3>
          <p className="text-lg text-muted-foreground italic mb-4">
            {word.thaiPronunciation}
          </p>

          <TTSButton
            text={word.englishWord}
            size="lg"
            variant="secondary"
            className="mb-6"
          />

          <div className="flex gap-2 mt-4">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <Trash className="h-4 w-4 mr-1" />
                Delete
              </Button>
            )}
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Practiced: {word.practiceCount} times
          </p>
        </Card>
      </motion.div>
    </div>
  );
};
