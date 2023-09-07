import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patients: [],
  selectedPatient: null,
  error: '',
  message: '',
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    fetchPatients: (state, action) => {
        state.patients = action.payload;
        state.error = '';
        state.message = '';
      },
    setSelectedPatient: (state, action) => {
        state.selectedPatient = action.payload;
        state.error = '';
        state.message = '';
      },
    clearPatient: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = patientSlice;

export const {
 fetchPatients,
 setSelectedPatient,
} = actions;

export default reducer;


