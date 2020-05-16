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
    },
    highlight1: {
      main: '#E2E2D7'
    }
  },
})

// Set custom sizing for subtitle 2
theme.typography.subtitle2.fontSize = '0.7rem'
export default theme
