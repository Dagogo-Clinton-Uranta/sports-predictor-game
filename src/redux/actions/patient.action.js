import { notifyErrorFxn, notifySuccessFxn } from "src/utils/toast-fxn";
import { db } from "../../config/firebase";
import { clearPatient, fetchAdmittedPatients, fetchPatients, setIsLoading, setSelectedPatient,saveAllTreatmentCategories,saveAllTreatmentTests } from '../reducers/patient.slice';

export const getWaitingRoomPatients = () => async (dispatch) => {
 dispatch(setIsLoading(true));
  db.collection('Patients')
    .where('isAdmitted', '==', false)
    .get()
    .then((snapshot) => {
      const patients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch(fetchPatients(patients));
      dispatch(setIsLoading(false));
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log('Error fetching patients', errorMessage);
      dispatch(setIsLoading(false));
    });
};

export const getAdmittedPatients = () => async (dispatch) => {
 dispatch(setIsLoading(true));
  db.collection('Patients')
    .where('isAdmitted', '==', true)
    .get()
    .then((snapshot) => {
      const patients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch(fetchAdmittedPatients(patients));
      dispatch(setIsLoading(false));
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log('Error fetching patients', errorMessage);
      dispatch(setIsLoading(false));
    });
};

export const admitPatients = (uid, setLoading, navigate) => async (dispatch) => {
  setLoading(true);
  // Check if the user already has a bed number
  const userRef = db.collection('Patients').doc(uid);
  const userSnapshot = await userRef.get();
  
  if (userSnapshot.exists) {
    const userData = userSnapshot.data();
    
    if (userData.bedNumber) {
      console.log('User is already admitted.');
      notifyErrorFxn("User is already admitted");
      setLoading(false);
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
      setLoading(false);
      break;
    }
  }
  
  setLoading(false);
};




export const dischargePatients = (uid, setLoading, navigate) => async (dispatch) => {
  console.log('FUNCTIONALITY CHECKER.');
  setLoading(true);
  // Check if the user already has a bed number
  const userRef = db.collection('Patients').doc(uid);
  const userSnapshot = await userRef.get();
  let userData;

  if (userSnapshot.exists) {
     userData = userSnapshot.data();
    
    if (!userData.bedNumber) {
      console.log('User is not admitted,please admit first.');
      notifyErrorFxn("User is not admitted,please admit first.");
      setLoading(false);
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
    if (dischargeBedNumbers.includes(i)) {
      // Found the bed number to discharge
      await userRef.update({ bedNumber: null, isAdmitted: null });
      console.log(`Discharged user with bed number ${i}`);
      notifySuccessFxn(`Discharged patient!`);
      dispatch(setSelectedPatient(null));
      dispatch(getAdmittedPatients());
      dispatch(getWaitingRoomPatients());
      setLoading(false);
      break;
    }
  }
  
  setLoading(false);
};

export const reset = () => async (dispatch) => {
  dispatch(setIsLoading(true));

  try {
    const patientsCollection = db.collection('Patients');

    const querySnapshot = await patientsCollection.get();

    const batch = db.batch();
    querySnapshot.forEach((doc) => {
      const patientRef = patientsCollection.doc(doc.id);
      batch.update(patientRef, {
        bedNumber: null,
        isAdmitted: false,
      });
    });

    await batch.commit();

    dispatch(setIsLoading(false));
    dispatch(clearPatient());
    dispatch(getWaitingRoomPatients());

  } catch (error) {
    console.error('Error resetting patients:', error);
    dispatch(setIsLoading(false));
  }
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
      console.log("No treatment categoies in database!");
  }
}).catch((error) => {
  console.log("Error getting treatments categories:", error);
});
  
 }