import FooterLayout from '../src/layouts/footerpage'
export default function Contact(props) {
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
Contact.getInitialProps = (context) => {
    const title = context.pathname.substring(1)[0].toUpperCase() + context.pathname.substring(2)
    const blurb1 = "Dying to talk to us? Thinking of collaboration?"
    const blurb2 = "Drop us a message"
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