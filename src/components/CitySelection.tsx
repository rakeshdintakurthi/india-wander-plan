import { getCitiesByState, State, City } from "@/data/tourismData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Tag } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CitySelectionProps {
  state: State;
  onSelect: (city: City) => void;
  onBack: () => void;
}

export function CitySelection({ state, onSelect, onBack }: CitySelectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const cities = getCitiesByState(state.id);

  return (
    <div className="animate-fade-up">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to States
      </Button>

      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-4">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{state.name}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
          Explore <span className="text-gradient-saffron">Cities</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Choose a city to discover its unique attractions and experiences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {cities.map((city, index) => (
          <button
            key={city.id}
            onClick={() => onSelect(city)}
            onMouseEnter={() => setHoveredId(city.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={cn(
              "group relative overflow-hidden rounded-2xl bg-card border border-border shadow-card transition-all duration-500 text-left",
              "hover:shadow-glow hover:border-primary/30 hover:scale-[1.02]",
              "animate-fade-up"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={city.image}
                alt={city.name}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-700",
                  hoveredId === city.id && "scale-110"
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-display font-bold text-card mb-1">
                  {city.name}
                </h3>
              </div>
            </div>

            <div className="p-4 bg-card">
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {city.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {city.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {cities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No cities available for this state yet. Please check back later!
          </p>
        </div>
      )}
    </div>
  );
}
