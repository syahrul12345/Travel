import Nav from '../../components/nav'
import Footer from '../../components/footer'
export default function CountryLayout(props) {
    return(
        <div>
            <Nav/>
            {props.children}
            <Footer/>
        </div>
    )
}