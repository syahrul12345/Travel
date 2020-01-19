import {Grid, Typography} from '@material-ui/core'
import BlogCards from '../blogcards'
export default function Related(props) {
    return(
        <>
            {props.related != undefined && props.related.length != 0 ?
                <Grid
                container
                direction="row"
                spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" style={{textAlign:'center'}}>
                            Related Posts
                        </Typography>
                    </Grid>
                    {props.related.map((post) => {
                        return(
                            <Grid key={post.title} item xs={12} md={4}>
                            <BlogCards title={post.title} image={post.image} link={post.link} height='20vh'/>
                            </Grid>
                        )
                    })}
                </Grid> 
            : <></>}
        </>
    )
}