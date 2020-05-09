import Nav from '../../components/nav'
import Head from 'next/head'
import Carousel from '../../components/carousel'
import Footer from '../../components/footer'
export default function HomeLayout(props) {
    return(
        <div>
            <Head>
                <title> Smolidays</title>
                <meta name="description" content="Travel blog - from the perspective of aircrew"/>
            </Head>
            <div style={{
            backgroundColor: 'white',
            position:"relative",
            display:'flex',
            justifyContent:'center'}}>
            <a href="/">
                <img 
                style={{
                    maxHeight:'20vh',
                    maxWidth:'20vw',
                    paddingTop:'2vh',
                    marginBottom:'1.5vh'}}
                src="/static/images/smolidays-logo-1.png" 
                alt="smolidays-logo"/>
            </a>
            </div>
            <Nav></Nav>
            {props.children}
            <Footer></Footer>
        </div>
    )
}