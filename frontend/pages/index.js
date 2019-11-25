import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {Grid} from '@material-ui/core'
import HomeLayout from '../src/layouts/home'
import BlogCards from '../src/components/blogcards'
import {populateCarousel,populatePosts} from '../src/utils/utils'
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
