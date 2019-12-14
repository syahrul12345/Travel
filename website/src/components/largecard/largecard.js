import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import {Grid,CardContent,CardMedia, Button,Typography,Paper} from '@material-ui/core'
import HtmlToReact from 'html-to-react'
import './style.css'
  
export default function BlogCards(props) {
    const HtmlToReactParser = HtmlToReact.Parser
    const parser = new HtmlToReactParser()
    return(
            <Grid item xs={12} sm={8}>
                <CardMedia 
                className="media"
                style={{height:props.height}}
                image={props.image}/>
                <CardContent
                className="contentCardDesktop" 
                >
                        <Typography
                            variant="h4" 
                            component="p">
                            {parser.parse(props.title)}
                        </Typography>
                        <Typography
                            variant="h5"
                            component="p">
                            {parser.parse(props.excerpt)}
                        </Typography>
                        <span>{props.country}</span>
                    <Grid container justify="flex-end" style={{marginTop:'1vh'}}>
                        <Grid item>
                            <Link href={`\\${props.link}`}>
                                <Button variant="contained" color="primary"> View Post </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </CardContent>
                <div
                className="contentCardMobile">
                    <Link href={`\\${props.link}`}>
                        <div>
                        <Typography
                            variant="h4" 
                            component="p"
                            color="primary"
                            >
                            <span style={{backgroundColor:'black'}}> {parser.parse(props.title)}</span>
                        </Typography>
                        <Typography
                            variant="h5"
                            component="p"
                            color="primary"
                            >
                            <span style={{backgroundColor:'black'}} >{parser.parse(props.excerpt)}</span>
                        </Typography>
                        <Typography 
                        variant="subtitle1"
                        color="primary">
                            <span style={{backgroundColor:'black'}}>{props.country}</span>
                        </Typography>
                        </div>
                    </Link>
                </div>
                
            </Grid>

    )
}