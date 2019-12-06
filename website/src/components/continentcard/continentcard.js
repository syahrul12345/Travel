import {Typography,Card,CardMedia, CardActionArea} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Link from 'next/link'

const useStyles = makeStyles({
    media: {
        height: '20vh',
    },
  });
export default function ContinentCard(props){
    const classes = useStyles()
    return(
      <Card style={{position:"relative"}}>
          <Link href={`/continent/${props.title}`}>
          <CardActionArea>
            <CardMedia 
            style={{height:'20vh'}}
            image={props.image}/>
            <Typography 
            style={{
              position:"absolute",
              top:'40%',
              width:'100%',
              height:'100%',
              textAlign:"center",
              zIndex:"100",
              fontFamily:"Arial",
              color:"white",
            }}
            variant="h6" 
            component="p">
              <span style={{backgroundColor:"rgba(255, 255, 255, 0.3)"}}>{props.title}</span>
            </Typography>
          </CardActionArea>
          </Link>
      </Card>
    )
  }
  