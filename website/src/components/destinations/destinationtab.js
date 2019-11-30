import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Tabs,Tab,Typography,Box,Card,CardContent,CardMedia, CardActionArea} from '@material-ui/core'

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
            <Grid
            container
            justify="center"
            style={{paddingTop:'1vh'}}>
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
                          <TabPanel value={value} index={0} destination={props.destinations.asia}/>
                          <TabPanel value={value} index={1} destination={props.destinations.se}/>
                          <TabPanel value={value} index={2} destination={props.destinations.oceania}/>
                          <TabPanel value={value} index={3} destination={props.destinations.europe}/>
                          <TabPanel value={value} index={4} destination={props.destinations.america}/>
                          <TabPanel value={value} index={5} destination={props.destinations.africa}/>
                      </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
