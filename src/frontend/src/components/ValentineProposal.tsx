import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useEvasiveNoButton } from '../hooks/useEvasiveNoButton';

interface ValentineProposalProps {
  onAccept: () => void;
}

const cutePrompts = [
  "Are you sure? 🥺",
  "Please reconsider! 💕",
  "Don't break my heart! 💔",
  "Give me a chance! 🌹",
  "Pretty please? 🥰",
  "I promise to make you happy! ✨",
  "Just one yes? 💝",
  "You know you want to! 😊"
];

export default function ValentineProposal({ onAccept }: ValentineProposalProps) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { position, moveButton } = useEvasiveNoButton(noButtonRef, yesButtonRef);

  const handleNoHover = () => {
    moveButton();
    setPromptIndex((prev) => (prev + 1) % cutePrompts.length);
    setShowPrompt(true);
    setTimeout(() => setShowPrompt(false), 2000);
  };

  const handleNoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleNoHover();
  };

  useEffect(() => {
    const button = noButtonRef.current;
    if (!button) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      handleNoHover();
    };

    button.addEventListener('touchstart', handleTouchStart, { passive: false });
    
    return () => {
      button.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-2xl mx-auto"
      style={{ minHeight: '500px' }}
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10 bg-center bg-cover rounded-3xl"
        style={{ backgroundImage: 'url(/assets/generated/valentine-background-pattern.dim_1600x900.png)' }}
      />
      
      {/* Main card */}
      <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-primary/20">
        <div className="text-center space-y-8">
          {/* Heart icon */}
          <div className="flex justify-center">
            <div className="relative">
              <Heart className="w-20 h-20 text-primary fill-primary animate-pulse" />
              <div className="absolute inset-0 animate-ping opacity-20">
                <Heart className="w-20 h-20 text-primary fill-primary" />
              </div>
            </div>
          </div>

          {/* Main question */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
              Bhavica,
            </h1>
            <p className="text-2xl md:text-3xl text-foreground/90 font-medium">
              will you be my Valentine?
            </p>
          </div>

          {/* Cute prompt message */}
          <div className="h-8 flex items-center justify-center">
            {showPrompt && (
              <p className="text-lg text-primary font-medium animate-in fade-in slide-in-from-bottom-2 duration-300">
                {cutePrompts[promptIndex]}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="relative flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              ref={yesButtonRef}
              onClick={onAccept}
              size="lg"
              className="text-xl px-12 py-6 h-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Yes! 💕
            </Button>

            <Button
              ref={noButtonRef}
              onMouseEnter={handleNoHover}
              onClick={handleNoClick}
              onPointerDown={handleNoClick}
              size="lg"
              variant="outline"
              className="text-xl px-12 py-6 h-auto border-2 transition-all duration-300 hover:scale-105"
              style={{
                position: position.x !== 0 || position.y !== 0 ? 'fixed' : 'relative',
                left: position.x !== 0 ? `${position.x}px` : 'auto',
                top: position.y !== 0 ? `${position.y}px` : 'auto',
                transition: 'left 0.3s ease-out, top 0.3s ease-out',
                zIndex: 50
              }}
            >
              No 😢
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
