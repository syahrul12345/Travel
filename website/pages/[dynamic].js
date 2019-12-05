import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Nav from '../src/components/nav'
import {Grid,Card,CardActionArea,CardMedia,makeStyles, CardContent,Typography,Divider,MenuItem,Select,FormControl,InputLabel} from '@material-ui/core'
import MediumCard from '../src/components/mediumcard'
import {populateDestinations,getContextPosts} from '../src/utils/utils'
import Empty from '../src/components/empty'
const useStyles = makeStyles({
    media: {
      height:'40vh'
    },
  });

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
                <title> {router.query.dynamic} - Airwaitress</title>
            </Head>    
            <Nav/>
            {latestPost != undefined ?
            <>
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
                                 className={classes.media}
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
                      {router.query.dynamic}
                   </Typography>
                   <Typography variant="body1">
                       Delectable delights from all over the world
                   </Typography>
                   <Typography variant="body1" style={{marginTop:'15vh'}}>
                       Popular Food Destinations
                   </Typography>
                   <Divider variant="middle" style={{marginLeft:'0px',marginRight:'0px'}}/>
                    <ul style={{listStyleType:'none',paddingInlineStart:'0px'}}>
                    {props.destinations.data.map(({slug,title}) => {
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
                                >   <MenuItem value="all" key="all">Filter Country</MenuItem>
                                    {props.destinations.data.map(({slug,title}) => {
                                        return(
                                            <MenuItem value={slug} key={title}>{title}</MenuItem>
                                        )
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
                        if(post.id == latestPost.id) {
                            //ignore first
                            return(
                                ''
                            )
                        }else{
                            return(
                                <Grid item key={post.title} xs={12} sm={6}>
                                    <MediumCard image={post.image} link={post.link} title={post.title}/>
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
            </> : <Empty/>
            }
        </div>
    )
}

Dynamic.getInitialProps = async(context) => {
    const destinations = await populateDestinations()
    const posts = await getContextPosts(context.query.dynamic)
    const returnedJson = {}
    returnedJson['posts'] = posts
    returnedJson['destinations'] = destinations
    return returnedJson
}