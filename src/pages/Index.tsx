import { useState } from "react";
import { Header } from "@/components/Header";
import { StepIndicator } from "@/components/StepIndicator";
import { StateSelection } from "@/components/StateSelection";
import { CitySelection } from "@/components/CitySelection";
import { PreferenceSelection } from "@/components/PreferenceSelection";
import { CityRecommendation } from "@/components/CityRecommendation";
import { PlacesToVisit } from "@/components/PlacesToVisit";
import { TripSchedule } from "@/components/TripSchedule";
import { HistoryAndCulture } from "@/components/HistoryAndCulture";
import { State, City, PreferenceType } from "@/data/tourismData";

type Step = 'state' | 'city' | 'preference' | 'recommendation' | 'places' | 'schedule' | 'history';

const stepLabels = [
  'State',
  'City',
  'Preferences',
  'Recommend',
  'Places',
  'Schedule',
  'History'
];

const stepToNumber: Record<Step, number> = {
  state: 1,
  city: 2,
  preference: 3,
  recommendation: 4,
  places: 5,
  schedule: 6,
  history: 7
};

export default function Index() {
  const [step, setStep] = useState<Step>('state');
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedPreferences, setSelectedPreferences] = useState<PreferenceType[]>([]);
  const [recommendedCity, setRecommendedCity] = useState<City | null>(null);

  const handleStateSelect = (state: State) => {
    setSelectedState(state);
    setStep('city');
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setRecommendedCity(city);
    setStep('places');
  };

  const handlePreferenceContinue = (preferences: PreferenceType[]) => {
    setSelectedPreferences(preferences);
    setStep('recommendation');
  };

  const handleRecommendationContinue = (city: City) => {
    setRecommendedCity(city);
    setStep('places');
  };

  const handlePlacesContinue = () => {
    setStep('schedule');
  };

  const handleScheduleContinue = () => {
    setStep('history');
  };

  const handleRestart = () => {
    setStep('state');
    setSelectedState(null);
    setSelectedCity(null);
    setSelectedPreferences([]);
    setRecommendedCity(null);
  };

  // Alternative flow: State -> Preferences -> Recommendation -> Places -> Schedule -> History
  const handleCityBack = () => {
    setStep('state');
    setSelectedState(null);
  };

  const handleGoToPreferences = () => {
    setStep('preference');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <StepIndicator 
          currentStep={stepToNumber[step]} 
          totalSteps={7}
          labels={stepLabels}
        />

        <div className="mt-8">
          {step === 'state' && (
            <StateSelection onSelect={handleStateSelect} />
          )}

          {step === 'city' && selectedState && (
            <div>
              <CitySelection 
                state={selectedState} 
                onSelect={handleCitySelect}
                onBack={handleCityBack}
              />
              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">Or let AI recommend based on your preferences</p>
                <button
                  onClick={handleGoToPreferences}
                  className="text-primary hover:underline font-medium"
                >
                  Get AI Recommendations →
                </button>
              </div>
            </div>
          )}

          {step === 'preference' && selectedState && (
            <PreferenceSelection 
              state={selectedState}
              onContinue={handlePreferenceContinue}
              onBack={() => setStep('city')}
            />
          )}

          {step === 'recommendation' && selectedState && (
            <CityRecommendation 
              state={selectedState}
              preferences={selectedPreferences}
              onContinue={handleRecommendationContinue}
              onBack={() => setStep('preference')}
            />
          )}

          {step === 'places' && recommendedCity && (
            <PlacesToVisit 
              city={recommendedCity}
              onContinue={handlePlacesContinue}
              onBack={() => selectedCity ? setStep('city') : setStep('recommendation')}
            />
          )}

          {step === 'schedule' && recommendedCity && (
            <TripSchedule 
              city={recommendedCity}
              onContinue={handleScheduleContinue}
              onBack={() => setStep('places')}
            />
          )}

          {step === 'history' && recommendedCity && (
            <HistoryAndCulture 
              city={recommendedCity}
              onRestart={handleRestart}
              onBack={() => setStep('schedule')}
            />
          )}
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border mt-12">
        <p>Made with ❤️ for exploring Incredible India</p>
      </footer>
    </div>
  );
}
