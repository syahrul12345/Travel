import {Typography,Card,CardMedia, CardActionArea} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Link from 'next/link'

const useStyles = makeStyles({
    media: {
        height: '20vh',
    },
  });
export default function CountryCard(props){
    const classes = useStyles()
    return(
      <Card style={{position:"relative"}}>
          <Link href={`/country/${props.title}`}>
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
              color:"white",
            }}
            variant="h4" 
            component="p">
                <span style={{
                  fontFamily:'Melon hunter',
                  fontSize:'50px',
                  lineHeight:'10px',
                  borderTop:'3px solid',
                  borderBottom:'3px solid',
                  }}>
                    <strong>{props.title}</strong>
                </span>
            </Typography>
          </CardActionArea>
          </Link>
      </Card>
    )
  }
  