import FooterLayout from '../src/layouts/footerpage'
export default function Privacy(props) {
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
Privacy.getInitialProps = (context) => {
    const title = context.pathname.substring(1)[0].toUpperCase() + context.pathname.substring(2)
    const blurb1 = "Airwaitress.life takes your privacy very seriously. "
    const blurb2 = "We ask that you read this privacy policy (the “Policy”) carefully as it contains important information about what to expect when you visit Airwairess.life"
    const content1 = "Airwaitress.life does not use any advertistment or cookies to intrusively track your personal data. We only use our google analytics tool to monitor our website traffic and statistics."
    const content2 = "We will refrain from collecting your data and storing them indefinately for longer than necessary."
    return{
        title,
        blurb1,
        blurb2,
        content1,
        content2
    }
}