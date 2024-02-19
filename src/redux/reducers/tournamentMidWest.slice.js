import { createSlice } from '@reduxjs/toolkit';

const initialState = {
     
      thirtyTwoMidWest1:'',
      thirtyTwoMidWest2:'',
      thirtyTwoMidWest3:'',
      thirtyTwoMidWest4:'',
      thirtyTwoMidWest5:'',
      thirtyTwoMidWest6:'',
      thirtyTwoMidWest7:'',
      thirtyTwoMidWest8:'',
      
      sixteenMidWest1:'',
      sixteenMidWest2:'',
      sixteenMidWest3:'',
      sixteenMidWest4:'',

      eightMidWest1:'',
      eightMidWest2:'',

      fourMidWest1:'',

};

const tournamentMidWestSlice = createSlice({
  name: 'tournamentMidWest',
  initialState,
  reducers: {

    saveThirtyTwoMidWest1: (state, action) => {
      state.thirtyTwoMidWest1 = action.payload; 
    },

    saveThirtyTwoMidWest2: (state, action) => {
      state.thirtyTwoMidWest2 = action.payload; 
    },

    saveThirtyTwoMidWest3: (state, action) => {
      state.thirtyTwoMidWest3 = action.payload; 
    },

    saveThirtyTwoMidWest4: (state, action) => {
      state.thirtyTwoMidWest4 = action.payload; 
    },

    saveThirtyTwoMidWest5: (state, action) => {
      state.thirtyTwoMidWest5 = action.payload; 
    },

    saveThirtyTwoMidWest6: (state, action) => {
      state.thirtyTwoMidWest6 = action.payload; 
    },

    saveThirtyTwoMidWest7: (state, action) => {
      state.thirtyTwoMidWest7 = action.payload; 
    },

    saveThirtyTwoMidWest8: (state, action) => {
      state.thirtyTwoMidWest8 = action.payload; 
    },

    saveSixteenMidWest1: (state, action) => {
      state.sixteenMidWest1 = action.payload; 
    },

    saveSixteenMidWest2: (state, action) => {
      state.sixteenMidWest2 = action.payload; 
    },

    saveSixteenMidWest3: (state, action) => {
      state.sixteenMidWest3 = action.payload; 
    },

    saveSixteenMidWest4: (state, action) => {
      state.sixteenMidWest4 = action.payload; 
    },


    saveEightMidWest1: (state, action) => {
      state.eightMidWest1 = action.payload; 
    },

    saveEightMidWest2: (state, action) => {
      state.eightMidWest2 = action.payload; 
    },



    saveFourMidWest1: (state, action) => {
      state.fourMidWest1 = action.payload; 
    },


    
   


    
    clearGroup: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = tournamentMidWestSlice;

export const {
  saveThirtyTwoMidWest1,
  saveThirtyTwoMidWest2,
  saveThirtyTwoMidWest3,
  saveThirtyTwoMidWest4,
  saveThirtyTwoMidWest5,
  saveThirtyTwoMidWest6,
  saveThirtyTwoMidWest7,
  saveThirtyTwoMidWest8,

  saveSixteenMidWest1,
  saveSixteenMidWest2,
  saveSixteenMidWest3,
  saveSixteenMidWest4,

  saveEightMidWest1,
  saveEightMidWest2,

  saveFourMidWest1,

 clearGroup
} = actions;

export default reducer;


