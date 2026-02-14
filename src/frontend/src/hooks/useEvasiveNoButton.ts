import { useState, useCallback, RefObject } from 'react';

interface Position {
  x: number;
  y: number;
}

export function useEvasiveNoButton(
  buttonRef: RefObject<HTMLButtonElement | null>,
  yesButtonRef: RefObject<HTMLButtonElement | null>
) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const moveButton = useCallback(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const buttonRect = button.getBoundingClientRect();

    // Use viewport dimensions for movement across entire screen
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate safe boundaries (keep button fully visible on screen)
    const padding = 20;
    const maxX = viewportWidth - buttonRect.width - padding;
    const maxY = viewportHeight - buttonRect.height - padding;
    const minX = padding;
    const minY = padding;

    // Generate random position across the entire viewport
    let newX = Math.random() * (maxX - minX) + minX;
    let newY = Math.random() * (maxY - minY) + minY;

    // Get Yes button position to avoid overlapping
    if (yesButtonRef.current) {
      const yesButtonRect = yesButtonRef.current.getBoundingClientRect();
      const exclusionZone = 150; // Pixels to keep away from Yes button

      // Check if new position would overlap with Yes button
      const wouldOverlap = 
        Math.abs(newX - yesButtonRect.left) < exclusionZone &&
        Math.abs(newY - yesButtonRect.top) < exclusionZone;

      // If overlapping, move to opposite side of screen
      if (wouldOverlap) {
        // Move to far edges
        if (newX < viewportWidth / 2) {
          newX = Math.max(maxX - 100, minX);
        } else {
          newX = minX;
        }
        
        if (newY < viewportHeight / 2) {
          newY = Math.max(maxY - 100, minY);
        } else {
          newY = minY;
        }
      }
    }

    setPosition({ x: newX, y: newY });
  }, [buttonRef, yesButtonRef]);

  return { position, moveButton };
}
