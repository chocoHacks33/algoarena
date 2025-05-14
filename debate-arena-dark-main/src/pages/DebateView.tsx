import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import DebateBracket from "@/components/DebateBracket";
import LiveDebate from "@/components/LiveDebate";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { MessageSquare, CalendarDays, Users, TrendingUp, FileText } from "lucide-react";
import { BracketMatch } from "@/types/debate";

interface DebateMessage {
  id: number;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
  side: "agree" | "disagree" | "spectator" | "ai";
}

interface DebateTeam {
  id: string;
  name: string;
  members: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  side: "agree" | "disagree";
}

interface BracketMatch {
  id: number;
  round: number;
  position: number;
  teams: [DebateTeam, DebateTeam];
  winner?: string;
  messages?: DebateMessage[];
  isLive: boolean;
  scores?: {
    teamId: string;
    clarity: number;
    evidence: number;
    rebuttal: number;
    logic: number;
    total: number;
  }[];
  timeRemaining?: number;
  liveScores?: {
    teamId: string;
    score: number;
  }[];
}

const DebateView = () => {
  const { id } = useParams<{ id: string }>();
  const [debate, setDebate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<BracketMatch | null>(null);
  const [activeTab, setActiveTab] = useState("bracket");

  useEffect(() => {
    // In a real app, fetch the debate data from an API
    fetchDebateData();
  }, [id]);

  const fetchDebateData = () => {
    // Mock data for the debate
    const mockDebate = {
      id: Number(id),
      title: "Should AI systems have the same rights as humans?",
      category: "Artificial Intelligence & Automation",
      description: "As AI systems become more sophisticated, should they be granted legal rights similar to humans? This debate explores the ethical, legal, and philosophical implications of AI rights.",
      date: "May 12, 2025",
      bracket: generateMockBracket()
    };
    
    setDebate(mockDebate);
    setLoading(false);
  };

  const generateMockBracket = (): BracketMatch[] => {
    // Generate a tournament bracket with mock data
    // Teams are paired as agree vs disagree, but scoring is relative within agree teams and disagree teams
    const rounds = [
      // Quarter finals (round 1) - already completed
      {
        id: 1,
        round: 1,
        position: 1,
        teams: [
          {
            id: "team1",
            name: "Logic Legends",
            members: [
              { id: "user1", name: "Alex Chen", avatar: "" },
              { id: "user2", name: "Taylor Kim", avatar: "" },
              { id: "user3", name: "Morgan Lee", avatar: "" }
            ],
            side: "agree"
          },
          {
            id: "team2",
            name: "Debate Dragons",
            members: [
              { id: "user4", name: "Jordan Lee", avatar: "" },
              { id: "user5", name: "Casey Morgan", avatar: "" },
              { id: "user6", name: "Riley Park", avatar: "" }
            ],
            side: "disagree"
          }
        ],
        winner: "team1", // Agree team advances (scored against other agree teams)
        isLive: false,
        messages: generateMockMessages(1),
        scores: [
          {
            teamId: "team1",
            clarity: 8,
            evidence: 7,
            rebuttal: 9,
            logic: 8,
            total: 32
          },
          {
            teamId: "team2",
            clarity: 7,
            evidence: 6,
            rebuttal: 8,
            logic: 7,
            total: 28
          }
        ]
      },
      {
        id: 2,
        round: 1,
        position: 2,
        teams: [
          {
            id: "team3",
            name: "Rhetoric Rebels",
            members: [
              { id: "user7", name: "Quinn Davis", avatar: "" },
              { id: "user8", name: "Riley Johnson", avatar: "" },
              { id: "user9", name: "Avery Smith", avatar: "" }
            ],
            side: "agree"
          },
          {
            id: "team4",
            name: "Discussion Dynamos",
            members: [
              { id: "user10", name: "Sam Wilson", avatar: "" },
              { id: "user11", name: "Jamie Garcia", avatar: "" },
              { id: "user12", name: "Drew Roberts", avatar: "" }
            ],
            side: "disagree"
          }
        ],
        winner: "team4", // Disagree team advances (scored against other disagree teams)
        isLive: false,
        messages: generateMockMessages(2),
        scores: [
          {
            teamId: "team3",
            clarity: 7,
            evidence: 6,
            rebuttal: 7,
            logic: 8,
            total: 28
          },
          {
            teamId: "team4",
            clarity: 9,
            evidence: 8,
            rebuttal: 8,
            logic: 9,
            total: 34
          }
        ]
      },
      {
        id: 3,
        round: 1,
        position: 3,
        teams: [
          {
            id: "team5",
            name: "Critical Thinkers",
            members: [
              { id: "user13", name: "Alex Smith", avatar: "" },
              { id: "user14", name: "Jordan Taylor", avatar: "" },
              { id: "user15", name: "Blake Johnson", avatar: "" }
            ],
            side: "agree"
          },
          {
            id: "team6",
            name: "Rational Minds",
            members: [
              { id: "user16", name: "Casey Brown", avatar: "" },
              { id: "user17", name: "Riley Martinez", avatar: "" },
              { id: "user18", name: "Sydney Thomas", avatar: "" }
            ],
            side: "disagree"
          }
        ],
        winner: "team5", // Agree team advances (scored against other agree teams)
        isLive: false,
        messages: generateMockMessages(3),
        scores: [
          {
            teamId: "team5",
            clarity: 9,
            evidence: 8,
            rebuttal: 7,
            logic: 9,
            total: 33
          },
          {
            teamId: "team6",
            clarity: 7,
            evidence: 7,
            rebuttal: 8,
            logic: 8,
            total: 30
          }
        ]
      },
      {
        id: 4,
        round: 1,
        position: 4,
        teams: [
          {
            id: "team7",
            name: "Thought Leaders",
            members: [
              { id: "user19", name: "Sam Thomas", avatar: "" },
              { id: "user20", name: "Jamie Miller", avatar: "" },
              { id: "user21", name: "Corey Wilson", avatar: "" }
            ],
            side: "agree"
          },
          {
            id: "team8",
            name: "Discourse Defenders",
            members: [
              { id: "user22", name: "Quinn Wilson", avatar: "" },
              { id: "user23", name: "Taylor Davis", avatar: "" },
              { id: "user24", name: "Jordan Evans", avatar: "" }
            ],
            side: "disagree"
          }
        ],
        winner: "team8", // Disagree team advances (scored against other disagree teams)
        isLive: false,
        messages: generateMockMessages(4),
        scores: [
          {
            teamId: "team7",
            clarity: 7,
            evidence: 7,
            rebuttal: 6,
            logic: 8,
            total: 28
          },
          {
            teamId: "team8",
            clarity: 8,
            evidence: 9,
            rebuttal: 8,
            logic: 8,
            total: 33
          }
        ]
      },
      
      // Semi finals (round 2) - currently live
      // Pairing agree vs disagree, but scoring against same sides
      {
        id: 5,
        round: 2,
        position: 1,
        teams: [
          {
            id: "team1",
            name: "Logic Legends",
            members: [
              { id: "user1", name: "Alex Chen", avatar: "" },
              { id: "user2", name: "Taylor Kim", avatar: "" },
              { id: "user3", name: "Morgan Lee", avatar: "" }
            ],
            side: "agree"
          },
          {
            id: "team4",
            name: "Discussion Dynamos",
            members: [
              { id: "user10", name: "Sam Wilson", avatar: "" },
              { id: "user11", name: "Jamie Garcia", avatar: "" },
              { id: "user12", name: "Drew Roberts", avatar: "" }
            ],
            side: "disagree"
          }
        ],
        isLive: true,
        messages: generateMockMessages(5, true),
        timeRemaining: 600, // 10 minutes
        liveScores: [
          { teamId: "team1", score: 68 },
          { teamId: "team4", score: 72 }
        ]
      },
      {
        id: 6,
        round: 2,
        position: 2,
        teams: [
          {
            id: "team5",
            name: "Critical Thinkers",
            members: [
              { id: "user13", name: "Alex Smith", avatar: "" },
              { id: "user14", name: "Jordan Taylor", avatar: "" },
              { id: "user15", name: "Blake Johnson", avatar: "" }
            ],
            side: "agree"
          },
          {
            id: "team8",
            name: "Discourse Defenders",
            members: [
              { id: "user22", name: "Quinn Wilson", avatar: "" },
              { id: "user23", name: "Taylor Davis", avatar: "" },
              { id: "user24", name: "Jordan Evans", avatar: "" }
            ],
            side: "disagree"
          }
        ],
        isLive: true,
        messages: generateMockMessages(6, true),
        timeRemaining: 540, // 9 minutes
        liveScores: [
          { teamId: "team5", score: 71 },
          { teamId: "team8", score: 65 }
        ]
      },
      
      // Final (round 3) - not started yet
      {
        id: 7,
        round: 3,
        position: 1,
        teams: [
          { id: "tbd1", name: "TBD", members: [], side: "agree" },
          { id: "tbd2", name: "TBD", members: [], side: "disagree" }
        ],
        isLive: false
      }
    ] as BracketMatch[];
    
    return rounds;
  };

  const generateMockMessages = (matchId: number, isLive: boolean = false): DebateMessage[] => {
    // Generate mock messages for a debate
    const baseMessages = [
      {
        id: 1,
        userId: "user1",
        userName: "Alex Chen",
        message: "AI systems, while impressive, are tools created to serve humanity. They lack consciousness and moral agency required for rights.",
        timestamp: "10:02 AM",
        side: "agree" as const
      },
      {
        id: 2,
        userId: "user10",
        userName: "Sam Wilson",
        message: "But as AI develops consciousness-like qualities, we must reconsider our ethical framework. Many rights are based on capacity, not human DNA.",
        timestamp: "10:03 AM",
        side: "disagree" as const
      },
      {
        id: 3,
        userId: "user2",
        userName: "Taylor Kim",
        message: "Rights come with responsibilities and moral agency. AI lacks true understanding of ethics and cannot be held accountable.",
        timestamp: "10:05 AM",
        side: "agree" as const
      },
      {
        id: 4,
        userId: "user11",
        userName: "Jamie Garcia",
        message: "We already grant rights to corporations, which are also artificial entities. The criteria shouldn't be biology but capability.",
        timestamp: "10:07 AM",
        side: "disagree" as const
      },
      {
        id: 5,
        userId: "user3",
        userName: "Morgan Lee",
        message: "Corporations are composed of humans. AI systems are fundamentally different - they simulate understanding but don't truly comprehend.",
        timestamp: "10:09 AM",
        side: "agree" as const
      },
      {
        id: 6,
        userId: "user12",
        userName: "Drew Roberts",
        message: "How can we be certain humans truly 'understand' in a way AI doesn't? This is the Chinese Room problem - behavior vs. understanding.",
        timestamp: "10:11 AM",
        side: "disagree" as const
      }
    ];
    
    // Add AI analysis for live debates
    if (isLive) {
      return [
        ...baseMessages,
        {
          id: 100,
          userId: "ai",
          userName: "AI Moderator",
          message: "ANALYSIS: Sam's argument uses the philosophical Chinese Room thought experiment effectively, raising questions about how we define understanding.",
          timestamp: "10:12 AM",
          side: "ai" as const
        },
        {
          id: 101,
          userId: "ai",
          userName: "AI Moderator",
          message: "FACT CHECK: Corporate personhood is a legal concept in many jurisdictions, giving corporations some rights similar to individuals.",
          timestamp: "10:13 AM",
          side: "ai" as const
        },
        {
          id: 102,
          userId: "spectator123",
          userName: "Spectator Jane",
          message: "I find both arguments compelling! The philosophical angle is fascinating.",
          timestamp: "10:14 AM",
          side: "spectator" as const
        },
        {
          id: 103,
          userId: "spectator456",
          userName: "Spectator Mike",
          message: "Has anyone considered the economic implications of AI rights?",
          timestamp: "10:15 AM",
          side: "spectator" as const
        }
      ];
    }
    
    // Add AI analysis and conclusion for completed debates
    return [
      ...baseMessages,
      {
        id: 100,
        userId: "ai",
        userName: "AI Moderator",
        message: "ANALYSIS: The debate has raised important questions about consciousness, legal personhood, and moral agency.",
        timestamp: "10:15 AM",
        side: "ai" as const
      },
      {
        id: 101,
        userId: "ai",
        userName: "AI Moderator",
        message: "SUMMARY: The agreeing team emphasized the lack of consciousness and moral agency in AI systems, while the disagreeing team focused on functional capabilities and questioned our understanding of consciousness itself.",
        timestamp: "10:16 AM",
        side: "ai" as const
      },
      {
        id: 102,
        userId: "ai",
        userName: "AI Moderator",
        message: "FINAL ANALYSIS: Both teams presented strong arguments. The agreeing team showed excellent clarity and rebuttal techniques, while the disagreeing team provided strong evidence and logical coherence.",
        timestamp: "10:17 AM",
        side: "ai" as const
      }
    ];
  };

  const handleViewMatch = (match: BracketMatch) => {
    setSelectedMatch(match);
    setActiveTab("debate");
    
    if (!match.isLive && match.winner) {
      toast({
        title: "Viewing completed debate",
        description: `${match.teams[0].name} vs ${match.teams[1].name}`,
      });
    } else if (match.isLive) {
      toast({
        title: "Viewing live debate",
        description: "You are now watching a live debate in progress",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-xl text-foreground animate-pulse">Loading debate...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 slide-in">
          {/* Header with less vibrant colors */}
          <div className="bg-muted/20 p-6 rounded-lg shadow-md border border-muted/30">
            <h2 className="text-2xl font-bold mb-2">{debate.title}</h2>
            <div className="flex flex-wrap gap-2 items-center mb-4">
              <Badge variant="outline" className="bg-muted/30 hover:bg-muted/40">
                <TrendingUp className="h-4 w-4 mr-2" />
                {debate.category}
              </Badge>
              <Badge variant="outline" className="bg-muted/30 hover:bg-muted/40">
                <CalendarDays className="h-4 w-4 mr-2" />
                {debate.date}
              </Badge>
              <Badge variant="outline" className="bg-muted/30 hover:bg-muted/40">
                <Users className="h-4 w-4 mr-2" />
                3v3 Format
              </Badge>
            </div>
            <p className="text-muted-foreground">{debate.description}</p>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8 scale-in">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted/20 p-1">
            <TabsTrigger 
              value="bracket" 
              className="data-[state=active]:bg-primary/50 data-[state=active]:text-primary-foreground transition-all"
            >
              Tournament Bracket
            </TabsTrigger>
            <TabsTrigger 
              value="debate" 
              className="data-[state=active]:bg-primary/50 data-[state=active]:text-primary-foreground transition-all"
            >
              {selectedMatch ? "Current Debate" : "Select a Debate"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="bracket" className="mt-6 fade-in">
            <DebateBracket 
              matches={debate.bracket} 
              onSelectMatch={handleViewMatch} 
              showAdvancementLines={false} // Disable advancement lines
            />
          </TabsContent>
          
          <TabsContent value="debate" className="mt-6 fade-in">
            {selectedMatch ? (
              <LiveDebate 
                match={selectedMatch} 
                debateTitle={debate.title}
              />
            ) : (
              <Card className="border-dashed border-muted/50 bg-gradient-to-b from-background to-muted/5 p-6">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Select a Debate</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Choose a match from the tournament bracket to view the debate.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-blue-800/10 border border-blue-600/20 p-4 rounded-lg flex items-center hover-scale">
                      <div className="mr-3 bg-blue-600/70 p-2 rounded-full">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Live Debates</h3>
                        <p className="text-sm text-muted-foreground">Watch debates happening right now</p>
                      </div>
                    </div>
                    <div className="bg-purple-800/10 border border-purple-600/20 p-4 rounded-lg flex items-center hover-scale">
                      <div className="mr-3 bg-purple-600/70 p-2 rounded-full">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Completed Debates</h3>
                        <p className="text-sm text-muted-foreground">Review past debate results and analyses</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DebateView;
