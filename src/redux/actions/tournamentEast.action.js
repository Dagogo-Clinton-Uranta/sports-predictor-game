import { db, fb, auth, storage } from '../../config/firebase';
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { saveEightEast1,
     saveEightEast2,
      saveFourEast1,
       saveSixteenEast1,
     saveSixteenEast2,
     saveSixteenEast3,
     saveSixteenEast4,
     saveThirtyTwoEast1,
      saveThirtyTwoEast2,
       saveThirtyTwoEast3, 
       saveThirtyTwoEast4, 
       saveThirtyTwoEast6,
        saveThirtyTwoEast7,
         saveThirtyTwoEast8,
        
        
        
        } from '../reducers/tournamentEast.slice';
import firebase from "firebase/app";

export const setThirtyTwoEast1 =  (teamName) => async (dispatch) => {

dispatch(saveThirtyTwoEast1(teamName))

}


export const setThirtyTwoEast2 =  (teamName) => async (dispatch) => {

    dispatch(saveThirtyTwoEast2(teamName))
    
    }


    export const setThirtyTwoEast3 =  (teamName) => async (dispatch) => {

        dispatch(saveThirtyTwoEast3(teamName))
        
        }


        export const setThirtyTwoEast4 =  (teamName) => async (dispatch) => {

            dispatch(saveThirtyTwoEast4(teamName))
            
            }


            export const setThirtyTwoEast5 =  (teamName) => async (dispatch) => {

                dispatch(saveThirtyTwoEast6(teamName))
                
                }

                export const setThirtyTwoEast6 =  (teamName) => async (dispatch) => {

                    dispatch(saveThirtyTwoEast6(teamName))
                    
                    }


                    export const setThirtyTwoEast7 =  (teamName) => async (dispatch) => {

                        dispatch(saveThirtyTwoEast7(teamName))
                        
                        }


 export const setThirtyTwoEast8 =  (teamName) => async (dispatch)  =>{
           dispatch(saveThirtyTwoEast8(teamName))
           
     }


export const setSixteenEast1  =  (teamName) => async (dispatch) =>{
 dispatch(saveSixteenEast1 (teamName))
        
 }



 export const setSixteenEast2  =  (teamName) => async (dispatch) =>{
    dispatch(saveSixteenEast2 (teamName))
           
    }

    export const setSixteenEast3  =  (teamName) => async (dispatch) =>{
        dispatch(saveSixteenEast3 (teamName))
               
        }

        export const setSixteenEast4  =  (teamName) => async (dispatch) =>{
            dispatch(saveSixteenEast4 (teamName))
                   
            }


            export const setEightEast1  =  (teamName) => async (dispatch) =>{
                dispatch(saveEightEast1 (teamName))
                       
                }



                export const setEightEast2  =  (teamName) => async (dispatch) =>{
                    dispatch(saveEightEast2 (teamName))
                           
                    }



                    export const setFourEast1  =  (teamName) => async (dispatch) =>{
                        dispatch(saveFourEast1 (teamName))
                               
                        }