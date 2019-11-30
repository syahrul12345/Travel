import {useRouter} from 'next/router';
import Link from 'next/link'
import {getCountryInfo} from '../../src/utils/utils'
import {Grid,Typography,makeStyles,Card,CardActionArea,CardMedia} from '@material-ui/core'
import Head from 'next/head'
import CountryLayout from '../../src/layouts/country'
import BlogCards from '../../src/components/blogcards';
const useStyles = makeStyles(theme => ({
    media: {
      height: '30vh',
    },
    banner: {
        height:'50vh',
        widht:'100vh',
    }
  }));

export default function CountryPage(props) {
    const router = useRouter()
    const posts = props.info[0].posts
    const classes = useStyles()
    return(
        <div>
            <CountryLayout>
                <Head>
                    <title>{router.query.country} - Airwaitress</title>
                </Head>
                <Grid container direction="row">
                    <Grid style={{position:'relative'}} id="topGrid" item align="center" xs={12}>
                        <div 
                        className={classes.banner}
                        style={{
                            backgroundImage:`url(${props.info[0].acf.background_image.sizes.large})`,
                            backgroundSize:'100%',
                            position:"relative"
                        }}>
                        </div>
                        <Typography 
                        style={{
                            position:"absolute",
                            top:'40%',
                            width:'100%',
                            height:'100%',
                            textAlign:"center",
                            zIndex:"0",
                            color:"white",
                        }}
                        variant="h1" 
                        component="h2">
                            <span style={{backgroundColor:"rgba(255, 255, 255, 0.2)"}}>{props.info[0].title.rendered}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Typography
                        variant="h2"
                        style={{marginTop:"2vh"}}>
                            ITENARIES
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center" style={{paddingLeft:"5%",paddingRight:"5%",marginTop:"2vh"}}>
                        <Grid 
                        container 
                        spacing={2}
                        justify="center">
                            {posts.map((post) => {
                                return(
                                   <Grid key={post.title.rendered} item xs={4}>
                                       <BlogCards slug={post.slug} title={post.title} excerpt={post.excerpt} image={post.image} link={post.link}/>
                                   </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </CountryLayout>
        </div>
    )
}

CountryPage.getInitialProps = async(context) => {
    const info = await getCountryInfo(context.query.country)
    return {
        info
    }
}