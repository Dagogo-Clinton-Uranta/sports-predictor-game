import { createSlice } from '@reduxjs/toolkit';

const initialState = {
     
      thirtyTwoWest1:'',
      thirtyTwoWest2:'',
      thirtyTwoWest3:'',
      thirtyTwoWest4:'',
      thirtyTwoWest5:'',
      thirtyTwoWest6:'',
      thirtyTwoWest7:'',
      thirtyTwoWest8:'',
      
      sixteenWest1:'',
      sixteenWest2:'',
      sixteenWest3:'',
      sixteenWest4:'',

      eightWest1:'',
      eightWest2:'',

      fourWest1:'',

};

const tournamentWestSlice = createSlice({
  name: 'tournamentWest',
  initialState,
  reducers: {

    saveThirtyTwoWest1: (state, action) => {
      state.thirtyTwoWest1 = action.payload; 
    },

    saveThirtyTwoWest2: (state, action) => {
      state.thirtyTwoWest2 = action.payload; 
    },

    saveThirtyTwoWest3: (state, action) => {
      state.thirtyTwoWest3 = action.payload; 
    },

    saveThirtyTwoWest4: (state, action) => {
      state.thirtyTwoWest4 = action.payload; 
    },

    saveThirtyTwoWest5: (state, action) => {
      state.thirtyTwoWest5 = action.payload; 
    },

    saveThirtyTwoWest6: (state, action) => {
      state.thirtyTwoWest6 = action.payload; 
    },

    saveThirtyTwoWest7: (state, action) => {
      state.thirtyTwoWest7 = action.payload; 
    },

    saveThirtyTwoWest8: (state, action) => {
      state.thirtyTwoWest8 = action.payload; 
    },

    saveSixteenWest1: (state, action) => {
      state.sixteenWest1 = action.payload; 
    },

    saveSixteenWest2: (state, action) => {
      state.sixteenWest2 = action.payload; 
    },

    saveSixteenWest3: (state, action) => {
      state.sixteenWest3 = action.payload; 
    },

    saveSixteenWest4: (state, action) => {
      state.sixteenWest4 = action.payload; 
    },


    saveEightWest1: (state, action) => {
      state.eightWest1 = action.payload; 
    },

    saveEightWest2: (state, action) => {
      state.eightWest2 = action.payload; 
    },



    saveFourWest1: (state, action) => {
      state.fourWest1 = action.payload; 
    },


    
    clearGroupWest: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = tournamentWestSlice;

export const {
  saveThirtyTwoWest1,
  saveThirtyTwoWest2,
  saveThirtyTwoWest3,
  saveThirtyTwoWest4,
  saveThirtyTwoWest5,
  saveThirtyTwoWest6,
  saveThirtyTwoWest7,
  saveThirtyTwoWest8,

  saveSixteenWest1,
  saveSixteenWest2,
  saveSixteenWest3,
  saveSixteenWest4,

  saveEightWest1,
  saveEightWest2,

  saveFourWest1,

 clearGroupWest
} = actions;

export default reducer;


