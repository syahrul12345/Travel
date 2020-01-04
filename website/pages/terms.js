import FooterLayout from '../src/layouts/footerpage'
import {getFooterInfo} from '../src/utils/utils'
export default function Terms(props) {
    return(
        <div>
            <FooterLayout content={props.content}/>
        </div>
    )
}
Terms.getInitialProps = async(context) => {
    const content = await getFooterInfo('terms-of-use')
    return{
        content
    }
}