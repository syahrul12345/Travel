import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import {Card,CardContent,CardMedia, CardActionArea,Typography} from '@material-ui/core'
import HtmlToReact from 'html-to-react'

  
export default function BlogCards(props) {
    const HtmlToReactParser = HtmlToReact.Parser
    const parser = new HtmlToReactParser()
    return(
          <Link href={`\\${props.link}`}>
            <CardActionArea>
              <CardMedia 
              style={{height:props.height}}
              image={props.image}/>
              <CardContent >
                <Typography
                variant="body1" 
                component="p"
                style={{textAlign:'center'}}>
                  {parser.parse(props.title)}
                </Typography>
                <Typography
                variant="body2"
                component="p">
                  {parser.parse(props.excerpt)}
                </Typography>
                <span>{props.country}</span>
                </CardContent>
            </CardActionArea>
            
          </Link>
    )
}