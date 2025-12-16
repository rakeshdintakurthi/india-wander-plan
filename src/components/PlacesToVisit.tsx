import { City, getPlacesByCity, Place } from "@/data/tourismData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Clock, MapPin, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlacesToVisitProps {
  city: City;
  onContinue: () => void;
  onBack: () => void;
}

export function PlacesToVisit({ city, onContinue, onBack }: PlacesToVisitProps) {
  const places = getPlacesByCity(city.id);

  return (
    <div className="animate-fade-up">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Recommendation
      </Button>

      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-4">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{city.name}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
          Places to <span className="text-gradient-saffron">Visit</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Discover the must-see attractions in {city.name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
        {places.map((place, index) => (
          <div
            key={place.id}
            className={cn(
              "group relative overflow-hidden rounded-2xl bg-card border border-border shadow-card transition-all duration-500",
              "hover:shadow-glow hover:border-primary/30",
              "animate-fade-up"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="aspect-[16/10] relative overflow-hidden">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium">
                  <Tag className="w-3 h-3" />
                  {place.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-display font-bold text-card">
                  {place.name}
                </h3>
              </div>
            </div>

            <div className="p-4 bg-card">
              <p className="text-muted-foreground text-sm mb-3">
                {place.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-primary">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{place.visitDuration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {places.length === 0 && (
        <div className="text-center py-12 mb-8">
          <p className="text-muted-foreground">
            Place information coming soon for this city!
          </p>
        </div>
      )}

      <div className="flex justify-center">
        <Button
          variant="saffron"
          size="lg"
          onClick={onContinue}
          className="gap-2"
        >
          Plan Your Trip
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
