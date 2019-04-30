import React, { Component } from 'react'
import {Button} from 'primereact/button';
import { connect } from 'react-redux';
import { setLogin } from '../Redux/actions'

class Guest extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    console.log("Guest component did mount")    
  }
  handleClick() {
    this.props.setLogin(true,"Guest")   
  }
  render() {
    return (
      <div className="content-section implementation button-demo" >
          <Button label="Enter as Guest" className="p-button-rounded" onClick={this.handleClick}/>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => { 
  return {
    setLogin: (isLoggedIn,email) => {
      dispatch(setLogin(isLoggedIn,email))
    }
  };
};
function mapStateToProps(state) {     
    return {  isLoggedIn: state.isLoggedIn, email: state.email }
}
export default connect(mapStateToProps,mapDispatchToProps)(Guest);