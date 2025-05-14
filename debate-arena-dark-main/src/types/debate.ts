
export interface DebateMessage {
  id: number;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
  side: "agree" | "disagree" | "spectator" | "ai";
}

export interface DebateTeam {
  id: string;
  name: string;
  members: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  side: "agree" | "disagree";
}

export interface BracketMatch {
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
