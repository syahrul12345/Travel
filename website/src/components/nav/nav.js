import React from 'react';
import Link from 'next/link'
import {Grid,AppBar, Typography} from '@material-ui/core'
import { fontFamily, fontWeight } from '@material-ui/system';
const links = [
  {href:'/',label:'AIRWAITRESS'},
  { href:'/destinations',label:'DESTINATIONS'},
  { href:'/activites',label:'ACTIVITIES'},
  { href:'/places',label:'ATTRACTIONS'},
  { href: '/Nightlife', label: 'NIGHTLIFE' },
  { href: '/food', label: 'GASTRONOMY' },
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = () => (
  
  <div style={{marginBlockEnd:'10vh'}}>
    <AppBar color="primary">
      <nav style={{marginRight:'20%',marginLeft:'20%'}}>
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
          display:container
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
          font-family: Montserrat, sans-serif
        }
      `}</style>
    </nav>
    </AppBar>
  </div>
  
)

export default Nav
