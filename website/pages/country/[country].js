import {useRouter} from 'next/router';
import {getCountryInfo} from '../../src/utils/utils'
import {Grid} from '@material-ui/core'
import Head from 'next/head'
import CountryLayout from '../../src/layouts/country'
export default function CountryPage(props) {
    const router = useRouter()
    console.log(props.info[0].posts)
    return(
        <div>
            <CountryLayout>
                <Head>
                    <title>{router.query.country} - Airwaitress</title>
                </Head>
                <Grid container direction="column">
                    <Grid style={{position:'relative'}} id="topGrid" item align="center" xs={12}>
                        <img src={props.info[0].acf.background_image.sizes.large}/>
                        <h1 
                        style={{
                            position:"absolute",
                            top:'35%',
                            width:'100%',
                            height:'100%',
                            textAlign:"center",
                            zIndex:"100",
                            fontFamily:"Arial",
                            color:"white",
                        }}
                        variant="body2" 
                        component="p">
                            <span style={{backgroundColor:"rgba(255, 255, 255, 0.2)",fontSize:"50px"}}>{props.info[0].title.rendered}</span>
                        </h1>
                    </Grid>
                </Grid>
            </CountryLayout>
        </div>
    )
}

CountryPage.getInitialProps = async(context) => {
    const info = await getCountryInfo(context.query.country)
    return {
        info
    }
}