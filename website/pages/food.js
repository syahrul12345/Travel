import Head from 'next/head'
import Link from 'next/link'
import Nav from '../src/components/nav'
import {Grid,Card,CardActionArea,CardMedia,makeStyles, CardContent,Typography,Divider} from '@material-ui/core'
import {populateDestinations} from '../src/utils/utils'
const useStyles = makeStyles({
    media: {
      height:'40vh'
    },
  });

export default function Food(props) {
    const classes = useStyles()
    return(
        <div>
            <Head>
                <title> Food - Airwaitress</title>
            </Head>    
            <Nav/>
            <Grid 
            container 
            spacing={8}
            style={{paddingRight:'20%',paddingLeft:'20%',marginTop:"1vh"}}>
               <Grid item xs={12} sm={8}>
                <Link href={`\\${props.link}`}>
                    <CardActionArea>
                        <Grid container spacing ={2}>
                            <Grid item xs={12}>
                                <CardMedia
                                 className={classes.media}
                                 image="http://localhost:8080/wp-content/uploads/2019/11/Yonezawa-beef-sukiyaki.jpg"/>
                            </Grid>
                            <Grid item xs={12}>
                                 <CardContent>
                                    <Grid container textAlign="left">
                                        <Grid item xs={12}>
                                            <Typography variant="body1" component="body">
                                                Title
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle2">
                                                Blurb
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
                       Food
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
        </div>
    )
}

Food.getInitialProps = async() => {
    const destinations = await populateDestinations()
    const returnedJson = {}
    returnedJson['destinations'] = destinations
    return returnedJson
}