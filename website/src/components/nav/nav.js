import React from 'react';
import {AppBar, Typography,Tabs,Tab} from '@material-ui/core'

import "./style.css"
const links = [
  {href:'/',label:'AIRWAITRESS'},
  { href:'/destinations',label:'DESTINATIONS'},
  { href:'/itineraries',label:'ITINERARIES'},
  { href:'/travelguides',label:'TRAVEL GUIDES'},
  { href: '/food', label: 'FOOD' },
  
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
    <div style={{marginBlockEnd:'1vh'}}>
      <AppBar color="primary">
        <nav id="desktopNav">
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
