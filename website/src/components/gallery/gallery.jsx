import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@material-ui/core';

const gallery = (props) => {
  const { images } = props
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
          <Grid item xs={4} key={image.src}>
            <Card
              style={{
              marginTop:'5vh',
              marginBottom:'5vh'}}>
                  <CardMedia
                  image={image.src}
                  style={{height:'40vh'}}
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