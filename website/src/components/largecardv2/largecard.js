import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import {Grid,CardContent,CardMedia, Button,Typography,Paper} from '@material-ui/core'
import HtmlToReact from 'html-to-react'

  
export default function BlogCards(props) {
    const HtmlToReactParser = HtmlToReact.Parser
    const parser = new HtmlToReactParser()
    return(
            <Grid item xs={12}>
                <CardMedia 
                style={{height:props.height}}
                image={props.image}/>
                <div 
                style={{
                        position:'absolute',
                        top:'30%',
                        left:'30%',
                        color:'white'
                    }}>
                   
                        <Typography
                            variant="h1" 
                            component="p"
                            color="primary"
                            >
                            <span style={{backgroundColor:'black'}}> {parser.parse(props.title)}</span>
                        </Typography>
                        <Typography
                            variant="h2"
                            component="p"
                            color="primary"
                            >
                            <span>{parser.parse(props.excerpt)}</span>
                        </Typography>
                        <Typography 
                        variant="h6"
                        color="primary">
                            <span>{props.country}</span>
                        </Typography>
                    <Grid container justify="flex-end" style={{marginTop:'1vh'}}>
                        <Grid item>
                            <Link href={`\\${props.link}`}>
                                <Button variant="contained" color="primary"> View Post </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </div>
                
            </Grid>

    )
}