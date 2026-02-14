import { useState } from 'react';
import ValentineProposal from './components/ValentineProposal';
import CelebrationView from './components/CelebrationView';
import FloatingHeartsOverlay from './components/FloatingHeartsOverlay';

function App() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingHeartsOverlay />
      <main className="relative z-10 flex min-h-screen items-center justify-center p-4">
        {!accepted ? (
          <ValentineProposal onAccept={() => setAccepted(true)} />
        ) : (
          <CelebrationView />
        )}
      </main>
      <footer className="relative z-10 py-4 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} · Built with ❤️ using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== 'undefined' ? window.location.hostname : 'valentine-proposal'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
