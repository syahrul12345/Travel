import React from 'react';
import Link from 'next/link'
import {Card, CardMedia, CardActionArea,Typography} from '@material-ui/core'
import HtmlToReact from 'html-to-react'

import './overlay.css';
  
export default function BlogCards(props) {
    const HtmlToReactParser = HtmlToReact.Parser
    const parser = new HtmlToReactParser()
    const { link, image, height, title, date} = props;
    console.log(height)
    return(
        <Card style={{position:"relative"}}>
          <Link href={`\\${link}`}>
            <CardActionArea>
              <div className="overlay">
                <CardMedia 
                  style={{height}}
                  image={image}/>
                </div>
              <div 
              style={{
                position:"absolute",
                top:'70%',
                width:'100%',
                height:'100%',
                textAlign:"left",
                zIndex:"100",
                color:"white",
                paddingLeft:"10px",
                paddingRight: "10px",
              }}
              >
                <Typography variant="h6" component="p" style={{minHeight:'4.5vh',lineHeight:'2.5vh'}}>
                  <strong>{parser.parse(title)}</strong>
                </Typography>
                <Typography style={{marginBottom:"2vh"}}>
                  <span>{date}</span>
                </Typography>
                
              </div>
            </CardActionArea>
          </Link>
        </Card>
    )
}