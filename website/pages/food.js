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
                <title> Food </title>
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
            <Grid direction="row" className="foodGrid">
                <Grid item align="center" md={12} style={{marginTop:'10vh',marginBottom:"10vh",position:'relative'}}>
                <Typography variant="h4" style={{fontWeight:'900'}}> Food Guides </Typography>
                </Grid>
                <Grid item md={12} style={{paddingLeft:"5%",paddingRight:"5%",marginTop:"2vh"}}>
                <Grid container spacing={2} >
                    {/* Show only itinerary type posts */}
                    {foodguides.map((guide) => {
                        return (
                        <Grid key={guide.title} item xs={12} md={4}>
                            <BlogCards slug={guide.slug} title={guide.title} excerpt={guide.excerpt} image={guide.image} link={guide.link} date={guide.date} height="30vh"/>
                        </Grid>
                        )
                    })}
                </Grid>
                </Grid>
            </Grid>
            <div style={{paddingTop:'20vh'}}>
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