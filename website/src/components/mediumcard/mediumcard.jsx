import React from 'react'
import {Grid,Card,CardActionArea,CardMedia,CardContent,makeStyles, Typography} from '@material-ui/core'
import HtmlToReact from 'html-to-react'
import Link from 'next/link'
import './style.css'

export default function MediumCard(props) {
    const HtmlToReactParser = HtmlToReact.Parser
    const parser = new HtmlToReactParser()
    const { link, image, title, country, height} = props
    return(
        <Link href={`\\${link}`}>
            <Card>
            <CardActionArea>
                <Grid container>
                    <Grid item xs={5}>
                        <CardMedia
                        image={image}
                        style={{height}}/>
                    </Grid>
                    <Grid item xs={7}>
                        <CardContent
                        className="cardContent">
                            <Typography
                            className="contentHeader" 
                            variant="h5" 
                            component="p">
                                {parser.parse(title)}
                            </Typography>
                            <Typography variant="subtitle1">
                                {country}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </CardActionArea>
            </Card>
            </Link>
    )
}