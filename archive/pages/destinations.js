import React from 'react'
import Nav from '../src/components/nav'
import Head from 'next/head'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Tabs,Tab,Typography,Box,Card,CardContent} from '@material-ui/core'
import {getContinents} from '../src/utils/utils'
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
        <Box p={3}>{children}</Box>
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
  
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  }));
  
function VerticalTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
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
          Asia
        </TabPanel>
        <TabPanel value={value} index={1}>
          South East Asia
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
      </div>
    );
}
export default function Destinations() {
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
                    <VerticalTabs />
                </Grid>
            </Grid>
        </div>
    )
}
Destinations.getInitialProps = () => {
  return {}
}