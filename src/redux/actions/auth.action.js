import { db, fb, auth, storage } from '../../config/firebase';
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { clearGroup } from '../reducers/group.slice';


  export const signin = (user, navigate, setLoading) => async (dispatch) => {
    fb.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log('Signed In user is: ', user.email);
       dispatch(fetchUserData(user.uid, "sigin", navigate, setLoading));
    })
    .catch((error) => {
      setLoading(false);
      var errorCode = error.code;
      var errorMessage = error.message;
      notifyErrorFxn(errorMessage);
      console.log('Error Code is: ', errorCode, + ' Msg is: ', errorMessage);
      dispatch(loginFailed(errorMessage));
    });

};


export const signup = (user, navigate, setLoading) => async (dispatch) => {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();
  const date = today.toISOString();
 
  db.collection('employers')
    .where('employerNumber', '==', parseInt(user.employeer))
    .get()
    .then((snapshot) => {
      const employeer = snapshot.docs.map((doc) => ({ ...doc.data() }));
      if (employeer.length) {  
        console.log('Employeer Exist:', employeer[0].cooler);
        fb.auth().createUserWithEmailAndPassword(
          user.email,
          user.password
      ).then((res)=>{
        return db.collection('employees').doc(res.user.uid).set({
          id: res.user.uid,
          email: user.email,
          firstName: user.fname,
          lastName: user.lname,
          imageUrl: "",
          password: user.password,
          coolers: [],
          employeerNumber: user.employeer,
          employeerID: employeer[0].id,
          accruedBalance: 0,
          walletBalance: 1000,
          accountCreated: today.toLocaleDateString("en-US", options),
        }).then(() => {
          return db.collection('inbox')
          .add({
              id: res.user.uid,
              msg: 'Welcome to Cooler. Thank you for joining us!',
              isViewed: false,
              unread: 0,
              time: date,
          })
        })
      }).then(() => {
        notifySuccessFxn("Registered Successfully✔😊")
        navigate('/login', { replace: true });
      }).catch((err) => {
        console.error("Error signing up: ", err);
        var errorMessage = err.message;
        notifyErrorFxn(errorMessage);
        dispatch(signupFailed({ errorMessage }));
        setLoading(false);
      })

      } else {
        setLoading(false);
        console.log('Invalid employeer code');
        notifyErrorFxn("Invalid Employeer Code");
      }
    }).catch((error) => {
      setLoading(false);
      console.log('Error querying collection:', error);
    });
}


export const forgotPassword = (email, setLoading, setForgotPassword) => async (dispatch) => {
       setLoading(true);
       fb
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setLoading(false);
        notifySuccessFxn('Password reset email sent. Check your inbox for instructions.');
        setForgotPassword(false);
      })
      .catch(error => {
        setLoading(false);
        notifyErrorFxn(`Error sending password reset email: ${error.message}`);
        // setMessage(`Error sending password reset email: ${error.message}`);
      });
};


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
  var user = db.collection("employees").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
    // console.log("User Data:", doc.data());
    dispatch(storeUserData(doc.data()));
    if(type === "sigin"){
      notifySuccessFxn("Logged In😊");
      navigate('/dashboard/home', { replace: true });
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


export const uploadProfileImage = (profileData, file, userID, navigate, setLoading) => async (dispatch) => {
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
          dispatch(updateProfile(profileData, userID, file, navigate, setLoading, url));
        });
    }
  );
}


export const updateProfile = (profileData, userID, file, navigate, setLoading, url) => async (dispatch) => {
  // return  
  db.collection('employees').doc(userID).update({
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
    console.log('logout successful!');
  }).catch((error) => {
    // An error happened.
    console.log('logout failed response: ', error.message);
  });
  
}