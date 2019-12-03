import {useState} from 'react'
import { makeStyles } from '@material-ui/styles'
import {Grid,Typography,Button,CircularProgress} from '@material-ui/core'
import HomeLayout from '../src/layouts/home'
import BlogCards from '../src/components/blogcards'
import DestinationTab from '../src/components/destinations'
import MediumCard from '../src/components/mediumcard'
import {populateCarousel,populatePosts,populateDestinations,getNextPosts} from '../src/utils/utils'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: 14
  },
})

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
  const [currentPage,setPage] = useState(1)
  const [additionalPosts,addPosts]= useState([])
  const [endLine,setEnd] = useState(false)
  const [isLoading,setLoading] = useState(false)
  const loadPosts = async() => {
    setLoading(true)
    setPage(currentPage+1)
    getNextPosts(currentPage).then((res) => {
      setLoading(false)
      addPosts(res)
    }).catch((err) => {
      setLoading(false)
      setEnd(true)
    })
  }
        
  return (
    <HomeLayout data={props.carouselData}>
      <Grid 
      container 
      direction="row"
      spacing={2}
      style={{paddingRight:'10%',paddingLeft:'10%',marginTop:"1vh"}}>
          <Grid item xs={4}>
            {props.postData.map(({slug,title,excerpt,image,link,country},index) => {
              if(index == 0){
                return(
                  // <MediumCard slug={slug} title={title} excerpt={excerpt} image={image} link={link} country={country}/>
                  <BlogCards slug={slug} title={title} excerpt={excerpt} image={image} link={link} country={country}/>
                )
              }
            })}
          </Grid>  
          <Grid item xs={4}>
            <Grid container spacing ={2}>
            {props.postData.map(({slug,title,excerpt,image,link,country},index) => {
              if(index >= 1 && index <= 3){
                return(
                  <Grid item xs={12}>
                    <MediumCard slug={slug} title={title} excerpt={excerpt} image={image} link={link} country={country}/>
                    {/* <BlogCards slug={slug} title={title} excerpt={excerpt} image={image} link={link} country={country}/> */}
                  </Grid>
                )
              }
            })}
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing= {2}>
            {props.postData.map(({slug,title,excerpt,image,link,country},index) => {
              if(index >= 4){
                return(
                  <Grid item xs={12}>
                  <BlogCards slug={slug} title={title} excerpt={excerpt} image={image} link={link} country={country}/>
                    
                  </Grid>
                )
              }
            })}
            <Grid container direction="row" align="right">
              <Grid item xs={12}>
                <Typography variant="subtitle1" component="body1">
                  SEE MORE ARTICLES
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid> 
      </Grid>
    </HomeLayout>
    // <HomeLayout data={props.carouselData}>
    //   <Typography variant="h4" style={{textAlign:"center"}}>FEATURED POSTS</Typography>
    //   <Grid
    //   container
    //   spacing={2}
    //   justify="center"
    //   style={{paddingRight:'10%',paddingLeft:'10%',marginTop:"1vh"}}>
    //     {props.postData.map(({slug,title,excerpt,image,link,country},index) => (
    //       <Grid item xs={4} key={index}>
    //         <BlogCards slug={slug} title={title} excerpt={excerpt} image={image} link={link} country={country}/>
    //       </Grid>
    //     ))}
    //     {additionalPosts.map(({slug,title,excerpt,image,link,country},index) => (
    //       <Grid item xs={4} key={index}>
    //         <BlogCards slug={slug} title={title} excerpt={excerpt} image={image} link={link} country={country}/>
    //       </Grid>
    //     ))}
    //     {/* Load the loader item */}
    //     <Grid item xs={12} align="center">
    //       {isLoading ? <CircularIndeterminate/>:""}
    //     </Grid>
    //     {/* Inject some html once the last page is reached */}
    //     {endLine ? 
    //       <Grid item xs={12} align="center">
    //         <Typography variant="h6">NO MORE POSTS TO SHOW</Typography>
    //       </Grid> : ""
    //     }
    //     <Button onClick={loadPosts} variant="contained" color="primary">Load more</Button>
    //   </Grid>
    //   <Typography variant="h4" style={{marginTop:'2vh',textAlign:"center"}}>DESTINATIONS</Typography>
    //   <DestinationTab destinations={props.destinations}/>
    // </HomeLayout>
  )
}


Index.getInitialProps = async() => {
  const carouselData = populateCarousel()
  const postData = populatePosts()
  const destinations = populateDestinations()
  const res = await Promise.all([carouselData,postData,destinations])
  const returnedJson = {}
  returnedJson['carouselData'] = res[0].data
  returnedJson['postData'] = res[1].data
  // returnedJson['destinations'] = res[2].data
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
  return returnedJson
}

export default Index
