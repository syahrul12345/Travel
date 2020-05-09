import Head from 'next/head'
import Nav from '../src/components/nav'
import {Grid,Typography} from '@material-ui/core'
import {getPostsByCategory} from '../src/utils/utils'
import BlogCards from '../src/components/blogcards'
import Footer from '../src/components/footer'
export default function TravelGuides(props) {
    const travelguides = props.travelguides
    const packingguides = props.packingguides
    return(
        <div>
            <Head>
                <title> Lifestyle </title>
                <meta name="description" content="All the travel guides that you need"/>
            </Head>
            <div style={{
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
            </a>
            </div>
            <Nav/>
            <Grid className="afterNavBarGrid" item align="center" md={12} style={{marginTop:'5vh',marginBottom:"2vh",position:'relative'}}>
                    <Typography variant="h6" style={{marginBottom:'5vh'}}> Lifestyle </Typography>
            </Grid>
            <Grid item md={12} style={{paddingLeft:"5%",paddingRight:"5%",marginTop:"2vh"}}>
              <Grid container spacing={2} >
                {/* Show only itinerary type posts */}
                  {travelguides.map((guide) => {
                    return (
                      <Grid key={guide.title} item xs={12} md={4}>
                        <BlogCards slug={guide.slug} title={guide.title} excerpt={guide.excerpt} image={guide.image} link={guide.link} height="30vh"/>
                      </Grid>
                    )
                  })}
              </Grid>
            </Grid>
            <Footer/>
        </div>
    )
}

TravelGuides.getInitialProps = async() => {
    //get the list of travel guides and packing guides
    const res = await Promise.all([getPostsByCategory('guides',6),getPostsByCategory('packing-guides',6)])
    const travelguides = res[0]
    const packingguides = res[1]
    return {
        travelguides,
        packingguides
    }
}