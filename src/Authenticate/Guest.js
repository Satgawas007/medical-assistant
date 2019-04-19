import React, { Component } from 'react'
import {Button} from 'primereact/button';

export default class Guest extends Component {
  componentDidMount() {
    console.log("Guest component did mount")
}
  render() {
    return (
      <div className="content-section implementation button-demo" >
          <Button label="Enter as Guest" className="p-button-rounded" />
      </div>
    )
  }
}
