import {Card,CardActionArea,CardMedia,CardContent,Typography,makeStyles} from '@material-ui/core'
import './style.css'

export default function InfoCard(props){
    return(
            <CardActionArea>
                <CardContent>
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
            </CardActionArea>
    )
}