import { City, PreferenceType, getRecommendationReason, State, recommendCity } from "@/data/tourismData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, MapPin, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CityRecommendationProps {
  state: State;
  preferences: PreferenceType[];
  onContinue: (city: City) => void;
  onBack: () => void;
}

export function CityRecommendation({ state, preferences, onContinue, onBack }: CityRecommendationProps) {
  const city = recommendCity(state.id, preferences);
  const reason = city ? getRecommendationReason(city, preferences) : "";

  if (!city) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No cities match your preferences. Please go back and try different options.
        </p>
        <Button variant="ghost" onClick={onBack} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Change Preferences
      </Button>

      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">AI Recommendation</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
          We Recommend <span className="text-gradient-saffron">{city.name}</span>
        </h2>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-card border border-border shadow-glow animate-scale-in">
          <div className="aspect-[16/10] relative overflow-hidden">
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-card/80 text-sm">{state.name}</span>
              </div>
              <h3 className="text-3xl font-display font-bold text-card mb-2">
                {city.name}
              </h3>
              <p className="text-card/90 text-lg">
                {city.description}
              </p>
            </div>
          </div>

          <div className="p-6 bg-card">
            <div className={cn(
              "p-4 rounded-xl bg-secondary/50 border border-primary/20 mb-6"
            )}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Why this recommendation?</p>
                  <p className="text-muted-foreground">{reason}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {city.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Button
              variant="saffron"
              size="lg"
              onClick={() => onContinue(city)}
              className="w-full gap-2"
            >
              Explore Places to Visit
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
