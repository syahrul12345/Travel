import {useRouter} from 'next/router';
import Head from 'next/head'
import CountryLayout from '../../src/layouts/country'
export default function CountryPage() {
    const router = useRouter()
    return(
        <div>
            <CountryLayout>
                <Head>
                    <title>{router.query.country}</title>
                </Head>
                <h1>{router.query.country}</h1>
            </CountryLayout>
        </div>
    )
}