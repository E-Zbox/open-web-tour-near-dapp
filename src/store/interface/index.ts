export interface IMethodStore {}

export interface IRecord {
  [name: string]: string;
}

export interface IFormStore {
  state: IRecord;
  setState: (newState: IRecord) => void;
}

export interface IEvent {
  creator: string;
  created_at: number;
  title: string;
  estimated_budget: number;
  total_votes: number;
  description: string;
  votes: string[];
}

export interface IEventStore {
  state: IEvent[];
  setState: (updatedState: IEvent[]) => void;
}

export interface IVoteStore {
  state: number;
  setState: (updatedState: number) => void;
}
