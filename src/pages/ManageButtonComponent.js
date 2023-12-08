import { Button } from '@mui/material';
import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import {setUserInFocusForDeposits,setDepositCanChangeNow,removeLeagueFromUser} from 'src/redux/actions/football.action'


const ManageButtonComponent = ({user,leagueCodeInFocus,leagueNameInFocus}) => {

   console.log("LEAGUE NAME IN FOCUS RECD--->",leagueNameInFocus)
 
 const [dropDown,setDropDown] = useState(false)
 const { userInFocusForDeposits} = useSelector((state) => state.football);


 const deleteUserFromLeague = ()=>{

   if(window.confirm("are you sure you want to delete the user from this league ?")){

     dispatch(removeLeagueFromUser(user,leagueCodeInFocus,leagueNameInFocus))

   }
 }


 const manageDropDown = () =>{
   
   setDropDown(!dropDown)
   dispatch(setUserInFocusForDeposits(user))
   dispatch(setDepositCanChangeNow(false))

 }

 const dispatch = useDispatch();

 useEffect(()=>{

    if(userInFocusForDeposits.id !== user.id){
     setDropDown(false)
    }

 },[userInFocusForDeposits])
 
 
    return (
        <>
        <Button onClick={()=>{manageDropDown()}}  style={{backgroundColor: '#260952',height:"2.2rem" ,fontSize:"0.75rem",color:'white',paddingRight:"20px",paddingLeft:"20px",margin:"0 auto",width:"4.5rem" }}>
        {"MANAGE"}
       </Button>

      <SlideDown style={{width:"20%"}}>
        {dropDown &&
        <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start", alignItems:"center",gap:"0.4rem",paddingTop:"0.5rem",paddingBottom:"0.5rem"}}>
           <Button onClick={()=>{dispatch(setDepositCanChangeNow(true))}}  style={{backgroundColor: 'blue',height:"2.2rem" ,fontSize:"0.75rem",color:'white',paddingRight:"20px",paddingLeft:"20px",margin:"0 auto",width:"4.5rem" }}>
        {"DEPOSIT"}
       </Button>


       <Button onClick={()=>{deleteUserFromLeague()}}  style={{backgroundColor: 'red',height:"2.2rem" ,fontSize:"0.75rem",color:'white',paddingRight:"20px",paddingLeft:"20px",margin:"0 auto",width:"4.5rem" }}>
        {"DELETE"}
       </Button>
        </div>
        }
      </SlideDown>
      </>
  )
}

export default ManageButtonComponent