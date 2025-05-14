
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users, TrendingUp, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Topics = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<any[]>([]);
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("trending");

  useEffect(() => {
    // Get user interests from localStorage
    const savedInterests = localStorage.getItem("userInterests");
    if (savedInterests) {
      setUserInterests(JSON.parse(savedInterests));
    }
    
    // In a real app, these would be fetched from an API
    generateMockTopics();
  }, []);

  const generateMockTopics = () => {
    // Generate mock trending topics
    const mockTrendingTopics = [
      {
        id: 1,
        title: "Should AI systems have the same rights as humans?",
        category: "Artificial Intelligence & Automation",
        participants: 124,
        comments: 432,
        trending: true,
        date: "Today"
      },
      {
        id: 2,
        title: "Is universal basic income a viable solution to automation-induced unemployment?",
        category: "Economics & Finance",
        participants: 98,
        comments: 316,
        trending: true,
        date: "Today"
      },
      {
        id: 4,
        title: "Does social media do more harm than good for society?",
        category: "Media & Communication",
        participants: 187,
        comments: 623,
        trending: true,
        date: "Today"
      },
      {
        id: 6,
        title: "Is veganism the most ethical dietary choice?",
        category: "Ethics & Morality",
        participants: 67,
        comments: 298,
        trending: true,
        date: "Today"
      },
      {
        id: 8,
        title: "Are standardized tests an effective measure of student ability?",
        category: "Education",
        participants: 72,
        comments: 256,
        trending: true,
        date: "Today"
      },
      {
        id: 10,
        title: "Should vaccine mandates be implemented for global pandemics?",
        category: "Health & Medicine",
        participants: 156,
        comments: 422,
        trending: true,
        date: "Today"
      },
      {
        id: 12,
        title: "Is surveillance capitalism a threat to democracy?",
        category: "Digital Privacy & Surveillance",
        participants: 104,
        comments: 387,
        trending: true,
        date: "Today"
      },
      {
        id: 14,
        title: "Does cryptocurrency provide genuine economic value?",
        category: "Economics & Finance",
        participants: 143,
        comments: 486,
        trending: true,
        date: "Today"
      },
      {
        id: 16,
        title: "Should genetic engineering of humans be permitted?",
        category: "Science & Technology",
        participants: 128,
        comments: 413,
        trending: true,
        date: "Today"
      },
      {
        id: 18,
        title: "Is online anonymity a right that should be protected?",
        category: "Digital Privacy & Surveillance",
        participants: 92,
        comments: 345,
        trending: true,
        date: "Today"
      }
    ];
    
    // Generate mock recent topics
    const mockRecentTopics = [
      {
        id: 3,
        title: "Should vaccinations be mandatory for all citizens?",
        category: "Health & Medicine",
        participants: 156,
        comments: 512,
        trending: false,
        date: "3 days ago"
      },
      {
        id: 5,
        title: "Should the death penalty be abolished worldwide?",
        category: "Law & Justice",
        participants: 132,
        comments: 478,
        trending: false,
        date: "2 days ago"
      },
      {
        id: 7,
        title: "Should all countries implement a four-day workweek?",
        category: "Work & Labor Rights",
        participants: 89,
        comments: 345,
        trending: false,
        date: "Yesterday"
      },
      {
        id: 9,
        title: "Does religion have a place in modern education?",
        category: "Religion & Spirituality",
        participants: 146,
        comments: 526,
        trending: false,
        date: "5 days ago"
      },
      {
        id: 11,
        title: "Are open borders a viable immigration policy?",
        category: "Immigration & Borders",
        participants: 168,
        comments: 612,
        trending: false,
        date: "4 days ago"
      },
      {
        id: 13,
        title: "Should governments regulate social media content?",
        category: "Censorship & Free Speech",
        participants: 118,
        comments: 422,
        trending: false,
        date: "6 days ago"
      },
      {
        id: 15,
        title: "Is competitive sports an essential part of education?",
        category: "Sports & Competition",
        participants: 73,
        comments: 295,
        trending: false,
        date: "Yesterday"
      },
      {
        id: 17,
        title: "Should voting be mandatory in democracies?",
        category: "Politics & Governance",
        participants: 102,
        comments: 376,
        trending: false,
        date: "3 days ago"
      },
      {
        id: 19,
        title: "Is a global language beneficial for humanity?",
        category: "Culture & Society",
        participants: 86,
        comments: 312,
        trending: false,
        date: "4 days ago"
      },
      {
        id: 20,
        title: "Should junk food be taxed at a higher rate?",
        category: "Health & Medicine",
        participants: 94,
        comments: 338,
        trending: false,
        date: "Yesterday"
      },
      {
        id: 21,
        title: "Is nuclear energy the best solution for climate change?",
        category: "Environmental Issues",
        participants: 126,
        comments: 456,
        trending: false,
        date: "6 days ago"
      },
      {
        id: 22,
        title: "Should billionaires exist in an ethical society?",
        category: "Ethics & Morality",
        participants: 137,
        comments: 498,
        trending: false,
        date: "5 days ago"
      },
      {
        id: 23,
        title: "Is modern art valuable or overrated?",
        category: "Art & Expression",
        participants: 83,
        comments: 301,
        trending: false,
        date: "2 days ago"
      },
      {
        id: 24,
        title: "Should zoos be banned?",
        category: "Animal Rights & Welfare",
        participants: 109,
        comments: 394,
        trending: false,
        date: "Yesterday"
      },
      {
        id: 25,
        title: "Is automation a net positive for workers?",
        category: "Work & Labor Rights",
        participants: 92,
        comments: 332,
        trending: false,
        date: "3 days ago"
      },
      {
        id: 26,
        title: "Should countries prioritize space exploration?",
        category: "Science & Technology",
        participants: 121,
        comments: 438,
        trending: false,
        date: "4 days ago"
      },
      {
        id: 27,
        title: "Is meritocracy a fair system?",
        category: "Politics & Governance",
        participants: 89,
        comments: 322,
        trending: false,
        date: "2 days ago"
      },
      {
        id: 28,
        title: "Should gambling be legalized and regulated?",
        category: "Law & Justice",
        participants: 103,
        comments: 372,
        trending: false,
        date: "Yesterday"
      },
      {
        id: 29,
        title: "Is factory farming ethically justifiable?",
        category: "Animal Rights & Welfare",
        participants: 118,
        comments: 427,
        trending: false,
        date: "6 days ago"
      },
      {
        id: 30,
        title: "Should college education be free?",
        category: "Education",
        participants: 142,
        comments: 514,
        trending: false,
        date: "5 days ago"
      }
    ];
    
    setTopics([...mockTrendingTopics, ...mockRecentTopics]);
  };

  const filteredTopics = topics.filter(topic => {
    if (activeTab === "trending") {
      return topic.trending;
    } else {
      return !topic.trending;
    }
  });
  
  const handleTopicClick = (topicId: number) => {
    navigate(`/debate/${topicId}`);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">Debate Topics</h1>
        
        <Tabs defaultValue="trending" className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="trending" onClick={() => setActiveTab("trending")}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending Today
            </TabsTrigger>
            <TabsTrigger value="recent" onClick={() => setActiveTab("recent")}>
              <Calendar className="h-4 w-4 mr-2" />
              Past 7 Days
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="trending" className="mt-6">
            <p className="text-foreground/80 mb-6">
              Hot topics being debated right now, based on your interests. Showing the top 10 trending debates.
            </p>
          </TabsContent>
          <TabsContent value="recent" className="mt-6">
            <p className="text-foreground/80 mb-6">
              Recently created debate topics from the past 7 days. Showing 20 recent debates.
            </p>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTopics.map((topic) => (
            <Card 
              key={topic.id}
              className="cursor-pointer hover:bg-muted/40 transition-colors"
              onClick={() => handleTopicClick(topic.id)}
            >
              <CardHeader>
                <CardTitle className="text-xl">{topic.title}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-secondary/50 hover:bg-secondary text-xs">
                    {topic.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm space-x-4">
                  <Badge variant={activeTab === "trending" ? "default" : "outline"} className="text-xs">
                    {topic.date}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{topic.participants}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{topic.comments}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Topics;
