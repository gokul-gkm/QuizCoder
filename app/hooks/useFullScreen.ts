"use client";

import { useState, useEffect } from 'react';

export const useFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(!!document.documentElement.requestFullscreen);
  }, []);

  const toggleFullScreen = async () => {
    if (!isSupported) {
      console.warn('Fullscreen is not supported in this browser');
      return;
    }

    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullScreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setIsFullScreen(false);
        }
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  const enterFullScreen = async () => {
    if (!isSupported || document.fullscreenElement) return;
    try {
      await document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } catch (error) {
      console.error('Error entering fullscreen:', error);
    }
  };

  const exitFullScreen = async () => {
    if (!isSupported || !document.fullscreenElement) return;
    try {
      await document.exitFullscreen();
      setIsFullScreen(false);
    } catch (error) {
      console.error('Error exiting fullscreen:', error);
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  return { isSupported, isFullScreen, toggleFullScreen, enterFullScreen, exitFullScreen };
};