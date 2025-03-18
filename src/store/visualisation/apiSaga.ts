import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchApiData } from './api';
import { NearEarthObject } from './types';
import { fetchAPIFailure, fetchAPIRequest, fetchAPISuccess } from './apiSLice';
function* fetchAPISaga(): Generator<unknown, void, any> {
  try {
    const response = yield call(fetchApiData);
    const formattedData = response.near_earth_objects.map((item: any) => ({
      id: item.id,
      name: item.name,
      estimated_diameter_min: item.estimated_diameter.kilometers.estimated_diameter_min,
      estimated_diameter_max: item.estimated_diameter.kilometers.estimated_diameter_max,
      estimated_diameter_avg:
        (item.estimated_diameter.kilometers.estimated_diameter_min +
          item.estimated_diameter.kilometers.estimated_diameter_max) /
        2,
    }));

    formattedData.sort((a: NearEarthObject, b: NearEarthObject) => b.estimated_diameter_avg - a.estimated_diameter_avg);
    yield put(fetchAPISuccess(formattedData)); 
  } catch (error) {
    yield put(fetchAPIFailure('Erreur lors du chargement des données'));
  }
}

export function* watchFetchAPISaga() {
  yield takeLatest(fetchAPIRequest.type, fetchAPISaga);
}

