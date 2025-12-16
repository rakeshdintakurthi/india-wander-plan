import { states, suggestBestState, State } from "@/data/tourismData";
import { Button } from "@/components/ui/button";
import { Sparkles, MapPin } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface StateSelectionProps {
  onSelect: (state: State) => void;
}

export function StateSelection({ onSelect }: StateSelectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleSuggest = () => {
    const suggested = suggestBestState();
    onSelect(suggested);
  };

  return (
    <div className="animate-fade-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
          Choose Your <span className="text-gradient-saffron">Destination</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Select a state to explore or let us suggest the perfect destination for you
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <Button
          variant="teal"
          size="lg"
          onClick={handleSuggest}
          className="gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Suggest Best State
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {states.map((state, index) => (
          <button
            key={state.id}
            onClick={() => onSelect(state)}
            onMouseEnter={() => setHoveredId(state.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={cn(
              "group relative overflow-hidden rounded-2xl bg-card border border-border shadow-card transition-all duration-500 text-left",
              "hover:shadow-glow hover:border-primary/30 hover:scale-[1.02]",
              "animate-fade-up"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="aspect-[16/10] relative overflow-hidden">
              <img
                src={state.image}
                alt={state.name}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-700",
                  hoveredId === state.id && "scale-110"
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <h3 className="text-xl font-display font-bold text-card">
                    {state.name}
                  </h3>
                </div>
                <p className="text-card/90 text-sm line-clamp-2">
                  {state.description}
                </p>
              </div>
            </div>

            <div className="p-4 bg-card">
              <div className="flex flex-wrap gap-2">
                {state.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
