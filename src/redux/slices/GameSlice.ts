import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPlayer } from "./types";

export interface CounterState {
  isGameStarted: boolean;
  game: {
    players: IPlayer[];
  };
}

const initialState: CounterState = {
  isGameStarted: false,
  game: {
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
