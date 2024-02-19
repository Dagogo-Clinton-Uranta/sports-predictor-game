import { createSlice } from '@reduxjs/toolkit';

const initialState = {
     
      thirtyTwoSouth1:'',
      thirtyTwoSouth2:'',
      thirtyTwoSouth3:'',
      thirtyTwoSouth4:'',
      thirtyTwoSouth5:'',
      thirtyTwoSouth6:'',
      thirtyTwoSouth7:'',
      thirtyTwoSouth8:'',
      
      sixteenSouth1:'',
      sixteenSouth2:'',
      sixteenSouth3:'',
      sixteenSouth4:'',

      eightSouth1:'',
      eightSouth2:'',

      fourSouth1:'',

};

const tournamentSouthSlice = createSlice({
  name: 'tournamentSouth',
  initialState,
  reducers: {

    saveThirtyTwoSouth1: (state, action) => {
      state.thirtyTwoSouth1 = action.payload; 
    },

    saveThirtyTwoSouth2: (state, action) => {
      state.thirtyTwoSouth2 = action.payload; 
    },

    saveThirtyTwoSouth3: (state, action) => {
      state.thirtyTwoSouth3 = action.payload; 
    },

    saveThirtyTwoSouth4: (state, action) => {
      state.thirtyTwoSouth4 = action.payload; 
    },

    saveThirtyTwoSouth5: (state, action) => {
      state.thirtyTwoSouth5 = action.payload; 
    },

    saveThirtyTwoSouth6: (state, action) => {
      state.thirtyTwoSouth6 = action.payload; 
    },

    saveThirtyTwoSouth7: (state, action) => {
      state.thirtyTwoSouth7 = action.payload; 
    },

    saveThirtyTwoSouth8: (state, action) => {
      state.thirtyTwoSouth8 = action.payload; 
    },

    saveSixteenSouth1: (state, action) => {
      state.sixteenSouth1 = action.payload; 
    },

    saveSixteenSouth2: (state, action) => {
      state.sixteenSouth2 = action.payload; 
    },

    saveSixteenSouth3: (state, action) => {
      state.sixteenSouth3 = action.payload; 
    },

    saveSixteenSouth4: (state, action) => {
      state.sixteenSouth4 = action.payload; 
    },


    saveEightSouth1: (state, action) => {
      state.eightSouth1 = action.payload; 
    },

    saveEightSouth2: (state, action) => {
      state.eightSouth2 = action.payload; 
    },



    saveFourSouth1: (state, action) => {
      state.fourSouth1 = action.payload; 
    },


    
   


    
    clearGroup: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = tournamentSouthSlice;

export const {
  saveThirtyTwoSouth1,
  saveThirtyTwoSouth2,
  saveThirtyTwoSouth3,
  saveThirtyTwoSouth4,
  saveThirtyTwoSouth5,
  saveThirtyTwoSouth6,
  saveThirtyTwoSouth7,
  saveThirtyTwoSouth8,

  saveSixteenSouth1,
  saveSixteenSouth2,
  saveSixteenSouth3,
  saveSixteenSouth4,

  saveEightSouth1,
  saveEightSouth2,

  saveFourSouth1,

 clearGroup
} = actions;

export default reducer;


