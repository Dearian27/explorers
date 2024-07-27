import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPlayer } from "./types";
import { PlayerMessage } from "../../types";

export interface CounterState {
  isGameStarted: boolean;
  game: {
    isNight: boolean;
    day: number;
    additionalSettings: {
      isInterceptorsViewClear: boolean;
    };
    messages: PlayerMessage[];
    playersCount: number;
    players: IPlayer[];
    infectNights: number[];
    currentPlayer: number;
    activeCloneId: number;
    selectedPlayers: number[];
    submitSelection: boolean;
  };
}

const initialState: CounterState = {
  isGameStarted: false,
  // game: {
  //   additionalSettings: {
  //     isInterceptorsViewClear: true,
  //   },
  //   messages: [],
  //   infectNights: [1, 3, 4, 6],
  //   playersCount: 0,
  //   players: [],
  // },
  game: {
    isNight: false,
    day: 0,
    additionalSettings: {
      isInterceptorsViewClear: true,
    },
    messages: [],
    infectNights: [1, 3, 4, 6],
    playersCount: 10,
    players: [],
    currentPlayer: 0,
    activeCloneId: 0,
    selectedPlayers: [],
    submitSelection: false,
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
    setIsNight: (state, action: PayloadAction<boolean>) => {
      state.game.isNight = action.payload;
    },
    setNextDay: (state) => {
      state.game.day += 1;
    },
    initPlayers: (state, action: PayloadAction<IPlayer[]>) => {
      state.game.players = action.payload;
      state.game.playersCount = action.payload.length;
    },
    setNextCurrentPlayer: (state) => {
      state.game.currentPlayer += 1;
    },
    resetNightData: (state) => {
      state.game.currentPlayer = 0;
      state.game.selectedPlayers = [];
      state.game.submitSelection = false;
    },
    setActiveCloneId: (state, action: PayloadAction<number>) => {
      state.game.activeCloneId = action.payload;
    },
    setSelectedPlayers: (state, action: PayloadAction<number[]>) => {
      state.game.selectedPlayers = action.payload;
    },
    clearSelectedPlayers: (state) => {
      state.game.selectedPlayers = [];
    },
    setSubmitSelectedPlayers: (state, active: PayloadAction<boolean>) => {
      state.game.submitSelection = active.payload;
    },
    addMessage: (state, action: PayloadAction<PlayerMessage>) => {
      state.game.messages.push(action.payload);
    },
  },
});

export const {
  setGameStatus,
  setNextDay,
  setIsNight,
  initPlayers,
  setNextCurrentPlayer,
  resetNightData,
  setActiveCloneId,
  setSelectedPlayers,
  clearSelectedPlayers,
  setSubmitSelectedPlayers,
  addMessage,
} = gameSlice.actions;

export default gameSlice.reducer;
