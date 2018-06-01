import getMuiTheme from '@material-ui/core/styles/getMuiTheme'
import typography from '@material-ui/core/styles/typography'
import { fade } from '@material-ui/core/utils/colorManipulator'
import {
  blueGrey600,
  blueGrey50,
  indigo800,
  grey300,
  grey400,
  Indigo100,
  white,
  darkBlack,
  fullBlack,
  red700
} from '@material-ui/core/styles/colors'

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: indigo800,
    primary2Color: red700,
    primary3Color: grey400,
    accent1Color: red700,
    accent2Color: Indigo100,
    accent3Color: Indigo100,
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
    fontWeight: typography.fontWeightMedium
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
      fontWeight: typography.fontWeightMedium,
      color: blueGrey600
    },
    subHeaderTitle: {
      fontSize: 14,
      padding: 0,
      margin: 0,
      marginTop: 5,
      fontWeight: typography.fontWeightNormal
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
