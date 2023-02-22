import type { Component } from "solid-js";

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
