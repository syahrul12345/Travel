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
            {/* <div style={{
            backgroundColor: 'white',
            position:"relative",
            display:'flex',
            justifyContent:'center'}}>
            <a href="/">
                <img 
                style={{
                    maxHeight:'20vh',
                    maxWidth:'20vw',
                    paddingTop:'2vh',
                    marginBottom:'1.5vh'}}
                src="/static/images/smolidays-logo-1.png" 
                alt="smolidays-logo"/>
            </a>
            </div> */}
            <Nav/>
            <Grid direction="row" className="afterNavBarGrid">
              <Grid item align="center" xs={12} style={{marginTop:'10vh',marginBottom:"1vh",position:'relative'}}>
                      <Typography variant="h4" style={{fontWeight:'900'}}> LATEST TRAVEL GUIDES </Typography>
              </Grid>
              <Grid item xs={12} style={{marginLeft:"5%",marginRight:"5%",marginTop:"10vh"}}>
                <Grid container spacing={2} >
                  {/* Show only itinerary type posts */}
                    {props.guides.map((guide) => {
                      return (
                        <Grid key={guide.title} item xs={12} md={4}>
                          <BlogCards slug={guide.slug} title={guide.title} excerpt={guide.excerpt} image={guide.image} link={guide.link} date={guide.date} height="30vh"/>
                        </Grid>
                      )
                    })}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" style={{marginTop:'10vh',marginBottom:'10vh',textAlign:"center", fontWeight:'900'}}>DESTINATIONS</Typography>
                <DestinationTab currentDestination = {destination} destinations={props.destinations}/>
              </Grid>
            </Grid>
              <Grid item align="center" xs={12} style={{marginTop:'10vh',marginBottom:"5vh",position:'relative'}}>
                      <Typography variant="h4" style={{fontWeight:'900'}}> ITINERARIES </Typography>
              </Grid>
              <Grid item xs={12} style={{marginLeft:"5%",marginRight:"5%",marginTop:"10vh"}}>
                <Grid container spacing={2} >
                  {/* Show only itinerary type posts */}
                    {props.itineraries.map((guide) => {
                      return (
                        <Grid key={guide.title} item xs={12} md={4}>
                          <BlogCards slug={guide.slug} title={guide.title} excerpt={guide.excerpt} image={guide.image} link={guide.link} date={guide.date} height="30vh"/>
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
  const guides = await getPostsByCategory('guides',6)
  const iteneraries = await getPostsByCategory('itineraries',6)
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
    returnedJson['guides'] = guides
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