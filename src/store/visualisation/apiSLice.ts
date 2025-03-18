import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NearEarthObject } from './types';

interface ApiState {
  data: NearEarthObject[];
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  data: [],
  loading: false,
  error: null,
};

const apiSlice = createSlice({
  name: 'apiData',
  initialState,
  reducers: {
    fetchAPIRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAPISuccess: (state, action: PayloadAction<NearEarthObject[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchAPIFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchAPIRequest, fetchAPISuccess, fetchAPIFailure } = apiSlice.actions;
export default apiSlice.reducer;
