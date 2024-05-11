import { create } from "zustand";
// interface
import {
  IEvent,
  IEventStore,
  IFormStore,
  IRecord,
  IVoteStore,
} from "./interface";

// export const useMethodStore = create((set)=> ({})

export const useFormStore = create<IFormStore>((set) => ({
  state: {},
  setState: (newState: IRecord) =>
    set((_state) => ({ state: { ..._state.state, ...newState } })),
}));

export const useEventStore = create<IEventStore>((set) => ({
  state: [],
  setState: (updatedState: IEvent[]) =>
    set((_state) => ({ state: updatedState })),
}));

export const useVoteStore = create<IVoteStore>((set) => ({
  state: 0,
  setState: (updatedState: number) =>
    set((_state) => ({ state: updatedState })),
}));
