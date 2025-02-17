import FooterLayout from '../src/layouts/footerpage'
import {getFooterInfo} from '../src/utils/utils'
export default function Privacy(props) {
    return(
        <div>
            <FooterLayout content={props.content}/>
        </div>
    )
}
Privacy.getInitialProps = async(context) => {
    const content = await getFooterInfo('privacy-policy')
    return{
        content
    }
}