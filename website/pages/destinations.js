import {useState} from 'react'
import Nav from '../src/components/nav'
import Head from 'next/head'
import Link from 'next/link'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Tabs,Tab,Typography,Box,Card,CardContent,CardMedia, CardActionArea} from '@material-ui/core'
import {populateDestinations,getDestinationBanner} from '../src/utils/utils'
import CountryCard from '../src/components/countrycard'
import DestinationTab from '../src/components/destinations'
import Footer from '../src/components/footer'
export default function Destinations(props) {
    const [destination,setDestination] = useState(0)
    return(
        <div style={{marginTop:'10vh'}}>
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
                        zIndex:"0",
                        fontFamily:"Arial",
                        color:"white",
                      }}
                      variant="body2" 
                      component="p">
                        <span style={{backgroundColor:"rgba(255, 0, 0, 0.4)"}}>{props.banner.text}</span>
                      </h1>
                </Grid>
            </Grid>
            <DestinationTab currentDestination = {destination} destinations={props.destinations}/>
            <Footer/>
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
    const returnedJson = {}
    returnedJson['banner'] = banner.data[0]
    returnedJson['destinations'] = {
      asia,
      oceania,
      se,
      europe,
      africa,
      america
    }
    return returnedJson
  }
  return {}
}