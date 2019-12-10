import {useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/styles'
import {Grid,Typography,Button,Divider,IconButton,GridList,GridListTile,GridListTileBar} from '@material-ui/core'
import LeftArrow from '@material-ui/icons/ArrowBack'
import RightArrow  from '@material-ui/icons/ArrowForward'
import HomeLayout from '../src/layouts/home'
import BlogCards from '../src/components/blogcards'
import DestinationTab from '../src/components/destinations'
import LargeCard from '../src/components/largecard'
import {populateCarousel,populatePosts,populateDestinations,populateContinents,getFeatured} from '../src/utils/utils'
import ContinentCard from '../src/components/continentcard'
import './style.css'
import MobileDestinations from '../src/components/mobiledestinations/mobiledestinations'

const useStyles = makeStyles(theme => ({
  mobileGridList: {
    position:'relative',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const Index = (props) => {
  const [currentPost,setPost] = useState(0)
  const [destination,setDestination] = useState(0)
  const [dummyVal,setDummy] = useState(0)
  const classes = useStyles()
  const moveBack = () => {
    if(currentPost == 0){
      setPost(props.postData.length-1)
    }else{
      setPost(currentPost-1)
    }
  }
  const moveFront = () => {
    if(currentPost == props.postData.length-1){
      setPost(0)
    }else{
      setPost(currentPost+1)
    }
  }
  return (
    <HomeLayout data={props.carouselData}>
        <Grid 
        container 
        direction="row"
        spacing={2}
        justify="center"
        className="mainGrid"
        >
            <Grid 
            className="firstGrid"
            item xs={12} 
            >
                <Grid 
                container
                className="arrowContainer" 
                direction="row"
                >
                    <IconButton onClick={moveBack}>
                      <LeftArrow/>
                    </IconButton>
                    <IconButton onClick={moveFront}>
                      <RightArrow/>
                    </IconButton>
                </Grid>
                <div className="desktopLargeCard">
                  <LargeCard slug={props.postData[currentPost].slug} title={props.postData[currentPost].title} excerpt={props.postData[currentPost].excerpt} image={props.postData[currentPost].image} link={props.postData[currentPost].link} country={props.postData[currentPost].country_normal} height="70vh"/>
                </div>
                <div 
                className={classes.mobileGridList,"mobileGridList"}>
                  <GridList className={classes.gridList} cols={1}>
                    {props.postData.map((post,index) => (
                      <GridListTile style={{height:'100%'}}>
                        <LargeCard slug={props.postData[index].slug} title={props.postData[index].title} excerpt={props.postData[index].excerpt} image={props.postData[index].image} link={props.postData[index].link} country={props.postData[index].country_normal} height="70vh"/>
                        </GridListTile>
                    ))}
                  </GridList>
                  <Button 
                  style={{position:'absolute',bottom:'20%',left:'25%',}}
                  className="mobileSeeMore" 
                  variant="contained" >
                    <Typography variant="subtitle1" component="p">
                      <a href={`\\articles`} style={{textDecoration:'none'}}>
                        SEE MORE ARTICLES
                      </a>
                    </Typography>
                  </Button>
                </div>
                <Grid 
                container 
                direction="row" 
                className="seeMoreContainer"
                >
                  <Typography className="desktopSeeMore" variant="subtitle1" component="p">
                    <a href={`\\articles`} style={{textDecoration:'none'}}>
                      SEE MORE ARTICLES
                    </a>
                  </Typography>
                </Grid>
                
                  
            </Grid> 
            <Grid container>
              
            </Grid> 
            <Grid className="continentGrid" item xs={12}>
              <Grid container spacing={2}>
                {props.continents.map(({slug,name,text,image}) => {
                  return(
                    <Grid item xs={12} sm={4}>
                      <ContinentCard handler={setDestination} slug={slug} title={text} image={image}/>
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
            <Grid item className="blogGrid" xs={12}>
              <Grid container spacing= {2}>
                <Grid item xs={12} sm={6}>
                  <BlogCards slug={props.featured[0].slug} title={props.featured[0].excerpt} image={props.featured[0].image} link={props.featured[0].slug} height="30vh"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <BlogCards slug={props.featured[1].slug} title={props.featured[1].excerpt} image={props.featured[1].image} link={props.featured[1].slug} height="50vh"/>
                </Grid>
            </Grid>
          </Grid> 
        </Grid>
        <Grid container direction="row" align="right" style={{paddingRight:'9%',paddingLeft:'9%',marginTop:'1%'}}>
            <Grid item xs={12}>
              <Divider variant="middle" style={{margin:'0px'}}/>
            </Grid>
        </Grid>
        <div className="destinations">
          <Typography variant="h5" style={{marginTop:'2vh',textAlign:"center"}}>DESTINATIONS</Typography>
          <DestinationTab currentDestination = {destination} destinations={props.destinations}/>
        </div>
        <div className="mobileDestinations">
          <MobileDestinations/>
        </div>
        
    </HomeLayout>
  )
}


Index.getInitialProps = async() => {
  const carouselData = populateCarousel()
  const postData = populatePosts(6)
  const destinations = populateDestinations()
  const continents = populateContinents()
  const featured = getFeatured()
  const res = await Promise.all([carouselData,postData,destinations,continents,featured])
  const returnedJson = {}
  //clean the data
  const locations = res[2].data
  const asia = locations.filter(location => location.continent == 'Asia')
  const oceania = locations.filter(location => location.continent == 'Oceania')
  const se = locations.filter(location => location.continent == 'Southeast Asia')
  const europe = locations.filter(location => location.continent == 'Europe')
  const africa = locations.filter(location => location.continent == 'Africa & Middle East')
  const america = locations.filter(location => location.continent == 'America')
  returnedJson['destinations'] = {
    asia,
    oceania,
    se,
    europe,
    africa,
    america
  }
  returnedJson['carouselData'] = res[0].data
  returnedJson['postData'] = res[1].data
  returnedJson['continents'] = res[3].data
  returnedJson['featured'] = res[4].data
  return returnedJson
}

export default Index
