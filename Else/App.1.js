import React, { Component } from 'react'
import Nav from './Menu/Nav'
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
      </div>
    );
  }
}
function mapStateToProps(state) {    
  console.log("Inside app")
  console.log(state.isLoggedIn)
  console.log(state.email)
  return {  isLoggedIn: state.isLoggedIn, email: state.email }
}
export default connect(mapStateToProps)(App);
