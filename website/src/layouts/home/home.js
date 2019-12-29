import Nav from '../../components/nav'
import Head from 'next/Head'
import Carousel from '../../components/carousel'
import Footer from '../../components/footer'
export default function HomeLayout(props) {
    return(
        <div>
            <Head>
                <title> The Layover Life</title>
                <meta name="description" content="Travel blog - from the perspective of aircrew"/>
            </Head>
            <Nav></Nav>
            <Carousel data={props.data}/>
            {props.children}
            <Footer></Footer>
        </div>
    )
}