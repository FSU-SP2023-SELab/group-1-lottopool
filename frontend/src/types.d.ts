export interface iDashboard {
  balance: number;
  cur_tickets: iUserTicket[];
  message: string;
}

export interface iUserTickets {
  message: string;
  tickets: iUserTicket[];
}

export interface iUserTicket {
  acquired: number;
  id: string;
  paid_for: number;
  picture_url: string;
  pool: iUserPool;
  user_id: string;
  numbers: string;
}

export interface iCurrentPools {
  message: string;
  pools: iUserPool[];
}

export interface iUserPool {
  agency_id: string;
  end: Date;
  id: string;
  jackpot: number;
  my_tickets: iUserTicket[];
  name: string;
  ppt: number;
  start: Date;
  tix_count: number;
  user_count: number;
  won: number;
}

export interface iLanding {
  message: string;
  pool: iLandingPool;
  tix_count: number;
  user_count: number;
}

export interface iLandingPool {
  agency_id: string;
  end: Date;
  id: string;
  jackpot: number;
  name: string;
  ppt: number;
  start: Date;
  won: number;
}

// Auth0 user object
export type iUser = {
  email: string;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string; // url to picture
  sub: string;
  updated_at: Date;
};
