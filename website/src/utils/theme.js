import { createMuiTheme } from '@material-ui/core/styles'
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '"Helvetica Neue"',
    ].join(','),
  },
  palette: {
    primary:{
      main:'#ffffff'
    },
    secondary:{
      main:'#212121'
    }
  },
})

export default theme
