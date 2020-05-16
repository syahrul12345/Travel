import React from 'react';
import Link from 'next/link'
import {Grid,CardContent,CardMedia,Typography,Card, CardActionArea} from '@material-ui/core'
import HtmlToReact from 'html-to-react'
import './style.css'
  
export default function BlogCards(props) {
    const HtmlToReactParser = HtmlToReact.Parser
    const parser = new HtmlToReactParser()
    return(
            <Grid item xs={12} sm={8}>
                <Link href={`\\${props.link}`}>
                <CardActionArea>
                <Card>
                <CardMedia 
                className="media"
                style={{height:props.height}}
                image={props.image}/>
                </Card>
                <CardContent
                className="contentCardDesktop" 
                >
                        <Typography
                            variant="h6" 
                            >
                            {parser.parse(props.title)}
                        </Typography>
                        <Typography
                            variant="body1"
                            >
                            {parser.parse(props.excerpt)}
                        </Typography>
                        <Typography variant="subtitle2">
                             {props.country}
                        </Typography>
                    {/* <Grid container justify="flex-end" style={{marginTop:'1vh'}}>
                        <Grid item>
                            <Link href={`\\${props.link}`}>
                                <Button variant="contained" color="primary"> View Post </Button>
                            </Link>
                        </Grid>
                    </Grid> */}
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
                            <span style={{
                                backgroundColor:'black',
                                fontFamily:'Melon hunter',
                                fontSize:'50px',}}> {parser.parse(props.title)}</span>
                        </Typography>
                        <Typography
                            variant="h5"
                            component="p"
                            color="primary"
                            >
                            <span style={{
                                backgroundColor:'black',
                                fontFamily:'Melon hunter',
                                fontSize:'30px'}} >{parser.parse(props.excerpt)}</span>
                        </Typography>
                        <Typography 
                        variant="subtitle1"
                        color="primary">
                            <span style={{
                                backgroundColor:'black',
                                fontFamily:'Melon hunter',
                                fontSize:'20px'}}>In {props.country}</span>
                        </Typography>
                        </div>
                    </Link>
                </div>
                </CardActionArea>
                </Link>
            </Grid>

    )
}