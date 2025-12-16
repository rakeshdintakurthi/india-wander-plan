import { City } from "@/data/tourismData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface TripScheduleProps {
  city: City;
  onContinue: () => void;
  onBack: () => void;
}

export function TripSchedule({ city, onContinue, onBack }: TripScheduleProps) {
  const [days, setDays] = useState<number>(2);
  const [schedule, setSchedule] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateSchedule = async () => {
    setIsLoading(true);
    setSchedule(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-trip', {
        body: {
          city: city.name,
          days: days,
          type: 'schedule'
        }
      });

      if (error) throw error;
      
      setSchedule(data.content);
    } catch (error) {
      console.error('Error generating schedule:', error);
      toast({
        title: "Error",
        description: "Failed to generate trip schedule. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-up">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Places
      </Button>

      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">AI-Powered Planning</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
          Plan Your <span className="text-gradient-saffron">Trip</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Let AI create a personalized day-wise itinerary for your {city.name} trip
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Day Selection */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">How many days?</h3>
          </div>
          
          <div className="flex gap-3 mb-6">
            {[1, 2, 3].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={cn(
                  "flex-1 py-4 rounded-xl border-2 transition-all duration-300 font-semibold",
                  days === d
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/30"
                )}
              >
                {d} {d === 1 ? 'Day' : 'Days'}
              </button>
            ))}
          </div>

          <Button
            variant="saffron"
            size="lg"
            onClick={generateSchedule}
            disabled={isLoading}
            className="w-full gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Schedule...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate AI Schedule
              </>
            )}
          </Button>
        </div>

        {/* Generated Schedule */}
        {schedule && (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card animate-scale-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full gradient-saffron flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Your {days}-Day Itinerary</h3>
                <p className="text-sm text-muted-foreground">{city.name}</p>
              </div>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {schedule}
              </div>
            </div>
          </div>
        )}

        {schedule && (
          <div className="flex justify-center mt-6">
            <Button
              variant="teal"
              size="lg"
              onClick={onContinue}
              className="gap-2"
            >
              Learn About History & Culture
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
