import React from 'react'
import { connect } from 'react-redux'
import VisibilitySensor from 'react-visibility-sensor'
import { actionHub } from '../../loader'

function visibilityDetectable (target, name, descriptor) {
  target.prototype._wrappedRender = target.prototype.render
  target.prototype.render = decoratedRender
  return target

  function decoratedRender() {
    return (
      <DecoratingComponent wrappedComponent={this}>
        {this._wrappedRender()}
      </DecoratingComponent>
    )
  }
}

const mapStateToProps = function(state) { return {} }

const mapDispatchToProps = dispatch => ({
  visible: (data) => dispatch(actionHub.ANALYTICS_COMPONENT_VISIBLE(data)),
  hidden:  (data) => dispatch(actionHub.ANALYTICS_COMPONENT_HIDDEN(data)),
})

@connect(mapStateToProps, mapDispatchToProps)
class DecoratingComponent extends React.PureComponent {

  render () {
    var onChange = (isVisible) => {
      if (isVisible) {
        this.props.visible(this.props.wrappedComponent._analyticsContent())
      } else {
        this.props.hidden(this.props.wrappedComponent._analyticsContent())
      }
    }
    var container = document.getElementById('wrapper')

    return (
      <VisibilitySensor
          onChange={onChange}
          containment={container}
          scrollCheck={true}
          scrollThrottle={100}
          minTopValue={10}
          partialVisibility={true} >
        <div>
          {this.props.children}
        </div>
      </VisibilitySensor>
    )
  }
}

function content (wildcardArg) {
    if (/*name && descriptor*/ false) {
    var targetObj = wildcardArg
    return descriptor
  } else if (typeof mapObjectToContent === 'function') {
    var mapObjectToContent = wildcardArg
    return (target) => {
      target.prototype._analyticsContent = function () {
        return mapObjectToContent(this)
      }

      return target
    }
  } else if (typeof wildcardArg === 'string') {
    var propertyExpression = wildcardArg
    return (target) => {
      target.prototype._analyticsContent = function () {
        return executeProp(this, propertyExpression)
      }

      return target
    }
  } else {
    console.error('incorrect use of <content> decorator')
    return wildcardArg
  }
}

function executeProp (target, arg) {
  var props = arg.split('.')
  var eax = target

  for (var prop of props) {
    eax = eax[prop]
  }

  return eax
}

export default function combinedDecorators (wildcardArg, name, descriptor) {
  if (typeof wildcardArg === 'string') {
    return (target, nameComponent, descriptorComponent) => {
      return visibilityDetectable(content(wildcardArg)(target), nameComponent, descriptorComponent)
    }
  } else {
    return visibilityDetectable(wildcardArg, name, descriptor)
  }
}

