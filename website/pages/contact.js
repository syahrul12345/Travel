import FooterLayout from '../src/layouts/footerpage'
import {getFooterInfo} from '../src/utils/utils'
export default function Contact(props) {
    return(
        <div>
            <FooterLayout content={props.content}/>
        </div>
    )
}
Contact.getInitialProps = async(context) => {
    const content = await getFooterInfo('contact')
    return{
        content
    }
}