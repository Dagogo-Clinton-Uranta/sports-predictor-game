import { db } from "../../config/firebase";
import { fetchCandidates, fetchSingleCandidate } from "../reducers/candidate.slice";
import { notifyErrorFxn, notifySuccessFxn } from "src/utils/toast-fxn";

export const getCandidates = (uid) => async (dispatch) => {
    db.collection('Candidates').get().then((snapshot) => {
        const cand = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
        console.log("Candidates Data: ", cand);
        dispatch(fetchCandidates(cand));
    }).catch((error) => {
        var errorMessage = error.message;
        console.log('Error fetching candidates', errorMessage);
    });
};

export const getSingleCandidate = (id) => async (dispatch) => {
    var cand = db.collection("Candidates").doc(id);

    cand.get().then((doc) => {
    if (doc.exists) {
        console.log("Single Candidate data:", doc.data());
        dispatch(fetchSingleCandidate(doc.data()));
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

};


export const submitBloodInvestigation =  (uid,b1,b2) =>async (dispatch) => {
    const userRef = db.collection('Candidates').doc(uid);
    const userSnapshot = await userRef.get();
    

  if (userSnapshot.exists) {

    console.log("user is",userSnapshot.data())

    await userRef.update({ repsonse: {
      ...userSnapshot.data().repsonse,
    chosenBloodInvestigation: b1,
    bloodInvestigationTest:b2,
  
    }});
  
    notifySuccessFxn(`submitted blood investigation!`);
    
}
  
  }



  export const submitRadiology =  (uid,b1,b2) =>async (dispatch) => {
    const userRef = db.collection('Candidates').doc(uid);
    const userSnapshot = await userRef.get();
    

  if (userSnapshot.exists) {

    console.log("user is",userSnapshot.data())

    await userRef.update({ repsonse: {
      ...userSnapshot.data().repsonse,
    chosenRadiology: b1,
    radiologyTest:b2,
  
    }});
  
    notifySuccessFxn(`submitted radiology!`);
    
}
    //YOU STOPPED HERE dagogo
  }


  export const submitPrescription=  (uid,b1) =>async (dispatch) => {
    const userRef = db.collection('Candidates').doc(uid);
    const userSnapshot = await userRef.get();
    

  if (userSnapshot.exists) {

    console.log("user is",userSnapshot.data())

    await userRef.update({ repsonse: {
      ...userSnapshot.data().repsonse,
    prescriptionWriteup: b1,
    }});
  
    notifySuccessFxn(`submitted Prescription!`);
    
}
   
  }


  export const submitReferral=  (uid,b1) =>async (dispatch) => {
    const userRef = db.collection('Candidates').doc(uid);
    const userSnapshot = await userRef.get();
    

  if (userSnapshot.exists) {

    console.log("user is",userSnapshot.data())

    await userRef.update({ repsonse: {
      ...userSnapshot.data().repsonse,
    chosenReferral: b1,
    }});
  
    notifySuccessFxn(`submitted Referral!`);
    
}
  
  }