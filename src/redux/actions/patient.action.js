import { notifyErrorFxn, notifySuccessFxn,notifyInfoFxn } from "src/utils/toast-fxn";
import { db } from "../../config/firebase";
import { clearPatient, fetchAdmittedPatients, fetchAllPatients,fetchPatients,fetchPatientTimers ,setIsLoading, setSelectedPatient,saveAllTreatmentCategories,saveAllTreatmentTests } from '../reducers/patient.slice';
import { fetchUserData } from "./auth.action";



export const getAllPatients = (existingTimes) => async (dispatch) => {


  db.collection('Patients')
  .where('isAdmitted', 'in',[true,false])
  .get()
  .then((snapshot) => {
    const patients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const patientTimers = snapshot.docs.map((doc) => ({ id: doc.id,
                                                       firstName:doc.data().firstName,
                                                       lastName:doc.data().lastName,
                                                       screenCountdown:doc.data().screenTime*60*1000 }));

    dispatch(fetchAllPatients(patients));
   
      

    const currentTimeArray = sessionStorage.getItem("patientTimers")!==null? JSON.parse(sessionStorage.getItem("patientTimers")):[]
    console.log("current time array AT BEGINNING",currentTimeArray)
   if(currentTimeArray.length >0 )
   {
    dispatch(fetchPatientTimers(currentTimeArray))
   
  }else{
    dispatch(fetchPatientTimers(patientTimers))
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

export const getAdmittedPatients = () => async (dispatch) => {
 //dispatch(setIsLoading(true));
  db.collection('Patients')
    .where('isAdmitted', '==', true)
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
  console.log('FUNCTIONALITY CHECKER.');
  //setLoading(true);
  // Check if the user already has a bed number
  const userRef = db.collection('Patients').doc(uid);
  const userSnapshot = await userRef.get();
  let userData;

  if (userSnapshot.exists) {
     userData = userSnapshot.data();
    
    if (!userData.bedNumber && userData.isAdmitted !== null) {
      console.log('User is not admitted,please admit first.');
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

export const removePatient = (id,firstName,lastName, patientTimers,selectedPatientId) => async (dispatch) => {

  
 
try{
  const userRef = db.collection('Patients').doc(id);
  const userSnapshot = await userRef.get();


  if (userSnapshot.exists) {
  const  userData = userSnapshot.data();


    await userRef.update({ bedNumber: null, isAdmitted: null });
  
   //dispatch(getAllPatients())

    //dispatching admitted patients manually to avoid page refresh
    db.collection('Patients')
    .where('isAdmitted', '==', true)
    .get()
    .then((snapshot) => {
      const patients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch(fetchAdmittedPatients(patients));
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log('Error fetching the patients', errorMessage);
    });
    //dispatching admitted patients manually to avoid page refresh - END

  
    //dispatching waiting room patients manually to avoid page refresh
    db.collection('Patients')
    .where('isAdmitted', '==', false)
    .get()
    .then((snapshot) => {
      const patients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      dispatch(fetchPatients(patients));
     
     if(selectedPatientId !== undefined && selectedPatientId === id){
        dispatch(setSelectedPatient(null))
      }
      console.log("OUR PRE BEEP IS-->",userData)

  if(userData &&  userData.elapsed === false){
  
    notifyInfoFxn(` patient ${firstName} ${lastName}'s time has elapsed `);
  }
    }).then(async(snapshot)=>{

      await userRef.update({ elapsed: true });
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log('Error fetching waiting room-ERS ', errorMessage);
     
    });
   //dispatching waiting room patients manually to avoid page refresh - END
 
 }

}catch (error) {
  console.log('Error removing the patients:', error);
 
}
 


}


export const reset = (uid,existingTimes) => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(getAdmittedPatients());
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
        elapsed:false
      });
    });

    await batch.commit();
    dispatch(getWaitingRoomPatients());

/*resetting ALL the tests submitted */
    const userRef = db.collection('Candidates').doc(uid);
    const userSnapshot = await userRef.get();
    

  if (userSnapshot.exists) {
   await userRef.update({ response:[ ]
   });

   dispatch(fetchUserData(uid))
   
  }


    
    

    db.collection('Patients').get().then((snapshot) => {
      
      const patientTimers = snapshot.docs.map((doc) => ({ id: doc.id,
                                                         firstName:doc.data().firstName,
                                                         lastName:doc.data().lastName,
                                                         screenCountdown:doc.data().screenTime*60*1000 }));
                                                        
                                                        
                                                         dispatch(clearPatient(patientTimers));  
                                                         sessionStorage.setItem("patientTimers", `${JSON.stringify(patientTimers)}`);                                               
                                                         dispatch(setIsLoading(false));
    })

  } catch (error) {
    console.error('Error resetting the patients:', error);
    dispatch(setIsLoading(false));
  }



  db.collection('Patients')
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
   
  });


 
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