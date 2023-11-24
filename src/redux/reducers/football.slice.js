import { createSlice } from '@reduxjs/toolkit';

const initialState = {
       myGroups: [], 
       allGroups: [], 
       publicGroups: [], 
       privateGroups: [],
       groupMembers: [], 
       employeer: {}, 
       message: '',
       premierLeagueTeams:[],
       teamPlayersInFocus:[],
      isLoading: false,
};

const footballSlice = createSlice({
  name: 'football',
  initialState,
  reducers: {
    saveMyGroup: (state, action) => {
        state.myGroups = action.payload;
    },
    saveAllGroup: (state, action) => {
        state.allGroups = action.payload;
    },
    savePremierLeagueTeams: (state, action) => {
      state.premierLeagueTeams = action.payload;
  },
  saveTeamPlayersInFocus: (state, action) => {
    state.teamPlayersInFocus = action.payload;
},
    savePublicGroup: (state, action) => {
        state.publicGroups = action.payload;
    },
    savePrivateGroup: (state, action) => {
        state.privateGroups = action.payload;
    },
    saveGroupMembers: (state, action) => {
      state.groupMembers = action.payload;
  },
    saveEmployeer: (state, action) => {
      state.employeer = action.payload;
  },
    isItLoading: (state, action) => {
      state.isLoading = action.payload;
  },
    clearGroup: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = footballSlice;

export const {
 saveMyGroup,
 saveAllGroup,
 savePublicGroup,
 savePrivateGroup,
 saveTeamPlayersInFocus,
 savePremierLeagueTeams,
 saveGroupMembers,
 saveEmployeer,
 isItLoading,
 clearGroup
} = actions;

export default reducer;


