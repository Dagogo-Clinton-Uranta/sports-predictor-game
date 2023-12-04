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
       goalScorerResultsPerLeague:[],
       assistResultsPerLeague:[],
       cleanSheetResultsPerLeague:[],
       teamWinResultsPerLeague:[],
       goalScorerPickFour:{},
       teamWinPickFour:{},
       assistPickFour:{},
       cleanSheetPickFour:{},
       teamWincompetitionInFocus:{},
       cleanSheetcompetitionInFocus:{},
       assistcompetitionInFocus:{},
       goalScorercompetitionInFocus:{},
      isLoading: false,
};

const footballSlice = createSlice({
  name: 'football',
  initialState,
  reducers: {
    saveMyGroup: (state, action) => {
        state.myGroups = action.payload;
    },
    saveGoalScorerPickFour: (state, action) => {
        state.goalScorerPickFour = action.payload;
    },

    saveGoalScorerCompetitionInFocus: (state, action) => {
      state.goalScorerCompetitionInFocus = action.payload;
  },

    saveAssistCompetitionInFocus: (state, action) => {
      state.assistCompetitionInFocus = action.payload;
  },
  
  saveTeamWinCompetitionInFocus: (state, action) => {
    state.teamWinCompetitionInFocus = action.payload;
  },
  
  saveCleanSheetCompetitionInFocus: (state, action) => {
    state.cleanSheetCompetitionInFocus = action.payload;
  },

    saveAssistPickFour: (state, action) => {
      state.assistPickFour = action.payload;
  },

  saveCleanSheetPickFour: (state, action) => {
    state.cleanSheetPickFour = action.payload;
},

saveTeamWinPickFour: (state, action) => {
  state.teamWinPickFour = action.payload;
},

saveAllGroup: (state, action) => {
  state.allGroups = action.payload;
},
      
  saveCleanSheetResultsPerLeague: (state, action) => {
    state.cleanSheetResultsPerLeague = action.payload;
  },
   
    savePremierLeagueTeams: (state, action) => {
      state.premierLeagueTeams = action.payload;
  },
  saveAssistResultsPerLeague: (state, action) => {
    state.assistResultsPerLeague = action.payload;
  },
 
  saveTeamPlayersInFocus: (state, action) => {
    state.teamPlayersInFocus = action.payload;
},
saveGoalScorerResultsPerLeague: (state, action) => {
  state.goalScorerResultsPerLeague = action.payload;
},

saveTeamWinResultsPerLeague: (state, action) => {
  state.teamWinResultsPerLeague = action.payload;
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
 saveAssistPickFour,
 saveCleanSheetPickFour,
 saveGoalScorerPickFour,

 saveGoalScorerCompetitionInFocus,
 saveAssistCompetitionInFocus,
 saveCleanSheetCompetitionInFocus,
 saveTeamWinCompetitionInFocus,
 savePublicGroup,
 savePrivateGroup,
 saveTeamPlayersInFocus,
 savePremierLeagueTeams,
 saveGoalScorerResultsPerLeague,
 saveAssistResultsPerLeague,
 saveTeamWinResultsPerLeague,
 saveCleanSheetResultsPerLeague,
 saveGroupMembers,
 saveEmployeer,
 isItLoading,
 clearGroup
} = actions;

export default reducer;


