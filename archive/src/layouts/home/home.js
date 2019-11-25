import Nav from '../../components/nav'
import Carousel from '../../components/carousel'
export default function HomeLayout(props) {
    return(
        <div>
           <Nav></Nav>
           <Carousel data={props.data}/>
           {props.children}
        </div>
    )
}