import FooterLayout from '../src/layouts/footerpage'
export default function About(props) {
    return(
        <div>
            <FooterLayout 
            title={props.title}
            blurb1={props.blurb1}
            blurb2={props.blurb2}
            content1={props.content1}
            content2={props.content2}/>
        </div>
    )
}
About.getInitialProps = (context) => {
    const title = context.pathname.substring(1)[0].toUpperCase() + context.pathname.substring(2)
    const blurb1 = "What are we?"
    const blurb2 = "We're trying to give you unbiased travel content - all from the perspectives of air crew from Singapore"
    const content1 = "If you're an aircrew member and would like to contribute to our content creation process, drop us a message."
    const content2 = "Email: hello@airwaitress.life"
    return{
        title,
        blurb1,
        blurb2,
        content1,
        content2
    }
}