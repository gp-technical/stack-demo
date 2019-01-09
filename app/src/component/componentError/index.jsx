import React from 'react'
import { components } from '../../loader'
import Buggy from './buggy'

const ComponentError = () => {
  const { ErrorBoundary } = components
  return (
    <components.Box>
      <h2>
        Feature: <i>React error boundaries</i>
      </h2>
      <p>
        Demonstrates errors being thrown from with a component&apos;s render function both inside
        and outside error boundaries.
      </p>
      <p>
        Click the buttons to throw an error from the component&apos;s render function when the count
        hits 5
      </p>
      <div>
        <h3>Within an error boundary</h3>
        <ErrorBoundary>
          <Buggy />
        </ErrorBoundary>
      </div>
      <div>
        <h3>Outside an error boundary</h3>
        <Buggy />
      </div>
    </components.Box>
  )
}

export default ComponentError
