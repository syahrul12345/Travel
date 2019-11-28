import {useState} from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Card,CardContent,CardMedia, CardActionArea,Typography,Fab} from '@material-ui/core'
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import Head from 'next/head'

const useStyles = makeStyles({
    media: {
      height: '30vh',
    },
  });

const CarouselCards = (props) =>  {
    const classes = useStyles()
    const setActive = props.handler
    const slideForward = () => {
        if(props.index == props.length-1){
            setActive(0)
        }else{
            setActive(props.index+1)
        }
        
    }
    const slideBackward = () => {
        if(props.index == 0) {
            setActive(props.length-1)
        }else{
            setActive(props.index-1)
        }
        
    }
    
    return(
        <div>
            <Head>
            </Head>
            <Grid container
            spacing={0}
            justify="center"
            style={{marginBlockStart:'40px',marginBlockEnd:'20px'}}>
                <Grid item xs={8}>
                    <Card style={{position:'relative'}} >
                        <Grid
                        container
                        className="row"
                        justify="space-between"
                        
                        >
                            <Fab 
                            onClick={slideBackward}
                            aria-label="backward"
                            style={{position:'absolute',top:"130px",zIndex:"1"}}
                            >
                                <LeftIcon />
                            </Fab>
                            <Fab 
                            onClick={slideForward}
                            aria-label="forward"
                            style={{position:'absolute',top:"130px",right:"0px",zIndex:"1"}}
                            >
                                <RightIcon />
                            </Fab>
                        </Grid>
                        <Link href={props.url.replace(/^(?:\/\/|[^\/]+)*\//, "")}>
                        <CardActionArea
                        >
                            <CardMedia
                            className={classes.media}
                            image={props.image}
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {props.text}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {props.textBlurb}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        </Link>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

const Carousel = props => {
    //Default the active to the 0th slide
    const [active,setActive] = useState(0)
    const length = props.data.length
    return(
        <div id="carousel">
            {props.data.map(({text,textBlurb,image,url},index) => {
                if(index == active)
                    return(
                        <CarouselCards text ={text} textBlurb = {textBlurb} image={image} key={index} length={length} index={index} url={url} handler={setActive}/>
                    )
            })}
        </div>
    )
}
export default Carousel;                
