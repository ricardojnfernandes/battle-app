import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.battle || initialState;

export const selectUserId = createSelector(
  [selectDomain],
  battleState => battleState.userid,
);

export const selectLoading = createSelector(
  [selectDomain],
  battleState => battleState.loading,
);

export const selectChampion = createSelector(
  [selectDomain],
  battleState => battleState.champion,
);

export const selectPoints = createSelector(
  [selectDomain],
  battleState => battleState.points,
);

export const selectError = createSelector(
  [selectDomain],
  battleState => battleState.error,
);
