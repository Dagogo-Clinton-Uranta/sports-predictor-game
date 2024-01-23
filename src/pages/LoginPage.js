import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';

import BANNER_IMG from '../assets/images/banner-bg.png';
import IMG from '../assets/images/img-2.png';
import MALE from '../assets/images/man.png';
import FEMALE from '../assets/images/woman.png';
import FLOGO from '../assets/images/fLogo.png';
import STARTCOMPETITION from '../assets/images/startcompetition.png';
import REMOVEMEMBER from '../assets/images/removeMember.png';
import LOGINPAGE from '../assets/images/loginpage.png';
import JOINLEAGUELAPTOP  from '../assets/images/joinleaguelaptop.png';
import CREATECOMPETITION from '../assets/images/createcompetition.png';
import COMPETITIONRESULTS from '../assets/images/competitionResults.png';
import JOINCOMPETITION from '../assets/images/joinCompetition.png';
import ADDPOINTS from '../assets/images/addPoints.png';


import LoginForm from 'src/components/login/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import PLAYSTORE from '../assets/images/play-store-icon.png'
import APPSTORE from '../assets/images/app-store-icon.png'
import appleandgoogle  from '../assets/images/appleandgoogle.png'
import ABSPHONE from '../assets/images/absolutephone.png'
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    flexDirection: 'column',
     
  },


  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection: 'column',
   
    margin:"0 auto",
    justifyContent:"center",
    alignItems:"center",
    
   
  },

}));



const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 680,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
  backgroundImage: `url(${BANNER_IMG})`,
  backgroundSize: '100% 100%',
  objectFit: 'cover',
  backgroundPosition: 'center',
  alignItems: 'center',
  justifyItems: 'center',
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '50vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(5, 5, 12, 5),
}));


const RespContent = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
   
  },

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    width:"70%",
    margin:"0 auto",
    justifyContent:"center",
    alignItems:"center",
    height:"40rem",
   
  },
}));


const RespContent2 = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
   
  },

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    width:"70%",
    margin:"0 auto",
    justifyContent:"center",
    alignItems:"center",
    height:"40rem",
   
  },
}));

const RespContent3 = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    marginTop:"5rem",
  
   
  },

  [theme.breakpoints.up('md')]: {
    flexDirection:'row',
    width:"70%",
    margin:"0 auto",
    marginTop:"5rem",
    
    justifyContent:"center",
    alignItems:"center",
    height:"15.8rem",
   
  },
}));



// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [leagueMembers,setLeagueMembers] = useState(true)
  const [leagueAdmins,setLeagueAdmins] = useState(false)

 
  /*league member states */

  const [membersReg,setMembersReg] = useState(false)
const [membersLogin,setMembersLogin] = useState(true)
const [membersJoinLeague,setMembersJoinLeague] = useState(false)
const [membersJoinComp,setMembersJoinComp] = useState(false)
const [membersAddPoints,setMembersAddPoints] = useState(false)
const [membersOutcome,setMembersOutcome] = useState(false)



 /*league admin states*/
const [adminReg,setAdminReg] = useState(false)
const [adminLogin,setAdminLogin] = useState(false)
const [adminInvite,setAdminInvite] = useState(false)
const [adminCreateComp,setAdminCreateComp] = useState(false)
const [adminCreateLeague,setAdminCreateLeague] = useState(false)
const [adminManage,setAdminManage] = useState(false)





  return (
    <>
      <Helmet>
        <title> FUTA SCORE </title>
      </Helmet>

      <StyledRoot style={{  flexDirection: 'column' }}>
   

   <RespContent  style={{ display:'flex',  marginTop: '5%',gap:"1rem", marginBottom: '1%'}}>

      <Container  style={{display: 'flex', justifyContent: 'center',alignItems:"center",flex:3, border: '1px solid #0000001A',  marginTop: '2%', marginBottom: '2%', borderRadius: '15px',height:"100%" }}>
          <StyledContent>
          
            <Typography variant="h6" sx={{ textAlign: 'left', mb: 2}}>
                Login
              </Typography>
            <LoginForm />
          

            {/* <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider> */}
          </StyledContent>
        </Container>

      <Container  style={{display: 'flex', justifyContent: 'center',alignItems:"center",flex:2, border: '1px solid #0000001A',   marginTop: '2%', marginBottom: '2%', borderRadius: '15px',height:"100%" }}>
          <StyledContent>
         
        
          <div style={{ display: 'flex', justifyContent: 'center',alignItems:"center", marginBottom: '50px' }}>
            
            <img  src={FLOGO} width="160" height="160" />
            </div>
          
            <Typography variant="h4" gutterBottom style={{textAlign: 'center' }} >
          FUTA SCORE
          </Typography>

          </StyledContent>
        </Container>

     </RespContent>

     <RespContent3 style={{backgroundColor:"#260952"}}>
   
   
       <div style={{position:"relative"}}>
        <img height="300px" style={{position:"absolute",left:"12rem", top:"-2.94rem"}} src={ABSPHONE} alt="phone sticking out"/>
      
      </div>


      <div style ={{display:"flex",justifyContent:"flex-end",alignItems:"flex-end",paddingRight:"10rem"}}>
        <img height="200px" src={appleandgoogle} alt="google play store logo"/>
      </div>
    

     </RespContent3>


     <RespContent2  style={{ display:'flex',gap:"0rem", marginBottom: '5%'}}>
    
    { leagueAdmins &&
    
    <>
      <div  style={{display: 'flex', justifyContent: 'space-between',flexDirection:"column",alignItems:"center",flex:1, border: '1px solid #0000001A', borderRight:"0px", marginTop: '2%', marginBottom: '2%',height:"100%" }}>
          
          
          <div onClick={()=>{setAdminReg(true);setAdminLogin(false);setAdminCreateLeague(false);setAdminInvite(false);setAdminCreateComp(false);setAdminManage(false)}} style={{color:adminReg && leagueAdmins?"purple":"black",flex:"1",width:"100%",border:"1px solid #0000001A",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",padding:"1rem",marginTop:"5rem"}}>
              REGISTRATION
            </div>

            <div onClick={()=>{setAdminReg(false);setAdminLogin(true);setAdminCreateLeague(false);setAdminInvite(false);setAdminCreateComp(false);setAdminManage(false)}} style={{ color:adminLogin && leagueAdmins?"purple":"black",flex:"1",width:"100%",border:"1px solid #0000001A",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",padding:"1rem"}}>
              LOGIN
            </div>

            <div onClick={()=>{setAdminReg(false);setAdminLogin(false);setAdminCreateLeague(true);setAdminInvite(false);setAdminCreateComp(false);setAdminManage(false)}} style={{color:adminCreateLeague && leagueAdmins?"purple":"black",flex:"1",width:"100%",border:"1px solid #0000001A",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",padding:"1rem"}}>
              CREATE LEAGUE
            </div>

            <div  onClick={()=>{setAdminReg(false);setAdminLogin(false);setAdminCreateLeague(false);setAdminInvite(true);setAdminCreateComp(false);setAdminManage(false)}}style={{color:adminInvite && leagueAdmins?"purple":"black",flex:"1",width:"100%",border:"1px solid #0000001A",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",padding:"1rem"}}>
              INVITE MEMBERS
            </div>

            <div onClick={()=>{setAdminReg(false);setAdminLogin(false);setAdminCreateLeague(false);setAdminInvite(false);setAdminCreateComp(true);setAdminManage(false)}} style={{color:adminCreateComp && leagueAdmins?"purple":"black",flex:"1",width:"100%",border:"1px solid #0000001A",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",padding:"1rem"}}>
              CREATE COMP
            </div>


            <div onClick={()=>{setAdminReg(false);setAdminLogin(false);setAdminCreateLeague(false);setAdminInvite(false);setAdminCreateComp(false);setAdminManage(true)}} style={{color:adminManage && leagueAdmins?"purple":"black", flex:"1",width:"100%",border:"1px solid #0000001A",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",padding:"1rem"}}>
              MANAGE MEMBERS
            </div>

         
        </div>
    </>   
   }

    
{ leagueMembers && 

  <>
      <div  style={{display: 'flex', justifyContent: 'space-between',flexDirection:"column",alignItems:"center",flex:1, border: '1px solid #0000001A',borderRight:"0px",  marginTop: '2%', marginBottom: '2%',height:"100%" }}>
          
          
          <div onClick={()=>{setMembersReg(true);setMembersLogin(false);setMembersJoinLeague(false);setMembersAddPoints(false);setMembersJoinComp(false);setMembersOutcome(false)}} style={{color:membersReg && leagueMembers?"purple":"black",flex:"1",width:"100%",border:"1px solid #0000001A",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",padding:"1rem",marginTop:"5rem"}}>
              REGISTRATION
            </div>

            <div  onClick={()=>{setMembersReg(false);setMembersLogin(true);setMembersJoinLeague(false);setMembersAddPoints(false);setMembersJoinComp(false);setMembersOutcome(false)}}style={{color:membersLogin && leagueMembers?"purple":"black",flex:"1",width:"100%",border:"1px solid #0000001A",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",padding:"1rem"}}>
              LOGIN
            </div>

            <div  onClick={()=>{setMembersReg(false);setMembersLogin(false);setMembersJoinLeague(true);setMembersAddPoints(false);setMembersJoinComp(false);setMembersOutcome(false)}}style={{color:membersJoinLeague && leagueMembers?"purple":"black" ,flex:"1",width:"100%",border:"1px solid #0000001A",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",padding:"1rem"}}>
              JOIN LEAGUE
            </div>

            <div onClick={()=>{setMembersReg(false);setMembersLogin(false);setMembersJoinLeague(false);setMembersAddPoints(true);setMembersJoinComp(false);setMembersOutcome(false)}} style={{color:membersAddPoints && leagueMembers?"purple":"black",flex:"1",width:"100%",border:"1px solid #0000001A",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",padding:"1rem"}}>
              ADD POINTS
            </div>

            <div onClick={()=>{setMembersReg(false);setMembersLogin(false);setMembersJoinLeague(false);setMembersAddPoints(false);setMembersJoinComp(true);setMembersOutcome(false)}} style={{color:membersJoinComp && leagueMembers?"purple":"black",flex:"1",width:"100%",border:"1px solid #0000001A",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",padding:"1rem"}}>
              JOIN COMP
            </div>


            <div  onClick={()=>{setMembersReg(false);setMembersLogin(false);setMembersJoinLeague(false);setMembersAddPoints(false);setMembersJoinComp(false);setMembersOutcome(true)}} style={{ color:membersOutcome && leagueMembers?"purple":"black",flex:"1",width:"100%",border:"1px solid #0000001A",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",padding:"1rem"}}>
             OUTCOME
            </div>

         
        </div>
    </>   
   }

      <Container  style={{display: 'flex', flexDirection:"column",justifyContent: 'flex-start',alignItems:"flex-start",flex:4, border: '1px solid #0000001A',borderLeft:"0px", padding:"2rem" , marginTop: '2%', marginBottom: '2%',height:"100%",overflow:"hidden" }}>

   <div style={{ borderTop: '0px solid #0000001A',marginTop:"3rem"}}>
        
          <div style={{display:"flex", justifyContent:"center",marginBottom:"1rem",width:"80%",}}>
          <Typography   variant="h6" sx={{ textAlign: 'left',color:"black", cursor:"pointer"}}>
              HOW TO PLAY
            </Typography>
          </div>


          <Divider style={{width:"120%",marginLeft:"-2rem",position:"relative",top:"-2.84rem"}}/>
          <div style={{display:"flex", justifyContent:"space-between",width:"80%"}}>
      <Typography  onClick={()=>{setLeagueAdmins(false);setLeagueMembers(true);setMembersLogin(true);setAdminLogin(false);setAdminReg(false)}} variant="h6" sx={{ textAlign: 'left',color:leagueMembers?"black":"lightgrey", cursor:"pointer"}}>
          LEAGUE MEMBERS
        </Typography>

        <Typography  onClick={()=>{setLeagueAdmins(true);setLeagueMembers(false);setMembersLogin(false);setAdminLogin(true);  }} variant="h6" sx={{ textAlign: 'left',color:leagueAdmins?"black":"lightgrey",cursor:"pointer",}} >
          LEAGUE ADMIN
        </Typography>
      </div>

      <Divider style={{width:"100%",position:"relative",top:"0.1rem"}}/>

     { /*1 */adminLogin && leagueAdmins &&
       <>
        <Typography variant="h6" sx={{textAlign: 'left', mt: 3,mb:1,cursor:"pointer",paddingLeft:"2rem"}}>
          LOGIN
        </Typography>
     
         <div style={{marginBottom:"0.5rem"}}>
         <img src={LOGINPAGE} style={{position:"relative"}} alt="start competition how to"/>
         </div> 
      </>
      }  

{   /*2 */ adminReg && leagueAdmins &&
<>
        <Typography variant="h6" sx={{ textAlign: 'left', mt: 3,mb:1,cursor:"pointer",paddingLeft:"2rem"}}>
          REGISTER
        </Typography>
     
         <div style={{marginBottom:"0.5rem"}}>
         <img src={LOGINPAGE} style={{position:"relative"}} alt="start competition how to"/>
         </div> 
      </>
      }


{   /*3 */ adminInvite && leagueAdmins &&
  <>
        <Typography variant="h6" sx={{ textAlign: 'left', mt: 3,mb:1,cursor:"pointer",paddingLeft:"2rem"}}>
          CREATE LEAGUE
        </Typography>
     
         <div style={{marginBottom:"0.5rem"}}>
         <img src={JOINLEAGUELAPTOP} style={{position:"relative"}} alt="start competition how to"/>
         </div> 
      </>
      }

{    /*4 */ adminCreateComp && leagueAdmins &&

  <>
        <Typography variant="h6" sx={{ textAlign: 'left', mt: 3,mb:1,cursor:"pointer",paddingLeft:"2rem"}}>
          CREATE COMPETITION
        </Typography>
     
         <div style={{marginBottom:"0.5rem"}}>
         <img src={STARTCOMPETITION} style={{position:"relative"}} alt="start competition how to"/>
         </div> 
      </>
      }

{
       /*4 */  adminCreateLeague && leagueAdmins &&
  <>
        <Typography variant="h6" sx={{ textAlign: 'left', mt: 3,mb:1,cursor:"pointer",paddingLeft:"2rem"}}>
          START COMPETITION
        </Typography>
     
         <div style={{marginBottom:"0.5rem"}}>
         <img src={STARTCOMPETITION} style={{position:"relative"}} alt="start competition how to"/>
         </div> 
      </>
      }


{     /*5 */   adminManage && leagueAdmins &&
       
   <>
        <Typography variant="h6" sx={{ textAlign: 'left', mt: 3,mb:1,cursor:"pointer",paddingLeft:"2rem"}}>
          MANAGE MEMBERS
        </Typography>
     
         <div style={{marginBottom:"0.5rem"}}>
         <img src={STARTCOMPETITION} style={{position:"relative"}} alt="start competition how to"/>
         </div> 
      </>
      }

{     /*NO MORE LEAGUE ADMIN, NOW  MEMBERS  */
      /*6 */  membersReg && leagueMembers &&
  <>
        <Typography variant="h6" sx={{textAlign: 'left', mt: 3,mb:1,cursor:"pointer",paddingLeft:"2rem"}}>
          REGISTER
        </Typography>
     
         <div style={{marginBottom:"0.5rem"}}>
         <img src={LOGINPAGE} style={{position:"relative"}} alt="start competition how to"/>
         </div> 
      </>
      }

{    /*7 */  membersLogin && leagueMembers &&
   <>
        <Typography variant="h6" sx={{ textAlign: 'left', mt: 3,mb:1,cursor:"pointer",paddingLeft:"2rem"}}>
          LOGIN
        </Typography>
     
         <div style={{marginBottom:"0.5rem"}}>
         <img src={LOGINPAGE} style={{position:"relative"}} alt="start competition how to"/>
         </div> 
      </>
      }

{     /*8 */  membersJoinLeague && leagueMembers &&

   <>
        <Typography variant="h6" sx={{textAlign: 'left', mt: 3,mb:1,cursor:"pointer",paddingLeft:"2rem"}}>
          JOIN LEAGUE
        </Typography>
     
         <div style={{marginBottom:"0.5rem"}}>
         <img src={JOINLEAGUELAPTOP} style={{position:"relative"}} alt="start competition how to"/>
         </div> 
      </>
      }


{    /*10 */  membersAddPoints && leagueMembers &&
   <>
        <Typography variant="h6" sx={{ textAlign: 'left', mt: 3,mb:1,cursor:"pointer",paddingLeft:"2rem"}}>
         ADD POINTS
        </Typography>
     
         <div style={{marginBottom:"0.5rem"}}>
         <img src={ADDPOINTS} style={{position:"relative"}} alt="start competition how to"/>
         </div> 
      </>
      }

{    /*11 */  membersJoinComp && leagueMembers &&

  <>
        <Typography variant="h6" sx={{ textAlign: 'left', mt: 3,mb:1,cursor:"pointer",paddingLeft:"2rem"}}>
          JOIN COMPETITION
        </Typography>
     
         <div style={{marginBottom:"0.5rem"}}>
         <img src={JOINCOMPETITION} style={{position:"relative"}} alt="start competition how to"/>
         </div> 
      </>
      }

{    /*12 */  membersOutcome && leagueMembers &&

   <>
        <Typography variant="h6" sx={{ textAlign: 'left', mt: 3,mb:1,cursor:"pointer",paddingLeft:"2rem"}}>
          OUTCOME
        </Typography>
     
         <div style={{marginBottom:"0.5rem"}}>
         <img src={COMPETITIONRESULTS} style={{position:"relative"}} alt="start competition how to"/>
         </div> 
      </>
      }
</div>   
        </Container>

     </RespContent2>
     
      </StyledRoot>
    </>
  );
}
