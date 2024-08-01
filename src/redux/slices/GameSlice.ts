import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPlayer } from "./types";
import { PlayerMessage, RoleParams } from "../../types";

export interface CounterState {
  isGameStarted: boolean;
  selectedRoles: (RoleParams & { count: number })[];
  game: {
    isNight: boolean;
    day: number;
    additionalSettings: {
      firstInfectDay: number;
      isInterceptorsViewClear: boolean;
      currentCycle: number;
      maxCycle: number;
      doubleNightCycle: boolean;
      interceptorsVisionDelay: number;
    };
    messages: PlayerMessage[];
    playersCount: number;
    players: IPlayer[];
    infectNights: number[];
    currentPlayer: number;
    activeCloneId: { value: number; startDay: number };
    selectedPlayers: number[];
    submitSelection: boolean;
  };
}

const initialState: CounterState = {
  isGameStarted: false,
  selectedRoles: [],
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
      firstInfectDay: 1,
      currentCycle: 0,
      maxCycle: 1,
      doubleNightCycle: true,
      interceptorsVisionDelay: 0, //? interceptor starts catch messages with delay of X days
    },
    messages: [],
    infectNights: [1, 3, 4, 6],
    playersCount: 0,
    players: [],
    currentPlayer: 0,
    activeCloneId: { value: -1, startDay: 0 },
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
      state.game.additionalSettings.currentCycle = 0;
    },
    initPlayers: (state, action: PayloadAction<IPlayer[]>) => {
      state.game.players = action.payload;
      state.game.playersCount = action.payload.length;
    },
    setNextCurrentPlayer: (state) => {
      state.game.currentPlayer += 1;
    },
    resetNightRoundData: (state) => {
      state.game.currentPlayer = 0;
      state.game.selectedPlayers = [];
      state.game.submitSelection = false;
    },
    setActiveCloneId: (
      state,
      action: PayloadAction<{ value: number; startDay: number }>
    ) => {
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
    setPlayerName: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      if (state.game.players.find((p) => p.id === action.payload.id)) {
        state.game.players.find((p) => p.id === action.payload.id).name =
          action.payload.name;
      }
    },
    setPersonInfected: (state, action: PayloadAction<number>) => {
      state.game.activeCloneId = {
        value: action.payload,
        startDay: state.game.day + 1,
      };
    },
    markPlayerAsClone: (state, action: PayloadAction<number>) => {
      if (state.game.players.find((p) => p.id === action.payload))
        state.game.players.find((p) => p.id === action.payload).isClone = true;
    },
    setIsGameStarted: (state, action: PayloadAction<boolean>) => {
      state.isGameStarted = action.payload;
    },
    setNextCycle: (state) => {
      state.game.additionalSettings.currentCycle += 1;
    },
  },
});

export const {
  setGameStatus,
  setNextDay,
  setIsNight,
  initPlayers,
  setNextCurrentPlayer,
  resetNightRoundData,
  setActiveCloneId,
  setSelectedPlayers,
  clearSelectedPlayers,
  setSubmitSelectedPlayers,
  addMessage,
  setPlayerName,
  setPersonInfected,
  markPlayerAsClone,
  setIsGameStarted,
  setNextCycle,
} = gameSlice.actions;

export default gameSlice.reducer;
