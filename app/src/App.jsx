import React from 'react'
import { connect } from 'react-redux'
import { components, services } from './loader'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { actions } from '@gp-technical/stack-pack-app'
import { muiTheme } from './theme'
import styles from './index.scss'

const styling = {
  paddingLeft: '75px',
  paddingRight: '75px'
}

class component extends React.PureComponent {
  componentDidMount() {
    window.addEventListener('beforeunload', () => {
      this.props.disconnect()
    })
  }
  render() {
    const { user, branding } = this.props
    return (
      <components.Loader show={!!user} branding={branding}>
        <MuiThemeProvider theme={muiTheme}>
          <CssBaseline />
          <div>
            <components.App
              title={branding.appName}
              color={muiTheme.app.color}
              user={user}
              style={styles}
            />
            <Grid container style={styling}>
              <Grid item className={styles.main} xs={12} sm={12} md={8} lg={12}>
                <components.hello />
                <components.fetch />
                <components.messages />
                <components.counter />
                <components.errors />
                <components.thunks />
                <components.gp />
                <components.shopping />
                <components.sharedToDo />
              </Grid>
            </Grid>
          </div>
        </MuiThemeProvider>
      </components.Loader>
    )
  }
}

const mapStateToProps = state => ({
  branding: services.branding.selector.getBranding(state),
  user: services.auth.selector.getProfile(state)
})

const mapDispatchToProps = dispatch => ({
  disconnect: () => dispatch(actions.disconnect())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)
