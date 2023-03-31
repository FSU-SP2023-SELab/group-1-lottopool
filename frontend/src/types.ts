import type { Component } from "solid-js";

// Auth0 user object
export type User = {
  email: string;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string; // url to picture
  sub: string;
  updated_at: Date;
};

export type Access = {
  user_id: string;
  type: string;
};

export type Dashboard = {
  id: number;
  name: string;
  owner_id: string;
};

export interface DashboardWithBlocks extends Dashboard {
  blocks: { id: number; settings: object; type: string }[];
}

export type BlockSetup = {
  name: string;
  description: string;
  Component: Component;
};

export type RegisteredBlock = {
  name: string;
  description: string;
  Component: Component;
  type: string;
  setup?: BlockSetup;
  trendable?: boolean;
};
