import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patients: [],
  admittedPatients: [],
  selectedPatient: null,
  isLoading: false,
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
    fetchAdmittedPatients: (state, action) => {
        state.admittedPatients = action.payload;
        state.error = '';
        state.message = '';
      },
    setSelectedPatient: (state, action) => {
        state.selectedPatient = action.payload;
        state.error = '';
        state.message = '';
      },
    setIsLoading: (state, action) => {
        state.isLoading = action.payload;
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
 fetchAdmittedPatients,
 setSelectedPatient,
 clearPatient,
 setIsLoading,
} = actions;

export default reducer;


