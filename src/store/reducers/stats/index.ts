import {IStats} from "../../../models/IStats";
import {StatsAction, StatsActionEnum} from "./types";

const initialState: IStats = {
  currentStreak: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  gamesLost: 0,
  bestStreak: 0,
  attempts: [0, 0, 0, 0, 0, 0, 0],
  hidden: true
}

export const statsReducer = (state = initialState, action: StatsAction): IStats => {
  switch (action.type) {
    case StatsActionEnum.ADD_WIN:
      let newWState = {
        ...state,
        gamesWon: state.gamesWon + 1,
        gamesPlayed: state.gamesPlayed + 1,
        currentStreak: state.currentStreak + 1,
        attempts: [...state.attempts]
      }
      if (newWState.currentStreak > newWState.bestStreak) newWState.bestStreak = newWState.currentStreak
      newWState.attempts[action.payload] += 1
      return Object.assign({}, state, newWState);

    case StatsActionEnum.ADD_LOSS:
      return {...state, gamesPlayed: state.gamesPlayed + 1, gamesLost: state.gamesLost + 1, currentStreak: 0};

    case StatsActionEnum.TOGGLE_STATS:
      return {...state, hidden: !state.hidden};

    default:
      return state;
  }
}
