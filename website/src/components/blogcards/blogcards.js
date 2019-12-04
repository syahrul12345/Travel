import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import {Card,CardContent,CardMedia, CardActionArea,Typography} from '@material-ui/core'
import HtmlToReact from 'html-to-react'
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
    const HtmlToReactParser = HtmlToReact.Parser
    const parser = new HtmlToReactParser()
    return(
          <Link href={`\\${props.link}`}>
            <CardActionArea>
              <CardMedia 
              className={classes.media}
              image={props.image}/>
              <CardContent >
              <Typography
                variant="body1" 
                component="p">
                  <span style={{backgroundColor:"rgba(255, 255, 255, 1)"}}>{parser.parse(props.title)}</span>
                </Typography>
                <span>{props.country}</span>
                </CardContent>
            </CardActionArea>
            
          </Link>
    )
}