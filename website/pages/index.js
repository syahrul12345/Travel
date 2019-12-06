import {useState} from 'react'
import { makeStyles } from '@material-ui/styles'
import {Grid,Typography,Button,CircularProgress,Divider,IconButton} from '@material-ui/core'
import LeftArrow from '@material-ui/icons/ArrowBack'
import RightArrow  from '@material-ui/icons/ArrowForward'
import HomeLayout from '../src/layouts/home'
import BlogCards from '../src/components/blogcards'
import DestinationTab from '../src/components/destinations'
import LargeCard from '../src/components/largecard'
import {populateCarousel,populatePosts,populateDestinations,populateContinents,getFeatured} from '../src/utils/utils'
import ContinentCard from '../src/components/continentcard'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: 14
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}))

function CircularIndeterminate() {
  const classes = useStyles();
  return (
    <div>
      <CircularProgress color="secondary" />
    </div>
  );
}

const Index = (props) => {
  const classes = useStyles()
  // const [currentPage,setPage] = useState(1)
  // const [additionalPosts,addPosts]= useState([])
  // const [endLine,setEnd] = useState(false)
  // const [isLoading,setLoading] = useState(false)
  // const loadPosts = async() => {
  //   setLoading(true)
  //   setPage(currentPage+1)
  //   getNextPosts(currentPage).then((res) => {
  //     setLoading(false)
  //     addPosts(res)
  //   }).catch((err) => {
  //     setLoading(false)
  //     setEnd(true)
  //   })
  // }
  //set the latest post as the 0th index
  const [currentPost,setPost] = useState(0)
  
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
        style={{paddingRight:'10%',paddingLeft:'10%',marginTop:"10vh"}}>
            <Grid item xs={12} style={{marginLeft:'5%',position:'relative'}}>
                <Grid container direction="row" justify="flex-end" style={{position:'absolute',top:'0'}}>
                    <IconButton onClick={moveBack}>
                      <LeftArrow/>
                    </IconButton>
                    <IconButton onClick={moveFront}>
                      <RightArrow/>
                    </IconButton>
                    
                </Grid>
                <LargeCard slug={props.postData[currentPost].slug} title={props.postData[currentPost].title} excerpt={props.postData[currentPost].excerpt} image={props.postData[currentPost].image} link={props.postData[currentPost].link} country={props.postData[currentPost].country_normal} height="60vh"/>
                <Grid container direction="row" justify="flex-end" style={{position:'absolute',bottom:'0',right:'1%'}}>
                  <Typography variant="subtitle1" component="body1">
                    <a href={`\\all`} style={{textDecoration:'none'}}>
                      SEE MORE ARTICLES
                    </a>
                  </Typography>
                </Grid>
            </Grid>  
            <Grid item xs={12} style={{marginLeft:'5%',position:'relative'}} >
              <Grid container spacing ={2}>
                {props.continents.map(({name,text,image}) => {
                  return(
                    <Grid item xs={4}>
                      <ContinentCard title={text} image={image}/>
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
            <Grid item xs={12} style={{marginLeft:'5%',position:'relative'}} >
              <Grid container spacing= {2}>
                <Grid item xs={6}>
                  <BlogCards slug={props.featured[0].slug} title={props.featured[0].excerpt} image={props.featured[0].image} link={props.featured[0].slug} height="30vh"/>
                </Grid>
                <Grid item xs={6}>
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
        <Typography variant="h5" style={{marginTop:'2vh',textAlign:"center"}}>DESTINATIONS</Typography>
        <DestinationTab destinations={props.destinations}/>
    </HomeLayout>
  )
}


Index.getInitialProps = async() => {
  const carouselData = populateCarousel()
  const postData = populatePosts()
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
