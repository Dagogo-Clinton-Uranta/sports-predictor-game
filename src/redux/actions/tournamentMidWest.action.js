import { db, fb, auth, storage } from '../../config/firebase';
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { saveEightMidWest1,
     saveEightMidWest2,
      saveFourMidWest1,
       saveSixteenMidWest1,
     saveSixteenMidWest2,
     saveSixteenMidWest3,
     saveSixteenMidWest4,
     saveThirtyTwoMidWest1,
      saveThirtyTwoMidWest2,
       saveThirtyTwoMidWest3, 
       saveThirtyTwoMidWest4, 
       saveThirtyTwoMidWest6,
        saveThirtyTwoMidWest7,
         saveThirtyTwoMidWest8,
        
        
        
        } from '../reducers/tournamentMidWest.slice';
import firebase from "firebase/app";

export const setThirtyTwoMidWest1 =  (teamName) => async (dispatch) => {

dispatch(saveThirtyTwoMidWest1(teamName))

}


export const setThirtyTwoMidWest2 =  (teamName) => async (dispatch) => {

    dispatch(saveThirtyTwoMidWest2(teamName))
    
    }


    export const setThirtyTwoMidWest3 =  (teamName) => async (dispatch) => {

        dispatch(saveThirtyTwoMidWest3(teamName))
        
        }


        export const setThirtyTwoMidWest4 =  (teamName) => async (dispatch) => {

            dispatch(saveThirtyTwoMidWest4(teamName))
            
            }


            export const setThirtyTwoMidWest5 =  (teamName) => async (dispatch) => {

                dispatch(saveThirtyTwoMidWest6(teamName))
                
                }

                export const setThirtyTwoMidWest6 =  (teamName) => async (dispatch) => {

                    dispatch(saveThirtyTwoMidWest6(teamName))
                    
                    }


                    export const setThirtyTwoMidWest7 =  (teamName) => async (dispatch) => {

                        dispatch(saveThirtyTwoMidWest7(teamName))
                        
                        }


 export const setThirtyTwoMidWest8 =  (teamName) => async (dispatch)  =>{
           dispatch(saveThirtyTwoMidWest8(teamName))
           
     }


export const setSixteenMidWest1  =  (teamName) => async (dispatch) =>{
 dispatch(saveSixteenMidWest1 (teamName))
        
 }



 export const setSixteenMidWest2  =  (teamName) => async (dispatch) =>{
    dispatch(saveSixteenMidWest2 (teamName))
           
    }

    export const setSixteenMidWest3  =  (teamName) => async (dispatch) =>{
        dispatch(saveSixteenMidWest3 (teamName))
               
        }

        export const setSixteenMidWest4  =  (teamName) => async (dispatch) =>{
            dispatch(saveSixteenMidWest4 (teamName))
                   
            }


            export const setEightMidWest1  =  (teamName) => async (dispatch) =>{
                dispatch(saveEightMidWest1 (teamName))
                       
                }



                export const setEightMidWest2  =  (teamName) => async (dispatch) =>{
                    dispatch(saveEightMidWest2 (teamName))
                           
                    }



                    export const setFourMidWest1  =  (teamName) => async (dispatch) =>{
                        dispatch(saveFourMidWest1 (teamName))
                               
                        }