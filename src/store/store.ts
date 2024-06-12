import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from '@/features/product-slice.ts';
import StatisticsReducer from '@/features/stats-slice.ts';

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    statistics: StatisticsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;