import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@material-ui/core';

const gallery = (props) => {
  const { images } = props
  // Size is the number of images to show
  let size = 4
  if (images.length === 2) {
    size = 6
  }
  return (
    <Grid
    container
    direction="row"
    justify="center"
    alignContent="center"
    spacing={2}
    >
      {images.map(image => {
        return(
          <Grid item xs={size} key={image.src}>
            <Card
              style={{
              marginTop:'5vh',
              marginBottom:'5vh'}}>
                  <CardMedia
                  image={image.src}
                  style={{height:'675px'}}
                  />
                  {image.caption ? 
                    (<CardContent>
                      <Typography variant="subtitle2" style={{textAlign:'center'}}> {image.caption}</Typography>
                    </CardContent>
                    ) : 
                    <></>
                  }
                  
            </Card>
            
          </Grid>
        )
      })}
      
    </Grid>
  )
}
export default gallery;