import Nav from '../../components/nav'
import Carousel from '../../components/carousel'
import Footer from '../../components/footer'
export default function HomeLayout(props) {
    return(
        <div>
           <Nav></Nav>
           <Carousel data={props.data}/>
           {props.children}
           <Footer></Footer>
        </div>
    )
}