import React from 'react';
import {AppBar, Typography,Tabs,Tab} from '@material-ui/core'

import "./style.css"
const links = [
  { href:'/destinations',label:'DESTINATIONS'},
  { href:'/travelguides',label:'TRAVEL GUIDES'},
  { href: '/food', label: 'FOOD' },
  {href:'/crewlife',label:'CREWLIFE'},
  
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

export default function Nav() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dummyVal,setVal] = React.useState(0)
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return(
    <div>
      <AppBar 
      position="relative"
      color="primary">
      <div style={{
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
        <nav id="desktopNav">
          <ul>
            {links.map(({ key, href, label }) => (
              <li key={key}>
                <a href={href}>
                  <p style={{
                    fontFamily:'Melon hunter',
                    fontSize:'30px',
                    marginBlockStart:'5px',
                    marginBlockEnd:'5px'}}>
                    <strong>{label}</strong>
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      <div className="mobileMenu">
      {/* <Tabs
          indicator
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          value={dummyVal}
          aria-label="scrollable force tabs example"
        >
          {links.map(({key,href,label}) => {
            return(
              <a href={href}>
                <Tab value={key} label={label}/>
              </a>
            )
          })}
          
      </Tabs> */}
      </div>
      </AppBar>
    </div>
    
  )
}
