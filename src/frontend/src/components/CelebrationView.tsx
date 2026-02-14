import { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function CelebrationView() {
  const [show, setShow] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setShow(true), 100);
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const imgSrc = e.currentTarget.src;
    console.warn(`Failed to load image: ${imgSrc}`);
    setImageError(true);
  };

  return (
    <div className={`w-full max-w-3xl mx-auto transition-all duration-1000 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-primary/20">
        {/* Celebration header */}
        <div className="text-center space-y-6 mb-8">
          <div className="flex justify-center gap-4">
            <Sparkles className="w-12 h-12 text-primary animate-pulse" />
            <Heart className="w-16 h-16 text-primary fill-primary animate-bounce" />
            <Sparkles className="w-12 h-12 text-primary animate-pulse" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            Haha, I knew you'd say yes!
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 font-medium">
            I'd like to be your Valentine too. 💕
          </p>
        </div>

        {/* Celebration meme */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-primary/20">
          <img
            src="/assets/generated/valentine-celebration-meme.dim_1200x800.png"
            alt="Celebration"
            className="w-full h-auto"
          />
        </div>

        {/* Additional message */}
        <div className="text-center mt-8 space-y-4">
          <p className="text-lg text-muted-foreground">
            Get ready for the best Valentine's Day ever! 🎉
          </p>
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className="w-6 h-6 text-primary fill-primary animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Uploaded photo at the end */}
        <div className="mt-8 relative rounded-2xl overflow-hidden shadow-xl border-2 border-primary/20">
          {imageError ? (
            <div className="w-full py-12 px-6 bg-muted/50 flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                Photo failed to load.
              </p>
            </div>
          ) : (
            <img
              src="/assets/20250912_152552.jpg"
              alt="Our special moment"
              className="w-full h-auto"
              onError={handleImageError}
            />
          )}
        </div>
      </div>
    </div>
  );
}
