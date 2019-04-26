import React, {Component} from 'react'
import {InputText} from 'primereact/inputtext'
import {Button} from 'primereact/button'
import axios from "axios"
import {TabView,TabPanel} from 'primereact/tabview'
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import '../MedicalAssistant.css'

export default class Event extends Component {
        
    constructor() {
        super();
        this.state = {           
            type: "Event",
            desc: "",
            data: [],
            status: null,
            success: null,
            url: ""        
        };
        this.handleClick = this.handleClick.bind(this)        
    }   
    componentDidMount() {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            this.setState({url: "http://localhost:3001"})
        } else {
            this.setState({url: "https://lowercasesatish.herokuapp.com"})
        } 
    }   
    getDataFromDb = (type,desc) => {        
      axios.post(this.state.url+"/getMedicMaster", {
              type: type,
              desc: desc
          })             
      .then(res => this.setState({data: res.data.data}))
      .then(() => this.verifyUser(this.state.data))               
    }; 
    putDataToDB = (type, desc) => {        
        console.log("inside putdatata react")
        axios.post(this.state.url+"/putMedicMaster", {
            type: type,
            desc: desc
        })
        .then(res => this.setState({success: res.data.success}))
        .then(() => this.handleUpdateStatus(this.state.success))      
    }
    handleUpdateStatus(success) {
        if (success) { 
            this.setState({status: "Medicine added successfully"})
        } else {
            this.setState({status: "Error during user updation"})
        }                      
    }         
    verifyUser = (data) => {
      if ((data.length) <= 0) {    
          this.putDataToDB(this.state.type,this.state.desc) 
      } else {
          this.setState({status: "Medicine already exists"})
      }      
  }     
    handleClick () {
        const type = this.state.type
        const desc = this.state.desc
      
        if ((desc === "" ) || (desc === null ) || (desc === undefined )) {
            this.setState({status: "Please enter Medicine Name"})        
        } else {
            this.getDataFromDb(type, desc)
        }
    }
    render() {       
      return (     
        <div>   
          <TabView style={{width:"700px"}} activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
            <TabPanel header="Medicine" className="MedicalAssistant"> 
              <div className="content-section implementation">                   
                <h3 className="first">Enter Medicine Name</h3>                   
                <InputText value={this.state.desc} onChange={(e) => this.setState({desc: e.target.value})} />                                          
              </div>
              <br />
              <div className="content-section implementation button-demo">
                <Button label="Submit" className="p-button-rounded" onClick={this.handleClick}/>                  
              </div>
              <br />
              <div>Info: {this.state.status}</div>
            </TabPanel>                               
          </TabView>
        </div>
      )
    }
}
