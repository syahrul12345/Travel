import {Grid,Card,CardContent,CardMedia,Typography} from '@material-ui/core'
import Head from 'next/head'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
export default function Contact(props) {
    return(
        <div>
            <Head>
                <title>{props.title} - Airwaitress</title>
                <meta description={props.blurb1}/>
            </Head>
            <Nav/>
            <Grid container 
            justify="center" 
            alignItems="center"
            alignContent="center"
            direction="column"
            style={{ minHeight: '93vh' }}>
                <Grid item xs={12} style={{textAlign:'left'}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">
                                {props.title}
                            </Typography>
                            <Typography variant="h6">
                               {props.blurb1}
                            </Typography>
                            <Typography variant="h6">
                                {props.blurb2}
                            </Typography>
                            <Typography variant="body1">
                               {props.content1}
                            </Typography>
                            <Typography variant="body1">
                               {props.content2}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Footer/> 
        </div>
        
    )
}