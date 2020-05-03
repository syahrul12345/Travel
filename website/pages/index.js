import {useState,useEffect} from 'react'
import {Grid,Typography,Button,Divider,IconButton,GridList,GridListTile,GridListTileBar,Link} from '@material-ui/core'
import LeftArrow from '@material-ui/icons/ArrowBack'
import RightArrow  from '@material-ui/icons/ArrowForward'
import HomeLayout from '../src/layouts/home'
import BlogCards from '../src/components/blogcards'
import DestinationTab from '../src/components/destinations'
import LargeCard from '../src/components/largecard'
import {populateCarousel,populatePosts,populateDestinations,populateContinents,getFeatured, getLatestPosts} from '../src/utils/utils'
import ContinentCard from '../src/components/continentcard'
import './style.css'
import MobileDestinations from '../src/components/mobiledestinations/mobiledestinations'

const Index = (props) => {
  const { latestPosts } = props
  
  const [currentPost,setPost] = useState(0)
  const [destination,setDestination] = useState(0)
  const [page, setPage] = useState(1)
  const [latestPostsState, setLatestPostsState] = useState(latestPosts)
  
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
  const loadMoreLatest = () => {
    getLatestPosts(page +1).then((res) => {
      const newLatestPosts = latestPostsState.concat(res.data)
      setLatestPostsState(newLatestPosts)
    }).catch((err) => {
      console.log(err)
    })
    setPage(page+1)
  }
  
  return (
    <HomeLayout data={props.carouselData}>
      <div>
        <Grid 
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
                className="mobileGridList">
                  <GridList spacing={4} style={{
                    flexWrap: 'nowrap',
                    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
                    transform: 'translateZ(0)',
                  }} 
                  cols={1}>
                    {props.postData.map((post,index) => (
                      <GridListTile key={props.postData[index].slug} style={{height:'100%'}}>
                        <LargeCard slug={props.postData[index].slug} title={props.postData[index].title} excerpt={props.postData[index].excerpt} image={props.postData[index].image} link={props.postData[index].link} country={props.postData[index].country_normal} height="70vh"/>
                        </GridListTile>
                    ))}
                  </GridList>
                  {/* <Button 
                  style={{position:'absolute',bottom:'20%',left:'25%',}}
                  className="mobileSeeMore" 
                  variant="contained" >
                    <Typography variant="subtitle1" component="p">
                      <a href={`\\articles`} style={{textDecoration:'none'}}>
                        SEE MORE ARTICLES
                      </a>
                    </Typography>
                  </Button> */}
                </div>
                <Grid 
                direction="row" 
                className="seeMoreContainer"
                >
                  <Typography className="desktopSeeMore" variant="subtitle1" component="p">
                    <Link href={`\\articles`} style={{textDecoration:'none',color:'black'}}>
                      SEE MORE ARTICLES
                    </Link>
                  </Typography>
                </Grid>
            </Grid> 
          </Grid>
        <Grid align="right" style={{paddingRight:'9%',paddingLeft:'9%',marginTop:'1%'}}>
            <Grid item xs={12}>
              <Divider variant="middle" style={{margin:'0px'}}/>
            </Grid>
        </Grid>
        <Grid spacing ={5} direction="row" align="center" justify="center" style={{paddingRight:'9%',paddingLeft:'9%',marginTop:'1%',paddingBottom:'3%',paddingTop:'1vh'}}>
            <Grid item xs={12}>
              <Typography variant="h6"> LATEST POSTS</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid 
              container
              style={{paddingTop:'3%'}}
                spacing={2}
                >
                    {latestPostsState && latestPostsState.map((post) => {
                      return(
                          <Grid item xs={12} md={4}>
                            <BlogCards title={post.title} image={post.image} link={post.link} height='30vh'/>
                          </Grid>
                      )
                    })}
                </Grid>
                <Grid item xs={2}>
                  <Button onClick={() => loadMoreLatest()}> <Typography variant="body1">Read More </Typography></Button>
                </Grid>
            </Grid>
            
        </Grid>
        <div className="destinations" id="destinations">
          <Typography variant="h6" style={{marginTop:'2vh',marginBottom:'3vh',textAlign:"center"}}>DESTINATIONS</Typography>
          <DestinationTab currentDestination = {destination} destinations={props.destinations}/>
        </div>
        <div className="mobileDestinations">
          <MobileDestinations destinations={props.destinations}/>
        </div>
        </div>
    </HomeLayout>
  )
}


Index.getInitialProps = async() => {
  const carouselData = populateCarousel()
  const postData = populatePosts(4)
  const destinations = populateDestinations()
  const continents = populateContinents()
  const featured = getFeatured()
  const latestPosts = getLatestPosts("1")
  const res = await Promise.all([carouselData,postData,destinations,continents,featured,latestPosts])
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
  returnedJson['latestPosts'] = res[5].data

  return returnedJson
}

export default Index
