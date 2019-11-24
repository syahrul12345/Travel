import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {Box,Grid} from '@material-ui/core'
import HomeLayout from '../src/layouts/home'
import BlogCards from '../src/components/blogcards'
import fetch from 'isomorphic-unfetch';
const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: 14
  }
})

const Index = (props) => {
  const classes = useStyles()
  console.log(props)
  return (
    <HomeLayout data={props.carouselData}>
      <h1 style={{textAlign:"center"}}>FEATURED POSTS</h1>
       <Grid
       container
       spacing={2}
       justify="center"
       style={{paddingRight:'10%',paddingLeft:'10%'}}>
         {props.postData.map(({slug,title,excerpt,image},index) => (
            <Grid item xs={3} key={index}>
              <BlogCards slug={slug} title={title} excerpt={excerpt} image={image}/>
            </Grid>
          ))}
       </Grid>
    </HomeLayout>
  )
}

const populateCarousel = async() => {
  const res = await fetch('http://localhost:8080/wp-json/wp/v2/carousel')
  const data = await res.json()

  const carouselData = data.map((carousel) => ({
    text: carousel.title.rendered,
    textBlurb:(carousel.acf.excerpt).replace(/<[^>]*>?/gm, ''),
    image:carousel.acf.image.url,
    url:carousel.acf.url,
  }))
  return {
    data:carouselData
  }
}

const populatePosts = async() => {
  const res = await fetch('http://localhost:8080/wp-json/wp/v2/posts')
  const data = await res.json()
  const postData = data.map((post) => ({
    slug:post.slug,
    title:post.title.rendered,
    excerpt:post.acf.excerpt,
    image:post.acf.featured_image.sizes.medium_large
  }))
  return {
    data:postData
  }
}
Index.getInitialProps = async() => {
  const carouselData = populateCarousel()
  const postData = populatePosts()
  //populate the information to be setn tothe front end
  const res = await Promise.all([carouselData,postData])
  
  const returnedJson = {}
  returnedJson['carouselData'] = res[0].data
  returnedJson['postData'] = res[1].data
  
  return returnedJson
}

export default Index
