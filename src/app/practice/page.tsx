'use client';

import React, { useState, useCallback } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TTSButton } from '@/components/TTSButton';
import { CheckCircle2, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { VocabularyWord } from '@/types';

export default function PracticePage() {
  const vocabulary = useAppStore((state) => state.vocabulary);
  const addPronunciationPractice = useAppStore(
    (state) => state.addPronunciationPractice
  );

  const [currentWord, setCurrentWord] = useState<VocabularyWord | null>(() => {
    // Initialize with a random word if vocabulary exists
    if (vocabulary.length > 0) {
      const randomIndex = Math.floor(Math.random() * vocabulary.length);
      return vocabulary[randomIndex];
    }
    return null;
  });
  const [practiceHistory, setPracticeHistory] = useState<
    { word: string; rating: string }[]
  >([]);

  const getRandomWord = useCallback(() => {
    if (vocabulary.length === 0) return;
    const randomIndex = Math.floor(Math.random() * vocabulary.length);
    setCurrentWord(vocabulary[randomIndex]);
  }, [vocabulary]);

  const handleRating = (rating: 'good' | 'okay' | 'try-again') => {
    if (!currentWord) return;

    addPronunciationPractice({
      wordId: currentWord.id,
      date: new Date().toISOString(),
      rating,
    });

    setPracticeHistory((prev) => [
      ...prev,
      { word: currentWord.englishWord, rating },
    ]);

    setTimeout(() => {
      getRandomWord();
    }, 500);
  };

  const stats = practiceHistory.reduce(
    (acc, item) => {
      if (item.rating === 'good') acc.good++;
      else if (item.rating === 'okay') acc.okay++;
      else acc.tryAgain++;
      return acc;
    },
    { good: 0, okay: 0, tryAgain: 0 }
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Pronunciation Practice</h1>
        <p className="text-muted-foreground">
          Listen to words and practice pronunciation
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Good
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.good}</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Okay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{stats.okay}</div>
          </CardContent>
        </Card>
        <Card className="border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Try Again
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{stats.tryAgain}</div>
          </CardContent>
        </Card>
      </div>

      {/* Practice Card */}
      {currentWord ? (
        <motion.div
          key={currentWord.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8">
            <CardContent className="space-y-8 pt-6">
              <div className="text-center">
                <div className="mb-2">
                  <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {currentWord.category}
                  </span>
                </div>
                <h2 className="text-6xl font-bold mb-4">
                  {currentWord.englishWord}
                </h2>
                <div className="flex justify-center mb-6">
                  <TTSButton
                    text={currentWord.englishWord}
                    size="lg"
                    variant="default"
                    className="h-16 w-16"
                  />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-2xl text-muted-foreground">
                    {currentWord.thaiTranslation}
                  </p>
                  <p className="text-lg italic text-muted-foreground">
                    {currentWord.thaiPronunciation}
                  </p>
                </div>
              </div>

              {currentWord.exampleSentence && (
                <div className="border-t pt-6">
                  <p className="text-center text-muted-foreground mb-2">
                    Example:
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <p className="text-lg">{currentWord.exampleSentence}</p>
                    <TTSButton
                      text={currentWord.exampleSentence}
                      size="sm"
                      variant="outline"
                    />
                  </div>
                </div>
              )}

              <div className="border-t pt-6">
                <p className="text-center text-sm text-muted-foreground mb-4">
                  How was the pronunciation?
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    size="lg"
                    onClick={() => handleRating('good')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    Good
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleRating('okay')}
                    className="border-yellow-600 text-yellow-600 hover:bg-yellow-50"
                  >
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Okay
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleRating('try-again')}
                    className="border-red-600 text-red-600 hover:bg-red-50"
                  >
                    <XCircle className="h-5 w-5 mr-2" />
                    Try Again
                  </Button>
                </div>
              </div>

              <div className="flex justify-center">
                <Button variant="ghost" onClick={getRandomWord}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Skip to Next Word
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No vocabulary available. Add some words to practice!
            </p>
          </CardContent>
        </Card>
      )}

      {/* Recent History */}
      {practiceHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Practice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {practiceHistory.slice(-10).reverse().map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <span className="font-medium">{item.word}</span>
                  <span
                    className={
                      item.rating === 'good'
                        ? 'text-green-600'
                        : item.rating === 'okay'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }
                  >
                    {item.rating === 'good'
                      ? '✓ Good'
                      : item.rating === 'okay'
                      ? '~ Okay'
                      : '✗ Try Again'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
