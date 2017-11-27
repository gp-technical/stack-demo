import React from 'react'
import { connect } from 'react-redux'
import { components, services } from './loader'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Grid, Row, Col } from 'react-flexbox-grid/lib'
import { muiTheme } from './theme'
import styles from './index.scss'

class component extends React.PureComponent {
  render () {
    const { user, branding } = this.props

    return (
      <components.Loader show={!!user} branding={branding}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <components.App title="stack-demo" color={muiTheme.app.color} user={user} style={styles} />
            <Grid>
              <Row className={styles.main}>
                <Col xs={12} sm={12} md={8} lg={12}>
                  <components.hello />
                  <components.fetch />
                  <components.counter />
                  <components.errors />
                  <components.thunks />
                  <components.todos />
                  <components.gp />
                  <components.sphere />
                  <components.shopping />
                </Col>
              </Row>
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

export default connect(mapStateToProps)(component)
