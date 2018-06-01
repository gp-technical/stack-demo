import { createMuiTheme } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import blueGrey from '@material-ui/core/colors/blueGrey'
import indigo from '@material-ui/core/colors/indigo'
import grey from '@material-ui/core/colors/grey'
import common from '@material-ui/core/colors/common'
import red from '@material-ui/core/colors/red'
const blueGrey600 = blueGrey['600']
const blueGrey50 = blueGrey['50']
const indigo800 = indigo['800']
const grey300 = grey['300']
const grey400 = grey['400']
const indigo100 = indigo['100']
const white = common.white
const darkBlack = 'rgba(0, 0, 0, 0.87)'
const fullBlack = 'rgba(0, 0, 0, 1)'
const red700 = red['700']

/**
 * TODO Values below are taken from:
 * https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createTypography.js
 * and will do until I can work out how to do this in a better way.
 */
const fontWeightMedium = 500
const fontWeightNormal = 400

const muiTheme = createMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: indigo800,
    primary2Color: red700,
    primary3Color: grey400,
    accent1Color: red700,
    accent2Color: indigo100,
    accent3Color: indigo100,
    textColor: blueGrey600,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: indigo800,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack
  },
  app: {
    height: 80,
    textColor: white
  },
  tabs: {
    backgroundColor: blueGrey50,
    textColor: blueGrey600,
    primary1Color: white,
    selectedTextColor: blueGrey600
  },
  raisedButton: {
    fontSize: 14,
    fontWeight: fontWeightMedium
  },
  buttonReversed: {
    backgroundColor: white,
    color: blueGrey600
  },
  headers: {
    headerTitle: {
      fontSize: 18,
      padding: 0,
      margin: 0,
      marginBottom: 5,
      fontWeight: fontWeightMedium,
      color: blueGrey600
    },
    subHeaderTitle: {
      fontSize: 14,
      padding: 0,
      margin: 0,
      marginTop: 5,
      fontWeight: fontWeightNormal
    }
  },
  containerStyle: {
    padding: 15,
    marginBottom: 20
  },
  stepStyle: {
    label: {
      paddingLeft: 0
    },
    icon: {
      color: indigo800,
      backgroundColor: white
    },
    content: {
      marginLeft: 11
    }
  },
  stepCompletedStyle: {
    label: {
      paddingLeft: 0,
      color: indigo800
    },
    icon: {
      color: white,
      backgroundColor: indigo800
    }
  }
})

export { muiTheme }
