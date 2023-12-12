import { db, fb, auth, storage } from '../../config/firebase';
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { isItLoading, saveAllGroup, saveEmployeer,
   saveGroupMembers, saveMyGroup, savePremierLeagueTeams,
    savePrivateGroup, savePublicGroup, saveTeamPlayersInFocus,
    saveGoalScorerResultsPerLeague,
    saveAssistResultsPerLeague,
    saveCleanSheetResultsPerLeague,
    saveTeamWinResultsPerLeague,
    saveAssistPickFour,
    saveGoalScorerPickFour,
    saveCleanSheetPickFour,
    saveTeamWinCompetitionInFocus,
    saveCleanSheetCompetitionInFocus,
    saveGoalScorerCompetitionInFocus,
    saveAssistCompetitionInFocus,
    saveAllCompetitionsInOneLeague,
    saveAllUsersInOneLeague,
    saveUserInFocusForDeposits,
    saveDepositCanChangeNow,
    saveAllCompetitionsForOneUser,
  } from '../reducers/football.slice';

import firebase from "firebase/app";
import { fetchCandidateData } from './auth.action';

export const createGroup = (groupData, user, file, navigate, setLoading, url) => async (dispatch) => {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();
   
  db.collection("groups").add({
    groupName: groupData.groupName,
    noOfSavers: groupData.noOfSavers,
    pin: groupData.pin,
    startDate: groupData.startDate,
    amount: groupData.amount,
    status: groupData.status.toLowerCase(),
    imageUrl: url,
    admins: [user.id],
    members: [user.id],
    accountCreated: today.toLocaleDateString("en-US", options),
}).then((res)=>{
    console.log("RESPONSE ID: ", res.id);
    return db.collection('groups').doc(res.id).update({
      groupId: res.id,
    }).then(() => {
        db.collection('groups').doc(res.id).collection('membersCollection').add({
            memberName: user.name,
            memberEmail: user.email,
            memberImageUrl: user.profileImg,
            invitedBy: user.id,
            invite: 0,
            paid: 0,
            users: [user.id, user.id],
            sentAt: today.toLocaleDateString("en-US", options),
          }).then((resp) => {
            console.log("membersCollection RESPONSE: ", resp);
            setLoading(false);
            db.collection('groups').doc(res.id).collection('membersCollection').doc(resp.id).update({
              id: resp.id,
            })
          }).then(() => {
            notifySuccessFxn("Group Created")
            setLoading(false);
            navigate('/dashboard/home', { replace: true });
          }).catch((err) => {
            console.error("Error creating group: ", err);
            var errorMessage = err.message;
            notifyErrorFxn(errorMessage);
            setLoading(false);
          })
    })
  })
}


export const uploadGroupImage = (groupData, file, user, navigate, setLoading) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`group_images/${imageName}`).put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("group_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          dispatch(createGroup(groupData, user, file, navigate, setLoading, url));
        });
    }
  );
}

export const fetchMyGroups = (coolers) => async (dispatch) => {
  console.log("Clicked...");
  dispatch(isItLoading(true));
  if (coolers.length) {
    const chunkSize = 10;
    const chunks = coolers.reduce((acc, _, i) => (i % chunkSize ? acc : [...acc, coolers.slice(i, i + chunkSize)]), []);
    const promises = chunks.map((chunk) => {
      return db
        .collection("groups")
        .where("groupId", "in", chunk)
        .get()
        .then((snapshot) => snapshot.docs.map((doc) => ({ ...doc.data() })));
    });
    Promise.all(promises)
      .then((results) => {
        const myGroups = results.flat();
        console.log("My Groups Data:", myGroups);
        dispatch(saveMyGroup(myGroups));
        dispatch(isItLoading(false));
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        dispatch(isItLoading(false));
      });
  } else {
    dispatch(saveMyGroup(coolers));
    dispatch(isItLoading(false));
  }
};


// export const fetchMyGroups = (coolers) => async (dispatch) => {
//   console.log("Cilcked...")
//   dispatch(isItLoading(true));
//     if(coolers.length){
//       db.collection("groups")
//       . where('groupId', 'in', coolers)
//        .get()
//        .then((snapshot) => {
//         const myGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
//         console.log("DATA::: ", myGroups);
//         // return
//       if (myGroups.length) {
//         dispatch(isItLoading(false));
//         console.log("My Groups Data:", myGroups);
//         dispatch(saveMyGroup(myGroups));
//       } else {
//           dispatch(isItLoading(false));
//       }
//      }).catch((error) => {
//        console.log("Error getting document:", error);
//        dispatch(isItLoading(false));
//      });
//     }else{
//       dispatch(saveMyGroup(coolers));
//       dispatch(isItLoading(false));
//     }
//  };


export const fetchGroups = (adminID) => async (dispatch) => {
  dispatch(isItLoading(true));
  db.collection("groups")
  .where('admin', '==', adminID)
   .get()
   .then((snapshot) => {
     const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (allGroups.length > 0) {
     dispatch(isItLoading(false));
     console.log("All Groups Data:", allGroups);
     dispatch(saveAllGroup(allGroups));
   } else {
       dispatch(isItLoading(false));
       dispatch(saveAllGroup(allGroups));
       console.log("No groups!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });
 };


export const fetchPublicGroup = () => async (dispatch) => {
 dispatch(isItLoading(true));
 db.collection("groups")
  .where("status", "==", "public")
  .get()
  .then((snapshot) => {
    const publicGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (publicGroups.length) {
    dispatch(isItLoading(false));
    console.log("Public Groups Data:", publicGroups);
    dispatch(savePublicGroup(publicGroups));
  } else {
      dispatch(isItLoading(false));
      console.log("No public groups!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
  dispatch(isItLoading(false));
});
};

export const fetchPrivateGroup = () => async (dispatch) => {
    dispatch(isItLoading(true));
    db.collection("groups")
     .where("status", "==", "private")
     .get()
     .then((snapshot) => {
       const privateGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
     if (privateGroups.length) {
       dispatch(isItLoading(false));
       console.log("Private Groups Data:", privateGroups);
       dispatch(savePrivateGroup(privateGroups));
     } else {
         dispatch(isItLoading(false));
         console.log("No private groups!");
     }
   }).catch((error) => {
     console.log("Error getting document:", error);
     dispatch(isItLoading(false));
   });
   };


   export const joinGroup = (groupID, user, today, navigate, userWalletBal, groupFee, groupBal, groupName, accruedBalance) => async (dispatch) => {
    let todaysDate = new Date().toISOString().slice(0, 10) //2018-08-03
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    const date = today.toISOString();  

   
    let newUserBal = userWalletBal - groupFee;
    let newGroupBal = groupBal + groupFee;
    let newAccruedBal = accruedBalance + groupFee;
      // console.log("New Group Bal: ", newGroupBal);
    dispatch(isItLoading(true));
    let newMembers;
    var docRef = db.collection("groups").doc(groupID);
    docRef.get().then((doc) => {
    const data = doc.data();
    const members = data.members;
    newMembers = [...members, user.id];
}).then(() => {
  db.collection('groups')
  var userRef = db.collection("groups").doc(groupID);
  userRef.update({
    accountBalance: newGroupBal,
    members: [...newMembers],
  }).then((res) => {
    db.collection('employees')
    .doc(user.id)
    .update({
      walletBalance: newUserBal,
      accruedBalance: newAccruedBal,
      coolers: [...user?.coolers, groupID],
    })
   .then(() => {
    db.collection('groups').doc(groupID).collection('membersCollection').add({
      memberName: user.firstName + " " + user.lastName,
      memberEmail: user.email,
      memberImageUrl: "",
      invitedBy: user.id,
      invite: 0,
      paid: 1,
      users: user.id,
      sentAt: today,
    }).then((resp) => {
      console.log("membersCollection RESPONSE: ", resp);
      db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
        id: resp.id,
      }).then(() => {
        return db.collection('inbox')
          .add({
              id: user.id,
              msg: `You have joined ${groupName}`,
              coolerName: groupName,
              amount: groupFee,
              isViewed: false,
              unread: 0,
              time: date,
          })
      }).then(() => {
        return db.collection('transactions')
          .add({
              userID: user.id,
              coolerID: groupID,
              type: 'Payment',
              amount: groupFee,
              date: todaysDate,
              createdAt: today.toLocaleDateString("en-US", options),
          })
      })
  }).then(() => {
    dispatch(isItLoading(false));
    notifySuccessFxn("Joined Group")
    // window.location = '/dashboard/home';
    navigate('/dashboard/home', { replace: true });
    }).catch((error) => {
    console.log("Error joining group:", error);
    var errorMessage = error.message;
    notifyErrorFxn(errorMessage)
    dispatch(isItLoading(false));
  });
   }) 
   })
})
 };
//    export const joinGroup = (groupID, user, today, navigate, userBal, groupFee) => async (dispatch) => {
//     dispatch(isItLoading(true));
//     let newMembers;
//     var docRef = db.collection("groups").doc(groupID);
//     docRef.get().then((doc) => {
//     const data = doc.data();
//     const members = data.members;
//     newMembers = [...members, user.id];
// }).then(() => {
//   db.collection('groups')
//   var userRef = db.collection("groups").doc(groupID);
//   userRef.update({
//     members: [...newMembers],
//   }).then((res) => {
//     db.collection('employees')
//     .doc(user.id)
//     .update({
//       coolers: [...user?.coolers, groupID],
//     })
//    .then(() => {
//     db.collection('groups').doc(groupID).collection('membersCollection').add({
//       memberName: user.firstName + " " + user.lastName,
//       memberEmail: user.email,
//       memberImageUrl: "",
//       invitedBy: user.id,
//       invite: 0,
//       paid: 1,
//       users: user.id,
//       sentAt: today,
//     }).then((resp) => {
//       console.log("membersCollection RESPONSE: ", resp);
//       db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
//         id: resp.id,
//       })
//   }).then(() => {
//     dispatch(isItLoading(false));
//     notifySuccessFxn("Joined Group")
//     navigate('/dashboard/home', { replace: true });
//     }).catch((error) => {
//     console.log("Error joining group:", error);
//     var errorMessage = error.message;
//     notifyErrorFxn(errorMessage)
//     dispatch(isItLoading(false));
//   });
//    })
      
//    })
// })
//  };


export const joinPublicGroup = (groupID, user, today, navigate) => async (dispatch) => {
    dispatch(isItLoading(true));
    let newMembers;
    var docRef = db.collection("groups").doc(groupID);
    docRef.get().then((doc) => {
    const data = doc.data();
    const members = data.members;
    newMembers = [...members, user.id];
}).then(() => {
  db.collection('groups')
  var userRef = db.collection("groups").doc(groupID);
  userRef.update({
    members: [...newMembers],
  }).then((res) => {
    db.collection('groups').doc(groupID).collection('membersCollection').add({
      memberName: user.firstName + " " + user.lastName,
      memberEmail: user.email,
      memberImageUrl: user.imageUrl,
      invitedBy: user.id,
      invite: 0,
      paid: 1,
      users: [user.id, user.id],
      sentAt: today,
    }).then((resp) => {
      console.log("membersCollection RESPONSE: ", resp);
      db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
        id: resp.id,
      })
  }).then(() => {
    dispatch(isItLoading(false));
    notifySuccessFxn("Joined Group")
    navigate('/dashboard/home', { replace: true });
    }).catch((error) => {
    console.log("Error joining group:", error);
    var errorMessage = error.message;
    notifyErrorFxn(errorMessage)
    dispatch(isItLoading(false));
  });
   })
})
 };

 
export const joinPrivateGroup = (groupID, user, today, navigate) => async (dispatch) => {
  dispatch(isItLoading(true));
  let newMembers;
  var docRef = db.collection("groups").doc(groupID);
  docRef.get().then((doc) => {
  const data = doc.data();
  const members = data.members;
  newMembers = [...members, user.id];
}).then(() => {
db.collection('groups')
var userRef = db.collection("groups").doc(groupID);
userRef.update({
  members: [...newMembers],
}).then((res) => {
  db.collection('groups').doc(groupID).collection('membersCollection').add({
    memberName: user.firstName + " " + user.lastName,
    memberEmail: user.email,
    memberImageUrl: user.imageUrl,
    invitedBy: user.id,
    invite: 0,
    paid: 1,
    users: [user.id, user.id],
    sentAt: today,
  }).then((resp) => {
    console.log("membersCollection RESPONSE: ", resp);
    db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
      id: resp.id,
    })
}).then(() => {
  dispatch(isItLoading(false));
  notifySuccessFxn("Joined Group")
  navigate('/dashboard/home', { replace: true });
  }).catch((error) => {
  console.log("Error joining group:", error);
  var errorMessage = error.message;
  notifyErrorFxn(errorMessage)
  dispatch(isItLoading(false));
});
 })
})
};


export const fetchGroupMembers = (groupMembers) => async (dispatch) => {
  dispatch(isItLoading(true));
  db.collection('employees')
    .where('id', 'in', groupMembers)
    .get()
    .then((snapshot) => {
      const groupMembers = snapshot.docs.map((doc) => ({ ...doc.data() }));
      if (groupMembers.length) {
        dispatch(isItLoading(false));
        console.log('groupMembers Data:', groupMembers);
        dispatch(saveGroupMembers(groupMembers));
      } else {
        dispatch(isItLoading(false));
        console.log('No group members!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
      dispatch(isItLoading(false));
    });
};

export const fetchEmployeer = (id) => async (dispatch) => {
  var user = db.collection("employers").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
    dispatch(saveEmployeer(doc.data()));
  } else {
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
return user;
};



export const getPremierLeagueTeams = () => async (dispatch) => {

  dispatch(isItLoading(true));
  db.collection('teams')
  //.where('leagueId', '==', teamId)
    .get()
    .then((snapshot) => {
      const teams = snapshot.docs.map((doc) => ({ ...doc.data() }));
      if (teams.length) {
        dispatch(isItLoading(false));
       
        dispatch(savePremierLeagueTeams(teams));
        console.log('teams Data--->:', teams);
      } else {
        dispatch(isItLoading(false));
        console.log('No group members!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
      dispatch(isItLoading(false));
    });

}


export const getPremierLeagueTeamPlayers = (teamId)  => async (dispatch) => {


  dispatch(isItLoading(true));
  db.collection('players')
  .where('teamId', '==', teamId)
    .get()
    .then((snapshot) => {
      const teamplayers = snapshot.docs.map((doc) => ({ ...doc.data() }));
      if (teamplayers.length) {
        dispatch(isItLoading(false));
        console.log('teamplayers Data:', teamplayers);
        dispatch(saveTeamPlayersInFocus(teamplayers));
      } else {
        dispatch(isItLoading(false));
        console.log('No players in this team!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
      dispatch(isItLoading(false));
    });



}



export const submitAssistPrediction = (assistPick,compName,leagueId,gameWeekHasStarted,compIsOpen,pastPredictions) => async (dispatch) => {
  let compId;
  let compUserSelections;
  let compUserSelectionIds;
  let gameWeekStarted =gameWeekHasStarted ;
  let CompIsOpen = compIsOpen;

  console.log(" COMP NAME  AND LEAGUE ID IS--->",compName,leagueId)

  db.collection("competitions")
  .where("compName", "==", compName)
 .where("leagueId", "==", leagueId)
  .get()
  .then((snapshot) => {
    const goalScorers = snapshot.docs.map((doc) => ({ ...doc.data() }));
    console.log("THIS IS THE COMPETITION WE FACED BASED ON DATA GIVEN----->",goalScorers)
/*THE PROBLEM IS HERE...THERE IS NO SUCH COMPETITIONS POPPING UP !! */

  if (goalScorers && goalScorers[0]) {
    compId = goalScorers[0].id
    console.log("GOAL SCORERS 0 ID  IS -->>",goalScorers[0].id)

    console.log("THIS IS THE MISSING COMP ID---->",goalScorers[0].id,compId)
    compUserSelections = goalScorers[0].userSelections?goalScorers[0].userSelections:[]

    compUserSelectionIds =goalScorers[0].userSelections && goalScorers[0].userSelections.length ? goalScorers[0].userSelections.map((item)=>(item.userId)):[]

    console.log("THIS IS THE MISSING COMP ID--->",goalScorers[0].id,compId)
   // gameWeekStarted = goalScorers[0].gameWeekStarted
   // CompIsOpen = goalScorers[0] && goalScorers[0].isOpen
  }
  console.log(" GAME WEEK 4 THIS PARTICULAR COMPETITION IS--->",gameWeekStarted)
  console.log("COMP IS OPEN 4 THIS PARTICULAR COMPETITION IS--->",compIsOpen)
})
.then(async()=>{
setTimeout(()=>{
if(gameWeekStarted !== false && gameWeekStarted !== true ){
  notifyErrorFxn("We do not know the state of the gameweek for this competition, please check this competition has a game week field.")
  return
}

if(compIsOpen !== false && compIsOpen !== true ){
  notifyErrorFxn("We do not know thae state of isOpen  for this competition, please check this competition has an is Open field")
  return
}


 
if(gameWeekStarted === false){

  if(CompIsOpen === true){


 /*======================== UPDATING THE USERS COLLECTION FOR WHAT THEY PICKED   ===================*/


 if(compName === "Goal Scorer"){

const pastPredictionsNames = pastPredictions && pastPredictions.length >0 ? pastPredictions.map((item)=>(item.name)):[]

if(pastPredictionsNames.includes(assistPick.name)){
  notifyErrorFxn("You can't select a player you have picked before,please pick again")
  return
}else{

  db.collection("users").doc(assistPick.userId).update({
    chosenGoalScorerPrediction:assistPick
  })
}


 }

 if(compName === "Assist"){
  const pastPredictionsNames = pastPredictions && pastPredictions.length >0 ? pastPredictions.map((item)=>(item.name)):[]

  if(pastPredictionsNames.includes(assistPick.name)){
    notifyErrorFxn("You can't select a player you have picked before,please pick again")
    return
  }else{ 
  db.collection("users").doc(assistPick.userId).update({
    chosenAssistPrediction:assistPick
  })
}

 }

 if(compName === "Clean Sheet"){

  const pastPredictionsNames = pastPredictions && pastPredictions.length >0 ? pastPredictions.map((item)=>(item.name)):[]
  if(pastPredictionsNames.includes(assistPick.name)){
    notifyErrorFxn("You can't select a team you have picked before,please pick again")
    return
  }else{

  db.collection("users").doc(assistPick.userId).update({
    chosenCleanSheetPrediction:assistPick
  })
  }

  }


  if(compName === "Team Win"){


  const pastPredictionsNames = pastPredictions && pastPredictions.length >0 ? pastPredictions.map((item)=>(item.name)):[]
  if(pastPredictionsNames.includes(assistPick.name)){
    notifyErrorFxn("You can't select a team you have picked before,please pick again!")
    return
  }else{
   
    db.collection("users").doc(assistPick.userId).update({
      chosenTeamWinPrediction:assistPick
    })
  
  }

    
  }
  




 /*======================== UPDATING THE USERS COLLECTION FOR WHAT THEY PICKED  --- END  ===================*/



    const indexOfInterest =compUserSelectionIds ? compUserSelectionIds.indexOf(assistPick.userId):-1

    if(indexOfInterest === -1){
     
     
      console.log("JUST BEFORE UPDATING, COMP ID IS --->",compId)
      
      db.collection("competitions").doc(compId).update({
        userSelections:firebase.firestore.FieldValue.arrayUnion(assistPick)
      }).then((docRef) => {
        //console.log(" course Document updated is: ", docRef);
        notifySuccessFxn("Submitted  Prediction Successfully!")
    
        db.collection("competitions").doc(compId.trim()).get().then((doc)=>{
        if(doc.exists){
          //console.log("COMPETITIONS PACK-->",doc.data())
         
    
        if(compName === "Goal Scorer"){
         dispatch(fetchGoalScorerResultsPerLeague(leagueId))
        }
    
        if(compName === "Assist"){
         dispatch(fetchAssistResultsPerLeague(leagueId))
        }
    
        if(compName === "Clean Sheet"){
         dispatch(fetchCleanSheetResultsPerLeague(leagueId))
         }
    
    
         if(compName === "Team Win"){
         dispatch(fetchTeamWinResultsPerLeague(leagueId))
         }
         
        }else{
          notifyErrorFxn("problem updating assist competition?")
        }
        })
       
      })
      .catch((error) => {
        console.error("Error adding this subject to the pack, please view--> : ", error);
        notifyErrorFxn("Error submitting your assist pick, please try again. ")
        
      });

   

      
    }else{


      compUserSelections[indexOfInterest] = assistPick
      //console.log("COMP USER SELECTIONS HERE --->",compUserSelections)

      db.collection("competitions").doc(compId).update({
    
        userSelections: compUserSelections
      }).then((docRef) => {
        //console.log(" course Document updated is: ", docRef);
        notifySuccessFxn("Submitted  Prediction Successfully!")
    
        db.collection("competitions").doc(compId.trim()).get().then((doc)=>{
        if(doc.exists){
          //console.log("COMPETITIONS PACK-->",doc.data())
         
    
        if(compName === "Goal Scorer"){
         dispatch(fetchGoalScorerResultsPerLeague(leagueId))
        }
    
        if(compName === "Assist"){
         dispatch(fetchAssistResultsPerLeague(leagueId))
        }
    
        if(compName === "Clean Sheet"){
         dispatch(fetchCleanSheetResultsPerLeague(leagueId))
         }
    
    
         if(compName === "Team Win"){
         dispatch(fetchTeamWinResultsPerLeague(leagueId))
         }
         
        }else{
          notifyErrorFxn("problem updating assist competition?")
        }
        })
       
      })
      .catch((error) => {
        console.error("Error adding this subject to the pack, please view--> : ", error);
        notifyErrorFxn("Error submitting your assist pick, please try again. ")
        
      });

    }





} else if(CompIsOpen === false){
  /** DO SOMETHING THAT INVOLVES  ONLY UPDATING THE EXISTING SELECTION beloW */
  
 const indexOfInterest = compUserSelectionIds.indexOf(assistPick.userId)

  if(indexOfInterest === -1){

     notifyErrorFxn("a user selection is to be updated , but the user has not selected before, for this competition!")
    return
  }


  compUserSelections[indexOfInterest] = assistPick

  db.collection("competitions").doc(compId).update({

    userSelections: compUserSelections
  }).then((docRef) => {
    console.log(" course Document updated is: ", docRef);
    notifySuccessFxn("Submitted  Prediction Successfully!")

    db.collection("competitions").doc(compId.trim()).get().then((doc)=>{
    if(doc.exists){
      console.log("COMPETITIONS PACK-->",doc.data())
     

    if(compName === "Goal Scorer"){
     dispatch(fetchGoalScorerResultsPerLeague(leagueId))
    }

    if(compName === "Assist"){
     dispatch(fetchAssistResultsPerLeague(leagueId))
    }

    if(compName === "Clean Sheet"){
     dispatch(fetchCleanSheetResultsPerLeague(leagueId))
     }


     if(compName === "Team Win"){
     dispatch(fetchTeamWinResultsPerLeague(leagueId))
     }
     
    }else{
      notifyErrorFxn("problem updating assist competition?")
    }
    })
   
  })
  .catch((error) => {
    console.error("Error adding this subject to the pack, please view--> : ", error);
    notifyErrorFxn("Error submitting your assist pick, please try again. ")
    
  });

 
} 

}else if(gameWeekStarted === true){
  notifyErrorFxn("The Gameweek is in progress, we can't update your selection at this time!")
}

},1000)})   //<--- end of huge .then statement , right after comp id is assigned



}



export const submitTeamsPrediction = (assistPick,compId) => async (dispatch) => {



  db.collection("competitions").doc(compId.trim()).update({
    userSelections:firebase.firestore.FieldValue.arrayUnion(assistPick)
  }).then((docRef) => {
    console.log(" course Document updated is: ", docRef);
    notifySuccessFxn("Submitted  Prediction Successfully!")

    db.collection("competitions").doc(compId.trim()).get().then((doc)=>{
    if(doc.exists){
      console.log("COMPETITIONS PACK-->",doc.data())
     
     //dispatch( fetchSubjectsInPackDetails(doc.data().subjectsInPack)) ---> U NEED TO REDISPATCH THIS COMPETITION SO THAT ONE CAN SEE IT IN THE assists PICKS PAGE,logic not written yet
     
     
    }else{
      notifyErrorFxn("problem updating assist competition?")
    }
    })
   
    //dispatch(fetchWatchListData)
    //dispatch(playlistUpdate(true));
  })
  .catch((error) => {
    console.error("Error adding this subject to the pack, please view--> : ", error);
    notifyErrorFxn("Error submitting your assist pick, please try again. ")
    
  });


}


export const fetchGoalScorerResultsPerLeague = (leagueId) => async (dispatch) => {
 
  db.collection("competitions")
  .where("compName", "==", "Goal Scorer")
  .where("leagueId", "==", leagueId)
  .get()
  .then((snapshot) => {
    const goalScorers = snapshot.docs.map((doc) => ({ ...doc.data() }));
    const  userSelections = goalScorers[0].userSelections
  if (goalScorers && goalScorers[0]) {
    dispatch(isItLoading(false));
    console.log("goal scorers Data:", goalScorers[0].userSelections);
    dispatch(saveGoalScorerResultsPerLeague(userSelections));
  } else {
      dispatch(isItLoading(false));
      console.log("No public groups!");
  }
})
  
}



export const fetchAssistResultsPerLeague = (leagueId) => async (dispatch) => {
  
  db.collection("competitions")
  .where("compName", "==", "Assist")
  .where("leagueId", "==", leagueId)
  .get()
  .then((snapshot) => {
    const assists = snapshot.docs.map((doc) => ({ ...doc.data() }));
    const  userSelections = assists[0].userSelections
  if (assists && assists[0]) {
    dispatch(isItLoading(false));
    console.log("assist Data:", assists[0].userSelections);
   
    dispatch(saveAssistResultsPerLeague(userSelections));
  } else {
    dispatch(saveAssistResultsPerLeague(userSelections));
      dispatch(isItLoading(false));
      console.log("No assists comp with this league id!");
  }
})
  
}




export const fetchCleanSheetResultsPerLeague = (leagueId) => async (dispatch) => {
 
  db.collection("competitions")
  .where("compName", "==", "Clean Sheet")
  .where("leagueId", "==", leagueId)
  .get()
  .then((snapshot) => {
    const CleanSheets = snapshot.docs.map((doc) => ({ ...doc.data() }));
    const  userSelections = CleanSheets[0].userSelections
  if (CleanSheets && CleanSheets[0]) {
    dispatch(isItLoading(false));
    console.log("clean sheet Data FOR THIS LEAGUE IS---->:", CleanSheets[0].userSelections);
    dispatch(saveCleanSheetResultsPerLeague(userSelections));
  } else {
      dispatch(isItLoading(false));
      console.log("no clean sheet with this league id!");
  }
})
  
}




export const fetchTeamWinResultsPerLeague = (leagueId) => async (dispatch) => {
 
  db.collection("competitions")
  .where("compName", "==", "Team Win")
  .where("leagueId", "==", leagueId)
  .get()
  .then((snapshot) => {
    const TeamWins = snapshot.docs.map((doc) => ({ ...doc.data() }));
    const  userSelections = TeamWins[0].userSelections
  if (TeamWins && TeamWins[0]) {
    dispatch(isItLoading(false));
    console.log("team win Data:", TeamWins[0].userSelections);
    dispatch(saveTeamWinResultsPerLeague(userSelections));
  } else {
      dispatch(isItLoading(false));
      console.log("No public groups!");
  }
})
  
}



export const saveAssistPickFourPrediction = (selection,navigate) => async (dispatch) => {

  dispatch(saveAssistPickFour(selection));
  navigate('/dashboard/pick-four-cleansheet')
}


export const saveGoalScorerPickFourPrediction = (selection,navigate) => async (dispatch) => {

  dispatch(saveGoalScorerPickFour(selection));
  navigate('/dashboard/pick-four-assists')
}

export const saveCleanSheetPickFourPrediction = (selection,navigate) => async (dispatch) => {

  dispatch(saveCleanSheetPickFour(selection));
  navigate('/dashboard/pick-four-teamwin')
}

export const submitPickFourPrediction = (teamWinSelection,pickFourSelections,competitionIdArray,userId) => async (dispatch) => {

const allFourSelections = [...pickFourSelections,teamWinSelection]

if(competitionIdArray && competitionIdArray.length === 4){
   
  competitionIdArray.forEach((compId,index)=>{

    db.collection("competitions").doc(compId.trim()).update({
      userSelections:firebase.firestore.FieldValue.arrayUnion(allFourSelections[index])
    }).then((docRef) => {
      

  db.collection("users").doc(userId).update({
    pickFourPrediction:firebase.firestore.FieldValue.arrayUnion(allFourSelections[index])
  })

    })
   
    .catch((error) => {
      console.error("Error adding this subject to the pack, please view--> : ", error);
      notifyErrorFxn("Error submitting your assist pick, please try again. ")
      
    });
   
  })

 
  notifySuccessFxn("Pick Four Successfully Submitted ")


}else{
  notifyErrorFxn("Something Went wrong while submiting pick 4,please try again")
}


}


export const joinCompetition = (compId, userId,accountBalance) => async (dispatch) => {

  db.collection("competitions").doc(compId).get().then((doc)=>{

    const data = doc.data();
    console.log("account balance ---->",accountBalance)
      
   if(data.isOpen === true){

    if (data.entryFee && data.entryFee > accountBalance){
     notifyErrorFxn("Account Balance too low for this transaction, please fund your account.")
     return
    }else{

      if(data.entryFee ){
      db.collection("users").doc(userId).update({
        competitions:firebase.firestore.FieldValue.arrayUnion(compId),
        accountBalance:Number(accountBalance) - Number(data.entryFee)
      })

    
      dispatch(fetchCandidateData(userId));
      notifySuccessFxn("Competition Joined Successfully")  
      }
      else{
        notifySuccessFxn("Issue with competition entry fee")  
      }
  

    }

  }else if(data.isOpen === false){

    notifyErrorFxn("This competition has started, you cannot join now")

  }
   


  })
.catch((error)=>{
    console.error("Error adding this subject to the pack, please view--> : ", error);
    notifyErrorFxn("Error submitting your assist pick, please try again. ")
    
  });

}



export const fetchTeamWinCompetitionInFocus = (compId) => async (dispatch) => {


  
  db.collection("competitions")
  .where("compName",  "==", "Team Win")
  .where("leagueId",  "==", compId)
  .get().then((snapshot)=>{

      const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
    
    if(allGroups.length > 0){
    
      const data = allGroups[0];
   
   dispatch(saveTeamWinCompetitionInFocus(data))
    }
    else{
     // notifyErrorFxn("Error fetching this leagues team win comp")
    }


  })
.catch((error)=>{
    console.error("Error adding this subject to the pack, please view--> : ", error);
    notifyErrorFxn("ERROR WHILE TRYING TO FETCH TEAM WIN COMP. ")
    
  });



}


export const fetchGoalScorerCompetitionInFocus = (compId) => async (dispatch) => {
   console.log("comp id is--->", compId)

  db.collection("competitions")
  .where("compName",  "==", "Goal Scorer")
  .where("leagueId",  "==", compId)
  .get().then((snapshot)=>{

      const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
    
    if(allGroups.length > 0){
    
      const data = allGroups[0];
   
   dispatch(saveGoalScorerCompetitionInFocus(data))
    }
    else{
     // notifyErrorFxn("Error fetching this leagues goal scorer comp")
    }


  })
.catch((error)=>{
    console.error("Error adding this subject to the pack, please view--> : ", error);
    notifyErrorFxn("ERROR WHILE TRYING TO FETCH GOAL SCORER COMP ")
    
  });



}


export const fetchAssistCompetitionInFocus = (compId) => async (dispatch) => {


  db.collection("competitions")
  .where("compName",  "==", "Assist")
  .where("leagueId",  "==", compId)
  .get().then((snapshot)=>{

      const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
    
    if(allGroups.length > 0){
    
      const data = allGroups[0];
   
   dispatch(saveAssistCompetitionInFocus(data))
    }
    else{
     // notifyErrorFxn("Error fetching this leagues assist comp")
    }


  
   
 
   



  })
.catch((error)=>{
    console.error("Error adding this subject to the pack, please view--> : ", error);
    notifyErrorFxn("ERROR WHILE TRYING TO FETCH ASSIST COMPETITION ")
    
  });



}



export const fetchCleanSheetCompetitionInFocus = (compId) => async (dispatch) => {


 
  db.collection("competitions")
  .where("compName",  "==", "Clean Sheet")
  .where("leagueId",  "==", compId)
  .get().then((snapshot)=>{

      const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
    
    if(allGroups.length > 0){
    
      const data = allGroups[0];
   
   dispatch(saveCleanSheetCompetitionInFocus(data))
    }
    else{
      //notifyErrorFxn("Error fetching this leagues clean sheet comp")
    }



  })
.catch((error)=>{
    console.error("Error adding this subject to the pack, please view--> : ", error);
    notifyErrorFxn("ERROR WHILE TRYING TO FETCH CLEAN SHEET COMP. ")
    
  });



}

export const startCompetition = (addObject) => async (dispatch) => {

 
  db.collection("competitions").add(
    {
      compName:addObject.compName,
      entryFee:addObject.entryFee,
      isOpen:true,
      leagueId:addObject.leagueId,
      
      sportId:1,
      sportName:addObject.sportName,
      dateCreated:new Date(),
      finalResults:[],
      userSelections:[]
    }
  ).then((doc) => {
     //const publicGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
     db.collection("competitions").doc(doc.id).update({
    id:doc.id
     })

    console.log("the documents id is",doc.id)
     notifySuccessFxn(` the new competition has been added!`)
   

 }).catch((error) => {
   console.log("Error adding/starting the new competition:", error);
   notifyErrorFxn(error)


 });

}


export const fetchAllCompetitionsInOneLeague = (leagueCode) => async (dispatch) => {

  //dispatch(isItLoading(true));
  db.collection("competitions")
  .where('leagueId', '==', leagueCode)
   .get()
   .then((snapshot) => {
     const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (allGroups.length > 0) {
    // dispatch(isItLoading(false));
     console.log("All Groups Data:", allGroups);
     dispatch(saveAllCompetitionsInOneLeague(allGroups));
   } else {
       //dispatch(isItLoading(false));
       dispatch(saveAllCompetitionsInOneLeague([]));
       console.log("No COMPETITONS IN THIS LEAGUE -- THIS IS FROM JOB ACTIONS FILE!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   //dispatch(isItLoading(false));
 });


}


export const fetchAllCompetitionsForOneUser = (competitionIdArray) => async (dispatch) => {
  console.log("competitionIdArray",competitionIdArray)
  //dispatch(isItLoading(true));
  db.collection("competitions")
  .where('id', 'in', competitionIdArray)
   .get()
   .then((snapshot) => {
     const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (allGroups.length > 0) {
    // dispatch(isItLoading(false));
     console.log("All Groups Data:", allGroups);
     dispatch(saveAllCompetitionsForOneUser(allGroups));
   } else {
       //dispatch(isItLoading(false));
       dispatch(saveAllCompetitionsForOneUser([]));
       console.log("No COMPETITONS IN THIS LEAGUE -- THIS IS FROM JOB ACTIONS FILE!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   //dispatch(isItLoading(false));
 });


}



export const fetchAllUsersInOneLeague = (leagueCode,leagueName) => async (dispatch) => {

  const leagueObject = {
      leagueCode:leagueCode,
      leagueId:Number(leagueCode),   //<---- update this logic later, when the codes nad id's become clearer
      leagueName:leagueName
  }

//dispatch(isItLoading(true));
db.collection("users")
.where('Leagues', 'array-contains', leagueObject)
 .get()
 .then((snapshot) => {
   const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
 if (allGroups.length > 0) {
  // dispatch(isItLoading(false));
   console.log("ALL USERS IN THIS LEAGUE Data--->:", allGroups);
   dispatch(saveAllUsersInOneLeague(allGroups));
 } else {
     //dispatch(isItLoading(false));
      dispatch(saveAllUsersInOneLeague([]));
     console.log("No USERS IN THIS LEAGUE -- THIS IS FROM JOB ACTIONS FILE!");
 }
}).catch((error) => {
 console.log("Error getting document:", error);
 //dispatch(isItLoading(false));
});



}

export const updateUserBalance = (userId,newBalance,leagueCode,leagueName) => async (dispatch) => {

  db.collection("users").doc(userId).update({
    accountBalance:Number(newBalance)
     }).then(()=>{
      dispatch(fetchAllUsersInOneLeague(leagueCode,leagueName))
      notifySuccessFxn("User balance updated successfully !")
     }).catch((error) => {
      console.log("Error getting document:", error);
      notifyErrorFxn("Problem updating user balance,please try again.")
     });
    
    }


    export const  setUserInFocusForDeposits =  (userObject) => async (dispatch) => {

      dispatch(saveUserInFocusForDeposits(userObject))
    }



    export const  setDepositCanChangeNow =  (confirm) => async (dispatch) => {

      dispatch(saveDepositCanChangeNow(confirm))
    }


    export const  removeLeagueFromUser =  (userObject,leagueCodeInFocus,leagueNameInFocus) => async (dispatch) => {

      //db.collection("users").doc(userObject.id)

      console.log("THE USER OBJECT  I RECIEVE IS -->",userObject)
    
      db.collection("users").doc(userObject.id).get(
       
         ).then((doc)=>{
         
         const userInFocus = doc.data()

         let usersLeagues = userInFocus.Leagues

         let userCompetitions =  userInFocus.competitions //<--- we will filter out comps from here based on the comps in the league we want to delete

         const usersLeagueCodes = userInFocus.Leagues.map((item)=>(item.leagueCode))
       
      const indexOfInterest = usersLeagueCodes.indexOf(leagueCodeInFocus)


/* THIS LOGIC WILL FETCH ALL COMPS IN THAT LEAGUE, THEN WE WILL USE IT TO REMOVE FROM  - dEC 8TH 2023 */
     
  db.collection("competitions")
  .where('leagueId', '==', leagueCodeInFocus)
   .get()
   .then((snapshot) => {
     const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (allGroups.length > 0) {
   
    /*DO SOMETHING HERE TO FILTER OUT ALL COMPS HERE FROM THE USERS COMPS */
   }
 })


  /* THIS LOGIC WILL FETCH ALL COMPS IN THAT LEAGUE, THEN WE WILL USE IT TO REMOVE FROM  - dEC 8TH 2023  END*/
     

       if(indexOfInterest === -1){
        notifyErrorFxn("couldn't remove user from this league, please try again")
       }else{

     
       usersLeagues.splice(indexOfInterest,1)

       db.collection("users").doc(userObject.id).update({
           Leagues:usersLeagues
       }).then(()=>{

        dispatch(fetchAllUsersInOneLeague(leagueCodeInFocus,leagueNameInFocus))
         
       
        }).then(()=>{
          notifySuccessFxn("Successfully removed User from this league")
        })

       }
       
        }).catch((error) => {
          console.log("Error getting document:", error);
          notifyErrorFxn("Problem removing user from this league")
         });
    }

