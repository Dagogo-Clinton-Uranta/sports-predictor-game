import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Paper, Button, Stack, Skeleton } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import HomeBox from '../components/home/home-box';
import PublicCoolerRowCard from 'src/components/public-cooler/public-cooler-card';
import { fetchGroups, fetchMyGroups, fetchPublicGroup } from 'src/redux/actions/group.action';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fCurrency } from '../utils/formatNumber';
import EmptyRowCard from 'src/components/home/empty-row-card';
import { fetchUserData } from 'src/redux/actions/auth.action';
import MyCoolersRowCard from 'src/components/my-cooler/my-coolers-card';
// import AllCoolerRowCard from 'src/components/my-cooler/all-cooler-card';



export default function MyCoolersPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myGroups, isLoading } = useSelector((state) => state.group);

  useEffect(() => {
    dispatch(fetchMyGroups(user.coolers));
  }, [user])

  
  useEffect(() => {
    dispatch(fetchUserData(user.id));
  }, [])

  console.log("MY GROUPS: ", myGroups);
  const myCoolerGroups = myGroups?.length ? (
    myGroups.map(group => {
      return (
        <MyCoolersRowCard 
        groupId={group.groupId}
        name={group.groupName} 
        fee={fCurrency(group.amount)}
        feeInNum={group.amount}
        count={`${group.members.length} OF ${group.noOfSavers} SAVERS`}
        img={group.imageUrl}
        members={group.members}
        isMember={group.members.includes(user?.id)}
        startDate={group.startDate}
        />
      )
    })
  ) : 
  <>
  <EmptyRowCard msg={"Coolers you have joined will appear here."}/>
  </>


  return (
    <>
      <Helmet>
        <title> Cooler | My Groups </title>
      </Helmet>
      <Container maxWidth="xl" style={{backgroundColor: '#609AF00F'}}>
      {/* <SearchBox style={{ width: '100%' }} /> */}
      <br/>
      <Grid  container direction="row" justifyContent="flex-end" alignItems="flex-end">
      <Button variant="contained" style={{backgroundColor: "#348AED", paddingTop: '10px', paddingBottom: '10px',  paddingRight: '30px', paddingLeft: '30px'}}>
      FILTER
    </Button>
    </Grid>
      <br/>
      {
        isLoading ?
        <Stack>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
        </Stack>
        :
        myCoolerGroups
      }
  </Container>
      
     
    </>
  );
}