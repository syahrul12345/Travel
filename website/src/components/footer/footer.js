import {Typography, BottomNavigation, BottomNavigationAction} from '@material-ui/core'
const links = [
    { href:'/join',label:'JOIN US'},
    { href: '/contact', label: 'CONTACT US' },
    { href: '/advertise', label: 'ADVERTISE' },
    { href: '/about', label: 'ABOUT' },
    { href:'/privacy',label:'PRIVACY POLICY'},
    { href:'/terms',label:'TERMS'},
  ].map(link => {
    link.key = `nav-link-${link.href}-${link.label}`
    return link
  })

export default function Footer(){
    return(
            <nav style={{marginRight:'20%',marginLeft:'20%',marginTop:'2vh'}}>
            <ul>
                {links.map(({ key, href, label }) => (
                <li key={key}>
                    <a href={href}>
                    <Typography
                    variant="body2">
                        {label}
                    </Typography>
                    </a>
                </li>
                ))}
            </ul>
            <style jsx>{`
                :global(body) {
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
                    Helvetica, sans-serif;
                }
                nav {
                display:container !important
                }
                nav > ul {
                    padding:0;
                    margin-left:20%:
                }
                ul {
                display: flex;
                padding-inline-start:0px;
                }
                
                li {
                flex:1;
                display: flex;
                justify-content:space-evenly;
                }
                a {
                color: black;
                text-decoration: none;
                font-weight: 400;
                letter-spacing:2px;
                }
            `}</style>
            </nav>
    )
    
}