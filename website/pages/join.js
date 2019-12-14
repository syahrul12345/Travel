import FooterLayout from '../src/layouts/footerpage'
export default function Join(props) {
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
Join.getInitialProps = (context) => {
    const title = context.pathname.substring(1)[0].toUpperCase() + context.pathname.substring(2)
    const blurb1 = "Looking to join the team?"
    const blurb2 = "We're looking for interns and fulltimers with experience in content creation."
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