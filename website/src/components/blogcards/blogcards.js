import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import {Grid,Card,CardContent,CardMedia, CardActionArea,CardActions,Button,Typography,IconButton} from '@material-ui/core'
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
const useStyles = makeStyles({
    card: {
      maxWidth: '60vw',
      maxHeight: '100vh',
    },
    media: {
      height: '20vh',
    },
  });
  
export default function BlogCards(props) {
    const classes = useStyles()
    return(
        <Card style={{position:"relative"}}>
            <Link href={`\\${props.link}`}>
            <CardActionArea>
              <CardMedia 
              className={classes.media}
              image={props.image}/>
              <h1 
                style={{
                  position:"absolute",
                  top:'20%',
                  width:'100%',
                  height:'100%',
                  textAlign:"center",
                  color:"white",
                }}
                variant="body2" 
                component="p">
                  <span style={{backgroundColor:"rgba(255, 0, 0, 0.4)"}}>{props.title}</span>
                </h1>
            </CardActionArea>
            </Link>
        </Card>
    )
}