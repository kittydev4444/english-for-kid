'use client';

import React, { useState, useMemo } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { VocabularyCard } from '@/components/VocabularyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VocabularyPage() {
  const vocabulary = useAppStore((state) => state.vocabulary);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [masteryFilter, setMasteryFilter] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = new Set(vocabulary.map((v) => v.category));
    return ['all', ...Array.from(cats)];
  }, [vocabulary]);

  const filteredVocabulary = useMemo(() => {
    return vocabulary.filter((word) => {
      const matchesSearch =
        word.englishWord.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.thaiTranslation.includes(searchQuery) ||
        word.thaiPronunciation.includes(searchQuery);

      const matchesCategory =
        categoryFilter === 'all' || word.category === categoryFilter;

      const matchesMastery =
        masteryFilter === 'all' ||
        (masteryFilter === 'mastered' && word.mastered) ||
        (masteryFilter === 'learning' && !word.mastered);

      return matchesSearch && matchesCategory && matchesMastery;
    });
  }, [vocabulary, searchQuery, categoryFilter, masteryFilter]);

  const stats = useMemo(() => {
    return {
      total: vocabulary.length,
      mastered: vocabulary.filter((v) => v.mastered).length,
      learning: vocabulary.filter((v) => !v.mastered).length,
    };
  }, [vocabulary]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Vocabulary Tracker</h1>
          <p className="text-muted-foreground">
            Manage and practice your vocabulary with text-to-speech
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Word
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Words</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-green-200">
          <CardHeader className="pb-2">
            <CardDescription>Mastered</CardDescription>
            <CardTitle className="text-3xl text-green-600">{stats.mastered}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardDescription>Learning</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{stats.learning}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vocabulary..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border rounded-md"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
              <select
                value={masteryFilter}
                onChange={(e) => setMasteryFilter(e.target.value)}
                className="px-4 py-2 border rounded-md"
              >
                <option value="all">All Status</option>
                <option value="mastered">Mastered</option>
                <option value="learning">Learning</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vocabulary Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {filteredVocabulary.map((word) => (
          <motion.div
            key={word.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <VocabularyCard word={word} />
          </motion.div>
        ))}
      </motion.div>

      {filteredVocabulary.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No vocabulary found matching your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
