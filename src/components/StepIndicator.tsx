import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && "bg-primary text-primary-foreground shadow-glow scale-110",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium transition-colors hidden sm:block",
                    (isCompleted || isCurrent) ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {labels[i]}
                </span>
              </div>
              
              {i < totalSteps - 1 && (
                <div className="flex-1 mx-2">
                  <div
                    className={cn(
                      "h-1 rounded-full transition-colors duration-500",
                      isCompleted ? "bg-primary" : "bg-muted"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
