import { takeLatest, call, put, all } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

import { getError } from '~/util/errorHandler';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    showMessage({
      type: 'success',
      message: 'Profile successfully updated!',
    });

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    showMessage({
      type: 'danger',
      message: getError(err) || 'Something is wrong... Check your credentials.',
    });

    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
