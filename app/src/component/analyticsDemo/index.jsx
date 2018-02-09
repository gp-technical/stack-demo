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
    const divStyle = { height: '200px', width: '100%', overflowY: 'auto', wordBreak: 'break-all'}

    const logDiv =
      <div style={divStyle} ref={(el) => { this.messages = el; }}>
        <ul>
          {this.props.log.map(i => <li>{i}</li>)}
        </ul>
        <div style={{ float:'left', clear: 'both' }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>

    // The innerScrollDiv must be rendered first, and only then, its inner elements are added
    // The reference container must exist before the the visibility-detectable items are rendered
    return (
      <components.Box>
        <h2>
          Feature: <i>Analytics demo</i>
        </h2>
        <div ref={el => this.innerScrollDiv = el} style={{...divStyle, height: '100px'}}>
          {this.state && this.state.visibleChildren}
        </div>
        {logDiv}
      </components.Box>
    )
  }
}

export default analyticsDemo
