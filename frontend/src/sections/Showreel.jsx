export default function Showreel() {
  return (
    <section className="showreel" aria-label="Studio showreel">
      <div className="showreel-frame">
        <svg className="showreel-ribbons" viewBox="0 0 1440 460" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="ribbon-gradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#0d3d28" />
              <stop offset="40%" stopColor="#e9fff0" />
              <stop offset="58%" stopColor="#23d47b" />
              <stop offset="100%" stopColor="#104b31" />
            </linearGradient>
            <filter id="ribbon-glow" x="-30%" y="-100%" width="160%" height="300%">
              <feGaussianBlur stdDeviation="9" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <path className="ribbon-glow" d="M-50 355 C160 355 160 90 370 90 S580 380 790 380 1000 60 1210 60 1400 300 1500 300" />
          <path className="ribbon-line ribbon-main" d="M-50 355 C160 355 160 90 370 90 S580 380 790 380 1000 60 1210 60 1400 300 1500 300" />
          <path className="ribbon-line ribbon-secondary" d="M-50 420 C180 420 180 153 397 153 S605 430 822 430 1035 120 1248 120 1410 357 1500 357" />
          <path className="ribbon-line ribbon-faint" d="M-50 295 C144 295 144 30 339 30 S540 319 736 319 930 8 1127 8 1375 240 1500 240" />
          <circle className="ribbon-node" cx="370" cy="90" r="5" />
          <circle className="ribbon-node" cx="790" cy="380" r="4" />
          <circle className="ribbon-node" cx="1210" cy="60" r="5" />
        </svg>
        <div className="showreel-copy">
          <span className="mono">A FEW SECONDS INSIDE THE STUDIO</span>
          <p>Make them<br /><em>feel something.</em></p>
          <span className="mono showreel-note">SHOWREEL PLACEHOLDER — ADD /VIDEOS/SHOWREEL.MP4</span>
        </div>
      </div>
    </section>
  );
}
