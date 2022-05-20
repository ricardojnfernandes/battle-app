import { PayloadAction } from '@reduxjs/toolkit';
import { Repo } from 'types/Repo';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { battleSaga } from './saga';
import { BattleState, ChampionEnum, SignupOutput, BattleErrorType } from './types';

export const initialState: BattleState = {
  userid: undefined,
  champion: ChampionEnum.NoChampion,
  loading: false,
  points: 0,
};

const slice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    restart(state) {
      state.champion = ChampionEnum.NoChampion;
      state.userid = undefined;
      state.loading = false;
      state.points = 0;
      state.error = null;
    },
    signup(state) {
      state.loading = true;
      state.points = 0;
      state.error = null;
    },
    signupReady(state, action: PayloadAction<SignupOutput>) {
      state.champion = action.payload.champion;
      state.userid = action.payload.id;
      state.loading = false;
    },
    punch(state, action: PayloadAction<number>) {
      state.loading = true;
      state.error = null;
    },
    punchSuccess(state) {
      state.loading = false;
    },
    battleError(state, action: PayloadAction<BattleErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: battleActions, reducer } = slice;

export const useBattleSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: battleSaga });
  return { actions: slice.actions };
};
