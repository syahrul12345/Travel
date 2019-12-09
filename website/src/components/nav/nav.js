import React from 'react';
import {AppBar, Typography,Tabs,Tab} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';

import "./style.css"
const links = [
  {href:'/',label:'AIRWAITRESS'},
  { href:'/destinations',label:'DESTINATIONS'},
  { href:'/itenaries',label:'ITENARIES'},
  { href:'/attractions',label:'ATTRACTIONS'},
  { href: '/nightlife', label: 'NIGHTLIFE' },
  { href: '/food', label: 'GASTRONOMY' },
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})
export default function Nav() {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
      <Tabs
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          {links.map(({key,href,label}) => {
            return(
              <a href={href}>
                <Tab label={label}/>
              </a>
            )
          })}
          
      </Tabs>
      </div>
      </AppBar>
    </div>
    
  )
}
