import FooterLayout from '../src/layouts/footerpage'
import {getFooterInfo} from '../src/utils/utils'
export default function About(props) {
    return(
        <div>
            <FooterLayout content={props.content}/>
        </div>
    )
}
About.getInitialProps = async(context) => {
    const content = await getFooterInfo('about')
    return{
        content
    }
}