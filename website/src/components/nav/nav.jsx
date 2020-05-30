import React from 'react';
import { Grid, } from '@material-ui/core';
import SearchButton from './searchbutton';
import CustomButton from './button';
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
    }
  }
  
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    const navbar = document.getElementById("navbar");
    // Remove this if image is above
    navbar.classList.add("sticky")
    // const titleGrid = document.getElementsByClassName("titleGrid")
    const sticky = navbar.offsetTop;
    this.setState({
      offsetTop: sticky,
      navbar,
    })
  }

  handleScroll = () => {
    // const { offsetTop, navbar } = this.state;
    // if (window.pageYOffset > 0) {
    //   navbar.classList.add("sticky")
      
    // }else{
    //   navbar.classList.remove("sticky")
    // }
  }

  render() {
    return(
        <div id="navbar" style={{backgroundColor:'#EEDDD1'}}>
          <nav className="desktopMenu" style={{paddingLeft:'10%'}}>
            <Grid container>
              <Grid item xs={2}>
                <a href="/">
                  <img 
                  style={{
                      maxWidth:'10vw',
                      paddingTop:'2vh',
                      marginBottom:'1.5vh'}}
                  src="/static/images/smolidays-logo-1.png" 
                  alt="smolidays-logo"/>
                </a>
              </Grid>
              <Grid item xs={10}>
                <Grid 
                container 
                spacing={2}
                align="center"
                justify="center"
                alignContent="center"
                alignItems="center"
                style={{minHeight:'13vh'}}>
                  {links.map(({ key, href, label }) => {
                    return (
                      <Grid item xs={2} key={key}>
                        <CustomButton href={href} label={label}/>
                      </Grid>
                    )
                  })}
                  <Grid item xs={2} key="searchButton">
                    <SearchButton/>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </nav>
        </div>
      // </div>
    )
  }
}
