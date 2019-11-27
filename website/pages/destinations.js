import React from 'react'
import Nav from '../src/components/nav'
import Head from 'next/head'
import Link from 'next/link'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Tabs,Tab,Typography,Box,Card,CardContent,CardMedia, CardActionArea} from '@material-ui/core'
import {populateDestinations,getDestinationBanner} from '../src/utils/utils'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  tabs: {
    borderRight: `0px solid ${theme.palette.divider}`,
    
  },
  media: {
    height: '20vh',
  }
}));

function CountryCard(props){
  const classes = useStyles()
  return(
    <Card style={{position:"relative"}}>
        <Link href={`/country/${props.title}`}>
        <CardActionArea>
          <CardMedia 
          className={classes.media}
          image={props.image}/>
          <h1 
          style={{
            position:"absolute",
            top:'40%',
            width:'100%',
            height:'100%',
            textAlign:"center",
            zIndex:"100",
            fontFamily:"Arial",
            color:"white",
          }}
          variant="body2" 
          component="p">
            <span style={{backgroundColor:"rgba(255, 0, 0, 0.4)"}}>{props.title}</span>
          </h1>
        </CardActionArea>
        </Link>
    </Card>
  )
}

function TabPanel(props) {
    const classes = useStyles()
    const countries = props.destination
    return (
      <div 
      className={classes.root}
      hidden= {props.value !== props.index}>
        <Grid 
        container
        direction="row"
        spacing={1}
        style={{marginLeft:'20px',paddingRight:'21%'}}
        >
          {countries.map(({title,image},index) => (
            <Grid item md={4} key={`${index}-${title}`}>
                <CountryCard title={title} image={image}/>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  
export default function Destinations(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return(
        <div>
            <Head>
                <title> Destinations </title>
            </Head>
            <Nav/>
            <Grid
            container
            justify="center"
            style={{paddingTop:'1vh'}}>
                <Grid item align="center" md={12} style={{marginBottom:"5vh",position:'relative'}}>
                    <img
                    style={{maxWidth:'100vh'}}
                    src={props.banner.image}/>
                    <h1 
                      style={{
                        position:"absolute",
                        top:'40%',
                        width:'100%',
                        height:'100%',
                        textAlign:"center",
                        zIndex:"100",
                        fontFamily:"Arial",
                        color:"white",
                      }}
                      variant="body2" 
                      component="p">
                        <span style={{backgroundColor:"rgba(255, 0, 0, 0.4)"}}>{props.banner.text}</span>
                      </h1>
                </Grid>
                <Grid item md={12} style={{marginRight:'50px',marginLeft:'50px'}}>
                    <Grid container direction="row">
                      <Grid item md={2}>
                        <Tabs
                          orientation="vertical"
                          variant="scrollable"
                          value={value}
                          onChange={handleChange}
                          aria-label="Vertical tabs example"
                          className={classes.tabs}
                          indicatorColor="primary"
                        >
                          <Tab label="Asia" {...a11yProps(0)} />
                          <Tab label="Southeast Asia" {...a11yProps(1)} />
                          <Tab label="Oceania" {...a11yProps(2)} />
                          <Tab label="Europe" {...a11yProps(3)} />
                          <Tab label="America" {...a11yProps(4)} />
                          <Tab label="Middle East & Africa" {...a11yProps(5)} />
                        </Tabs>
                      </Grid>
                      <Grid 
                      
                      item 
                      xs={10}>
                          <TabPanel value={value} index={0} destination={props.asia}/>
                          <TabPanel value={value} index={1} destination={props.se}/>
                          <TabPanel value={value} index={2} destination={props.oceania}/>
                          <TabPanel value={value} index={3} destination={props.europe}/>
                          <TabPanel value={value} index={4} destination={props.america}/>
                          <TabPanel value={value} index={5} destination={props.africa}/>
                      </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
Destinations.getInitialProps = async() => {
  const res = await populateDestinations()
  const banner = await getDestinationBanner()
  if (res.ok != true){
    console.log("Failed to get the countries for the destination card")
  }else{
    //All possible locations
    const locations = res.data
    const asia = locations.filter(location => location.continent == 'Asia')
    const oceania = locations.filter(location => location.continent == 'Oceania')
    const se = locations.filter(location => location.continent == 'Southeast Asia')
    const europe = locations.filter(location => location.continent == 'Europe')
    const africa = locations.filter(location => location.continent == 'Africa & Middle East')
    const america = locations.filter(location => location.continent == 'America')
    return{
      asia,
      oceania,
      se,
      europe,
      africa,
      america,
      banner:banner.data[0]
    }
  }
  return {}
}