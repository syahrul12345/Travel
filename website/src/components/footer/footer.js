import {Typography, BottomNavigation, BottomNavigationAction} from '@material-ui/core'
const links = [
    { href: '/about', label: 'ABOUT' },
    { href: '/partner', label: 'PARTNER' },
    { href: '/contact', label: 'CONTACT' },
    { href:'/terms',label:'TERMS OF USE'},
    { href:'/privacy',label:'PRIVACY POLICY'},
  ].map(link => {
    link.key = `nav-link-${link.href}-${link.label}`
    return link
  })

export default function Footer(){
    return(
            <nav style={{marginRight:'20%',marginLeft:'20%',marginTop:'2vh'}}>
                <Typography variant="subtitle1" style={{textAlign:"center"}}>© Copyright 2020 - The Layover.Life</Typography>
                <Typography variant="subtitle2" style={{textAlign:"center"}}>All Rights Reserved.</Typography>
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
                li > a {
                color: black;
                text-decoration: none;
                font-weight: 400;
                letter-spacing:2px;
                }
            `}</style>
            
            </nav>
    )
    
}