export interface iDashboard {
  balance: number;
  cur_tickets: iTicket[];
  message: string;
}

export interface iUserTickets {
  message: string;
  tickets: iTicket[];
}

export interface iTicket {
  acquired: number;
  id: string;
  paid_for: number;
  picture_url: string;
  pool_id: string;
  user_id: string;
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
  my_tickets: iTicket[];
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
