import {Typography, Grid, Link} from '@material-ui/core'
const links = [
    { href: '/about', label: 'ABOUT' },
    { href: '/partner', label: 'PARTNER' },
    { href: '/contact', label: 'CONTACT' },
    { href:'/terms',label:'TERMS OF USE'},
    { href:'/privacy',label:'PRIVACY POLICY'},
  ].map(link => {
    link.key = `nav-link-${link.href}-${link.label}`
    return link
  })

export default function Footer(){
    return(
      <Grid container justify="space-between" style={{paddingLeft:'10%',paddingRight:'10%',marginTop:'4vh',marginBottom:'3vh'}}>
          <Grid item xs={6}>
              <Grid container>
                  <Grid item>
                      <Typography variant="subtitle1" style={{textAlign:"center"}}>© Copyright 2020 - The Layover.Life <strong>All Rights Reserved</strong></Typography>
                  </Grid>
              </Grid>
          </Grid>
          <Grid item xs={6}>
              <Grid container justify="space-between" alignItems="center">
                  {links.map(({ key, href, label }) => (
                  <Grid key={key}>
                      <Link style={{color:'black'}} href={href}>
                        <Typography
                        variant="subtitle1">
                            {label}
                        </Typography>
                      </Link>
                  </Grid>
                  ))}
              </Grid>
          </Grid>
      </Grid>
    )
    
}