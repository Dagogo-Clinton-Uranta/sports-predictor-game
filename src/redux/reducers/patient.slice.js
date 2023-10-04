import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allPatients: [],
  patients: [],
  patientTimers:[],
  admittedPatients: [],
  selectedPatient: null,
  isLoading: false,
  allTreatmentCategories:[],
  allTreatmentTests:[],
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
      fetchAllPatients: (state, action) => {
        state.allPatients = action.payload;
        state.error = '';
        state.message = '';
      },
      fetchPatientTimers: (state, action) => {
        state.patientTimers = action.payload;
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

      saveAllTreatmentCategories:(state, action)=>{
        state.allTreatmentCategories = action.payload;
        state.error = '';
        state.message = '';
      },
      
      saveAllTreatmentTests:(state, action)=>{
        state.allTreatmentTests = action.payload;
        state.error = '';
        state.message = '';
      },
    clearPatient: (state, action) => {
      state.allPatients= [];
      state.patients= [];
      state.patientTimers=action.payload;
      state.admittedPatients= [];
      state.selectedPatient= null;
      state.isLoading= false;
      state.allTreatmentCategories=[];
      state.allTreatmentTests=[];
      state.error= '';
      state.message= '';
    },
  },
});

const { actions, reducer } = patientSlice;

export const {
 fetchPatients,
 fetchAllPatients,
 fetchPatientTimers,
 fetchAdmittedPatients,
 setSelectedPatient,
 saveAllTreatmentCategories,
 saveAllTreatmentTests,
 clearPatient,
 setIsLoading,
} = actions;

export default reducer;


