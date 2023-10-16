import { notifyErrorFxn, notifySuccessFxn,notifyInfoFxn } from "src/utils/toast-fxn";
import { db } from "../../config/firebase";
import { clearPatient, fetchAdmittedPatients, fetchAllPatients,fetchPatients,fetchPatientTimers,fetchWaitTimers ,setIsLoading, setSelectedPatient,saveAllTreatmentCategories,saveAllTreatmentTests } from '../reducers/patient.slice';
import { fetchCandidateData } from "./auth.action";



export const getAllPatients = () => async (dispatch) => {


  db.collection('Patients')
  .where('isAdmitted', 'in',[true,false])
  .get()
  .then((snapshot) => {
    const patients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const patientTimers = snapshot.docs.map((doc) => ({ id: doc.id,
                                                       firstName:doc.data().firstName,
                                                       lastName:doc.data().lastName,
                                                       screenCountdown:doc.data().screenTime*60*1000,
                                                       waitCountdown:doc.data().waitTime*60*1000 }));

  
  
      const waitingRoomPatients = patients.filter((item)=>(item.waitElapsed===true && item.isAdmitted===false))
      const admittedPatients = patients.filter((item)=>(item.waitElapsed===true && item.isAdmitted===true))

  

      dispatch(fetchAdmittedPatients(admittedPatients))
      dispatch(fetchPatients(waitingRoomPatients))
      
      dispatch(fetchAllPatients(patients));
   
      //wait time array is a countdown for those who are yet to arrive in the hospital
      const waitTimeArray = sessionStorage.getItem("waitTimers")!==null? JSON.parse(sessionStorage.getItem("waitTimers")):[]


    const currentTimeArray = sessionStorage.getItem("patientTimers")!==null? JSON.parse(sessionStorage.getItem("patientTimers")):[]
    console.log("current time array AT BEGINNING",currentTimeArray)
   
  
    if(waitTimeArray.length >0 )
    {
     dispatch(fetchWaitTimers(waitTimeArray))
    
   }else{
     dispatch(fetchWaitTimers(patientTimers))
  }




    if(currentTimeArray.length >0 )
   {
    dispatch(fetchPatientTimers(currentTimeArray))
   
  }
    
 //  dispatch(setIsLoading(false));
  })
  .catch((error) => {
    var errorMessage = error.message;
    console.log('Error fetching patients', errorMessage);
   
  });
};






export const getWaitingRoomPatients = (existingTimes) => async (dispatch) => {


 //dispatch(setIsLoading(true));
  db.collection('Patients')
    .where('isAdmitted', '==', false)
    .where('waitElapsed', '==', true)
    .get()
    .then((snapshot) => {
      const patients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      dispatch(fetchPatients(patients));

      
    // dispatch(setIsLoading(false));
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log('Error fetching waiting room patients', errorMessage);
    //  dispatch(setIsLoading(false));
    });
};



export const refreshCountdown = (originalArray) => async (dispatch) => {
 

   // const ourIndex = originalArray.map((item)=>(item.id)).indexOf(id)
  let newTimeArray = [...originalArray]
  //newTimeArray[ourIndex] = {id:id,firstName:originalArray[ourIndex].firstName,lastName:originalArray[ourIndex].lastName, screenCountdown:newTime}
  
  let newMutable = []

   newTimeArray.forEach((item,index)=>{ 
   newMutable.push({
    ...originalArray[index],
    screenCountdown: originalArray[index].screenCountdown -10000
   }
   )
  })



  console.log("new time array to be updated is--->",newMutable)
 

  //INSTEAD OF OG ARRAY TRY DELTA FUNCTION OF ONTICK OR STH
   
  sessionStorage.setItem("patientTimers", `${JSON.stringify(newMutable)}`);

  const currentTimeArray = sessionStorage.getItem("patientTimers")!==null &&   JSON.parse(sessionStorage.getItem("patientTimers"))
  console.log(" current Time array-->",currentTimeArray)
   
  dispatch(fetchPatientTimers(currentTimeArray))

}



export const refreshWaitdown = (originalArray) => async (dispatch) => {
 

  // const ourIndex = originalArray.map((item)=>(item.id)).indexOf(id)
 let newTimeArray = [...originalArray]
 //newTimeArray[ourIndex] = {id:id,firstName:originalArray[ourIndex].firstName,lastName:originalArray[ourIndex].lastName, screenCountdown:newTime}
 
 let newMutable = []

  newTimeArray.forEach((item,index)=>{ 
  newMutable.push({
   ...originalArray[index],
   waitCountdown: originalArray[index].waitCountdown-10000
  }
  )
 })



 console.log("new  WAIT --> time array to be updated is--->",newMutable)



 sessionStorage.setItem("waitTimers", `${JSON.stringify(newMutable)}`);

 const waitTimeArray = sessionStorage.getItem("waitTimers")!==null &&   JSON.parse(sessionStorage.getItem("waitTimers"))
 console.log(" wait Time array-->",waitTimeArray)
  
 dispatch(fetchWaitTimers(waitTimeArray))

}

export const getAdmittedPatients = () => async (dispatch) => {
 //dispatch(setIsLoading(true));
  db.collection('Patients')
    .where('isAdmitted', '==', true)
    .where('waitElapsed', '==', true)
    .get()
    .then((snapshot) => {
      const patients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch(fetchAdmittedPatients(patients));
      //dispatch(setIsLoading(false));
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log('Error fetching patients', errorMessage);
     // dispatch(setIsLoading(false));
    });
};

export const admitPatients = (uid, setLoading, navigate) => async (dispatch) => {
 // setLoading(true);
  // Check if the user already has a bed number
  const userRef = db.collection('Patients').doc(uid);
  const userSnapshot = await userRef.get();
  
  if (userSnapshot.exists) {
    const userData = userSnapshot.data();
    
    if (userData.bedNumber && userData.isAdmitted !== null) {
      console.log('User is already admitted.');
      notifyErrorFxn("User is already admitted");
     // setLoading(false);
      return;
    }


    if (userData.isAdmitted === null) {
      dispatch(setSelectedPatient(null));
      return;
    }
  }
  
  // Allocate a bed number for the new patient
  const occupiedBedNumbers = [];
  
  // Query the database to find occupied bed numbers
  const patientsSnapshot = await db.collection('Patients').get();
  patientsSnapshot.forEach((patientDoc) => {
    const patientData = patientDoc.data();
    if (patientData.bedNumber) {
      occupiedBedNumbers.push(patientData.bedNumber);
    }
  });
  
  const maxBedNumber = 10; // Change this to your maximum bed number
  
  for (let i = 1; i <= maxBedNumber; i++) {
    if (!occupiedBedNumbers.includes(i)) {
      // Found an available bed number
      await userRef.update({ bedNumber: i, isAdmitted: true });
      console.log(`Admitted user with bed number ${i}`);
      notifySuccessFxn(`Admitted patient`);
      dispatch(setSelectedPatient(null));
      dispatch(getAdmittedPatients());
      dispatch(getWaitingRoomPatients());
     // setLoading(false);
      break;
    }
  }
  
 // setLoading(false);
};




export const dischargePatients = (uid, setLoading, navigate) => async (dispatch) => {
  console.log('Discharge FUNCTIONALITY CHECKERs.');
  //setLoading(true);
  // Check if the user already has a bed number
  const userRef = db.collection('Patients').doc(uid);
  const userSnapshot = await userRef.get();
  let userData;

  if (userSnapshot.exists) {
     userData = userSnapshot.data();
    
    if (!userData.bedNumber && userData.isAdmitted !== null) {
      console.log('User is not really admitted,please admit first.');
      notifyErrorFxn("User is not admitted,please admit first.");
      //setLoading(false);
      return;
    }

    if (userData.isAdmitted === null) {
      dispatch(setSelectedPatient(null));
      return;
    }
  }
  
  // Remove the bed number for the discharged new patient
  const dischargeBedNumbers = [];
  
  // Query the database to find occupied bed numbers
  const patientsSnapshot = await db.collection('Patients').get();
  patientsSnapshot.forEach((patientDoc) => {
    const patientData = patientDoc.data();
    if (patientData.bedNumber === userData.bedNumber) {
      dischargeBedNumbers.push(patientData.bedNumber);
      console.log('I HAVE FOUND THE BED TO DISCHARGE.');
    }
  });
  
  const maxBedNumber = 10; // Change this to your maximum bed number
  
  for (let i = 1; i <= maxBedNumber; i++) {
    if (dischargeBedNumbers.includes(i) ) {
      // Found the bed number to discharge
      await userRef.update({ bedNumber: null, isAdmitted: null });
      console.log(`Discharged user with bed number ${i}`);
      notifySuccessFxn(`Discharged patient!`);
      dispatch(setSelectedPatient(null));
      dispatch(getAdmittedPatients());
      dispatch(getWaitingRoomPatients());
      //setLoading(false);
      break;
    }
  }
  
  //setLoading(false);
};

export const removePatient = (id,firstName,lastName, patientTimers,selectedPatientId,admittedPatientArray,waitingRoomPatientArray) => async (dispatch) => {

  
 
try{
 

      
    /*====  dispatching  admitted patients manually ====== */
        
    const patientReplacementArray = admittedPatientArray.filter((item)=>(item.uid !== id))?admittedPatientArray.filter((item)=>(item.uid !== id)):[]

    const patientIdToChange = admittedPatientArray.map((item)=>(item.uid)).indexOf(id)

    if(patientIdToChange !== -1){

      /*i have to make this 1 call to the database, so that when they refresh screen, it will correspond */
      const userRef = db.collection('Patients').doc(id);

      userRef.update({
        bedNumber: null,
        isAdmitted: null,
        elapsed:true
      })

      /*i have to make this 1 call to the database, so that when they refresh screen, it will correspond  -END*/

     
     if(admittedPatientArray[patientIdToChange] && admittedPatientArray[patientIdToChange].elapsed !== true){ notifyInfoFxn(` patient ${firstName} ${lastName}'s time has elapsed `); }
    
     dispatch(fetchAdmittedPatients(patientReplacementArray));
    
    }

    

    /*======dispatching  admitted patients manually END ===== */



  
    //dispatching waiting room patients manually WITHOUT CALLING database

    const patientReplacementArray2 = waitingRoomPatientArray.filter((item)=>(item.uid !== id))? waitingRoomPatientArray.filter((item)=>(item.uid !== id)):[]

    const patientIdToChange2 = waitingRoomPatientArray.map((item)=>(item.uid)).indexOf(id)

    if(patientIdToChange2 !== -1){
     
      /*i have to make this 1 call to the database, so that when they refresh screen, it will correspond */
      const userRef = db.collection('Patients').doc(id);

      userRef.update({
        bedNumber: null,
        isAdmitted: null,
        elapsed:true
      })

      /*i have to make this 1 call to the database, so that when they refresh screen, it will correspond  -END*/


     
      if(waitingRoomPatientArray[patientIdToChange2] && waitingRoomPatientArray[patientIdToChange2].elapsed !== true){ notifyInfoFxn(` patient ${firstName} ${lastName}'s time has elapsed `); }
      dispatch(fetchPatients(patientReplacementArray2));
   
    }

  //dispatching waiting room patients manually WITHOUT CALLING database - END

  if(selectedPatientId !== undefined && selectedPatientId === id){
    dispatch(setSelectedPatient(null))
  }

  console.log('REMOVAL OF PATIENT');

  /*if(all patients have their timers elapsed ){*/
    
    /*batch update all patients as admitted null and elapsed true */
    /*there may be no point to this because different students deal with the same patient */
 /* }*/

}catch (error) {
  console.log('Error removing the patients:', error);
 
}
 


}


export const enterPatient = (id,firstName,lastName, waitTimers,selectedPatientId,waitingRoomPatients,patients,patientTimers) => async (dispatch) => {

  
 
  try{
   
  
        
      /*====  adding patients to waiting room and notifying ====== */
       
      /*===not waittimers(below) , but the full array of patients ===*/
      const patientForWaitingRoom = patients.filter((item)=>(item.uid === id))?patients.filter((item)=>(item.uid === id)):[]
      const patientAdditionArray = waitTimers.filter((item)=>(item.id === id))?waitTimers.filter((item)=>(item.id === id)):[]
  
      const patientIdToChange = waitTimers.map((item)=>(item.uid)).indexOf(id)
  
      if(patientAdditionArray.length > 0){
  
        /*i have to make this 1 call to the database, so that when they refresh screen, it will correspond */
        const userRef = db.collection('Patients').doc(id);
  
        userRef.update({
         waitElapsed:true
        })
  
        /*i have to make this 1 call to the database, so that when they refresh screen, it will correspond  -END*/
    console.log("LATEST NUMBER I HAVE IS--->",patientIdToChange)
       
       if(patientForWaitingRoom.length && patientForWaitingRoom[0].waitElapsed !== true){ notifyInfoFxn(` patient ${firstName} ${lastName} has entered the waiting room! `); }
      
       dispatch(fetchPatients([...waitingRoomPatients,...patientForWaitingRoom]));
       dispatch(fetchPatientTimers([...patientTimers,...patientAdditionArray]))

       sessionStorage.setItem("patientTimers", `${JSON.stringify([...patientTimers,...patientAdditionArray])}`);  

      }
  
      
    console.log("HALO I AM IN PATiENT TIMERS--------->",[...patientTimers,...patientAdditionArray])
      /*======adding patients to waiting room and notifying END ===== */
  
  
  
    
      /*dispatching waiting room patients manually WITHOUT CALLING database
  
      const patientReplacementArray2 = waitingRoomPatientArray.filter((item)=>(item.uid !== id))? waitingRoomPatientArray.filter((item)=>(item.uid !== id)):[]
  
      const patientIdToChange2 = waitingRoomPatientArray.map((item)=>(item.uid)).indexOf(id)
  
      if(patientIdToChange2 !== -1){
       
       
        const userRef = db.collection('Patients').doc(id);
  
        userRef.update({
          waitTime:0
        })
  
   
  
  
       
        if(waitingRoomPatientArray[patientIdToChange2] && waitingRoomPatientArray[patientIdToChange2].elapsed !== true){ notifyInfoFxn(` patient ${firstName} ${lastName}'s time has entered the waiting room `); }
        dispatch(fetchPatients(patientReplacementArray2));
     
      }
  
    dispatching waiting room patients manually WITHOUT CALLING database - END */
  
    if(selectedPatientId !== undefined && selectedPatientId === id){
      dispatch(setSelectedPatient(null))
    }
  
    console.log('ENTRY OF PATIENT INTO WAITING ROOM');
  
    /*if(all patients have their timers elapsed ){*/
      
      /*batch update all patients as admitted null and elapsed true */
      /*there may be no point to this because different  MEDICAL CANDIDATES deal with the same patient */
   /* }*/
  
  }catch (error) {
    console.log('Error adding  patient TO THE WAITING ROOM:', error);
   
  }
   
  
  
  }


export const reset = (uid,existingTimes) => async (dispatch) => {
  dispatch(setIsLoading(true));
  //dispatch(getAdmittedPatients());
  //dispatch(getWaitingRoomPatients());

  try {
    const patientsCollection = db.collection('Patients');

    const querySnapshot = await patientsCollection.get();

    const batch = db.batch();
    querySnapshot.forEach((doc) => {
      const patientRef = patientsCollection.doc(doc.id);
      batch.update(patientRef, {
        bedNumber: null,
        isAdmitted: false,
        elapsed:false,
        waitElapsed:false
      });
    });

    await batch.commit();
    
/*resetting ALL the tests submitted */
    const userRef = db.collection('Candidates').doc(uid);
    const userSnapshot = await userRef.get();
    

  if (userSnapshot.exists) {
   await userRef.update({ response:[ ]
   });

   dispatch(fetchCandidateData(uid))
   
  }

/*resetting ALL the tests submitted END */
    
    

     db.collection('Patients').get().then((snapshot) => {
      const patients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const waitTimers = snapshot.docs.map((doc) => ({ id: doc.id,
                                                         firstName:doc.data().firstName,
                                                         lastName:doc.data().lastName,
                                                         screenCountdown:doc.data().screenTime*60*1000,
                                                         waitCountdown:doc.data().waitTime*60*1000 }));
                                                        
                                                      
                                                                          
        dispatch(clearPatient({waitTimers,patients}));  
        sessionStorage.removeItem("patientTimers", `${JSON.stringify(waitTimers)}`);
        sessionStorage.setItem("waitTimers", `${JSON.stringify(waitTimers)}`);    
                                                    
        dispatch(setIsLoading(false));
    

       const waitingRoomPatients = patients.filter((item)=>(item.waitElapsed===true && item.isAdmitted===false))
       const admittedPatients = patients.filter((item)=>(item.waitElapsed===true && item.isAdmitted===true))
    
       dispatch(fetchAdmittedPatients(admittedPatients))
       dispatch(fetchPatients(waitingRoomPatients))
    
    
                                                        })


     
   


  } catch (error) {
    console.error('Error resetting the patients:', error);
    dispatch(setIsLoading(false));
  }


/*  db.collection('Patients')
  .where('isAdmitted', 'in',[true,false])
  .get()
  .then(async(snapshot) => {
    const patients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const patientTimers = snapshot.docs.map((doc) => ({ id: doc.id,
                                                       firstName:doc.data().firstName,
                                                       lastName:doc.data().lastName,
                                                       screenCountdown:doc.data().screenTime*60*1000 }));

    dispatch(fetchAllPatients(patients));

 
    dispatch(fetchPatientTimers(patientTimers))
  
    
  dispatch(setIsLoading(false));

 
  })
  .catch((error) => {
    var errorMessage = error.message;
    console.log('Error fetching patients', errorMessage);
   
  });*/


 
};



export const fetchAllTreatmentTests = (chosenSection)=> async(dispatch) =>{


  var categories = db.collection("TreatmentTests");
  categories.get().then((snapshot) => {
    const groupMembers = snapshot.docs.map((doc) => ({ ...doc.data() }));
    console.log("ALL Treatments tests ARE :",groupMembers)
    if (groupMembers.length) {
    dispatch(saveAllTreatmentTests(groupMembers))

  } else {
      console.log("No treatments tests in database!");
  }
}).catch((error) => {
  console.log("Error getting treatments tests:", error);
});


  
 };



 export const fetchAllTreatmentCategories = (chosenSection)=> async(dispatch) =>{

  var categories = db.collection("TreatmentCategory");
  categories.get().then((snapshot) => {
    const groupMembers = snapshot.docs.map((doc) => ({ ...doc.data() }));
    console.log("ALL Treatments categories ARE :",groupMembers)
    if (groupMembers.length) {
    dispatch(saveAllTreatmentCategories(groupMembers))

  } else {
      console.log("No treatment categories in database!");
  }
}).catch((error) => {
  console.log("Error getting treatments categories:", error);
});
  
 }
