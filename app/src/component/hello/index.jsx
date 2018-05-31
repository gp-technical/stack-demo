import React from 'react'

const style = {
  margin: 20,
  padding: 20,
  borderColor: 'lightgray',
  borderStyle: 'solid',
  borderWidth: 1,
  backgroundColor: 'White'
}

class component extends React.PureComponent {
  render() {
    return (
      <div style={style}>
        <h2>Hello World</h2>
        <a href="https://github.com/gp-technical/stack-demo" target="_blank">
          View The Full stack-demo Documention on GitHub
        </a>
      </div>
    )
  }
}

export default component
