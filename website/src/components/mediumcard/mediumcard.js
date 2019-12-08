import {Grid,Card,CardActionArea,CardMedia,CardContent,makeStyles, Typography} from '@material-ui/core'
import HtmlToReact from 'html-to-react'
import Link from 'next/link'
import './style.css'

export default function MediumCard(props) {
    const HtmlToReactParser = HtmlToReact.Parser
    const parser = new HtmlToReactParser()
    return(
        <Link href={`\\${props.link}`}>
            <CardActionArea>
                <Grid container>
                    <Grid item xs={5}>
                        <CardMedia
                        image={props.image}
                        style={{height:'15vh'}}/>
                    </Grid>
                    <Grid item xs={7}>
                        <CardContent
                        className="cardContent">
                            <Typography
                            className="contentHeader" 
                            variant="h5" 
                            component="p">
                                {parser.parse(props.title)}
                            </Typography>
                            <Typography 
                            className="contentExcerpt"
                            variant="body1" 
                            component="p">
                                {parser.parse(props.excerpt)}
                            </Typography>
                            <Typography variant="subtitle1">
                                {props.country}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </CardActionArea>
            </Link>
    )
}