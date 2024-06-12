import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";

interface StatsState {
  dashboard: [];
}

const initialState: StatsState = {
  dashboard: [],
};

export const fetchStatsDashboard = createAsyncThunk('statistics/dashboard', async () => {
  const response = await axios.get('https://mocki.io/v1/1d7c913e-e2bc-4567-a12f-1aef9204623f');
  return response.data.statistics;
})

const StatisticsReducer = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchStatsDashboard.fulfilled, (state, action) => {
      state.dashboard = action.payload;
    })
  }
});

export default StatisticsReducer.reducer;