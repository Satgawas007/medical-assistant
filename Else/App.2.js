import React, { Component } from "react";
import HelloWorld from "./HelloWorld";
//import ButtonGroup from "./ButtonGroup";
//import { store } from "./store";
import { setTechnology } from "./actions";
import { connect } from 'react-redux';


// export function dispatchBtnAction(e) {
//   const tech = e.target.dataset.tech;  
//   // store.dispatch(setTechnology(tech));
//   this.props.setTechnology(tech)
// }

class App extends Component { 
  constructor () {
    super()
    this.dispatchBtnAction = this.dispatchBtnAction.bind(this)
  }
  dispatchBtnAction(e) {
    const tech = e.target.dataset.tech;  
    // store.dispatch(setTechnology(tech));
    this.props.setTechnology(tech)
  }
  
  render() {   
    // const tech = e.target.dataset.tech;
    // this.props.setTechnology(tech)
    var technologies=["React", "Elm", "React-redux"]
    return [
      <HelloWorld key={1} tech={this.props.tech} />,
      <div>
      {technologies.map((tech, i) => (
        <button
          data-tech={tech}
          key={`btn-${i}`}
          className="hello-btn"
          onClick={this.dispatchBtnAction}
        >
          {tech}
        </button>
      ))}
    </div>
      // <ButtonGroup key={2} technologies={["React", "Elm", "React-redux"]} />
    ];
  }
}
function mapStateToProps(state) {
  console.log(state)
  return {  tech: state.tech }
}
const mapDispatchToProps = dispatch => { 
  return {
    setTechnology: (tech) => {
      dispatch(setTechnology(tech))
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);