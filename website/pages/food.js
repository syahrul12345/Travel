import Head from 'next/head'
import Nav from '../src/components/nav'
import {Grid,Typography} from '@material-ui/core'
import {getPostsByCategory} from '../src/utils/utils'
import BlogCards from '../src/components/blogcards'
import Footer from '../src/components/footer'
export default function Food(props) {
    const foodguides = props.foodguides
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
            style={{paddingTop:'1vh'}}>
                <Grid item align="center" md={12} style={{marginBottom:"5vh",position:'relative'}}>
                    <Typography variant="h3" style={{marginBottom:'2vh'}}> Food Guides</Typography>
                    <Typography variant="h5"> The best restaurants, cafes, street food, and hidden spots uncovered by the most passionate foodies around the world!</Typography>
                </Grid>
                <Grid item md={12}>
                    <Grid 
                    container
                    spacing={2}
                    style={{marginLeft:'6%',marginRight:'6%'}}>
                        {foodguides.map((post) => {
                            return(
                                <Grid item xs={12} md={4}>
                                    <BlogCards title={post.title} image={post.image} link={post.link} height='20vh'/>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
            <div style={{paddingTop:'15vh'}}>
                <Footer/>
            </div>
        </div>
    )
}

Food.getInitialProps = async() => {
    //get the list of travel guides and packing guides
    const res = await Promise.all([getPostsByCategory('food',6)])
    const foodguides = res[0]
    return {
        foodguides
    }
}