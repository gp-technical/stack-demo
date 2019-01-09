import React from 'react'
import { connect } from 'react-redux'
import Divider from '@material-ui/core/Divider'
import { actionHub, services, components } from '../../loader'
// import { visibilityDetector } from '@gp-technical/stack-pack-app'

// @visibilityDetector({ content: 'props.name' })
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
      width: '200px',
      fontSize: '16px'
    }

    const onDivClick = () => {
      this.props.dummyAction(this.props.name)
      return false
    }

    return (
      <div
        style={visibleDivStyle}
        className="click-check"
        onClick={onDivClick}
        data-analytics-name={this.props.name}
      >
        {this.props.name}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  log: services.analyticsDemo.selector.getLog(state)
})

const mapDispatchToProps = dispatch => ({
  dummyAction: data => dispatch(actionHub.ANALYTICS_DEMO_DUMMY_ACTION(data))
})

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class analyticsDemo extends React.PureComponent {
  componentDidMount() {
    const emptyDivStyle = {
      height: '320px',
      width: '100%',
      display: 'table'
    }
    const emptyChildDivStyle = {
      verticalAlign: 'middle',
      textAlign: 'center',
      display: 'table-cell'
    }
    var elements = [
      <VisibilityDetected
        name="upper"
        dummyAction={this.props.dummyAction}
        visibilityContainer={this.innerScrollDiv}
        key={1}
      />,
      <div style={emptyDivStyle} key={2}>
        <div style={emptyChildDivStyle}>Empty</div>
      </div>,
      <VisibilityDetected
        name="lower"
        dummyAction={this.props.dummyAction}
        visibilityContainer={this.innerScrollDiv}
        key={3}
      />
    ]
    this.setState({ visibleChildren: elements })
  }

  componentDidUpdate() {
    this.messages.scrollTop = this.messages.scrollHeight
  }

  renderDocumentation() {
    return (
      <div>
        <h3>Setup</h3>
        <p>setupClientAnalytics(config)</p>
        <h4>Config object</h4>
        <p>
          <b>store </b>
          Mandatory. Needed to dispatch actions
        </p>
        <p>
          <b>container </b>
          Visibility detection needs a reference container, with fixed size, to check if the target
          component is visible inside it. Components may override (see below).
        </p>
        <p>
          In this example, &quot;innerScrollDiv&quot; (react ref name), used as the container, and
          must be rendered first, in render(), and after that, componentDidMount() will run and add
          the visible inner components that are visibility-detectable
        </p>
        <p>
          <b>clickingExtraSelectors </b>
          Extra selectors to capture clicks, by tag name or by css class (using dot-className,
          .classname)
        </p>
        <p>
          It defaults to interactive tags, like buttons, links, inputs. Check{' '}
          <i> defaultSelectors</i> in stack-pack-app <i> component/analytics/clickDetector.js</i>{' '}
          for a complete list.
        </p>
        <p>
          <b>enableClickingAnalytics </b>
          used to disable clicking analytics, if needed. Defaults to <i>true</i> (enabled).
        </p>

        <Divider />

        <h3>Clicking Analytics</h3>
        <p>
          Click analytics is, by default, set-up to capture clicks in interactive items, such as
          buttons, links, inputs, among others (check stack-pak-app for complete list).
        </p>
        <p>
          In this example, the elements labeled <i>upper</i> and <i>lower</i> clicks are captured
          because their class name (<i>click-check</i>) was added to the <i>setupClientAnalytics</i>{' '}
          call in <i>src/index.jsx</i> file
        </p>
        <Divider />

        <h3>Visibility Analytics</h3>
        <p>
          Visibility analytics is enabled with an annotation to teh component to track, using an
          annotation: <i> @visibilityDetector(config) </i>
        </p>
        <h4>config object</h4>
        <p>
          <b>container </b>
          Override global level container, configured in <i> setupClientAnalytics</i>
        </p>
        <p>
          <b>content </b>
          Additional content added to the payload
        </p>
        <p>
          May also be overriden by a the <i> visibilityContainer</i> prop in component instances,
          used in this example
        </p>

        <p>
          <b>ignoreInnerDiv </b>
          The VisibilitySensor library requires only one component to inside it to be observed
          correctly. One div is added, as a wrapper, to make sure only one element is inside the
          sensor.
        </p>
        <p>
          Defaults to <i> false</i>. Changing to <i> true </i> is not recommended.
        </p>

        <Divider />
      </div>
    )
  }

  render() {
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
      height: '200px',
      overflowY: 'auto'
    }

    const actionNameStyle = {
      color: '#45D40C'
    }

    return (
      <components.Box>
        <h2>
          Feature: <i>Analytics demo</i>
        </h2>

        {this.renderDocumentation()}

        <div ref={el => (this.innerScrollDiv = el)} style={innerScrollDivStyle}>
          {this.state && this.state.visibleChildren}
        </div>
        <div
          style={terminalStyle}
          ref={el => {
            this.messages = el
          }}
        >
          <ul style={{ listStyleType: 'none' }}>
            {this.props.log.map((i, index) => (
              <li key={index}>
                <span style={actionNameStyle}>{i.type} :: </span>
                <span>{JSON.stringify(i.data)}</span>
              </li>
            ))}
          </ul>
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={el => {
              this.messagesEnd = el
            }}
          />
        </div>
      </components.Box>
    )
  }
}

export default analyticsDemo
