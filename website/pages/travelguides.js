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
                <title> Travel Guides - The Layover Life</title>
                <meta name="description" content="All the travel guides that you need"/>
            </Head>
            <Nav/>
            <Grid
            container
            justify="center"
            style={{paddingTop:'1vh',minHeight:'93vh'}}>
                <Grid item align="center" md={12} style={{marginBottom:"5vh",position:'relative'}}>
                    <Typography variant="h3" style={{marginBottom:'2vh'}}> Travel Guides</Typography>
                    <Typography variant="h5"> Which area should I stay? Which attractions should I visit? We've got you covered with real travellers' guides!</Typography>
                </Grid>
                <Grid item md={12}>
                    <Grid 
                    container
                    spacing={2}
                    style={{marginLeft:'6%',marginRight:'6%'}}>
                        {travelguides.map((post) => {
                            return(
                                <Grid item xs={12} md={4}>
                                 <BlogCards title={post.title} image={post.image} link={post.link} height='20vh'/>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
                <Grid item align="center" md={12} style={{marginBottom:"5vh",position:'relative'}}>
                    <Typography variant="h3" style={{marginBottom:'2vh'}}> Packing Guides</Typography>
                    <Typography variant="h5"> The best packing tips & tricks from the most seasoned travellers!</Typography>
                </Grid>
                <Grid item md={12}>
                    <Grid container
                    spacing={2}
                    style={{marginLeft:'6%',marginRight:'6%'}}>
                        {packingguides.map((post) => {
                            return(
                                <Grid item xs={12} md={4}>
                                 <BlogCards title={post.title} image={post.image} link={post.link} height='20vh'/>
                                </Grid>
                            )
                        })}
                    </Grid>
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