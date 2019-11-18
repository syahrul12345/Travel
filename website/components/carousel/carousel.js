import {Grid,Card,CardContent,makeStyles} from '@material-ui/core'
const useStyles = makeStyles({
  grid: {
    paddingRight:'20%',
    paddingLeft:'20%'
  }
})


export default function Carousel() {
  let styles = {
    paddingRight:'20%',
    paddingLeft:'20%',
  }
  const classes = useStyles();
  return(
    <div>
      <Grid container spacing={1} className={classes.grid}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <p> This is a travel Card </p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
