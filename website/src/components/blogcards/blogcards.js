import { makeStyles } from '@material-ui/core/styles';
import {Grid,Card,CardContent,CardMedia, CardActionArea,CardActions,Button,Typography,IconButton} from '@material-ui/core'
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
const useStyles = makeStyles({
    card: {
      maxWidth: '60vw',
      maxHeight: '100vh',
    },
    media: {
      height: 140,
    },
  });
  
export default function BlogCards(props) {
    const classes = useStyles()
    return(
        <Grid container
        spacing={0}
        justify="center"
        style={{marginBlockStart:'40px',marginBlockEnd:'20px'}}>
            <Grid item xs={12}>
                <Card className={classes.card} style={{position:'relative'}}>
                    <Grid
                     container
                     alignContent="space-between"
                     justify="space-between"
                     style={{position:'absolute',zIndex:'10',top:'100px'}}>
                    </Grid>
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}
                        image={props.image}
                        title="Contemplative Reptile"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.excerpt}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                        Share
                        </Button>
                        <Button size="small" color="primary">
                        Learn More
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>

    )
}