import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPlayer } from "./types";
import { PlayerMessage } from "../../types";

export interface CounterState {
  isGameStarted: boolean;
  game: {
    additionalSettings: {
      isInterceptorsViewClear: boolean;
    };
    messages: PlayerMessage[];
    playersCount: number;
    players: IPlayer[];
    infectNights: number[];
  };
}

const initialState: CounterState = {
  isGameStarted: false,
  game: {
    additionalSettings: {
      isInterceptorsViewClear: true,
    },
    messages: [],
    infectNights: [1, 3, 4, 6],
    playersCount: 0,
    players: [],
  },
};

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameStatus: (state, action: PayloadAction<boolean>) => {
      state.isGameStarted = action.payload;
    },
  },
});

export const { setGameStatus } = gameSlice.actions;

export default gameSlice.reducer;
