import { preferences, PreferenceType, State } from "@/data/tourismData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PreferenceSelectionProps {
  state: State;
  onContinue: (selectedPreferences: PreferenceType[]) => void;
  onBack: () => void;
}

export function PreferenceSelection({ state, onContinue, onBack }: PreferenceSelectionProps) {
  const [selected, setSelected] = useState<PreferenceType[]>([]);

  const togglePreference = (pref: PreferenceType) => {
    setSelected(prev => 
      prev.includes(pref)
        ? prev.filter(p => p !== pref)
        : [...prev, pref]
    );
  };

  return (
    <div className="animate-fade-up">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Cities
      </Button>

      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
          What Do You <span className="text-gradient-saffron">Love?</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Select the types of places you enjoy visiting (you can choose multiple)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
        {preferences.map((pref, index) => {
          const isSelected = selected.includes(pref.id);
          
          return (
            <button
              key={pref.id}
              onClick={() => togglePreference(pref.id)}
              className={cn(
                "relative p-6 rounded-2xl border-2 transition-all duration-300 text-left",
                "hover:scale-[1.02]",
                isSelected
                  ? "border-primary bg-primary/5 shadow-soft"
                  : "border-border bg-card hover:border-primary/30",
                "animate-fade-up"
              )}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              
              <div className="text-4xl mb-3">{pref.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {pref.label}
              </h3>
              <p className="text-sm text-muted-foreground">
                {pref.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button
          variant="saffron"
          size="lg"
          onClick={() => onContinue(selected)}
          disabled={selected.length === 0}
          className="gap-2"
        >
          Get Recommendations
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      {selected.length === 0 && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Please select at least one preference to continue
        </p>
      )}
    </div>
  );
}
