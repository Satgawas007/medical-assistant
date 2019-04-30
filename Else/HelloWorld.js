import React, { Component } from 'react'

export default class HelloWorld extends Component {    
    
  render() {
    return (
      <div>
          {this.props.tech}
      </div>
    )
  }
}
