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
