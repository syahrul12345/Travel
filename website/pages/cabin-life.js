import Head from 'next/head'
import Nav from '../src/components/nav'
import {Grid,Typography} from '@material-ui/core'
import {getPostsByCategory} from '../src/utils/utils'
import BlogCards from '../src/components/blogcards'
import Footer from '../src/components/footer'
export default function CrewLife(props) {
    const cabinlife = props.cabinlife
    return(
        <div>
            <Head>
                <title> Cabin Life - The Layover Life</title>
                <meta name="description" content="All the travel guides that you need"/>
            </Head>
            {/* <div style={{
            backgroundColor: 'white',
            position:"relative",
            display:'flex',
            justifyContent:'center'}}>
            <a href="/">
                <img 
                style={{
                    maxHeight:'20vh',
                    maxWidth:'20vw',
                    paddingTop:'2vh',
                    marginBottom:'1.5vh'}}
                src="/static/images/smolidays-logo-1.png" 
                alt="smolidays-logo"/>
            </a> */}
            {/* </div> */}
            <Nav/>
            <Grid className="afterNavBarGrid" item align="center" md={12} style={{marginTop:'10vh',marginBottom:"10vh",position:'relative'}}>
            <Typography variant="h4" style={{fontWeight:'900'}}> CABIN LIFE </Typography>
            </Grid>
            <Grid item md={12} style={{paddingLeft:"5%",paddingRight:"5%",marginTop:"2vh"}}>
              <Grid container spacing={2} >
                {/* Show only itinerary type posts */}
                  {cabinlife.map((guide) => {
                    return (
                      <Grid key={guide.title} item xs={12} md={4}>
                        <BlogCards slug={guide.slug} title={guide.title} excerpt={guide.excerpt} image={guide.image} link={guide.link} date={guide.date} height="30vh"/>
                      </Grid>
                    )
                  })}
              </Grid>
            </Grid>
            <div style={{paddingTop:'20vh'}}>
                <Footer/>
            </div>
        </div>
    )
}

CrewLife.getInitialProps = async() => {
    //get the list of travel guides and packing guides
    const res = await Promise.all([getPostsByCategory('cabin-life',6)])
    const cabinlife = res[0]
    return {
        cabinlife
    }
}