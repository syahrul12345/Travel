import React from 'react'
import Head from 'next/head'
import {Grid,Typography, TextField,Button} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import { searchPosts } from '../src/utils/utils'
import Nav from '../src/components/nav'
import Footer from '../src/components/footer'
import MediumCard from '../src/components/mediumcard'

export default function Search(props) {
  const { query,posts } = props
  
  const [searchTerm, setSearch] = React.useState(query);
  const [searchedPosts,setSearchedPosts] = React.useState(posts)
  const [loading, setLoading] = React.useState(false);

  const setSearchValue = (event) => { 
    setSearch(event.target.value)
  }
  const search = async() => {
    // reset the searchedPosts
    setSearchedPosts([])
    setLoading(true)
    const data = await searchPosts(searchTerm)
    const newSearchedPosts = data.posts
    setLoading(false)
    setSearchedPosts(newSearchedPosts)
  }
    return(
        <div>
            <Head>
                <title> Search </title>
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
            </a>
            </div> */}
            <Nav/>
            <Grid className="afterNavBarGrid" item align="center" md={12} style={{marginTop:'10vh',marginBottom:"5vh",position:'relative'}}>
                <Typography variant="h4" style={{fontWeight:'900'}}> SEARCH </Typography>
            </Grid>
            <Grid item align="center">
              <TextField label="Search..." value={searchTerm} color="secondary" onChange={setSearchValue} style={{minWidth:'80vw'}}/>
            </Grid>
            <Grid item align="center" style={{paddingTop:'2vh'}}>
              <Button onClick={search}> Search </Button>
            </Grid>
            
            <Grid container spacing={2} justify="center"  style={{paddingLeft:"5%",paddingRight:"5%",marginTop:"2vh", minHeight:'50vh'}}>
                {loading ? 
                <Grid align="center" item xs={12} md={12}>
                  <CircularProgress color="secondary" size={68}/>
                </Grid> : <></>
                }
                {/* Show only itinerary type posts */}
                  {searchedPosts.map(({post}) => {
                    if(post.acf.featured_image.sizes) {
                      return (
                        <Grid key={post.title.rendered} item xs={12} md={6}>
                          <MediumCard slug={post.slug} title={post.title.rendered} excerpt={post.excerpt.rendered} image={post.acf.featured_image.sizes.large} link={post.link.replace(/^(?:\/\/|[^\/]+)*\//, "")} country={post.country} height="15vh"/>
                        </Grid>
                      )
                    }
                  })}
              </Grid>
              <Footer/>
        </div>
    )
}

Search.getInitialProps = async(context) => {
    // get the list of travel guides and packing guides
    // eslint-disable-next-line prefer-destructuring
    const query = context.query.query
    const data = await searchPosts(query)
    return {
      query,
      posts: data.posts,
    }
}