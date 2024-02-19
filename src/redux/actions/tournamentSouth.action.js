import { db, fb, auth, storage } from '../../config/firebase';
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { saveEightSouth1,
     saveEightSouth2,
      saveFourSouth1,
       saveSixteenSouth1,
     saveSixteenSouth2,
     saveSixteenSouth3,
     saveSixteenSouth4,
     saveThirtyTwoSouth1,
      saveThirtyTwoSouth2,
       saveThirtyTwoSouth3, 
       saveThirtyTwoSouth4, 
       saveThirtyTwoSouth5, 
       saveThirtyTwoSouth6,
        saveThirtyTwoSouth7,
         saveThirtyTwoSouth8,
        
        
        
        } from '../reducers/tournamentSouth.slice';
import firebase from "firebase/app";

export const setThirtyTwoSouth1 =  (teamName) => async (dispatch) => {

dispatch(saveThirtyTwoSouth1(teamName))

}


export const setThirtyTwoSouth2 =  (teamName) => async (dispatch) => {

    dispatch(saveThirtyTwoSouth2(teamName))
    
    }


    export const setThirtyTwoSouth3 =  (teamName) => async (dispatch) => {

        dispatch(saveThirtyTwoSouth3(teamName))
        
        }


        export const setThirtyTwoSouth4 =  (teamName) => async (dispatch) => {

            dispatch(saveThirtyTwoSouth4(teamName))
            
            }


            export const setThirtyTwoSouth5 =  (teamName) => async (dispatch) => {

                dispatch(saveThirtyTwoSouth5(teamName))
                
                }

                export const setThirtyTwoSouth6 =  (teamName) => async (dispatch) => {

                    dispatch(saveThirtyTwoSouth6(teamName))
                    
                    }


                    export const setThirtyTwoSouth7 =  (teamName) => async (dispatch) => {

                        dispatch(saveThirtyTwoSouth7(teamName))
                        
                        }


 export const setThirtyTwoSouth8 =  (teamName) => async (dispatch)  =>{
           dispatch(saveThirtyTwoSouth8(teamName))
           
     }


export const setSixteenSouth1  =  (teamName) => async (dispatch) =>{
 dispatch(saveSixteenSouth1 (teamName))
        
 }



 export const setSixteenSouth2  =  (teamName) => async (dispatch) =>{
    dispatch(saveSixteenSouth2 (teamName))
           
    }

    export const setSixteenSouth3  =  (teamName) => async (dispatch) =>{
        dispatch(saveSixteenSouth3 (teamName))
               
        }

        export const setSixteenSouth4  =  (teamName) => async (dispatch) =>{
            dispatch(saveSixteenSouth4 (teamName))
                   
            }


            export const setEightSouth1  =  (teamName) => async (dispatch) =>{
                dispatch(saveEightSouth1 (teamName))
                       
                }



                export const setEightSouth2  =  (teamName) => async (dispatch) =>{
                    dispatch(saveEightSouth2 (teamName))
                           
                    }



                    export const setFourSouth1  =  (teamName) => async (dispatch) =>{
                        dispatch(saveFourSouth1 (teamName))
                               
                        }