import React from 'react';
import {AppBar, 
  Typography, 
  Grid,
  Button,
  Paper,
  MenuList, 
  MenuItem,
  Popper,
  Grow,
  ClickAwayListener, 
  Link,
  Fade,
  Card,
  CardContent,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu';
import "./style.css"
const links = [
  { href:'/travel',label:'TRAVEL'},
  { href:'/lifestyle',label:'LIFESTYLE'},
  { href: '/food', label: 'FOOD' },
  {href:'/cabin-life',label:'CABIN LIFE'},
  
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})


export default class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      offsetTop:0,
      appbar: undefined,
      titleGrid: undefined,
    }
  }
  
  handleScroll = () => {
    const { offsetTop, navbar, titleGrid } = this.state;
    if (window.pageYOffset > offsetTop) {
      navbar.classList.add("sticky")
      
    }else{
      navbar.classList.remove("sticky")
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    const navbar = document.getElementById("navbar");
    const titleGrid = document.getElementsByClassName("titleGrid")
    const sticky = navbar.offsetTop;
    this.setState({
      offsetTop: sticky,
      navbar,
      titleGrid,
    })
  }
  render() {
    return(
      
        <div id="navbar" >
          <nav className="desktopMenu">
            <ul>
              {links.map(({ key, href, label }) => {
                return (
                  <li key={key}>
                    <Button style={{color:'black',textAlign:'center'}} href={href}>
                      <Typography style={{
                        marginBlockEnd:'5px'}}>
                        {label}
                      </Typography>
                    </Button>
                </li>
                )
              })}
            </ul>
          </nav>
          
        </div>
      // </div>
    )
  }
}
