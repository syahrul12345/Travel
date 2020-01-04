import FooterLayout from '../src/layouts/footerpage'
import {getFooterInfo} from '../src/utils/utils'
export default function Partner(props) {
    return(
        <div>
            <FooterLayout content={props.content}/>
        </div>
    )
}
Partner.getInitialProps = async(context) => {
    const content = await getFooterInfo('partner')
    return{
        content
    }
}