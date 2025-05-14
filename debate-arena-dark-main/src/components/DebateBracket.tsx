
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle, ChevronRight } from "lucide-react";

// Update the interface to include showAdvancementLines prop
interface DebateBracketProps {
  matches: BracketMatch[];
  onSelectMatch: (match: BracketMatch) => void;
  showAdvancementLines?: boolean; // New prop to control advancement lines
}

const DebateBracket = ({ matches, onSelectMatch, showAdvancementLines = true }: DebateBracketProps) => {
  // Group matches by round
  const roundMatches: Record<number, BracketMatch[]> = {};
  matches.forEach(match => {
    if (!roundMatches[match.round]) {
      roundMatches[match.round] = [];
    }
    roundMatches[match.round].push(match);
  });

  const rounds = Object.keys(roundMatches).map(Number).sort((a, b) => a - b);
  
  const getTeamDisplay = (match: BracketMatch, team: any) => {
    if (team.id.startsWith('tbd')) {
      return <span className="text-muted-foreground">TBD</span>;
    }
    
    const isWinner = match.winner === team.id;
    
    return (
      <div className={`flex items-center ${isWinner ? 'font-semibold' : ''}`}>
        <Badge 
          className={`mr-2 ${team.side === 'agree' ? 'bg-blue-600/70' : 'bg-red-600/70'} text-xs`}
        >
          {team.side === 'agree' ? 'A' : 'D'}
        </Badge>
        {team.name}
        {isWinner && <CheckCircle className="ml-1 h-3 w-3 text-green-500" />}
      </div>
    );
  };
  
  const getRoundName = (round: number) => {
    switch(round) {
      case 1: return "Quarter Finals";
      case 2: return "Semi Finals";
      case 3: return "Finals";
      default: return `Round ${round}`;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {rounds.map((round) => (
        <div key={round} className="space-y-4">
          {/* Use more subtle colors for round titles */}
          <div className="text-center bg-muted/20 p-2 rounded-md border border-muted/30">
            <h3 className="font-medium">{getRoundName(round)}</h3>
          </div>
          
          {roundMatches[round].map((match) => (
            <React.Fragment key={match.id}>
              <Card className="relative overflow-hidden border border-muted hover:border-muted-foreground/20 transition-colors hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex justify-between">
                    <span>Match {match.position}</span>
                    {match.isLive && (
                      <Badge className="bg-red-500/80">Live</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pb-3">
                  <div className="space-y-1">
                    {match.teams.map((team, index) => (
                      <div
                        key={team.id}
                        className={`p-1.5 rounded ${match.winner === team.id ? 'bg-muted/30' : 'bg-transparent'}`}
                      >
                        {getTeamDisplay(match, team)}
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs bg-muted/30 hover:bg-muted/50"
                      onClick={() => onSelectMatch(match)}
                    >
                      {match.isLive ? (
                        <>
                          <PlayCircle className="h-3.5 w-3.5 mr-1 text-green-500" />
                          Watch Live
                        </>
                      ) : match.winner ? (
                        <>
                          <CheckCircle className="h-3.5 w-3.5 mr-1 text-blue-500" />
                          View Results
                        </>
                      ) : (
                        'View Match'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Only render advancement lines if showAdvancementLines is true */}
              {showAdvancementLines && round < Math.max(...rounds) && (
                <div className="hidden md:flex justify-center py-2">
                  <ChevronRight className="text-muted-foreground" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DebateBracket;
