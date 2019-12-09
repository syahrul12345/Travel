import React from 'react';
import {AppBar, Typography,Grid,MenuItem,Menu, IconButton} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LeftArrow from '@material-ui/icons/ArrowBack'
import RightArrow  from '@material-ui/icons/ArrowForward'
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
          <IconButton className="leftArrow">
            <LeftArrow/>
          </IconButton>
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
          <IconButton className="rightArrow">
            <RightArrow/>
          </IconButton>
        </nav>
      </AppBar>
    </div>
    
  )
}
