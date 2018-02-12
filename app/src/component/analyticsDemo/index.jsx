import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import { actionHub, services, components } from '../../loader'
import { visibilityDetector } from '@gp-technical/stack-pack-app'

@visibilityDetector({content:'props.name', container: 'analyticsInnerContainer'})
class VisibilityDetected extends React.PureComponent {
  render() {
    return <RaisedButton label={'Visibility detected by name: ' + this.props.name} />
  }
}

const mapStateToProps = state => ({
  log: services.analyticsDemo.selector.getLog(state)
})

const mapDispatchToProps = dispatch => { return {} }

@connect(mapStateToProps, mapDispatchToProps)
class analyticsDemo extends React.PureComponent {

  // The innerScrollDiv must be rendered first, and only then, its inner elements are added
  // The reference container must exist int the page DOM before the the visibility-detectable items are rendered
  componentDidMount() {
    var elements = [
      <VisibilityDetected name='upper' visibilityContainer={this.innerScrollDiv}/>,
      <div style={{height: '150px'}}></div>,
      <VisibilityDetected name='lower'  visibilityContainer={this.innerScrollDiv}/>
    ]
    this.setState({visibleChildren: elements})
  }

  componentDidUpdate () {
    this.messages.scrollTop = this.messages.scrollHeight
  }

  render () {
    const terminalStyle = {
      height: '200px',
      width: '100%',
      overflowY: 'auto',
      wordBreak: 'break-all',
      margin: 0,
      padding: '5px',
      listStyle: 'none',
      background: '#141414',
      color: 'white',
      font: '0.8em',
      lineHeight: '1.6em',
      borderBottomRightRadius: '3px',
      borderBottomLeftRadius: '3px'
    }

    const actionNameStyle = {
      color: '#45D40C'
    }

    const logDiv =
      <div style={terminalStyle} ref={(el) => { this.messages = el; }}>
        <ul style={{listStyleType: 'none'}}>
          {this.props.log.map(i => (
            <li>
              <span style={actionNameStyle}>{i.type} :: </span>
              <span>{JSON.stringify(i.data)}</span>
            </li>
          ))}
        </ul>
        <div style={{ float:'left', clear: 'both' }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>

    return (
      <components.Box>
        <h2>
          Feature: <i>Analytics demo</i>
        </h2>
        <div ref={el => this.innerScrollDiv = el} style={{height: '100px', overflowY: 'auto'}}>
          {this.state && this.state.visibleChildren}
        </div>
        {logDiv}
      </components.Box>
    )
  }
}

export default analyticsDemo
