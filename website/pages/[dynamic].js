import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Nav from '../src/components/nav'
import {Grid,Card,CardActionArea,CardMedia,makeStyles, CardContent,Typography,Divider,MenuItem,Select,FormControl,InputLabel} from '@material-ui/core'
import MediumCard from '../src/components/mediumcard'
import {populateDestinations,getContextPosts} from '../src/utils/utils'
import Empty from '../src/components/empty'
import Footer from '../src/components/footer'
const useStyles = makeStyles({
    media: {
      height:'40vh'
    },
  });

const texts = {
    food:{
        title:'Food',
        blurb:'Delectable delights from all over the world',
        popular:'Popular Foodie Places'
    },
    itenaries:{
        title:'Itenaries',
        blurb:'Plan your trips well, from start to finish',
        popular:'Popular Destinations'
    },
    nightlife:{
        title:'Nightlife',
        blurb:'Have a blast with all the best bars and clubs',
        popular:'The best nightclubs'
    },
    attractions:{
        title:'Attractions',
        blurb:'Step back and relax, never run out of things to do',
        popular:'Top rates countries'
    },
    posts:{
        title:'All Posts',
        blurb:'Read everything available here',
        popular:'Popular posts by country'
    },

}

export default function Dynamic(props) {
    const classes = useStyles()
    const router = useRouter()
    const [country,setCountry] = React.useState('all')
    const [latestPost,setLatestPost] = React.useState(props.posts[0])
    const [posts,setPosts] = React.useState(props.posts)
    const handleChange = event => {
        setCountry(event.target.value)
        if(event.target.value === "all"){
            setPosts(props.posts)
        }else{
            const newPosts = props.posts.filter((post) => {
                if(post.country == event.target.value){
                    return post
                } 
            })
            setPosts(newPosts)
        }
        
    }
    
    //Props.post has all the contextual posts for the current page
    return(
        <div>
            <Head>
                <title> {router.query.dynamic[0].toUpperCase() + router.query.dynamic.substring(1)} - Airwaitress</title>
            </Head>    
            <Nav/>
            {latestPost != undefined ?
            <div style={{minHeight:'88vh'}}>
            <Grid 
            container 
            spacing={8}
            style={{paddingRight:'20%',paddingLeft:'20%',marginTop:"5vh"}}>
                <Grid item xs={12} sm={8}>
                <Link href={`\\${latestPost.link}`}>
                    <CardActionArea>
                        <Grid container spacing ={2}>
                            <Grid item xs={12}>
                                <CardMedia
                                 style={{height:'40vh'}}
                                 image={latestPost.image}/>
                            </Grid>
                            <Grid item xs={12}>
                                 <CardContent>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography variant="body1" component="body">
                                                {latestPost.title}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle2">
                                                {latestPost.excerpt}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                 </CardContent>
                            </Grid>
                        </Grid>
                    </CardActionArea>
                </Link>
               </Grid>
                <Grid item xs={12} sm={4}>
                   <Typography variant="h5">
                      {texts[router.query.dynamic].title}
                   </Typography>
                   <Typography variant="body1">
                      {texts[router.query.dynamic].blurb}
                   </Typography>
                   <Typography variant="body1" style={{marginTop:'15vh'}}>
                      {texts[router.query.dynamic].popular}
                   </Typography>
                   <Divider variant="middle" style={{marginLeft:'0px',marginRight:'0px'}}/>
                    <ul style={{listStyleType:'none',paddingInlineStart:'0px'}}>
                    {props.destinations.data.map(({slug,title}) => {
                        if(props.count[slug] > 0){
                            return(
                                <li key={slug} >
                                    <a href={`/country/${title}`} style={{textDecoration:'none'}}>
                                        <Typography
                                        variant="body2">
                                            {title}
                                        </Typography>
                                    </a>
                                </li>
                            )
                        }
                       
                    })}
                    </ul>
               </Grid>
            </Grid>
            <Grid
            container
            spacing={4}
            style={{paddingRight:'20%',paddingLeft:'20%'}}>
                <Grid item xs={12} sm={12} style={{textAlign:'left'}}>
                    <Grid container justify="space-between">
                        <Grid item xs={12} sm={4}>
                            <Typography variant="body1">
                                MORE ON {router.query.dynamic.toUpperCase()}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={1} style={{textAlign:'right'}}>
                            <FormControl>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={country}
                                onChange={handleChange}
                                style={{paddingLeft:'4px'}}
                                >   <MenuItem value="all" key="all">All</MenuItem>
                                    {props.destinations.data.map(({slug,title}) => {
                                        if(props.count[slug] > 0) {
                                            return(
                                                <MenuItem value={slug} key={title}>{title}</MenuItem>
                                            )
                                        }
                                        
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Divider variant="middle" style={{marginLeft:'0px',marginRight:'0px'}}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Grid container spacing={2}>
                    { posts.length != 0 ? posts.map((post,index) => {
                        if(post.id == latestPost.id && posts.length != 1) {
                            //ignore first, but just in theres only one article
                            // and you also want to show that one article
                            return(
                                ''
                            )
                        }else{
                            return(
                                <Grid item key={post.title} xs={12} sm={6}>
                                    <MediumCard image={post.image} link={post.link} title={post.title} excerpt={post.excerpt} country={post.country}/>
                                </Grid>
                            )
                        }
                    }) : 
                        <Grid item xs={12} style={{textAlign:'center'}}>
                            <Typography variant="subtitle1" component="body1" style={{textAlign:'center'}}>
                                No articles to show for {country}
                            </Typography>
                        </Grid> 
                    }
                    </Grid>
                </Grid>
                
            </Grid>
            </div> : <Empty/>
            }
            <Footer/>
        </div>
    )
}

Dynamic.getInitialProps = async(context) => {
    const destinations = await populateDestinations()
    const posts = await getContextPosts(context.query.dynamic)
    const returnedJson = {}
    const countMap = {}
    //Coun how many articles each destination has
    //Important to ensure that only destination that have articles will be provided
    destinations.data.map((destination) => {
        const temp = []
        posts.forEach((post) => {
            if(post.country ==destination.slug ){
                temp.push(post)
            }
        })
        const key = destination.slug
        const count = temp.length
        countMap[key] = count
    })
    returnedJson['count'] = countMap
    returnedJson['posts'] = posts
    returnedJson['destinations'] = destinations
    return returnedJson
}