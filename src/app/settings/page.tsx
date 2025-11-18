"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ensureVoicesLoaded, speak } from "@/lib/tts";
import { useAppStore } from "@/store/useAppStore";
import { Download, Upload, Volume2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function SettingsPage() {
  const ttsSettings = useAppStore((state) => state.ttsSettings);
  const updateTTSSettings = useAppStore((state) => state.updateTTSSettings);
  const darkMode = useAppStore((state) => state.darkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);
  const exportData = useAppStore((state) => state.exportData);
  const importData = useAppStore((state) => state.importData);
  const resetAllData = useAppStore((state) => state.resetAllData);

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    ensureVoicesLoaded().then(setVoices);
  }, []);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `english-teaching-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      importData(content);
      alert("Data imported successfully!");
    };
    reader.readAsText(file);
  };

  const handleTestVoice = () => {
    speak("Hello! This is a test of the text-to-speech system.", ttsSettings);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Configure your teaching app preferences
        </p>
      </div>

      {/* TTS Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Text-to-Speech Settings</CardTitle>
          <CardDescription>
            Customize how words and sentences are pronounced
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Voice</label>
            <select
              value={ttsSettings.voice}
              onChange={(e) => updateTTSSettings({ voice: e.target.value })}
              className="w-full px-3 py-2 border rounded-md">
              <option value="">Default</option>
              {voices
                .filter((v) => v.lang.startsWith("en"))
                .map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Speed: {ttsSettings.speed}x</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={ttsSettings.speed}
              onChange={(e) =>
                updateTTSSettings({ speed: parseFloat(e.target.value) })
              }
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.5x (Slow)</span>
              <span>1x (Normal)</span>
              <span>2x (Fast)</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Volume: {Math.round(ttsSettings.volume * 100)}%</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={ttsSettings.volume}
              onChange={(e) =>
                updateTTSSettings({ volume: parseFloat(e.target.value) })
              }
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <select
              value={ttsSettings.language}
              onChange={(e) => updateTTSSettings({ language: e.target.value })}
              className="w-full px-3 py-2 border rounded-md">
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="en-AU">English (AU)</option>
            </select>
          </div>

          <Button
            onClick={handleTestVoice}
            variant="outline"
            className="w-full">
            <Volume2 className="h-4 w-4 mr-2" />
            Test Voice
          </Button>
        </CardContent>
      </Card>

      {/* App Settings */}
      <Card>
        <CardHeader>
          <CardTitle>App Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Dark Mode</label>
              <p className="text-sm text-muted-foreground">
                Toggle dark mode theme
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Backup, restore, or reset your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Button onClick={handleExport} variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <p className="text-xs text-muted-foreground mt-1">
              Download all your data as a JSON file
            </p>
          </div>

          <div>
            <label htmlFor="import-file">
              <Button variant="outline" className="w-full" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Data
                </span>
              </Button>
            </label>
            <input
              id="import-file"
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Upload a previously exported JSON file
            </p>
          </div>

          <div className="border-t pt-4">
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to reset all data? This cannot be undone!"
                  )
                ) {
                  resetAllData();
                  alert("All data has been reset.");
                }
              }}>
              Reset All Data
            </Button>
            <p className="text-xs text-muted-foreground mt-1">
              This will delete all lessons, vocabulary, tests, and settings
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
