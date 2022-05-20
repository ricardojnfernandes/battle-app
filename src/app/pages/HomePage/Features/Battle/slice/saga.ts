import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { battleActions as actions } from '.';
import { BattleErrorType, SignupOutput, ClientPunch } from './types';
import { selectUserId } from './selectors';

/**
 * Register for battle
 */
export function* signup() {
  const requestURL = `${process.env.REACT_APP_API_ROOT_URL}/signup`;
  try {
    // Call our request helper (see 'utils/request')
    const signupOutput: SignupOutput = yield call(request, requestURL);
    yield put(actions.signupReady(signupOutput));
  } catch (err: any) {
    console.log(err);
    yield put(actions.battleError(BattleErrorType.RESPONSE_ERROR));
  }
}

/**
 * Send a number of punches
 */
 export function* punch(action: PayloadAction<number>) {
  
  const userid = yield select(selectUserId);
  const requestURL = `${process.env.REACT_APP_API_ROOT_URL}/punch`;
  const data: ClientPunch = {
     id: userid,
     punches: action.payload
  }
  const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };

  try {
    // Call our request helper (see 'utils/request')
    yield call(request, requestURL, options);
    yield put(actions.punchSuccess());
  } catch (err: any) {
    console.log(err);
    yield put(actions.battleError(BattleErrorType.RESPONSE_ERROR));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* battleSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.signup.type, signup);
  yield takeLatest(actions.punch.type, punch);
}
