import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPlayer, IMission, RoleParams } from "./types";
import { PlayerMessage } from "../../types";
import { shuffleArray } from "../../utils/shuffleArray";

export interface CounterState {
  isGameStarted: boolean;
  selectedRoles: (RoleParams & { count: number })[];
  game: {
    isNight: boolean;
    day: number;
    voting: {
      isVoting: boolean;
      isVotingResult: boolean;
      data: IMission[];
      missionsCompleted: number;
      votingCurrentPlayer: number;
      currentMission: number;
    };
    additionalSettings: {
      firstInfectDay: number;
      isInterceptorsViewClear: boolean;
      currentCycle: number;
      maxCycle: number;
      doubleNightCycle: boolean;
      interceptorsVisionDelay: number;
      introductoryNight: boolean;
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
    voting: {
      isVoting: false,
      isVotingResult: false,
      data: [
        {
          id: 0,
          playersCapacity: 2,
          players: [],
          type: "default",
          minClonesToLose: 1,
          votings: [],
          status: "",
        },
        {
          id: 1,
          playersCapacity: 2,
          players: [],
          type: "default",
          minClonesToLose: 1,
          votings: [],
          status: "",
        },
        {
          id: 2,
          playersCapacity: 4,
          players: [],
          type: "default",
          minClonesToLose: 2,
          votings: [],
          status: "",
        },
        {
          id: 3,
          playersCapacity: 3,
          players: [],
          type: "default",
          minClonesToLose: 2,
          votings: [],
          status: "",
        },
        {
          id: 4,
          playersCapacity: 3,
          players: [],
          type: "default",
          minClonesToLose: 2,
          votings: [],
          status: "",
        },
      ],
      missionsCompleted: 0,
      votingCurrentPlayer: 0,
      currentMission: 0,
    },
    additionalSettings: {
      isInterceptorsViewClear: true,
      firstInfectDay: 1,
      currentCycle: 0,
      maxCycle: 1,
      doubleNightCycle: true,
      interceptorsVisionDelay: 0, //? interceptor starts catch messages with delay of X days
      introductoryNight: true,
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
    setCurrentPlayer: (state, action: PayloadAction<number>) => {
      state.game.currentPlayer = action.payload;
    },
    setVotingCurrentPlayer: (state, action: PayloadAction<number>) => {
      state.game.voting.votingCurrentPlayer = action.payload;
    },
    setNextVotingCurrentPlayer: (state) => {
      state.game.voting.votingCurrentPlayer += 1;
      state.game.currentPlayer =
        state.game.voting.data[state.game.voting.currentMission].players[
          state.game.voting.votingCurrentPlayer
        ];
      //? getting current player from voting players array
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
    endGame: (state) => {
      state.isGameStarted = false;
      state.game = initialState.game;
    },
    setIsVoting: (state, action: PayloadAction<boolean>) => {
      state.game.voting.isVoting = action.payload;
    },
    setNextCurrentMission: (state) => {
      state.game.voting.currentMission += 1;
    },
    setMissionData: (
      state,
      action: PayloadAction<{ currentMission?: number; mission: IMission }>
    ) => {
      const currentMission =
        action.payload.currentMission !== undefined
          ? action.payload.currentMission
          : state.game.voting.currentMission;
      state.game.voting.data[currentMission] = action.payload.mission;
    },
    addMissionVote: (
      state,
      action: PayloadAction<{
        playerId: number;
        isSuccess: boolean;
        reason?: "string";
      }>
    ) => {
      state.game.voting.data[state.game.voting.currentMission].votings.push({
        ...action.payload,
        isShown: false,
      });
    },
    setMissionStatus: (state) => {
      const mission = state.game.voting.data[state.game.voting.currentMission];
      const isSucceeded =
        mission.votings.reduce((acc, next) => {
          if (!next.isSuccess) return (acc += 1);
          return acc;
        }, 0) < mission.minClonesToLose;
      state.game.voting.data[state.game.voting.currentMission].status =
        isSucceeded ? "success" : "failure";
    },
    setIsVotingResult: (state, action: PayloadAction<boolean>) => {
      //? shuffle votings
      if (
        action.payload === true &&
        state.game.voting.data[state.game.voting.currentMission].votings
      ) {
        state.game.voting.data[state.game.voting.currentMission].votings =
          shuffleArray(
            state.game.voting.data[state.game.voting.currentMission]?.votings
          );
      }
      state.game.voting.isVotingResult = action.payload;
    },
  },
});

export const {
  setGameStatus,
  setNextDay,
  setIsNight,
  initPlayers,
  setNextCurrentPlayer,
  setCurrentPlayer,
  setVotingCurrentPlayer,
  setNextVotingCurrentPlayer,
  setNextCurrentMission,
  setMissionData,
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
  endGame,
  setIsVoting,
  addMissionVote,
  setMissionStatus,
  setIsVotingResult,
} = gameSlice.actions;

export default gameSlice.reducer;
