import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  Clock, 
  Send, 
  Award, 
  Star, 
  ChevronRight, 
  PlayCircle, 
  CircleCheck,
  Users,
  Trophy,
  ThumbsUp,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { BracketMatch, DebateMessage, DebateTeam } from "@/types/debate";

interface LiveDebateProps {
  match: BracketMatch;
  debateTitle: string;
}

const LiveDebate: React.FC<LiveDebateProps> = ({ match, debateTitle }) => {
  const [messages, setMessages] = useState<DebateMessage[]>(match.messages || []);
  const [comment, setComment] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(match.timeRemaining || 600); // 10 minutes in seconds
  const [spectatorCount, setSpectatorCount] = useState(Math.floor(Math.random() * 100 + 50));
  const [liveScores, setLiveScores] = useState(match.liveScores || [
    { teamId: match.teams[0].id, score: 50 },
    { teamId: match.teams[1].id, score: 50 }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isFinished, setIsFinished] = useState(false);
  
  // New state for spectator likes
  const [spectatorLikes, setSpectatorLikes] = useState({
    [match.teams[0].id]: 0,
    [match.teams[1].id]: 0
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    
    // Simulate live typing for ongoing debates
    if (match.isLive) {
      const typingInterval = setInterval(() => {
        setIsTyping(prev => !prev);
        
        // Simulate new messages coming in for live debates
        if (Math.random() > 0.7) {
          const sideOptions: ("agree" | "disagree")[] = ["agree", "disagree"];
          const randomSide = sideOptions[Math.floor(Math.random() * 2)];
          const randomTeam = match.teams.find(team => team.side === randomSide);
          
          if (randomTeam) {
            const randomMember = randomTeam.members[Math.floor(Math.random() * randomTeam.members.length)];
            const newLiveMessage: DebateMessage = {
              id: Date.now(),
              userId: randomMember.id,
              userName: randomMember.name,
              message: generateRandomArgument(randomSide, debateTitle),
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              side: randomSide
            };
            
            setMessages(prev => [...prev, newLiveMessage]);
            
            // Update live scores
            updateLiveScores(randomSide);
            
            // Occasionally add AI moderator comments
            if (Math.random() > 0.8) {
              setTimeout(() => {
                const aiMessage: DebateMessage = {
                  id: Date.now() + 1,
                  userId: "ai",
                  userName: "AI Moderator",
                  message: generateAIComment(randomSide, newLiveMessage.message),
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  side: "ai"
                };
                
                setMessages(prev => [...prev, aiMessage]);
              }, 1500);
            }
          }
        }
        
        // Simulate spectator comments
        if (match.isLive && Math.random() > 0.85) {
          const spectatorComment: DebateMessage = {
            id: Date.now() + 2,
            userId: "spectator" + Math.floor(Math.random() * 1000),
            userName: "Spectator " + Math.floor(Math.random() * 100),
            message: generateRandomSpectatorComment(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            side: "spectator"
          };
          
          setMessages(prev => [...prev, spectatorComment]);
        }

        // Simulate spectator count changes
        if (Math.random() > 0.7) {
          setSpectatorCount(prev => prev + Math.floor(Math.random() * 5) - 2);
        }
        
        // Simulate spectator likes
        if (match.isLive && Math.random() > 0.7) {
          const randomTeam = match.teams[Math.floor(Math.random() * 2)];
          setSpectatorLikes(prev => ({
            ...prev,
            [randomTeam.id]: prev[randomTeam.id] + Math.floor(Math.random() * 3) + 1
          }));
          
          // Update live scores with spectator likes
          updateScoresWithSpectatorLikes(randomTeam.id);
        }
      }, 3000);
      
      // Timer countdown
      const timerInterval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 0) {
            clearInterval(timerInterval);
            // Debate ended, show scores
            setIsFinished(true);
            
            toast({
              title: "Debate ended",
              description: "The AI moderator is calculating the scores...",
            });
            
            setTimeout(() => {
              // Add final AI analysis
              const aiSummary: DebateMessage = {
                id: Date.now() + 3,
                userId: "ai",
                userName: "AI Moderator",
                message: "FINAL ANALYSIS: This debate has concluded. Both teams presented strong arguments. Team scores will be displayed shortly.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                side: "ai"
              };
              
              setMessages(prev => [...prev, aiSummary]);
              
              // Generate mock scores - now on a 0-100 scale
              // Note: Scores are compared against same side teams for advancement
              const agreeTeam = match.teams.find(t => t.side === "agree");
              const disagreeTeam = match.teams.find(t => t.side === "disagree");
              
              const mockScores = [
                {
                  teamId: agreeTeam?.id || "",
                  clarity: Math.floor(Math.random() * 25) + 70, // 70-95
                  evidence: Math.floor(Math.random() * 25) + 70,
                  rebuttal: Math.floor(Math.random() * 25) + 70,
                  logic: Math.floor(Math.random() * 25) + 70,
                  get total() { return Math.floor((this.clarity + this.evidence + this.rebuttal + this.logic) / 4); }
                },
                {
                  teamId: disagreeTeam?.id || "",
                  clarity: Math.floor(Math.random() * 25) + 70,
                  evidence: Math.floor(Math.random() * 25) + 70,
                  rebuttal: Math.floor(Math.random() * 25) + 70,
                  logic: Math.floor(Math.random() * 25) + 70,
                  get total() { return Math.floor((this.clarity + this.evidence + this.rebuttal + this.logic) / 4); }
                }
              ];
              
              // Determine winner based on round
              // In semi-finals, compare against same side teams from other matches
              // In finals, compare directly
              let winner;
              if (match.round < 3) {
                // For semi-finals, we'll randomly select a winner for demo purposes
                // In a real app, this would compare with other matches of same side
                winner = Math.random() > 0.5 ? mockScores[0].teamId : mockScores[1].teamId;
              } else {
                // For finals, compare directly
                winner = mockScores[0].total > mockScores[1].total ? mockScores[0].teamId : mockScores[1].teamId;
              }
              
              setTimeout(() => {
                // Update match with scores and winner
                match.scores = mockScores;
                match.winner = winner;
                match.isLive = false;
                
                // Add announcement message
                const winnerTeam = match.teams.find(team => team.id === winner);
                const announcementMessage: DebateMessage = {
                  id: Date.now() + 4,
                  userId: "ai",
                  userName: "AI Moderator",
                  message: `RESULTS: ${winnerTeam?.name} has won this debate! ${match.round < 3 ? "They will advance to the next round as the best " + winnerTeam?.side + " team." : "They are the tournament champions!"}`,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  side: "ai"
                };
                
                setMessages(prev => [...prev, announcementMessage]);
                
                toast({
                  title: "Debate Results",
                  description: `${winnerTeam?.name} has won and advances to the next round!`,
                });
              }, 5000);
            }, 2000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        clearInterval(typingInterval);
        clearInterval(timerInterval);
      };
    }
  }, [match.isLive, debateTitle, match.teams]);

  const updateLiveScores = (side: "agree" | "disagree") => {
    // Update live scores based on new arguments
    setLiveScores(prev => {
      return prev.map(teamScore => {
        const team = match.teams.find(t => t.id === teamScore.teamId);
        if (team?.side === side) {
          // Add between -2 and +5 points, but keep within 0-100
          const change = Math.floor(Math.random() * 8) - 2;
          return {
            ...teamScore,
            score: Math.min(100, Math.max(0, teamScore.score + change))
          };
        }
        // Slightly decrease opponent's score sometimes
        if (Math.random() > 0.7) {
          return {
            ...teamScore,
            score: Math.max(0, teamScore.score - 1)
          };
        }
        return teamScore;
      });
    });
  };
  
  // New function to update scores based on spectator likes
  const updateScoresWithSpectatorLikes = (teamId: string) => {
    setLiveScores(prev => {
      return prev.map(teamScore => {
        if (teamScore.teamId === teamId) {
          // Add 1-2 points for spectator likes
          return {
            ...teamScore,
            score: Math.min(100, teamScore.score + Math.floor(Math.random() * 2) + 1)
          };
        }
        return teamScore;
      });
    });
  };
  
  // New function for spectator to like a team
  const handleLikeTeam = (teamId: string) => {
    if (!match.isLive) return; // Only allow likes for live debates
    
    setSpectatorLikes(prev => ({
      ...prev,
      [teamId]: prev[teamId] + 1
    }));
    
    updateScoresWithSpectatorLikes(teamId);
    
    const team = match.teams.find(t => t.id === teamId);
    toast({
      title: "Vote Recorded",
      description: `You supported the ${team?.side} team: ${team?.name}`,
    });
  };

  const generateRandomArgument = (side: "agree" | "disagree", topic: string) => {
    const agreeArguments = [
      "Building on my teammate's point, we must consider the ethical implications here.",
      "The evidence clearly supports our position as demonstrated by recent studies.",
      "I'd like to address the counterargument by pointing out a logical fallacy.",
      "Historical precedent strengthens our position on this matter.",
      "When we look at real-world examples, our stance is consistently validated."
    ];
    
    const disagreeArguments = [
      "I must challenge the previous assertion with contradictory evidence.",
      "The opposing team's argument overlooks several critical factors.",
      "From a different perspective, we can see that this approach is problematic.",
      "Statistical analysis doesn't support the conclusion they've drawn.",
      "There's a fundamental misunderstanding in how they've framed this issue."
    ];
    
    return side === "agree" ? 
      agreeArguments[Math.floor(Math.random() * agreeArguments.length)] :
      disagreeArguments[Math.floor(Math.random() * disagreeArguments.length)];
  };
  
  const generateAIComment = (side: "agree" | "disagree", message: string) => {
    const aiComments = [
      `ANALYSIS: The ${side} team makes a strong logical argument, though additional evidence would strengthen it.`,
      `FACT CHECK: The claim made by the ${side} team is partially supported by current research.`,
      `FALLACY ALERT: Be careful of hasty generalization in the recent argument.`,
      `CLARITY ASSESSMENT: The ${side} team's argument structure is well-organized and clear.`,
      `REBUTTAL EFFECTIVENESS: Strong counter-argument that directly addresses the opposing point.`
    ];
    
    return aiComments[Math.floor(Math.random() * aiComments.length)];
  };
  
  const generateRandomSpectatorComment = () => {
    const spectatorComments = [
      "Interesting point! I hadn't considered that perspective.",
      "I think both teams are making compelling arguments.",
      "The agree team seems to have stronger evidence so far.",
      "The disagree team's rebuttal was very effective.",
      "I'm learning a lot from this debate!",
      "This topic is more complex than I initially thought.",
      "Can the AI moderator clarify the last fact check?",
      "Great debate so far, really enjoying the points raised.",
      "The team dynamics are fascinating to watch."
    ];
    
    return spectatorComments[Math.floor(Math.random() * spectatorComments.length)];
  };

  const handleSendComment = () => {
    if (!comment.trim()) return;
    
    // In a real app, this would be sent to a backend
    const newComment: DebateMessage = {
      id: messages.length + 1000,
      userId: "spectator",
      userName: "You (Spectator)",
      message: comment,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      side: "spectator"
    };
    
    setMessages([...messages, newComment]);
    setComment("");
    toast({
      title: "Comment posted",
      description: "Your comment has been added to the discussion.",
    });
    
    // Scroll to bottom after posting comment
    setTimeout(scrollToBottom, 100);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getAvatarColor = (userId: string) => {
    if (userId === "ai") return "bg-purple-700";
    
    // Assign consistent colors based on user ID
    const colors = ["bg-blue-600", "bg-green-600", "bg-yellow-600", "bg-red-600"];
    const hash = userId.split("").reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colors[hash % colors.length];
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const renderDebateScores = () => {
    if (!match.scores) return null;
    
    return (
      <div className="mt-6 space-y-4 slide-in">
        <h3 className="text-lg font-medium flex items-center">
          <Award className="h-5 w-5 mr-2 text-yellow-500" />
          Debate Scores
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {match.scores.map((score) => {
            const team = match.teams.find(t => t.id === score.teamId);
            return (
              <div 
                key={score.teamId} 
                className={`p-4 rounded-lg shadow-lg ${
                  match.winner === score.teamId ? "ring-2 ring-yellow-500/50" : ""
                } ${
                  team?.side === "agree" ? 
                    "bg-gradient-to-br from-blue-900/40 to-blue-800/10 border border-blue-600/20" : 
                    "bg-gradient-to-br from-red-900/40 to-red-800/10 border border-red-600/20"
                } scale-in`}
                style={{ animationDelay: `${team?.side === "agree" ? "0.1s" : "0.2s"}` }}
              >
                <h4 className="font-medium mb-2 flex items-center">
                  {team?.side === "agree" ? (
                    <Badge className="mr-2 bg-blue-600">Agree</Badge>
                  ) : (
                    <Badge className="mr-2 bg-red-600">Disagree</Badge>
                  )}
                  {team?.name}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Clarity:</span>
                    <div className="flex items-center">
                      <span className="mr-2">{score.clarity}/100</span>
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${team?.side === "agree" ? "bg-blue-500" : "bg-red-500"}`}
                          style={{ width: `${score.clarity}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Evidence Strength:</span>
                    <div className="flex items-center">
                      <span className="mr-2">{score.evidence}/100</span>
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${team?.side === "agree" ? "bg-blue-500" : "bg-red-500"}`}
                          style={{ width: `${score.evidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Rebuttal Effectiveness:</span>
                    <div className="flex items-center">
                      <span className="mr-2">{score.rebuttal}/100</span>
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${team?.side === "agree" ? "bg-blue-500" : "bg-red-500"}`}
                          style={{ width: `${score.rebuttal}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Logic & Coherence:</span>
                    <div className="flex items-center">
                      <span className="mr-2">{score.logic}/100</span>
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${team?.side === "agree" ? "bg-blue-500" : "bg-red-500"}`}
                          style={{ width: `${score.logic}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between font-medium mt-3 pt-2 border-t border-muted">
                    <span>Total Score:</span>
                    <div className="flex items-center">
                      <span className="text-lg font-bold">{score.total}/100</span>
                    </div>
                  </div>
                </div>
                
                {match.winner === score.teamId && (
                  <div className="mt-3 flex items-center">
                    <Badge className="bg-gradient-to-r from-amber-400 to-yellow-600 flex items-center">
                      <Trophy className="h-3 w-3 mr-1" />
                      Winner
                    </Badge>
                    <ChevronRight className="mx-2 h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Advances to Next Round</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderLiveScores = () => {
    if (!match.isLive) return null;
    
    return (
      <div className="mb-4 bg-secondary/20 p-3 rounded-lg border border-secondary/30 shadow-inner">
        <h3 className="text-sm font-medium flex items-center mb-3">
          <Star className="h-4 w-4 mr-2 text-yellow-500" />
          Live Scoring
        </h3>
        <div className="space-y-3">
          {liveScores.map(score => {
            const team = match.teams.find(t => t.id === score.teamId);
            if (!team) return null;
            
            return (
              <div key={score.teamId} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <div className="flex items-center">
                    <Badge 
                      className={`mr-2 ${team.side === "agree" ? "bg-blue-600" : "bg-red-600"}`}
                    >
                      {team.side === "agree" ? "Agree" : "Disagree"}
                    </Badge>
                    {team.name}
                  </div>
                  <span className={`font-bold ${score.score > 80 ? "text-green-400" : score.score < 40 ? "text-red-400" : ""}`}>
                    {score.score}/100
                  </span>
                </div>
                <Progress 
                  value={score.score} 
                  max={100} 
                  className={`h-2 ${team.side === "agree" ? "bg-blue-950" : "bg-red-950"}`}
                />
                <div className={`h-1.5 w-full overflow-hidden rounded-full ${team.side === "agree" ? "bg-gradient-to-r from-blue-500/20 via-blue-400/10 to-blue-300/5" : "bg-gradient-to-r from-red-500/20 via-red-400/10 to-red-300/5"}`}>
                  <div 
                    className={`h-full transition-all duration-700 ease-in-out ${team.side === "agree" ? "bg-gradient-to-r from-blue-600 to-blue-400" : "bg-gradient-to-r from-red-600 to-red-400"}`}
                    style={{ width: `${score.score}%`, animation: "pulse 2s infinite" }}
                  ></div>
                </div>
                
                {/* Display spectator likes count and like button */}
                <div className="flex justify-end items-center mt-1 text-xs text-muted-foreground">
                  <button 
                    onClick={() => handleLikeTeam(team.id)}
                    className={`flex items-center p-1 px-2 rounded hover:bg-secondary/30 transition-colors ${team.side === "agree" ? "hover:text-blue-400" : "hover:text-red-400"}`}
                  >
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    <span>Support ({spectatorLikes[team.id]})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMessage = (msg: DebateMessage) => {
    const isAI = msg.userId === "ai";
    const isSpectator = msg.side === "spectator";
    
    return (
      <div 
        key={msg.id}
        className={`flex mb-4 ${isSpectator ? "justify-center" : "justify-start"} fade-in`}
      >
        {!isSpectator && (
          <div className="mr-3 pt-1">
            <Avatar>
              <AvatarImage src={""} />
              <AvatarFallback className={getAvatarColor(msg.userId)}>
                {getInitials(msg.userName)}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
        
        <div className={`
          flex-1 max-w-3xl
          ${isSpectator 
            ? "bg-muted/30 px-3 py-2 rounded-lg" 
            : isAI
              ? "bg-gradient-to-r from-purple-900/30 to-purple-800/20 border border-purple-800/30 px-4 py-3 rounded-lg" 
              : msg.side === "agree" 
                ? "bg-gradient-to-r from-blue-900/30 to-blue-800/20 border border-blue-600/30 px-4 py-3 rounded-lg" 
                : "bg-gradient-to-r from-red-900/30 to-red-800/20 border border-red-600/30 px-4 py-3 rounded-lg"
          }
        `}>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <span className="font-semibold text-sm">
                {msg.userName}
              </span>
              {isAI && (
                <Badge variant="outline" className="ml-2 text-xs bg-purple-800/30 border-purple-500/30">
                  Debate AI
                </Badge>
              )}
              {!isAI && !isSpectator && (
                <Badge 
                  variant="outline" 
                  className={`ml-2 text-xs ${
                    msg.side === "agree" ? "bg-blue-800/30 border-blue-500/30" : "bg-red-800/30 border-red-500/30"
                  }`}
                >
                  {msg.side === "agree" ? "Agree" : "Disagree"}
                </Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
          </div>
          <p className={`text-sm ${isAI ? "italic" : ""}`}>{msg.message}</p>
        </div>
      </div>
    );
  };

  const agreeTeam = match.teams.find(team => team.side === "agree");
  const disagreeTeam = match.teams.find(team => team.side === "disagree");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Teams sidebar - now takes up less space */}
      <div className="col-span-1 lg:col-span-3">
        <Card className="bg-gradient-to-b from-background to-muted/5 border-muted">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-medium">Teams</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 border border-blue-600/30 p-3 rounded-lg hover:bg-blue-900/40 transition-colors duration-300 slide-in">
              <Badge className="mb-2 bg-blue-600">Agree</Badge>
              <h4 className="font-semibold">{agreeTeam?.name}</h4>
              <div className="mt-2 space-y-2">
                {agreeTeam?.members.map(member => (
                  <div key={member.id} className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={member.avatar || ""} />
                      <AvatarFallback className={getAvatarColor(member.id)}>
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{member.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-900/30 to-red-800/20 border border-red-600/30 p-3 rounded-lg hover:bg-red-900/40 transition-colors duration-300 slide-in" style={{ animationDelay: "0.1s" }}>
              <Badge className="mb-2 bg-red-600">Disagree</Badge>
              <h4 className="font-semibold">{disagreeTeam?.name}</h4>
              <div className="mt-2 space-y-2">
                {disagreeTeam?.members.map(member => (
                  <div key={member.id} className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={member.avatar || ""} />
                      <AvatarFallback className={getAvatarColor(member.id)}>
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{member.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {renderLiveScores()}
            
            <div className="space-y-2">
              {match.isLive && (
                <div className="p-3 rounded-lg bg-gradient-to-r from-secondary/50 to-secondary/20 flex items-center justify-center slide-in" style={{ animationDelay: "0.2s" }}>
                  <Clock className="h-4 w-4 mr-2 text-red-400" />
                  <span className="text-sm font-medium">{formatTime(timeRemaining)} remaining</span>
                </div>
              )}
              
              <div className="p-3 rounded-lg bg-gradient-to-r from-secondary/50 to-secondary/20 flex items-center justify-center slide-in" style={{ animationDelay: "0.3s" }}>
                <Users className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">{spectatorCount} watching</span>
              </div>

              {match.isLive ? (
                // Less gradient styling for the "Live Now" button
                <div className="p-3 rounded-lg bg-green-900/30 border border-green-600/30 flex items-center justify-center slide-in" style={{ animationDelay: "0.4s" }}>
                  <PlayCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm font-medium text-green-400">Live Now</span>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-purple-900/30 border border-purple-600/30 flex items-center justify-center slide-in" style={{ animationDelay: "0.4s" }}>
                  <CircleCheck className="h-4 w-4 mr-2 text-purple-500" />
                  <span className="text-sm font-medium text-purple-500">Completed</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main debate area - now takes up more space */}
      <div className="col-span-1 lg:col-span-9">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <h3 className="text-lg font-medium">
                {match.isLive ? "Live Debate" : "Debate Results"}
              </h3>
              {!match.isLive && match.winner && (
                <Badge variant="outline" className="bg-yellow-500/30 border-yellow-500/30 text-yellow-200 flex items-center">
                  <Trophy className="h-3 w-3 mr-1" />
                  {match.teams.find(t => t.id === match.winner)?.name} Won
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 space-y-1">
              <h4 className="font-medium">Topic</h4>
              <p className="text-sm text-muted-foreground">{debateTitle}</p>
            </div>
            
            {/* Rendered debate scores for completed debates */}
            {!match.isLive && match.scores && renderDebateScores()}
            
            <div className="mt-6">
              <h4 className="font-medium mb-3 flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Debate Transcript
              </h4>
              {/* Increased height of chat window */}
              <ScrollArea className="border border-muted rounded-lg p-4 h-[500px] bg-muted/10">
                <div className="space-y-4">
                  {messages.length > 0 ? messages.map(renderMessage) : (
                    <div className="text-center text-muted-foreground py-12">
                      The debate transcript will appear here...
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                  
                  {isTyping && match.isLive && (
                    <div className="flex justify-start opacity-60 fade-in">
                      <div className="bg-muted/30 px-3 py-2 rounded-lg">
                        <div className="flex space-x-1 items-center">
                          <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-current animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-2 h-2 rounded-full bg-current animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <div className="flex w-full space-x-2 items-center">
              <Avatar className="h-8 w-8">
                <AvatarFallback>SP</AvatarFallback>
              </Avatar>
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add your comment as a spectator..."
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendComment();
                  }
                }}
              />
              <Button 
                onClick={handleSendComment} 
                size="icon" 
                variant="ghost"
                className="bg-primary/20 hover:bg-primary/30"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {match.isLive && (
              <div className="w-full mt-2 text-xs text-muted-foreground">
                Your comments will be visible to all spectators. Be respectful and on topic.
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LiveDebate;
