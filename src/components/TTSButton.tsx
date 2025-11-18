"use client";

import { isSpeaking, speak, stopSpeaking } from "@/lib/tts";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";

interface TTSButtonProps {
  text: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "ghost" | "secondary";
  showLabel?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
}

export const TTSButton: React.FC<TTSButtonProps> = ({
  text,
  className,
  size = "icon",
  variant = "default",
  showLabel = false,
  onStart,
  onEnd,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const ttsSettings = useAppStore((state) => state.ttsSettings);

  const handleSpeak = () => {
    if (isSpeaking()) {
      stopSpeaking();
      setIsPlaying(false);
      onEnd?.();
      return;
    }

    speak(
      text,
      ttsSettings,
      () => {
        setIsPlaying(true);
        onStart?.();
      },
      () => {
        setIsPlaying(false);
        onEnd?.();
      },
      (error) => {
        console.error("TTS Error:", error);
        setIsPlaying(false);
        onEnd?.();
      }
    );
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSpeak}
      className={cn("relative", className)}
      title={isPlaying ? "Stop speaking" : "Play pronunciation"}>
      <motion.div
        animate={isPlaying ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ repeat: isPlaying ? Infinity : 0, duration: 1 }}>
        {isPlaying ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </motion.div>
      {showLabel && <span className="ml-2">{isPlaying ? "Stop" : "Play"}</span>}
    </Button>
  );
};
