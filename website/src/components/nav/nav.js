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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Nav() {

  const classes = useStyles()
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? event.currentTarget : event.currentTarget);
    setOpenPopper(true)
  };

  const [openPopper,setOpenPopper] = React.useState(Boolean(anchorEl));
  const id = openPopper ? 'transitions-popper' : undefined;

  const anchorRef = React.useRef(null);
  

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleCloseDesktopPopper = event => {
    if (anchorEl && anchorEl.contains(event.currentTarget)) {
      return;
    }
    setOpenPopper(false)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return(
    <div style={{marginBlockEnd:'1vh'}}>
      <AppBar position="sticky">
      <div style={{
        position:"relative",
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
      <div id="navbar" style={{zIndex:'100'}} >
        <nav className="desktopMenu">
          <ul container justify="center" alignItems="center">
            {links.map(({ key, href, label }) => {
              if (label === 'TRAVEL') {
                // Return a select
                return (
                  <li item key={key}>
                    <Typography onClick={handleClick} style={{
                      marginBlockEnd:'5px'}}>
                      {label}
                    </Typography>
                    <Popper open={openPopper} anchorEl={anchorEl} placement="bottom" role={undefined} transition disablePortal>
                      {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                          <ClickAwayListener onClickAway={handleCloseDesktopPopper}>
                          <Card>
                            <CardContent>
                            <Link style={{color:'black',textAlign:'center'}} href={"/travel-guides"}>
                                <Typography className={classes.typography}> Travel Guides</Typography>
                            </Link>
                            <Link style={{color:'black',textAlign:'center'}} href={"/itineraries"}>
                                <Typography className={classes.typography}>Itineraries</Typography>
                            </Link>
                            </CardContent>
                          </Card>
                          </ClickAwayListener>
                        </Fade>
                      )}
                    </Popper>
                  </li>
                )
              }

              return (
                <li item key={key}>
                  <Link style={{color:'black',textAlign:'center'}} href={href}>
                    <Typography style={{
                      marginBlockEnd:'5px'}}>
                      {label}
                    </Typography>
                  </Link>
              </li>
              )
            })}
          </ul>
        </nav>
        
      </div>
      </AppBar>
      <div className="mobileMenu">
        <Grid 
        direction="row"
        justify="space-between"
        container>
          <Grid item>
            <a href="/">
                <img 
                  style={{
                    maxHeight:'35vh',
                    maxWidth:'35vw',
                    paddingLeft:'1vh',
                    }}
                  src="/static/images/smolidays-logo-1.png" 
                  alt="smolidays-logo"/>
              </a>
          </Grid>
          <Grid item>
              <Button
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              >
              <MenuIcon/>
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'top' ? 'top left' : 'top left' }}
                >
                  <Paper style={{marginRight:'50px',marginTop:'1%'}}>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        {links.map(({key,href,label}) => {
                          return(
                            <a className= "menuA" href={href}>
                              <MenuItem key={key} href={href} style={{fontFamily:'Melon Hunter'}}>{label}</MenuItem>
                            </a>
                          )
                        })} 
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Grid>
        </Grid>
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
    </div>
    
  )
}
