import React from 'react';

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
    // const titleGrid = document.getElementsByClassName("titleGrid")
    const sticky = navbar.offsetTop;
    this.setState({
      offsetTop: sticky,
      navbar,
    })
  }

  handleScroll = () => {
    const { offsetTop, navbar } = this.state;
    if (window.pageYOffset > offsetTop) {
      navbar.classList.add("sticky")
      
    }else{
      navbar.classList.remove("sticky")
    }
  }


  

  render() {
    return(
      
        <div id="navbar" >
          <nav className="desktopMenu">
            <ul>
              {links.map(({ key, href, label }) => {
                return (
                  <li key={key}>
                    <CustomButton href={href} label={label}/>
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
