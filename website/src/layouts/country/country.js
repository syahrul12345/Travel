import Nav from '../../components/nav'

import { getThemeProps } from '@material-ui/styles'
export default function CountryLayout(props) {
    return(
        <div>
            <Nav/>
            {props.children}
        </div>
    )
}