import {useState} from 'react'
import { makeStyles } from '@material-ui/styles'
import {Grid,Typography,Button,CircularProgress} from '@material-ui/core'
import HomeLayout from '../src/layouts/home'
import BlogCards from '../src/components/blogcards'
import DestinationTab from '../src/components/destinations'
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
      <CircularProgress color="primary" />
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
      <Typography variant="h2" style={{textAlign:"center"}}>FEATURED POSTS</Typography>
      <Grid
      container
      spacing={2}
      justify="center"
      style={{paddingRight:'10%',paddingLeft:'10%',marginTop:"1vh"}}>
        {props.postData.map(({slug,title,excerpt,image,link},index) => (
          <Grid item xs={4} key={index}>
            <BlogCards slug={slug} title={title} excerpt={excerpt} image={image} link={link}/>
          </Grid>
        ))}
        {additionalPosts.map(({slug,title,excerpt,image},index) => (
          <Grid item xs={4} key={index}>
            <BlogCards slug={slug} title={title} excerpt={excerpt} image={image} link={link}/>
          </Grid>
        ))}
        {/* Load the loader item */}
        <Grid item xs={12} align="center">
          {isLoading ? <CircularIndeterminate/>:""}
        </Grid>
        {/* Inject some html once the last page is reached */}
        {endLine ? 
          <Grid item xs={12} align="center">
            <Typography variant="h4">NO MORE POSTS TO SHOW</Typography>
          </Grid> : ""
        }
        <Button onClick={loadPosts} variant="contained" color="primary">Load more</Button>
      </Grid>
      <Typography variant="h2" style={{marginTop:'2vh',textAlign:"center"}}>DESTINATIONS</Typography>
      <DestinationTab destinations={props.destinations}/>
    </HomeLayout>
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
