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
     }).then(async(notUsing)=>{

 

      const refetchUser = await userRef.get();
      const redoResponseArray = refetchUser.data().response?refetchUser.data().response:[]
      
      const particularPatientPositionAlso =  candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(patientId):-1
   
      const complaintToCheck = db.collection('Complaints').doc(redoResponseArray[particularPatientPositionAlso].chosenComplaintId);
     const complaintSnapshot = await complaintToCheck.get();
    //console.log("radiology complaint is",complaintSnapshot.data())
   
   
     if(complaintSnapshot.exists && complaintSnapshot.data().treatment.chosenBloodInvestigationIdArray &&
   
      
        (redoResponseArray[particularPatientPositionAlso].chosenBloodInvestigationTestIds.every((item)=>(complaintSnapshot.data().treatment.chosenBloodInvestigationIdArray.includes(item))))
       
       ){
   
        let correctAnswers= complaintSnapshot.data().treatment.chosenBloodInvestigationIdArray
        //console.log ("what we are sending treatment tests to search is",correctAnswers)
   
      await  db.collection('TreatmentTests')
       .where('uid', 'in', correctAnswers)
       .get()
       .then((snapshot) => {
         const correctAnswerImages = snapshot.docs.map((doc) => (doc.data().answerImage));
         
         if (correctAnswerImages.length) {
          
           redoResponseArray[particularPatientPositionAlso] = {
     
             ...redoResponseArray[particularPatientPositionAlso],
             bloodInvestigationPassed:true,
             bloodInvestigationAnswerImages:correctAnswerImages
           }
           
        
         } else {
          
           redoResponseArray[particularPatientPositionAlso] = {
     
             ...redoResponseArray[particularPatientPositionAlso],
             bloodInvestigationPassed:true,
             bloodInvestigationAnswerImages:[]
           }
   
         }
       })
       .catch((error) => {
         console.log('Error getting document:', error);
         notifyErrorFxn(`error assigning correct answer images for radiology!`);
       });
         
      
    }else{
    
      redoResponseArray[particularPatientPositionAlso] = {
    
        ...redoResponseArray[particularPatientPositionAlso],
        bloodInvestigationPassed:false,
      }
   
    }
   
    
   
    return redoResponseArray
   
   }).then((updatedArray)=>{
    
     
     userRef.update({ response:[...updatedArray]
     }).then((value)=>{
       
       
     dispatch(fetchUserData(uid))
      
     notifySuccessFxn(`submitted blood investigation!`);
   
    
     })
     
    
   })
  
    
}
  
  }



  export const submitRadiology =  (uid,patientId,b1,b2,b3,b4) =>async (dispatch) => {
    const userRef = db.collection('Candidates').doc(uid);
    const userSnapshot = await userRef.get();
    

  if (userSnapshot.exists) {

  //  console.log("user in question is",userSnapshot.data())
   // console.log("our inputs are",patientId,b1,b2,b3,b4)

    const candidateResponseArray = userSnapshot.data().response?userSnapshot.data().response:[]

    const particularPatientPosition =  candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(patientId):-1
    //console.log("particular patients position",particularPatientPosition)


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
   }).then(async(notUsing)=>{

 

   const refetchUser = await userRef.get();
   const redoResponseArray = refetchUser.data().response?refetchUser.data().response:[]
   
   const particularPatientPositionAlso =  candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(patientId):-1

   const complaintToCheck = db.collection('Complaints').doc(redoResponseArray[particularPatientPositionAlso].chosenComplaintId);
  const complaintSnapshot = await complaintToCheck.get();
 //console.log("radiology complaint is",complaintSnapshot.data())


  if(complaintSnapshot.exists && complaintSnapshot.data().treatment.chosenRadiologyIdArray &&

   
     (redoResponseArray[particularPatientPositionAlso].chosenRadiologyTestIds.every((item)=>(complaintSnapshot.data().treatment.chosenRadiologyIdArray.includes(item))))
    
    ){

     let correctAnswers= complaintSnapshot.data().treatment.chosenRadiologyIdArray
     //console.log ("what we are sending treatment tests to search is",correctAnswers)

   await  db.collection('TreatmentTests')
    .where('uid', 'in', correctAnswers)
    .get()
    .then((snapshot) => {
      const correctAnswerImages = snapshot.docs.map((doc) => (doc.data().answerImage));
      
      if (correctAnswerImages.length) {
       
        redoResponseArray[particularPatientPositionAlso] = {
  
          ...redoResponseArray[particularPatientPositionAlso],
          radiologyPassed:true,
          radiologyAnswerImages:correctAnswerImages
        }
        
     
      } else {
       
        redoResponseArray[particularPatientPositionAlso] = {
  
          ...redoResponseArray[particularPatientPositionAlso],
          radiologyPassed:true,
          radiologyAnswerImages:[]
        }

      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
      notifyErrorFxn(`error assigning correct answer images for radiology!`);
    });
      
   
 }else{
 
   redoResponseArray[particularPatientPositionAlso] = {
 
     ...redoResponseArray[particularPatientPositionAlso],
     radiologyPassed:false,
   }

 }

 

 return redoResponseArray

}).then((updatedArray)=>{
 
  
  userRef.update({ response:[...updatedArray]
  }).then((value)=>{
    
    
  dispatch(fetchUserData(uid))
   
  notifySuccessFxn(`submitted radiology!`);

 
  })
  
 
})
    
}



  }


  export const submitPrescription=  (uid,patientId,b1,b2) =>async (dispatch) => {
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
      prescriptionResponseArray: b1,
      patientId,
      chosenComplaintId:b2,
      takenOn:new Date(),
    }

   }else{
    candidateResponseArray.push({
      prescriptionResponseArray: b1,
      patientId,
      chosenComplaintId:b2,
      takenOn:new Date()
    })
   }



    await userRef.update({ response:[...candidateResponseArray]
    }).then(async(notUsing)=>{

 

      const refetchUser = await userRef.get();
      const redoResponseArray = refetchUser.data().response?refetchUser.data().response:[]
      
      const particularPatientPositionAlso =  candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(patientId):-1
   
      const complaintToCheck = db.collection('Complaints').doc(redoResponseArray[particularPatientPositionAlso].chosenComplaintId);
     const complaintSnapshot = await complaintToCheck.get();
    //console.log("radiology complaint is",complaintSnapshot.data())
   
   
     if(complaintSnapshot.exists && complaintSnapshot.data().treatment.correctPrescriptionArray &&
   
      
        (redoResponseArray[particularPatientPositionAlso].prescriptionResponseArray.every((item)=>(complaintSnapshot.data().treatment.correctPrescriptionArray.includes(item))))
       
       ){
   
       // let correctAnswers= complaintSnapshot.data().treatment.correctPrescriptionArray
       
      /*await  db.collection('TreatmentTests')*/
       //.where('uid', 'in', correctAnswers)
      /* .get()*/
       /*.then((snapshot) => {*/
        // const correctAnswerImages = snapshot.docs.map((doc) => (doc.data().answerImage));
         
        /* if (correctAnswerImages.length) {
          
           redoResponseArray[particularPatientPositionAlso] = {
     
             ...redoResponseArray[particularPatientPositionAlso],
             radiologyPassed:true,
             radiologyAnswerImages:correctAnswerImages
           }
           
        
         }*/ /*else {*/
          
           redoResponseArray[particularPatientPositionAlso] = {
     
             ...redoResponseArray[particularPatientPositionAlso],
             prescriptionPassed:true,
           }
   
       /*  }*/
      /* }) */
      /* .catch((error) => {
         console.log('Error getting document:', error);
         notifyErrorFxn(`error assigning correct answer images for radiology!`);
       });*/
         
      
    }else{
    
      redoResponseArray[particularPatientPositionAlso] = {
    
        ...redoResponseArray[particularPatientPositionAlso],
        prescriptionPassed:false,
      }
   
    }
   
    
   
    return redoResponseArray
   
   }).then((updatedArray)=>{
    
     
     userRef.update({ response:[...updatedArray]
     }).then((value)=>{
       
       
     dispatch(fetchUserData(uid))
      
     notifySuccessFxn(`submitted Prescription!`);
   
    
     })
     
    
   })
  
   
    
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