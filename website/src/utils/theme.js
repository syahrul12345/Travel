import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '"Helvetica Neue"',
    ].join(','),
  },
  palette: {
    primary:{
      main:'#FFFFFF',
    },
    secondary:{
      main:'#E2E2D7'
    },
    background: {
      default: "#FFFFFF"
    },
    tertiary: {
      main: '#000000'
    }
  },
})

// Set custom sizing for subtitle 2
theme.typography.subtitle2.fontSize = '0.7rem'
export default theme
