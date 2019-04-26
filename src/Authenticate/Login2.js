import React from "react"
import {InputText} from 'primereact/inputtext'

export default class AddNewRow extends React.Component {
  state = {
    medic: [{type:"Medicine", desc:"", isNew=false, toUpdate=false}]   
  }
handleChange = (e) => {     
        // this.setState(prevState => ({
        //     medic: {[prevState.medic[0].desc]: e.target.value } }));
        console.log(this.state)
        console.log(e.target.dataset.id)
        let medic = [...this.state.medic]
        medic[e.target.dataset.id].type = "Medicine"
        medic[e.target.dataset.id].desc = e.target.value
        medic[e.target.dataset.id].toUpdate = true
        this.setState({ medic }, () => console.log(this.state.medic))
        console.log(medic.length)

    //  let medic = [...this.state.medic, {type: "Medicine", desc: e.target.value}]
     // console.log(e.target)
      // medic[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
      // this.setState({ medic }, () => console.log(this.state.medic))   
     //  this.setState({ [e.target.name]: [this.state.medic.type, e.target.value]},() =>  console.log(this.state))
    // let datasetid =  e.target.dataset.id
   //  this.setState({medic.desc[{datasetid}]: e.target.value} , () =>  console.log(this.state))
    //  console.log("name"+e.target)
    //  console.log("rowindex"+e.target.rowIndex) 

    //  console.log("name"+e.target.name)
    //    console.log("value"+e.target.className)
      
    }  

addRow = (e) => {
    this.setState((prevState) => ({
      medic: [...prevState.medic, {type:"", desc:"", isNew=true, toUpdate=false}],
    }));
  }
handleSubmit = (e) => { e.preventDefault() }
render() {    
    let { medic } = this.state
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange} > 
        <button onClick={this.addRow}>Add Row</button>
        <div>
          {medic.map((val,idx) => (            
            <div> key={idx} 
            <InputText name={`med-${idx}`} data-id={idx}/>                                
            </div>
          ))
          }
          </div>
        <input type="submit" value="Submit" /> 
      </form>
    )
  }
}
