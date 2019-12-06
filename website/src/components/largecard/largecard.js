import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import {Grid,CardContent,CardMedia, Button,Typography,Paper} from '@material-ui/core'
import HtmlToReact from 'html-to-react'

  
export default function BlogCards(props) {
    const HtmlToReactParser = HtmlToReact.Parser
    const parser = new HtmlToReactParser()
    return(
            <Grid item xs={8}>
                <CardMedia 
                style={{height:props.height}}
                image={props.image}/>
                <CardContent 
                style={{
                        position:'absolute',
                        top:'30%',
                        left:'50%',
                        minWidth:'60vh',
                        maxWidth:'60vh',
                        backgroundColor:'white'
                    }}>
                   
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
                            <Button variant="contained" color="primary"> View Post </Button>
                        </Grid>
                    </Grid>
                </CardContent>
                
            </Grid>

    )
}