import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';

export const layoutOptions = { grid: 'grid', list: 'list' } as const;
export const density = { eco: 'eco', roomy: 'roomy', cozy: 'cozy' } as const;

export interface IUIState {
  dropdownMenu: {
    select: 'default' | 'layout';
  };
  isOpenDialog: boolean;
  layoutOptions: typeof layoutOptions;
  density: typeof density;
  layoutType: {
    density: (typeof density)[keyof typeof density];
    layout: (typeof layoutOptions)[keyof typeof layoutOptions];
  };
}

const initialState: IUIState = {
  dropdownMenu: {
    select: 'default',
  },
  density,
  layoutOptions,
  isOpenDialog: true,
  layoutType: { density: 'eco', layout: 'grid' },
};

export const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    closeDialog: (state) => {
      state.isOpenDialog = false;
    },
    selectDialog: (
      state,
      action: PayloadAction<IUIState['dropdownMenu']['select']>
    ) => {
      state.dropdownMenu.select = action.payload;
    },
    selectLayout: (
      state,
      action: PayloadAction<Partial<IUIState['layoutType']>>
    ) => {
      state.layoutType = { ...action.payload, ...state.layoutType };
    },
  },
});

export const { selectDialog, closeDialog, selectLayout } = UISlice.actions;
export const UIReduce = UISlice.reducer;
