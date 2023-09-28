import { db } from "../../config/firebase";
import { fetchCandidates, fetchSingleCandidate } from "../reducers/candidate.slice";
import { notifyErrorFxn, notifySuccessFxn } from "src/utils/toast-fxn";
import { fetchUserData } from "./auth.action";
//I am refreshing user data when a candidate takes a test, so I need to call user data from the auth actions file



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


export const submitBloodInvestigation =  (uid,patientId,b1,b2,b3,b4) =>async (dispatch) => {
    const userRef = db.collection('Candidates').doc(uid);
    const userSnapshot = await userRef.get();
    

  if (userSnapshot.exists) {


    const candidateResponseArray = userSnapshot.data().response?userSnapshot.data().response:[]


    const particularPatientPosition =  candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(patientId):-1
    console.log("particular patients position",particularPatientPosition)

    if(particularPatientPosition !== -1){

      candidateResponseArray[particularPatientPosition] = {
  
        ...candidateResponseArray[particularPatientPosition],
        chosenBloodInvestigation: b1,
        chosenComplaintId: b4,
        chosenBloodInvestigationTests:b2,
        chosenBloodInvestigationTestIds:b3,
        bloodInvestigationPassed:null,
        patientId,
        takenOn:new Date()

      }
  
     }else{
      candidateResponseArray.push({
        chosenBloodInvestigation: b1,
        chosenComplaintId: b4,
        chosenBloodInvestigationTests:b2,
        chosenBloodInvestigationTestIds:b3,
        bloodInvestigationPassed:null,
        patientId,
        takenOn:new Date()

      })
     }
  



     await userRef.update({ response:[...candidateResponseArray]
     });



    
     const refetchUser = await userRef.get();
     const redoResponseArray = refetchUser.data().response?refetchUser.data().response:[]

  
     const testToCheck = db.collection('TreatmentCategory').doc(redoResponseArray[particularPatientPosition].chosenBloodInvestigationId);
    const testSnapshot = await testToCheck.get();

    




    if(testSnapshot.exists && 
      
      redoResponseArray[particularPatientPosition].chosenBloodInvestigationTestIds.every((item)=>(testSnapshot.data().correctAnswers.includes(item)))

      ){
     redoResponseArray[particularPatientPosition] = {
  
      ...redoResponseArray[particularPatientPosition],
      bloodInvestigationPassed:true,
      bloodInvestigationAnswerImages:['https://firebasestorage.googleapis.com/v0/b/ibara-34497.appspot.com/o/bloodinv1.jpeg?alt=media&token=6a14d66d-5943-40b8-b76e-cd003502bae5','https://firebasestorage.googleapis.com/v0/b/ibara-34497.appspot.com/o/bloodinv2.jpeg?alt=media&token=6040b950-ccd6-42de-a710-c029b74afde7']/*testSnapshot.data().answerImages*/
    }

  }else{

    redoResponseArray[particularPatientPosition] = {
  
      ...redoResponseArray[particularPatientPosition],
      bloodInvestigationPassed:true,
    }

  }



  await userRef.update({ response:[...redoResponseArray]
  }).then((value)=>{
   

    console.log("the user we wanna fetch is",uid)
  dispatch(fetchUserData(uid))


    notifySuccessFxn(`submitted blood investigation!`);
  })

  
    
}
  
  }



  export const submitRadiology =  (uid,patientId,b1,b2,b3,b4) =>async (dispatch) => {
    const userRef = db.collection('Candidates').doc(uid);
    const userSnapshot = await userRef.get();
    

  if (userSnapshot.exists) {

    console.log("user in question is",userSnapshot.data())
    console.log("our inputs are",patientId,b1,b2,b3,b4)

    const candidateResponseArray = userSnapshot.data().response?userSnapshot.data().response:[]

    const particularPatientPosition =  candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(patientId):-1
    console.log("particular patients position",particularPatientPosition)


   if(particularPatientPosition !== -1){

    candidateResponseArray[particularPatientPosition] = {

      ...candidateResponseArray[particularPatientPosition],
      chosenRadiology: b1,
      chosenComplaintId: b4,
      chosenRadiologyTests:b2,
      chosenRadiologyTestIds:b3,
      radiologyPassed:null,
      patientId,
      takenOn:new Date()
    
    }

   }else{
    candidateResponseArray.push({
      chosenRadiology: b1,
      chosenComplaintId: b4,
      chosenRadiologyTests:b2,
      chosenRadiologyTestIds:b3,
      radiologyPassed:null,
      patientId,
      takenOn:new Date()
    
    })
   }


  

   await userRef.update({ response:[...candidateResponseArray]
   });

  

   const refetchUser = await userRef.get();
   const redoResponseArray = refetchUser.data().response?refetchUser.data().response:[]


   const testToCheck = db.collection('TreatmentCategory').doc(redoResponseArray[particularPatientPosition].chosenRadiologyId);
  const testSnapshot = await testToCheck.get();



  if(testSnapshot.exists && 

   
    redoResponseArray[particularPatientPosition].chosenRadiologyTestIds.every((item)=>(testSnapshot.data().correctAnswers.includes(item)))
    
    ){
    redoResponseArray[particularPatientPosition] = {
 
     ...redoResponseArray[particularPatientPosition],
     radiologyPassed:true,
     radiologyAnswerImages:['https://firebasestorage.googleapis.com/v0/b/ibara-34497.appspot.com/o/radiologyresult1.jpeg?alt=media&token=c9e501ef-da43-4a19-89fe-de0352eafe87']/*testSnapshot.data().answerImages*/
   }

 }else{

   redoResponseArray[particularPatientPosition] = {
 
     ...redoResponseArray[particularPatientPosition],
     radiologyPassed:true,
   }

 }



 await userRef.update({ response:[...redoResponseArray]
 }).then((value)=>{
  
   
 dispatch(fetchUserData(uid))
  
 notifySuccessFxn(`submitted radiology!`);

 })

 
    
}
  
  }


  export const submitPrescription=  (uid,patientId,b1) =>async (dispatch) => {
    const userRef = db.collection('Candidates').doc(uid);
    const userSnapshot = await userRef.get();
    

  if (userSnapshot.exists) {

    console.log("user is",userSnapshot.data())

    const candidateResponseArray = userSnapshot.data().response?userSnapshot.data().response:[]

    const particularPatientPosition =  candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(patientId):-1
    console.log("particular patients position",particularPatientPosition)
   
    //const particularPatientResponse = userSnapshot.data().response.filter((item)=>{item.patientId === patientId})

   if(particularPatientPosition !== -1){

    candidateResponseArray[particularPatientPosition] = {

      ...candidateResponseArray[particularPatientPosition],
      prescriptionWriteup: b1,
      patientId,
      takenOn:new Date(),
    }

   }else{
    candidateResponseArray.push({
      prescriptionWriteup: b1,
      patientId,
      takenOn:new Date()
    })
   }



    await userRef.update({ response:[...candidateResponseArray]
    });
  
    notifySuccessFxn(`submitted Prescription!`);
    
}
   
  }


  export const submitReferral=  (uid,patientId,b1) =>async (dispatch) => {
    const userRef = db.collection('Candidates').doc(uid);
    const userSnapshot = await userRef.get();
    

  if (userSnapshot.exists) {

    console.log("user is",userSnapshot.data())


    const candidateResponseArray = userSnapshot.data().response?userSnapshot.data().response:[]
    console.log("candidate response array",candidateResponseArray)


    const particularPatientPosition =  candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(patientId):-1
    console.log("particular patients position",particularPatientPosition)

    if(particularPatientPosition !== -1){

      candidateResponseArray[particularPatientPosition] = {
  
        ...candidateResponseArray[particularPatientPosition],
        chosenReferral: b1,
        patientId,
        takenOn:new Date(),
      }
  
     }else{
      candidateResponseArray.push({
        chosenReferral: b1,
        patientId,
        takenOn:new Date()
      })
     }


    

    await userRef.update({ response:[...candidateResponseArray]});
  
    notifySuccessFxn(`submitted Referral!`);
    
}
  
  }