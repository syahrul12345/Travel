import {useRouter} from 'next/router'
import {getPostInfo} from '../../src/utils/utils'
import HtmlToReact from 'html-to-react'
import Head from 'next/head'
import Nav from '../../src/components/nav'
export default function Post(props) {
    const post = props.post
    //we need to parse the data
    const HtmlToReactParser = HtmlToReact.Parser
    const parser = new HtmlToReactParser()
    return(
        <div>
            <Head>
                <title>{post.title.rendered}</title>
            </Head>
            <Nav/>
            <div style={{marginLeft:'10%',marginRight:'10%'}}>
                {parser.parse(post.content.rendered)}
                {/* <style jsx>
                    {`
                    figure: {
                        margin:none;
                    }
                    `}
                </style> */}
            </div>
        </div>
    )
}

Post.getInitialProps = async(context) => {
    const path = context.asPath;
    const data = await getPostInfo(path)
    const post = data.post
    return {
        post
    }
}