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
      <Grid container justify="space-between" style={{marginTop:'5vh', backgroundColor:'rgba(0, 0, 0, 0.10)', paddingLeft:'10%',paddingRight:'10%',paddingTop:'2vh',paddingBottom:'2vh'}}>
          <Grid item xs={6}>
              <Grid container>
                  <Grid item>
                      <Typography variant="subtitle2" style={{textAlign:"center"}}>© Copyright 2020 - Smolidays. All Rights Reserved </Typography>
                  </Grid>
              </Grid>
          </Grid>
          <Grid item xs={6}>
              <Grid container justify="space-between" alignItems="center">
                  {links.map(({ key, href, label }) => (
                  <Grid key={key}>
                      <Link style={{color:'black'}} href={href}>
                        <Typography
                        variant="subtitle2">
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