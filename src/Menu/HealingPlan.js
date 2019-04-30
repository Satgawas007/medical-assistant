import React, {Component} from 'react'
import {TabView,TabPanel} from 'primereact/tabview'
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button'
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import '../MedicalAssistant.css'
import axios from "axios"
import { connect } from 'react-redux';

class HealinPlan extends Component {
    constructor() {
        super()
        this.state = {
            planName: "",
            healingData: [],
            medicData: [],
            status: null,
            success: null,  
            activeIndex: 0 ,
            healing: [{id:"", planName:"", typeAndDesc: "", onDate: "", toAdd:true, toUpdate:false, toDelete:false}]          
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        
      }
    handleChange(e) {
      console.log("healingplan")
      console.log(e)
      // console.log(e.target.dataset.id)
      let healing = this.state.healing
      console.log(healing)     
      var fieldName = e.target.name.substr(0,3)
      var fieldRow = e.target.name.substr(4)     
      
      if (fieldName === 'hea') {           
        healing[fieldRow].typeAndDesc = e.target.value
        if (healing[fieldRow].toAdd) {
          healing[fieldRow].toUpdate = false
        } else {          
          if (healing[fieldRow].typeAndDesc.length === 0) {
            healing[fieldRow].toUpdate = false
          } else {
            healing[fieldRow].toUpdate = true
          }          
        }      
      } else if (fieldName === 'cal') {
        healing[fieldRow].onDate = e.target.value
        if (healing[fieldRow].toAdd) {
          healing[fieldRow].toUpdate = false
        } else {          
          if (healing[fieldRow].onDate.length === 0) {
            healing[fieldRow].toUpdate = false
          } else {
            healing[fieldRow].toUpdate = true
          }          
        }      
      }
      console.log("end of handlechange")
       this.setState({ healing }, () => console.log(this.state.healing))      
    }   
  
    componentDidMount() {
      console.log("component did mount")   
      this.getAllDataFromDb()
    }
    getAllDataFromDb = () => {    
     
      axios.get(this.props.url+"/getMedicMasterAll")
      .then(res => this.setState({medicData: res.data.data}, () => console.log(this.state.medicData)))    
      .then(() => this.verifyMedicData(this.state.medicData))            
      
    }; 
    verifyMedicData = (data) => {
      if ((data.length) <= 0) {    
        console.log("I am here now")  
      } else {
          var medicData = data.map(val => ({
            typeAndDesc: val.medType +`: `+ val.desc
          }));        
          this.setState({medicData},console.log(medicData))      
      }      
    }   
    
    putDataToDb = (planName, typeAndDesc, onDate, dbType) => {        
      console.log("inside putdatata react")
      if (dbType === "Add") {
        axios.post(this.props.url+"/putHealingMaster", {
          planName: planName,
          typeAndDesc: typeAndDesc,
          onDate: onDate,
          addEmail: this.props.email
        })
       
      } 
             
    }  
    handleClick () {
      var healing = this.state.healing    
      var healingToUpdate = healing.map(val => ({
          id: val.id,
          typeAndDesc: val.typeAndDesc.typeAndDesc,
          onDate: val.onDate,
          toAdd: val.toAdd,
          toUpdate: val.toUpdate,
          toDelete: val.toDelete
      }))
      var emptyFields = false
      for (let i=0 ; i < healing.length ; i++) {
        let typeAndDesc = healingToUpdate[i].typeAndDesc
        let onDate = healingToUpdate[i].onDate
        let planName = this.state.planName
        if (healingToUpdate[i].toAdd) {            
          if ((planName === "" ) || (planName === null ) || (planName === undefined )) {
            this.setState({status: `Please enter Plan Name`}) 
            emptyFields = true        
          } else if ((typeAndDesc === "" ) || (typeAndDesc === null ) || (typeAndDesc === undefined )) {
            this.setState({status: `Please enter Medicine/Measurement/Event`})  
            emptyFields = true       
          } else if ((onDate === "" ) || (onDate === null ) || (onDate === undefined )) {
            this.setState({status: `Please enter Date and Time`}) 
            emptyFields = true     
          } else {
            console.log("putdataadd")
            console.log(healingToUpdate)            
            emptyFields = false
          }
        } 
      }
      if (!emptyFields) {
        for (let i=0 ; i < healing.length ; i++) {
          let typeAndDesc = healingToUpdate[i].typeAndDesc
          let onDate = healingToUpdate[i].onDate
          let planName = this.state.planName
          if (healingToUpdate[i].toAdd) {            
            this.putDataToDb(planName, typeAndDesc, onDate, "Add")
          }
        }
        window.location.reload()
      }   
   
  }
    addRow = (e) => {
    console.log(this.state)
    this.setState((prevState) => ({
      healing: [...prevState.healing, {id: "", typeAndDesc: "", onDate:"", toAdd: true, toUpdate: false, toDelete: false}]
    }));
    } 
    deleteRow = (e) => {     
      let healing = this.state.healing
      healing.splice(e.target.dataset.id)     
      this.setState({healing})
    } 
    render() {        
       let medicData = this.state.medicData
       medicData = medicData.sort((a,b) => (a.typeAndDesc > b.typeAndDesc) ? 1 : ((b.typeAndDesc > a.typeAndDesc) ? -1 : 0)); 
       let healing = this.state.healing
       console.log("in render")
       console.log(healing)
        return (
          <div>                
            <div className="content-section implementation" >    
              <br/>                
              <TabView style={{width:"800px"}} activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
                <TabPanel header="Healing Plan" className="MedicalAssistant">                       
                <label>Enter Plan Name:</label>
                <InputText required = {true} value={this.state.planName} onChange={(e) => this.setState({planName: e.target.value})} />                        
                <br /><br />  
                <label id="myHeaderHealing">Medicine/Measurements/Events</label>
                <label id="myHeaderHealing" style={{marginLeft: "5px"}}>Select Date Time</label>  
                <label id="myHeaderHealing" style={{marginLeft: "5px"}}>Delete Entry</label>                           
                <br/>
                <div> 
                  {healing.map((val,idx) => (            
                  <div key={idx} >
                <Dropdown name={`hea-${idx}`} id="myHeaderHealing" value={val.typeAndDesc} options={medicData} onChange={this.handleChange}  optionLabel="typeAndDesc"/>    
                
                <InputText type="datetime-local" name={`cal-${idx}`} id="myHeaderHealing" value={val.onDate} onChange={this.handleChange} />                        

                <button id="myButton" label="Click" data-id={idx} icon="pi pi-check" style={{marginLeft: 30}} onClick={this.deleteRow}>Delete</button>         

                </div>
                  ))
                  }                              
                </div> 
               
                <br /><br />  
                <div className="content-section implementation button-demo">
                  <Button disabled={this.props.email === "Guest"} label="Submit" className="p-button-rounded" onClick={this.handleClick} />
                  <Button style={{marginLeft: 10}} label="Add Row" className="p-button-rounded" onClick={this.addRow}/>                               
                </div>
                <br/>
                <div>Info: {this.state.status}</div>
                </TabPanel>                               
              </TabView>
            </div>
          </div>
        )
    }
}
function mapStateToProps(state) {     
  return {  isLoggedIn: state.isLoggedIn, email: state.email }
}
export default connect(mapStateToProps)(HealinPlan);