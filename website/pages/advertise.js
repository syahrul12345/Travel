import FooterLayout from '../src/layouts/footerpage'
export default function Advertise(props) {
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
Advertise.getInitialProps = (context) => {
    const title = context.pathname.substring(1)[0].toUpperCase() + context.pathname.substring(2)
    const blurb1 = "Our Advertising Services"
    const blurb2 = "Leverage on our high quality article and content creation professionals"
    const content1 = "Email: hello@airwaitress.life"
    const content2 = "Phone: +65 91892107"
    return{
        title,
        blurb1,
        blurb2,
        content1,
        content2
    }
}