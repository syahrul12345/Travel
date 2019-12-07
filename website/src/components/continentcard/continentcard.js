import {Typography,Card,CardMedia, CardActionArea} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Link from 'next/link'

const useStyles = makeStyles({
    media: {
        height: '20vh',
    },
  });
export default function ContinentCard(props){
    const click = () => {
      switch(props.slug){
        case 'asia':
          props.handler(0)
          break;
        case 'southeast-asia':
          props.handler(1)
          break;
        case 'oceania':
          props.handler(2)
          break;
        case 'europe':
          props.handler(3)
          break;
        case 'america':
          props.handler(4)
          break;
        case 'africa':
          props.handler(5)
          break;
      }
    }
    
    return(
      <Card style={{position:"relative"}}>
          <Link href={`#destinations`}>
          <CardActionArea onClick={click}>
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
            }}
            variant="h6" 
            component="p">
              <span style={{backgroundColor:"rgba(255, 255, 255, 1)"}}>{props.title}</span>
            </Typography>
          </CardActionArea>
          </Link>
      </Card>
    )
  }
  