import {Grid,Card,CardActionArea,CardMedia,CardContent,makeStyles, Typography} from '@material-ui/core'
import HtmlToReact from 'html-to-react'
import Link from 'next/link'
const useStyles = makeStyles({
    media: {
      height: '15vh',
    },
  });

export default function MediumCard(props) {
    const HtmlToReactParser = HtmlToReact.Parser
    const parser = new HtmlToReactParser()
    const classes = useStyles()
    return(
        <Link href={`\\${props.link}`}>
            <CardActionArea>
                <Grid container>
                    <Grid item xs={5}>
                        <CardMedia
                        image={props.image}
                        className={classes.media}/>
                    </Grid>
                    <Grid item xs={7}>
                        <CardContent>
                            <Typography variant="body1">
                                {parser.parse(props.title)}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </CardActionArea>
            </Link>
    )
}