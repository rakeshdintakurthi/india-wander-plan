import { Compass, MapPin } from "lucide-react";

export function Header() {
  return (
    <header className="w-full py-4 px-6 bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-saffron flex items-center justify-center shadow-soft">
            <Compass className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">
              India Explorer
            </h1>
            <p className="text-xs text-muted-foreground">Discover Incredible India</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-secondary-foreground">
            AI-Powered
          </span>
        </div>
      </div>
    </header>
  );
}
