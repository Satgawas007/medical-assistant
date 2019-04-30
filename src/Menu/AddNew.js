import React, {Component} from 'react'
import {InputText} from 'primereact/inputtext'
import {Button} from 'primereact/button'
import axios from "axios"
import {TabView,TabPanel} from 'primereact/tabview'
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import '../MedicalAssistant.css'
import {Checkbox} from 'primereact/checkbox';
import { connect } from 'react-redux';

class AddNew extends Component {
        
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,  
            data: [],
            status: null,
            success: null,                    
            medic: [{id:"", medType: this.props.medType, desc:"", toAdd:true, toUpdate:false, toDelete:false}] 
        }
        this.handleClick = this.handleClick.bind(this)        
    }   
    componentDidMount() { 
        this.getAllDataFromDb(this.props.medType)          
    }      
    getAllDataFromDb = (medType) => {       
      axios.post(this.props.url+"/getMedicMaster", {
        medType: medType
          })             
      .then(res => this.setState({data: res.data.data}, () => console.log(this.state.data)))    
      .then(() => this.verifyData(this.state.data))            
    };     
    verifyData = (data) => {
      if ((data.length) <= 0) {    
        console.log("I am here now")      
  
      } else {
          var medic = data.map(val => ({
            id: val._id,
            medType: val.medType,
            desc: val.desc,
            toAdd: false,
            toUpdate: false,
            toDelete: false
          }));
        
          this.setState({medic},console.log(medic))      
      }      
    }   
    putDataToDb = (id, medType, desc, dbType) => {        
      console.log("inside putdatata react")
      if (dbType === "Add") {
        axios.post(this.props.url+"/putMedicMaster", {
          medType: medType,
            desc: desc,
            addEmail: this.props.email
        })
       
      } else if (dbType === "Delete") {
        console.log("inside delete")
        axios.post(this.props.url+"/deleteMedicData", {
            id: id,
          medType: medType,
            desc: desc
        })
      } else if (dbType === "Update") {
        axios.post(this.props.url+"/updateMedicData", {
          id: id,
        medType: medType,
          desc: desc,
          updateEmail: this.props.email
       }).then((res) => console.log(res.data.data))       
      }                
    }  
    handleClick () {
        var medic = this.state.medic
        var medType = this.props.medType       
  
        for (let i=0 ; i < medic.length ; i++) {
          var desc = medic[i].desc
          if (medic[i].toAdd) {            
            if ((desc === "" ) || (desc === null ) || (desc === undefined )) {
              //  this.setState({status: `Please enter ${this.props.medType} Name`})        
            } else {
               this.putDataToDb("", medType, desc, "Add")            }
          } else if (medic[i].toDelete) {
            this.putDataToDb(medic[i].id, medType, desc, "Delete")
          } else if (medic[i].toUpdate) {
            this.putDataToDb(medic[i].id, medType, desc, "Update")
          }        
      }      
      
     window.location.reload()
    }
    handleChange = (e) => {         
       console.log(e)
      // console.log(e.target.dataset.id)
      let medic = [...this.state.medic]
      var fieldName = e.target.name.substr(0,3)
      var fieldRow = e.target.name.substr(4)
      console.log(fieldRow)
      if (fieldName === 'del') {
        if (medic[fieldRow].toAdd) {
          medic[fieldRow].toDelete = false
        } else {
        medic[fieldRow].toDelete = e.target.checked        
        }
      } else if (fieldName === 'med') {
        medic[fieldRow].desc = e.target.value
        if (medic[fieldRow].toAdd) {
          medic[fieldRow].toUpdate = false
        } else {          
          if (medic[fieldRow].desc.length === 0) {
            medic[fieldRow].toUpdate = false
          } else {
            medic[fieldRow].toUpdate = true
          }          
        }      
      }
       this.setState({ medic }, () => console.log(this.state.medic))
      // console.log(medic.length)
    }
    addRow = (e) => {
      console.log(this.state)
      this.setState((prevState) => ({
        medic: [...prevState.medic, {id: "", medType: this.props.medType, desc:"", toAdd: true, toUpdate: false, toDelete: false}]
      }));
    }
    render() {       
      let medic = this.state.medic
      console.log("in render")
      console.log(medic)
      return (             
        <div>
          <br/>
          <TabView style={{width:"700px"}} activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
            <TabPanel header={this.props.medType} className="MedicalAssistant" > 
            
              <div className="content-section implementation">                   
                <h3 id="myHeader" className="first" >Enter {this.props.medType}</h3><h3 id="myHeader" className="first" >Delete {this.props.medType}</h3>     
              
                <div> 
                  {medic.map((val,idx) => (            
                  <div key={idx} >
                  <InputText name={`med-${idx}`} data-id={idx} value={val.desc} onChange={this.handleChange}/>                                
                
                  <Checkbox name={`del-${idx}`} data-id={idx} checked={val.toDelete} style={{marginLeft: 30}} onChange={this.handleChange} />
              
                  </div>
                  ))
                  }                              
                </div> 
              </div>
              <br />    
              <div className="content-section implementation button-demo">
                <Button disabled={this.props.email === "Guest"} label="Submit" className="p-button-rounded" onClick={this.handleClick}/>     
                <Button style={{marginLeft: 10}} label={`Add ${this.props.medType}`} className="p-button-rounded" onClick={this.addRow}/>                               
              </div>             
              <br />            
            </TabPanel>                               
          </TabView>
        </div>
      )
    }
}
function mapStateToProps(state) {     
  return {  isLoggedIn: state.isLoggedIn, email: state.email }
}
export default connect(mapStateToProps)(AddNew);