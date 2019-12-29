import {useRouter} from 'next/router';
import {getCountryInfo} from '../../src/utils/utils'
import {Grid,Typography,makeStyles, CardMedia} from '@material-ui/core'
import InfoCard from '../../src/components/infocard'
import PhoneIcon from '@material-ui/icons/Phone'
import WatchIcon from '@material-ui/icons/Watch'
import GlobeIcon from '@material-ui/icons/Public'
import PlaneIcon from '@material-ui/icons/AirplanemodeActive'
import PeopleIcon from '@material-ui/icons/People'
import CurrencyIcon from '@material-ui/icons/AttachMoney'
import TrainIcon from '@material-ui/icons/Train'

import Head from 'next/head'
import CountryLayout from '../../src/layouts/country'
import BlogCards from '../../src/components/blogcards';
import './style.css'

export default function CountryPage(props) {
    const router = useRouter()
    const countryData = props.info[0].acf
    const categorized = props.categorized
    return(
        <div>
            <CountryLayout>
                <Head>
                    <title>{router.query.country} - Airwaitress</title>
                </Head>
                <Grid container direction="row">
                    <Grid style={{position:'relative'}} id="topGrid" item align="center" xs={12}>
                        <CardMedia
                        image={props.info[0].acf.background_image.sizes['2048x2048']}
                        style={{height:'60vh'}}/>
                        {/* <div 
                        className="banner"
                        style={{
                            backgroundImage:`url(${props.info[0].acf.background_image.sizes['2048x2048']})`,
                            backgroundSize:'100%',
                            position:"relative"
                        }}>
                        </div> */}
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
                            <span style={{borderTop:'10px solid',borderBottom:'10px solid'}}><strong>{props.info[0].title.rendered}</strong></span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{paddingTop:'3vh'}}>
                        <Typography variant="body1" style={{textAlign:'left',paddingLeft:'20%',paddingRight:'20%',paddingBottom:'4vh'}}>
                            {props.info[0].acf.blurb}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{paddingTop:'3vh',paddingBottom:'4vh'}} align="center">
                        <Typography variant="h4">
                            TRAVEL INFORMATION
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{paddingLeft:'25%',paddingRight:'25%'}}>
                        <Grid 
                        container 
                        direction="row"
                        align="center"
                        alignContent="center"
                        alignItems="center"
                        justify="center"
                        >
                            <Grid item xs={3} sm ={3}>
                                <InfoCard data={countryData.country_code} text="Country Code" icon={<PhoneIcon/>}/>
                            </Grid>
                            <Grid item xs={3} sm ={3}>
                                <InfoCard data={countryData.time_zone} text="Time Zone" icon={<WatchIcon/>}/>
                            </Grid>
                            <Grid item xs={3} sm ={3}>
                                <InfoCard data={countryData.currency} text="Currency" icon={<CurrencyIcon/>}/>
                            </Grid>
                            <Grid item xs={3} sm ={3}>
                                <InfoCard data={countryData.continent} text="Continent" icon={<GlobeIcon/>}/>
                            </Grid>
                            <Grid item xs={3} sm ={4}>
                                <InfoCard data={countryData.peak_travel_season} text="Peak Season" icon={<PeopleIcon/>}/>
                            </Grid>
                            <Grid item xs={3} sm ={4}>
                                <InfoCard data={countryData.cheapest_travel_period} text="Cheapest Season" icon={<PlaneIcon/>}/>
                            </Grid>
                            <Grid item xs={3} sm ={4}>
                                <InfoCard data={countryData.public_transport_card} text="Transport Card" icon={<TrainIcon/>}/>
                            </Grid>
                            
                        </Grid>
                      </Grid>
                      {categorized.map(({id,name,posts}) => {
                          if(posts.length > 0) {
                              //Posts of this category exists
                              return(
                                <>
                                <Grid item xs={12} align="center">
                                    <Typography
                                    variant="h4"
                                    style={{marginTop:"2vh"}}>
                                        {name.toUpperCase()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} style={{paddingLeft:"5%",paddingRight:"5%",marginTop:"2vh"}}>
                                    <Grid 
                                    container 
                                    spacing={2}
                                    justify="center">
                                        {posts.map((post,index) => {
                                            if(post.category.includes(id)){
                                                while(index < 6){
                                                    //Only display first 6 cards
                                                    return(
                                                        <Grid key={post.title.rendered} item xs={4}>
                                                            <BlogCards slug={post.slug} title={post.title} excerpt={post.excerpt} image={post.image} link={post.link} country={props.info[0].title.rendered} height="20vh"/>
                                                        </Grid>
                                                    )
                                                }
                                            }
                                        })}
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{paddingLeft:"5%",paddingRight:"5%",textAlign:'right'}}>
                                    {posts.length >= 6 ? 
                                        <Typography variant="subtitle1" component="body1">
                                            <a href={`\\${name}`} style={{textDecoration:'none'}}>
                                                SEE MORE {name.toUpperCase()} ARTICLES
                                            </a>
                                        </Typography>
                                        :''
                                    }
                                    
                                </Grid>
                                </>
                              )
                          }
                      })}
                </Grid>
            </CountryLayout>
        </div>
    )
}

CountryPage.getInitialProps = async(context) => {
    const info = await getCountryInfo(context.query.country)
    const categorized = info[0].categories.map(({id,name}) => {
        const posts = []
        info[0].posts.forEach((post,index) => {
            if(post.category.includes(id)){
                posts.push(post)
            }
        })
        return {
        id,
        name,
        posts
        }
  })
  return {
      info,
      categorized,
  }
}
