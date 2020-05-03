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
            <Nav/>
            <Grid item align="center" md={12} style={{marginTop:'5vh',marginBottom:"2vh",position:'relative'}}>
            <Typography variant="h6"> Cabin </Typography>
            </Grid>
            <Grid item md={12} style={{paddingLeft:"5%",paddingRight:"5%",marginTop:"2vh"}}>
              <Grid container spacing={2} >
                {/* Show only itinerary type posts */}
                  {cabinlife.map((guide) => {
                    return (
                      <Grid key={guide.title} item xs={12} md={4}>
                        <BlogCards slug={guide.slug} title={guide.title} excerpt={guide.excerpt} image={guide.image} link={guide.link} height="30vh"/>
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