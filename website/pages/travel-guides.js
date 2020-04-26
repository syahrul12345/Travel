import {useState} from 'react'
import Nav from '../src/components/nav'
import Head from 'next/head'
import {Grid,Tabs,Tab,Typography,Box,Card,CardContent,CardMedia, CardActionArea} from '@material-ui/core'
import {populateDestinations,getDestinationBanner,getPostsByCategory} from '../src/utils/utils'
import DestinationTab from '../src/components/destinations'
import Footer from '../src/components/footer'
import BlogCards from '../src/components/blogcards'
export default function Travel(props) {
    const [destination,setDestination] = useState(0)
    return(
        <div>
            <Head>
                <title> Destinations </title>
                <meta name="description" content="All the countries that we cover"/>
            </Head>
            <Nav/>
            <Grid
            container
            justify="center"
            style={{paddingTop:'5vh'}}>
                <Grid item align="center" md={12} style={{marginBottom:"5vh",position:'relative'}}>
                    <Typography variant="h3" style={{marginBottom:'5vh'}}> Destinations </Typography>
                </Grid>
            </Grid>
            <DestinationTab currentDestination = {destination} destinations={props.destinations}/>
            <Grid item align="center" md={12} style={{marginTop:'10vh',marginBottom:"5vh",position:'relative'}}>
                    <Typography variant="h3" style={{marginBottom:'5vh'}}> Latest Travel Guides </Typography>
            </Grid>
            <Grid item md={12}>
              <Grid container spacing={2} style={{paddingLeft:"5%",paddingRight:"5%",marginTop:"2vh"}}>
                {/* Show only itinerary type posts */}
                  {props.itineraries.map((itinerary) => {
                    return (
                      <Grid key={itinerary.title} item xs={12} md={4}>
                        <BlogCards slug={itinerary.slug} title={itinerary.title} excerpt={itinerary.excerpt} image={itinerary.image} link={itinerary.link} height="30vh"/>
                      </Grid>
                    )
                  })}
              </Grid>
            </Grid>
            <Footer/>
        </div>
    )
}
Travel.getInitialProps = async() => {
  const res = await populateDestinations()
  const banner = await getDestinationBanner()
  const iteneraries = await getPostsByCategory('guides',6)
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
    returnedJson['itineraries'] = iteneraries
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