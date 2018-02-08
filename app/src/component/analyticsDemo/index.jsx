import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import { actionHub, services, components } from '../../loader'
import { visibilityDetector } from '@gp-technical/stack-pack-app'

@visibilityDetector("props.name")
class VisibilityDetected extends React.PureComponent {
  render() {
    return <RaisedButton label={"Visibility detected by name: " + this.props.name} />
  }
}

const mapStateToProps = state => ({
  log: services.analyticsDemo.selector.getLog(state)
})

const mapDispatchToProps = dispatch => ({
  //  openDialog: () => dispatch(actionHub.DIALOG_SIMPLE_OPEN_DIALOG()),
  //  closeDialog: () => dispatch(actionHub.DIALOG_SIMPLE_CLOSE_DIALOG()),
  //  delete: () => dispatch(actionHub.DIALOG_SIMPLE_DELETE()),
  //  submit: () => dispatch(actionHub.DIALOG_SIMPLE_SUBMIT())
})

@connect(mapStateToProps, mapDispatchToProps)
class analyticsDemo extends React.PureComponent {

  componentDidUpdate () {
    this.messages.scrollTop = this.messages.scrollHeight
  }

  render () {
    const divStyle = { height: '200px', width: '100%', overflowY: "auto", wordBreak: "break-all"}

    const logDiv =
      <div style={divStyle} ref={(el) => { this.messages = el; }}>
        <ul>
          {this.props.log.map(i => <li>{i}</li>)}
        </ul>
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>

    return (
      <components.Box>
        <h2>
          Feature: <i>Analytics demo</i>
        </h2>
        <VisibilityDetected name="upper" />
        {logDiv}
        <VisibilityDetected name="lower" />
      </components.Box>
    )
  }
}

export default analyticsDemo
