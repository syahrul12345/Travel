import {Typography,Grid} from '@material-ui/core'
export default function Empty() {
    return(
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}>
            <Grid item xs={12}>
                <Typography variant="h6">
                   We're writing some cool content !
                </Typography>
            </Grid>
        </Grid>
    )
}