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
import {Checkbox} from 'primereact/checkbox';

export default class HealinPlanDetails extends Component {
    constructor(props) {
        super(props)
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
      if (fieldName === 'del') {
        if (healing[fieldRow].toAdd) {
          healing[fieldRow].toDelete = false
        } else {
          healing[fieldRow].toDelete = e.target.checked        
        }
      } else if (fieldName === 'hea') {           
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
      
      const pathname = window.location.pathname
      const planName = pathname.substring(pathname.lastIndexOf('/')+1);
      this.setState({planName})
      this.getAllDataFromDb(planName)
      console.log(planName)  
    }
    getAllDataFromDb = (planName) => {    
     
      axios.get(this.props.url+"/getMedicMasterAll")
      .then(res => this.setState({medicData: res.data.data}, () => console.log(this.state.medicData)))    
      .then(() => this.verifyMedicData(this.state.medicData))       
      
      axios.post(this.props.url+"/getMHealingMaster", {
        planName: planName
      })
      .then(res => this.setState({healingData: res.data.data}, () => console.log(this.state.healingData)))    
      .then(() => this.verifyHealingData(this.state.healingData))       
    }
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
    verifyHealingData = (data) => {
      if ((data.length) <= 0) {    
        console.log("I am here now healing")  
      } else {  
        var healing = data.map(val => ({
          id: val._id,
          typeAndDesc: JSON.parse(`{ "typeAndDesc":"`+val.typeAndDesc+`"}`),
          onDate: val.onDate,
          toAdd: false,
          toUpdate: false,
          toDelete: false
        }));       
        console.log("Healing") 
        this.setState({healing},console.log(healing))      
      }      
    }   
    putDataToDb = (id, planName, typeAndDesc, onDate, dbType) => {        
      console.log("inside putdatata react")
      if (dbType === "Add") {
        axios.post(this.props.url+"/putHealingMaster", {
          planName: decodeURI(planName),
          typeAndDesc: typeAndDesc,
          onDate: onDate
        })
       
      } else if (dbType === "Delete") {
        console.log("inside delete")
        axios.post(this.props.url+"/deleteHealingData", {
            id: id,
        typeAndDesc: typeAndDesc,
          onDate: onDate
        })
      } else if (dbType === "Update") {
        axios.post(this.props.url+"/updateHealingData", {
          id: id,
          typeAndDesc: typeAndDesc,
          onDate: onDate
       }).then((res) => console.log(res.data.data))       
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
            this.putDataToDb("", planName, typeAndDesc, onDate, "Add")
          } else if (healingToUpdate[i].toDelete) {
            this.putDataToDb(healingToUpdate[i].id, planName, typeAndDesc, onDate, "Delete")
          } else if (healingToUpdate[i].toUpdate) {
            this.putDataToDb(healingToUpdate[i].id, planName, typeAndDesc, onDate, "Update")
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
       const planName = decodeURI(this.state.planName)
       console.log("in render")
       console.log(healing)
        return (
          <div>                
            <div className="content-section implementation" >    
              <br/>                
              <TabView style={{width:"800px"}} activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
                <TabPanel header={planName} className="MedicalAssistant">                       
                <h3 className="first">{planName}</h3>
                <br /> 
                <label id="myHeaderHealing">Medicine/Measurements/Events</label>
                <label id="myHeaderHealing" style={{marginLeft: "5px"}}>Select Date Time</label>  
                <label id="myHeaderHealing" style={{marginLeft: "5px"}}>Delete Entry</label>                           
                <br/>
                <div> 
                  {healing.map((val,idx) => (            
                  <div key={idx} >
                <Dropdown name={`hea-${idx}`} id="myHeaderHealing" value={val.typeAndDesc} options={medicData} onChange={this.handleChange}  optionLabel="typeAndDesc"/>    
                
                <InputText type="datetime-local" name={`cal-${idx}`} id="myHeaderHealing" value={val.onDate} onChange={this.handleChange} />                        

                <Checkbox name={`del-${idx}`} data-id={idx} checked={val.toDelete} style={{marginLeft: 30}} onChange={this.handleChange} />

                </div>
                  ))
                  }                              
                </div> 
               
                <br /><br />  
                <div className="content-section implementation button-demo">
                  <Button label="Submit" className="p-button-rounded" onClick={this.handleClick} />
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
