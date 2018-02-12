import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import { actionHub, services, components } from '../../loader'
import { visibilityDetector } from '@gp-technical/stack-pack-app'

@visibilityDetector({content:'props.name', container: 'analyticsInnerContainer'})
class VisibilityDetected extends React.PureComponent {
  render() {
    const visibleDivStyle = {
      backgroundColor: '#4CAF50',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      padding: '15px 32px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px'
    }

    console.log(this.props)
    const onDivClick = () => {
      this.props.dummyAction(this.props.name)
      return false
    }

    // This element is also clickable, due to its class name (click-check)
    // Check the 'setupClientAnalytics' call in 'src/index.jsx', with the class selector
    // Clicking analytics also work by default with interactive elements such as
    //   button, a, inputs, among others. check stack-pak-app for complete list
    return <div style={visibleDivStyle}
      className="click-check"
      onClick={onDivClick}
      data-analytics-name={this.props.name}>
      {this.props.name}
    </div>
  }
}

const mapStateToProps = state => ({
  log: services.analyticsDemo.selector.getLog(state)
})

const mapDispatchToProps = dispatch => ({
  dummyAction: (data) => dispatch(actionHub.ANALYTICS_DEMO_DUMMY_ACTION(data))
})

@connect(mapStateToProps, mapDispatchToProps)
class analyticsDemo extends React.PureComponent {

  // The innerScrollDiv must be rendered first, and only then, its inner elements are added
  // The reference container must exist int the page DOM before the the visibility-detectable items are rendered
  componentDidMount() {
    const emptyDivStyle = {
      height: '160px',
      display: 'table'
    }
    const emptyChildDivStyle = {
      verticalAlign: 'middle',
      textAlign: 'center',
      display: 'table-cell',
    }
    var elements = [
      <VisibilityDetected
        name='upper'
        dummyAction={this.props.dummyAction}
        visibilityContainer={this.innerScrollDiv} />,
      <div style={emptyDivStyle}>
        <div style={emptyChildDivStyle}>Empty</div>
      </div>,
      <VisibilityDetected
        name='lower'
        dummyAction={this.props.dummyAction}
        visibilityContainer={this.innerScrollDiv} />
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

    const innerScrollDivStyle = {
      display: 'inline-block',
      borderStyle: 'solid',
      margin: '0 1.5em 1.5em 40%',
      padding: '10px',
      height: '100px',
      overflowY: 'auto'
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
        <div ref={el => this.innerScrollDiv = el} style={innerScrollDivStyle}>
          {this.state && this.state.visibleChildren}
        </div>
        {logDiv}
      </components.Box>
    )
  }
}

export default analyticsDemo
