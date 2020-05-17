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
      main:'#EEDDD1'
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
