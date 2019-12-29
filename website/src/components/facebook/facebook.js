import {FacebookProvider,Comments} from 'react-facebook'

export default function Facebook() {
    return(
        <FacebookProvider appId="1028885374122493">
            <Comments href="http://www.facebook.com" />
        </FacebookProvider>
    )
}