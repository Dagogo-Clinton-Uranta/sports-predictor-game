import { db, fb, auth, storage } from '../../config/firebase';
import { clearUser, isItLoading, loginFailed, loginSuccess, logoutFxn, signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { clearGroup } from '../reducers/football.slice';
import { fetchAllTreatmentCategories, fetchAllTreatmentTests, getAdmittedPatients, getAllPatients, getWaitingRoomPatients } from './patient.action';
import { setLeagueInFocus } from './football.action';
import firebase from "firebase/app";

export const signin = (user, navigate, setLoading) => async (dispatch) => {
  dispatch(isItLoading(true))
  
  fb.auth().signInWithEmailAndPassword(user.email, user.password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log('Signed In user is: ', user.email);
    
    
      // dispatch(getAllPatients());
      
       
       // dispatch(fetchAllTreatmentCategories());
       // dispatch(fetchAllTreatmentTests());
        dispatch(fetchCandidateData(user.uid, "sigin", navigate, setLoading));
        dispatch(isItLoading(false))
  })
  .catch((error) => {
    setLoading(false);
    let errorCode = error.code;
    let errorMessage = error.message;
    let JSONmessage = JSON.parse(error.message)
   
     notifyErrorFxn(JSONmessage.error.message);
    console.log('Error Code is: ', errorCode, ' Error - Msg is: ',JSONmessage);
    dispatch(isItLoading(false))
    dispatch(loginFailed(errorMessage));
  });

};


export const signup = (user, navigate, setLoading) => async (dispatch) => {
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today  = new Date();
dispatch(isItLoading(true))
let initialLeague = []

if(user.userLocation === "Nigeria"){
 
  initialLeague =[
    {
      leagueCode:"290ABC",
      leagueName:"GLOBAL LEAGUE NG",
      leagueId:"290ABC",
      location:"Nigeria"
    }
  ]

}else if(user.userLocation === "United Kingdom"){

  initialLeague =[
    {
      leagueCode:"123D09",
      leagueName:"GLOBAL LEAGUE UK",
      leagueId:"123D09",
      location:"United Kingdom"
    }
  ]


}else if(user.userLocation === "United States of America"){

  initialLeague =[
    {
      leagueCode:"415ABD",
      leagueName:"GLOBAL LEAGUE US",
      leagueId:"415ABD",
      location:"United States of America"
    }
  ]


}

/*db.collection("leagues")
.where('code', '==', user.leagueCode)
.get().then((snapshot)=>{
*/

/*  const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));

if(allGroups.length === 0){
 
 notifyErrorFxn("this league does not exist, please check league code")
 dispatch(isItLoading(false))
 return
}*/

/*else{*/

  fb.auth().createUserWithEmailAndPassword(
    user.fname,
    user.password
).then((res)=>{
   db.collection('users').doc(res.user.uid).set({
    id: res.user.uid,
    firstName:user.firstName,
    lastName:user.lastName,
    email: user.fname,
    Leagues:[...initialLeague/*{
      leagueCode:user.leagueCode,
      leagueName:allGroups[0] && allGroups[0].name,
      leagueId:user.leagueCode
    }*/],
    //leagueCode:user.leagueCode,<---- make an array of leagues and put in league code and team name as the 1st value 06/12/2023
    location:user.userLocation,
    teamName:user.teamName,
    password: user.password,
    accountBalance:0,
    accountCreated: today.toLocaleDateString("en-US", options),
    chosenPredictionGoalScorer:{ },
    chosenPredictionAssist:{ },
    chosenPredictionTeamWin:{ },
    chosenPredictioncleanSheet:{ },
    pastGoalScorerSelections: [ ],
    pastAssistSelections: [ ],
    pastTeamWinSelections: [ ],
    pastCleanSheetSelections: [ ],
    userType:"user",
    competitions:[],
    eliminatedCompetitions:[]

   

  })

  dispatch(isItLoading(false))

  fb.auth().sendPasswordResetEmail(user.fname)
  //fb.auth().currentUser.sendEmailVerification()
    
}).then(() => {
  notifySuccessFxn('Registered Successfully✔');
  navigate('/login', { replace: true });
}).catch((err) => {
  console.error("Error signing up: ", err);
  var errorMessage = err.message;
  let JSONmessage = JSON.parse(err.message)
   
  notifyErrorFxn(JSONmessage.error.message);
  dispatch(signupFailed({ errorMessage }));
  dispatch(isItLoading(false))
  setLoading(false);
})

/*}*/

/*})*/

}

export const joinLeague = (uid,leagueCode ,navigate, setLoading) => async (dispatch) => {
 setLoading(true)

  dispatch(isItLoading(true))

db.collection("leagues")
.where('code', '==', leagueCode)
.get().then((snapshot)=>{
  const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));

if(allGroups.length === 0){
 
 notifyErrorFxn("this league does not exist, please check league code")
 dispatch(isItLoading(false))
 return
}

else{


   db.collection('users').doc(uid).update({

    Leagues:firebase.firestore.FieldValue.arrayUnion({
      leagueCode:leagueCode,
      leagueName:allGroups[0] && allGroups[0].name,
      leagueId:leagueCode
    }),
    //leagueCode:user.leagueCode,<---- make an array of leagues and put in league code and team name as the 1st value 06/12/2023

  })
.then(() => {
  dispatch(fetchCandidateData(uid,'',navigate,setLoading));

 
}).then(()=>{
  notifySuccessFxn('League Joined Successfully✔');
  setTimeout(navigate('/dashboard/football-goalscorers'),1500);

}).catch((err) => {
  console.error("Error signing up: ", err);
  var errorMessage = err.message;
  let JSONmessage = JSON.parse(err.message)
   
  notifyErrorFxn(JSONmessage.error.message);
  dispatch(signupFailed({ errorMessage }));
  dispatch(isItLoading(false))
  setLoading(false);
})

}

})


}



export const uploadImage = (user, file, navigate, setLoading) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`profile_images/${imageName}`).put(file);
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
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          dispatch(signup(user, file, navigate, setLoading, url));
        });
    }
  );
}


export const fetchUserData = (id, type, navigate, setLoading) => async (dispatch) => {
  var user = db.collection("Candidates").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
    // console.log("User Data:", doc.data());
    dispatch(storeUserData(doc.data()));
    if(type === "sigin"){
      // notifySuccessFxn("Logged In😊");
      navigate('/dashboard/entry', { replace: true });
    }
  } else {
      setLoading(false);
      notifyErrorFxn("Unauthorized❌")
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
return user;
};


export const fetchCandidateData = (id, type, navigate, setLoading) => async (dispatch) => {
  var user = db.collection("users").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
     console.log("User Data for ut6 -->>:", doc.data());



  dispatch(setLeagueInFocus(doc.data() && doc.data().Leagues &&doc.data().Leagues.length && doc.data().Leagues[0] ))


    dispatch(storeUserData(doc.data()));
    if(type === "sigin"){
      // notifySuccessFxn("Logged In😊");
      navigate('/dashboard/football-goalscorers', { replace: true });
    }
  } else {
      setLoading(false);
      notifyErrorFxn("Unauthorized❌")
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
return user;
};



export const uploadProfileImage = (profileData, file, userID, navigate, setLoading,setOpenImage,setOpen) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name-->: ', imageName);
  const uploadTask = storage.ref(`profile_images/${imageName}`).put(file);
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
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          setLoading(false)
          setOpenImage(false)
          setOpen(null)
          dispatch(updateProfileImageInUser(profileData, userID, file, navigate, setLoading, url));
        });
    }
  );
}



export const updateProfileImageInUser = (profileData, userID, file, navigate, setLoading, url) => async (dispatch) => {
  // return  
  db.collection('users').doc(userID).update({
    imageUrl: url,
  })
  .then(()=>{

    var user = db.collection("users").doc(userID);
    user.get().then((doc) => {
    if (doc.exists) {
      // console.log("User Data:", doc.data());
  
  
  
    
      dispatch(storeUserData(doc.data()));
    
    } else {
        setLoading(false);
        notifyErrorFxn("Error updating image,please try again")
        console.log("No such document!");
    }
  })

  })
  
  .then((res)=>{
    setLoading(false);
    notifySuccessFxn("Image updated successfully !");
   
  }).catch((err) => {
    setLoading(false);
    notifyErrorFxn("Problem updating image,please try again");
    console.log("ERR-: ", err);
  })
}




export const updateProfile = (profileData, userID, file, navigate, setLoading, url) => async (dispatch) => {
  // return  
  db.collection('users').doc(userID).update({
    paymentLink: profileData.paymentLink,
    imageUrl: url,
  }).then((res)=>{
       if(profileData?.password){
        //update password start
        const user = auth.currentUser;
        user.updatePassword(profileData.password)
          .then(() => {
            setLoading(false);
            console.log("Password updated successfully");
            notifySuccessFxn("Updated successfully");
            navigate('/dashboard/home', { replace: true });
          })
          .catch((error) => {
            setLoading(false);
            console.error("Error updating password: ", error);
            notifyErrorFxn(error.message);
          });
       //update password end
       }else{
        setLoading(false);
        console.error("No Password to update");
        notifySuccessFxn("Updated successfully");
        navigate('/dashboard/home', { replace: true });
       }
     
  }).catch((err) => {
    setLoading(false);
    console.log("ERR-: ", err);
  })
}


export const logout = (navigate) => async (dispatch) => {
  fb.auth().signOut().then(() => {
    dispatch(logoutFxn());
    dispatch(clearUser());
    dispatch(clearGroup());
    navigate('/login', { replace: true });
    console.log('logout was successful!');
  }).catch((error) => {
    // An error happened.
    console.log('logout failed response: ', error.message);
  });
  
}