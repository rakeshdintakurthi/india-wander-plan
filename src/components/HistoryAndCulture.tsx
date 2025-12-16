import { City } from "@/data/tourismData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Loader2, RefreshCw, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface HistoryAndCultureProps {
  city: City;
  onRestart: () => void;
  onBack: () => void;
}

export function HistoryAndCulture({ city, onRestart, onBack }: HistoryAndCultureProps) {
  const [history, setHistory] = useState<string | null>(null);
  const [traditions, setTraditions] = useState<string | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isLoadingTraditions, setIsLoadingTraditions] = useState(false);

  const generateHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-trip', {
        body: {
          city: city.name,
          type: 'history'
        }
      });

      if (error) throw error;
      setHistory(data.content);
    } catch (error) {
      console.error('Error generating history:', error);
      toast({
        title: "Error",
        description: "Failed to generate history content.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const generateTraditions = async () => {
    setIsLoadingTraditions(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-trip', {
        body: {
          city: city.name,
          type: 'traditions'
        }
      });

      if (error) throw error;
      setTraditions(data.content);
    } catch (error) {
      console.error('Error generating traditions:', error);
      toast({
        title: "Error",
        description: "Failed to generate traditions content.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingTraditions(false);
    }
  };

  useEffect(() => {
    generateHistory();
    generateTraditions();
  }, [city.name]);

  return (
    <div className="animate-fade-up">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Trip Plan
      </Button>

      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4">
          <BookOpen className="w-4 h-4" />
          <span className="text-sm font-medium">Cultural Insights</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
          History & <span className="text-gradient-saffron">Traditions</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Discover the rich heritage and cultural traditions of {city.name}
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* History Section */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-saffron flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold">History of {city.name}</h3>
            </div>
            {!isLoadingHistory && (
              <Button
                variant="ghost"
                size="sm"
                onClick={generateHistory}
                className="gap-1"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            )}
          </div>
          
          {isLoadingHistory ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : history ? (
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {history}
              </p>
            </div>
          ) : null}
        </div>

        {/* Traditions Section */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-teal flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold">Local Traditions & Culture</h3>
            </div>
            {!isLoadingTraditions && (
              <Button
                variant="ghost"
                size="sm"
                onClick={generateTraditions}
                className="gap-1"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            )}
          </div>
          
          {isLoadingTraditions ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : traditions ? (
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {traditions}
              </p>
            </div>
          ) : null}
        </div>

        {/* Restart Button */}
        <div className="flex justify-center pt-6">
          <Button
            variant="saffron"
            size="lg"
            onClick={onRestart}
            className="gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Plan Another Trip
          </Button>
        </div>
      </div>
    </div>
  );
}
