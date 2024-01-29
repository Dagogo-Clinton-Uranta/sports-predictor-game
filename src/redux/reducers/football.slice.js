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
       allCompetitionsInOneLeague:[],
       userInFocusForDeposits:[],
       allCompetitionsForOneUser:[],
       allUsersInOneLeague:[],
       teamWinResultsPerLeague:[],
       goalScorerPickFour:{},
       teamWinPickFour:{},
       assistPickFour:{},
       cleanSheetPickFour:{},
       teamWinCompetitionInFocus:{},
       cleanSheetCompetitionInFocus:{},
       assistCompetitionInFocus:{},
       goalScorerCompetitionInFocus:{},
       leagueInFocus:{},
       depositCanChangeNow:false,
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


  clearGoalScorerCompetitionInFocus: (state, action) => {
    state.goalScorerCompetitionInFocus = {};
},

    saveAssistCompetitionInFocus: (state, action) => {
      state.assistCompetitionInFocus = action.payload;
  },

  clearAssistCompetitionInFocus: (state, action) => {
    state.assistCompetitionInFocus = {};
},
  
  saveTeamWinCompetitionInFocus: (state, action) => {
    state.teamWinCompetitionInFocus =action.payload;
  },

  clearTeamWinCompetitionInFocus: (state, action) => {
    state.teamWinCompetitionInFocus = {};
  },
  
  saveCleanSheetCompetitionInFocus: (state, action) => {
    state.cleanSheetCompetitionInFocus = action.payload;
  },

   
  clearCleanSheetCompetitionInFocus: (state, action) => {
    state.cleanSheetCompetitionInFocus = {};
  },

  clearCompetitorRangeInFocus: (state, action) => {
    state.competitorRangeInFocus = {};
  },

  saveCompetitorRangeInFocus: (state, action) => {
    state.competitorRangeInFocus = action.payload;
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

  clearCleanSheetResultsPerLeague: (state, action) => {
    state.cleanSheetResultsPerLeague = {};
  },
   
    savePremierLeagueTeams: (state, action) => {
      state.premierLeagueTeams = action.payload;
  },

  saveTeamPlayersInFocus: (state, action) => {
    state.teamPlayersInFocus = action.payload;
},


  saveAssistResultsPerLeague: (state, action) => {
    state.assistResultsPerLeague = action.payload;
  },

  clearAssistResultsPerLeague: (state, action) => {
    state.assistResultsPerLeague = {};
  },
 


saveGoalScorerResultsPerLeague: (state, action) => {
  state.goalScorerResultsPerLeague = action.payload;
},

clearGoalScorerResultsPerLeague: (state, action) => {
  state.goalScorerResultsPerLeague = {};
},

saveTeamWinResultsPerLeague: (state, action) => {
  state.teamWinResultsPerLeague = action.payload;
},

clearTeamWinResultsPerLeague: (state, action) => {
  state.teamWinResultsPerLeague = action.payload;
},



saveAllCompetitionsInOneLeague: (state, action) => {
  state.allCompetitionsInOneLeague = action.payload; 
},
saveAllCompetitionsForOneUser: (state, action) => {
  state.allCompetitionsForOneUser = action.payload; 
},
saveAllUsersInOneLeague: (state, action) => {
  state.allUsersInOneLeague = action.payload; 
},
 
saveUserInFocusForDeposits: (state, action) => {
  state.userInFocusForDeposits = action.payload; 
},

saveLeagueInFocus: (state, action) => {
  state.leagueInFocus = action.payload; 
},

saveDepositCanChangeNow: (state, action) => {
  state.depositCanChangeNow = action.payload; 
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
 clearGoalScorerCompetitionInFocus,

 saveCompetitorRangeInFocus,
 clearCompetitorRangeInFocus,


 saveAssistCompetitionInFocus,
 clearAssistCompetitionInFocus,

 saveCleanSheetCompetitionInFocus,
 clearCleanSheetCompetitionInFocus,


 saveTeamWinCompetitionInFocus,
 clearTeamWinCompetitionInFocus,

 saveAllCompetitionsInOneLeague,
 saveAllCompetitionsForOneUser,
 saveAllUsersInOneLeague,

 saveUserInFocusForDeposits,
 saveDepositCanChangeNow,

 saveLeagueInFocus,

 savePublicGroup,
 savePrivateGroup,
 saveTeamPlayersInFocus,
 savePremierLeagueTeams,

 saveGoalScorerResultsPerLeague,
 clearGoalScorerResultsPerLeague,

 saveAssistResultsPerLeague,
 clearAssistResultsPerLeague,


 saveTeamWinResultsPerLeague,
 clearTeamWinResultsPerLeague,

 saveCleanSheetResultsPerLeague,
 clearCleanSheetResultsPerLeague,


 saveGroupMembers,
 saveEmployeer,
 isItLoading,
 clearGroup
} = actions;

export default reducer;


