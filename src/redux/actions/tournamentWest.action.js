import { db, fb, auth, storage } from '../../config/firebase';
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { saveEightWest1,
     saveEightWest2,
      saveFourWest1,
       saveSixteenWest1,
     saveSixteenWest2,
     saveSixteenWest3,
     saveSixteenWest4,
     saveThirtyTwoWest1,
      saveThirtyTwoWest2,
       saveThirtyTwoWest3, 
       saveThirtyTwoWest4, 
       saveThirtyTwoWest6,
        saveThirtyTwoWest7,
         saveThirtyTwoWest8,
        
        
        
        } from '../reducers/tournamentWest.slice';
import firebase from "firebase/app";

export const setThirtyTwoWest1 =  (teamName) => async (dispatch) => {

dispatch(saveThirtyTwoWest1(teamName))

}


export const setThirtyTwoWest2 =  (teamName) => async (dispatch) => {

    dispatch(saveThirtyTwoWest2(teamName))
    
    }


    export const setThirtyTwoWest3 =  (teamName) => async (dispatch) => {

        dispatch(saveThirtyTwoWest3(teamName))
        
        }


        export const setThirtyTwoWest4 =  (teamName) => async (dispatch) => {

            dispatch(saveThirtyTwoWest4(teamName))
            
            }


            export const setThirtyTwoWest5 =  (teamName) => async (dispatch) => {

                dispatch(saveThirtyTwoWest6(teamName))
                
                }

                export const setThirtyTwoWest6 =  (teamName) => async (dispatch) => {

                    dispatch(saveThirtyTwoWest6(teamName))
                    
                    }


                    export const setThirtyTwoWest7 =  (teamName) => async (dispatch) => {

                        dispatch(saveThirtyTwoWest7(teamName))
                        
                        }


 export const setThirtyTwoWest8 =  (teamName) => async (dispatch)  =>{
           dispatch(saveThirtyTwoWest8(teamName))
           
     }


export const setSixteenWest1  =  (teamName) => async (dispatch) =>{
 dispatch(saveSixteenWest1 (teamName))
        
 }



 export const setSixteenWest2  =  (teamName) => async (dispatch) =>{
    dispatch(saveSixteenWest2 (teamName))
           
    }

    export const setSixteenWest3  =  (teamName) => async (dispatch) =>{
        dispatch(saveSixteenWest3 (teamName))
               
        }

        export const setSixteenWest4  =  (teamName) => async (dispatch) =>{
            dispatch(saveSixteenWest4 (teamName))
                   
            }


            export const setEightWest1  =  (teamName) => async (dispatch) =>{
                dispatch(saveEightWest1 (teamName))
                       
                }



                export const setEightWest2  =  (teamName) => async (dispatch) =>{
                    dispatch(saveEightWest2 (teamName))
                           
                    }



                    export const setFourWest1  =  (teamName) => async (dispatch) =>{
                        dispatch(saveFourWest1 (teamName))
                               
                        }