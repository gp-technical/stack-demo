import React from 'react'
import { connect } from 'react-redux'
import VisibilitySensor from 'react-visibility-sensor'
import { actionHub } from '../../loader'

// TODO: find a way to configure the element Id, or use one present in all apps
const containerElementId = "wrapper"

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
  hidden: (data) => dispatch(actionHub.ANALYTICS_COMPONENT_HIDDEN(data)),
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
    var container = document.getElementById(containerElementId)

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

// adds a content property to be fetched by analytics.
// originally intended as an independent decorator, in practice,
// decorator declaration ordering and coupling make it better to
// join the two decorators in one
function content (propertyExpression, target) {
  target.prototype._analyticsContent = function () {
    return executeProp(this, propertyExpression)
  }
  return target
}

function executeProp (target, arg) {
  var props = arg.split('.')
  var targetProperty = target

  for (var prop of props) {
    targetProperty = targetProperty[prop]
  }

  return targetProperty
}

export default function combinedDecorators (wildcardArg, name, descriptor) {
  if (typeof wildcardArg === 'string') {
    // in case there is a String agrument to the decorator,
    // add a content tag to mark the property as the content BEFORE the visibility detector
    return (target, nameParam, descriptorParam) => {
      return visibilityDetectable(content(wildcardArg, target), nameParam, descriptorParam)
    }
  } else {
    // if no other agrument is passed, just the function to be decorated, just apply the plain decorator
    return visibilityDetectable(wildcardArg, name, descriptor)
  }
}

