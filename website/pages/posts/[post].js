import {getPostInfo} from '../../src/utils/utils'
import PostLayout from '../../src/layouts/posts'
export default function Post(props) {
    return(
        <PostLayout post={props.post}></PostLayout>
    )
}

Post.getInitialProps = async(context) => {
    const formatDate = (input) => {
        const d = new Date(input)
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        const month = d.getMonth()
        const day = d.getDate()
        const year = d.getFullYear().toString().substr(2)
        return day + ' ' + monthNames[month] + ' ' + year
    }
    const path = context.asPath;
    const res = await Promise.all([getPostInfo(path)])
    const data = await res[0]
    const post = data.post
    post.date = formatDate(post.date)
    return {
        post
    }
}