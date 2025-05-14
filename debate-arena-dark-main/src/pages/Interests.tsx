
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Check } from "lucide-react";

const Interests = () => {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interestCategories = [
    "Ethics & Morality",
    "Politics & Governance",
    "Law & Justice",
    "Environmental Issues",
    "Science & Technology",
    "Education",
    "Economics & Finance",
    "Culture & Society",
    "Health & Medicine",
    "Media & Communication",
    "Artificial Intelligence & Automation",
    "War & Peace",
    "Religion & Spirituality",
    "Gender & Identity",
    "Youth & Generational Issues",
    "Work & Labor Rights",
    "Globalization",
    "Censorship & Free Speech",
    "Immigration & Borders",
    "Crime & Punishment",
    "Consumerism & Advertising",
    "Digital Privacy & Surveillance",
    "Sports & Competition",
    "Art & Expression",
    "Animal Rights & Welfare"
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleContinue = () => {
    if (selectedInterests.length === 0) {
      toast({
        title: "Select at least one interest",
        description: "You need to select at least one debate topic.",
        variant: "destructive"
      });
      return;
    }
    
    // Save selected interests to localStorage (in a real app, this would go to a database)
    localStorage.setItem("userInterests", JSON.stringify(selectedInterests));
    
    toast({
      title: "Preferences saved",
      description: "Your debate topics have been saved!"
    });
    
    navigate("/topics");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">Select Your Interests</h1>
        <p className="text-foreground/80 mb-8">
          Choose topics you're interested in debating. This will help us personalize your experience.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {interestCategories.map((interest) => (
            <Card 
              key={interest}
              className={`p-4 cursor-pointer flex justify-between items-center transition-all ${
                selectedInterests.includes(interest) 
                  ? "bg-primary/10 border-primary" 
                  : "bg-card hover:bg-muted"
              }`}
              onClick={() => toggleInterest(interest)}
            >
              <span>{interest}</span>
              {selectedInterests.includes(interest) && (
                <Check className="h-5 w-5 text-primary" />
              )}
            </Card>
          ))}
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Interests;
