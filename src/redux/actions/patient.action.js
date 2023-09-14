import { notifyErrorFxn, notifySuccessFxn } from "src/utils/toast-fxn";
import { db } from "../../config/firebase";
import { clearPatient, fetchAdmittedPatients, fetchPatients, setIsLoading, setSelectedPatient } from '../reducers/patient.slice';

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
