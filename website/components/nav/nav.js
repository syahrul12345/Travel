import React from 'react';
import Link from 'next/Link'
//import { makeStyles } from '@material-ui/core/styles';
//import AppBar from '@material-ui/core/AppBar';
//import Toolbar from '@material-ui/core/Toolbar';
//import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
//import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';

const links = [
  { href:'/locations',label:'LOCATIONS'},
  { href:'/blog',label:'BLOG'},
  { href:'/team',label:'TEAM'},
  { href: 'https://zeit.co/now', label: 'ZEIT' },
  { href: 'https://github.com/zeit/next.js', label: 'GitHub' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})
//const useStyles = makeStyles(theme => ({
//  root: {
//    flexGrow: 1,
//  },
//  menuButton: {
//    marginRight: theme.spacing(2),
//  },
//  title: {
//    flexGrow: 1,
//  },
//}));
//export default function Nav() {
//  const classes = useStyles();
//  return(
//      <div className={classes.root}>
//      <AppBar position="static">
//        <Toolbar>
//          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//            <MenuIcon />
//          </IconButton>
//          <Typography variant="h6" className={classes.title}>
//            News
//          </Typography>
//          <Button color="inherit">Login</Button>
//        </Toolbar>
//      </AppBar>
//    </div>
//  )
//}


const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href='/'>
          <a>HOME</a>
        </Link>
      </li>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <a href={href}>{label}</a>
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
        padding-right:20%;
        padding-left:20%;
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
)

export default Nav
