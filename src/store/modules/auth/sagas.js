import { takeLatest, call, put, all } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';

import api from '~/services/api';

import { signInSuccess, signUpSuccess, signFailure } from './actions';

import { getError } from '~/util/errorHandler';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (err) {
    showMessage({
      type: 'danger',
      message: getError(err) || 'Something is wrong... Check your credentials.',
    });
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    const response = yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signUpSuccess());
    yield put(signInSuccess(token, user));

    showMessage({
      type: 'success',
      message: `Hey ${user.name}! Let's dive into MeetApp!`,
    });
  } catch (err) {
    showMessage({
      type: 'danger',
      message: getError(err) || 'Something is wrong... Check your credentials.',
    });

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) api.defaults.headers.Authorization = `Bearer ${token}`;
}

export function signOut() {
  // history.push('/login');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
