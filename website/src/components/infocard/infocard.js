import {Card,CardActionArea,CardMedia,CardContent,Typography,makeStyles} from '@material-ui/core'
const useStyles = makeStyles({
    media: {
        height:'10vh'
    }
})

export default function InfoCard(props){
    const classes = useStyles();
    return(
            <CardActionArea>
                <CardContent>
                    {props.icon}
                    <Typography variant="body1">
                        {props.text}
                    </Typography>
                    <Typography variant="body2">
                       {props.data}
                    </Typography>
                </CardContent>
            </CardActionArea>
    )
}