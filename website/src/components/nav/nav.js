import React from 'react';
import Link from 'next/link'
import {Grid,AppBar, Typography} from '@material-ui/core'
import { fontFamily, fontWeight } from '@material-ui/system';
const links = [
  { href:'/destinations',label:'DESTINATIONS'},
  { href:'/activites',label:'ACTIVITIES'},
  { href:'/places',label:'ATTRACTIONS'},
  { href: '/food', label: 'FOOD' },
  { href: '/Nightlife', label: 'NIGHTLIFE' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = () => (
  <div>
    <div className="logo" style={{margin:'0 auto',display:'block',textAlign:'center'}}>
        
        <Link href= "/" 
        >
          <Typography variant="h4" style={{textDecoration:'none'}}>AIRWAITRESS</Typography>
        </Link>

        
    </div>
    <nav>
      <ul>
        {links.map(({ key, href, label }) => (
          <li key={key}>
            <a href={href}>
              <Typography
              variant="h5">
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
          display:container
        }
        nav > ul {
            padding:0
        }
        ul {
          display: flex;
          padding-inline-start:0px;
          justify-content:space-between;
        }
        
        li {
          flex:1;
          display: flex;
          justify-content:center
        }
        a {
          color: black;
          text-decoration: none;
          font-size: 20px;
          font-weight: 400;
          letter-spacing:2px;
          font-family: Montserrat, sans-serif
        }
      `}</style>
    </nav>
  </div>
)

export default Nav
