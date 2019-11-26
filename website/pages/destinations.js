import React from 'react'
import Nav from '../src/components/nav'
import Head from 'next/head'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Tabs,Tab,Typography,Box,Card,CardContent,CardMedia, CardActionArea} from '@material-ui/core'
import {populateDestinations} from '../src/utils/utils'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  media: {
    height: '10vh',
  }
}));

function CountryCards(props){
  const classes = useStyles()
  return(
    <Card>
        <CardContent>
          <CardMedia 
          className={classes.media}
          image={props.image}/>
          <Typography variant="body2" color="textSecondary" component="p">
          {props.title}
          </Typography>
        </CardContent>
    </Card>
  )
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        <Box p={1}>{children}</Box>
      </Typography>
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
  
  

function VerticalTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const destinations = props.destinations
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Asia" {...a11yProps(0)} />
          <Tab label="Southeast Asia" {...a11yProps(1)} />
          <Tab label="Oceania" {...a11yProps(2)} />
          <Tab label="Europe" {...a11yProps(3)} />
          <Tab label="America" {...a11yProps(4)} />
          <Tab label="Middle East & Africa" {...a11yProps(5)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          {destinations.asia.map(({slug,title,image,continent}) => (
              <CountryCards image={image} title={title}/>
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {destinations.se.map(({slug,title,image,continent}) => (
              <CountryCards image={image} title={title}/>
          ))}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {destinations.oceania.map(({slug,title,image,continent}) => (
              <CountryCards image={image} title={title}/>
          ))}
        </TabPanel>
        <TabPanel value={value} index={3}>
          {destinations.europe.map(({slug,title,image,continent}) => (
              <CountryCards image={image} title={title}/>
          ))}
        </TabPanel>
        <TabPanel value={value} index={4}>
          {destinations.america.map(({slug,title,image,continent}) => (
              <CountryCards image={image} title={title}/>
          ))}
        </TabPanel>
        <TabPanel value={value} index={5}>
          {destinations.africa.map(({slug,title,image,continent}) => (
             <CountryCards image={image} title={title}/>
          ))}
        </TabPanel>
      </div>
    );
}
export default function Destinations(props) {
    return(
        <div>
            <Head>
                <title> Destinations </title>
            </Head>
            <Nav/>
            <Grid
            direction="column"
            style={{paddingTop:'1vh'}}
            container>
                <Grid item align="center"xs={12} style={{marginBottom:"5vh"}}>
                    <img
                    style={{maxWidth:'100vh'}}
                    src="http://localhost:8080/wp-content/uploads/2019/11/woman-and-man-riding-on-motorcycle-2174656.jpg"/>
                </Grid>
                <Grid item xs={12} style={{marginRight:'50px',marginLeft:'50px'}}>
                    <VerticalTabs destinations={props}/>
                </Grid>
            </Grid>
        </div>
    )
}
Destinations.getInitialProps = async() => {
  const res = await populateDestinations()
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
      america
    }
  }
  return {}
}