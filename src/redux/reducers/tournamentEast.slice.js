import { createSlice } from '@reduxjs/toolkit';

const initialState = {
     
      thirtyTwoEast1:'',
      thirtyTwoEast2:'',
      thirtyTwoEast3:'',
      thirtyTwoEast4:'',
      thirtyTwoEast5:'',
      thirtyTwoEast6:'',
      thirtyTwoEast7:'',
      thirtyTwoEast8:'',
      
      sixteenEast1:'',
      sixteenEast2:'',
      sixteenEast3:'',
      sixteenEast4:'',

      eightEast1:'',
      eightEast2:'',

      fourEast1:'',

};

const tournamentEastSlice = createSlice({
  name: 'tournamentEast',
  initialState,
  reducers: {

    saveThirtyTwoEast1: (state, action) => {
      state.thirtyTwoEast1 = action.payload; 
    },

    saveThirtyTwoEast2: (state, action) => {
      state.thirtyTwoEast2 = action.payload; 
    },

    saveThirtyTwoEast3: (state, action) => {
      state.thirtyTwoEast3 = action.payload; 
    },

    saveThirtyTwoEast4: (state, action) => {
      state.thirtyTwoEast4 = action.payload; 
    },

    saveThirtyTwoEast5: (state, action) => {
      state.thirtyTwoEast5 = action.payload; 
    },

    saveThirtyTwoEast6: (state, action) => {
      state.thirtyTwoEast6 = action.payload; 
    },

    saveThirtyTwoEast7: (state, action) => {
      state.thirtyTwoEast7 = action.payload; 
    },

    saveThirtyTwoEast8: (state, action) => {
      state.thirtyTwoEast8 = action.payload; 
    },

    saveSixteenEast1: (state, action) => {
      state.sixteenEast1 = action.payload; 
    },

    saveSixteenEast2: (state, action) => {
      state.sixteenEast2 = action.payload; 
    },

    saveSixteenEast3: (state, action) => {
      state.sixteenEast3 = action.payload; 
    },

    saveSixteenEast4: (state, action) => {
      state.sixteenEast4 = action.payload; 
    },


    saveEightEast1: (state, action) => {
      state.eightEast1 = action.payload; 
    },

    saveEightEast2: (state, action) => {
      state.eightEast2 = action.payload; 
    },



    saveFourEast1: (state, action) => {
      state.fourEast1 = action.payload; 
    },


    
   


    
    clearGroup: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = tournamentEastSlice;

export const {
  saveThirtyTwoEast1,
  saveThirtyTwoEast2,
  saveThirtyTwoEast3,
  saveThirtyTwoEast4,
  saveThirtyTwoEast5,
  saveThirtyTwoEast6,
  saveThirtyTwoEast7,
  saveThirtyTwoEast8,

  saveSixteenEast1,
  saveSixteenEast2,
  saveSixteenEast3,
  saveSixteenEast4,

  saveEightEast1,
  saveEightEast2,

  saveFourEast1,

 clearGroup
} = actions;

export default reducer;


