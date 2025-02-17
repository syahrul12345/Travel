import {getPostInfo} from '../../src/utils/utils'
import { makeStyles } from '@material-ui/core/styles';
import PostLayout from '../../src/layouts/posts'
const useStyles = makeStyles(theme => ({
    root: {
      ...theme.typography,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
    },
    bigAvatar: {
        height:60,
        width:60,
    }
  }));

export default function Post(props) {
    return(
        <PostLayout post={props.post}></PostLayout>
    )
}

Post.getInitialProps = async(context) => {
    const formatDate = (input) => {
        const d = new Date(input)
        const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
        ];
        const month = d.getMonth()
        const day = d.getDate()
        const year = d.getFullYear().toString().substr(2)
        return day + ' ' + monthNames[month] + ' 20' + year
    }
    const path = context.asPath;
    const data = await getPostInfo(path)
    const post = data.post
    post.date = formatDate(post.date)
    return {
        post
    }
}