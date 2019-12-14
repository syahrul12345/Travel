import {Card,CardActionArea,CardMedia,CardContent,Typography,makeStyles} from '@material-ui/core'
import './style.css'

export default function InfoCard(props){
    return(
                <CardContent style={{paddingBottom:'0px'}}>
                    {props.icon}
                    <Typography variant="h6">
                        {props.text}
                    </Typography>
                    <Typography
                    variant="body1"
                    className="contentExcerpt"
                    >
                       {props.data}
                    </Typography>
                </CardContent>
    )
}