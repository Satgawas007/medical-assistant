import React, {Component} from 'react'
import {TabView,TabPanel} from 'primereact/tabview'
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button'
import {Calendar} from 'primereact/calendar';
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import '../MedicalAssistant.css'
//import 'bootstrap/dist/css/bootstrap.css';

export default class HealinPlan extends Component {
    constructor() {
        super()
        this.state = {
            activeIndex: 0,   
            date1: "",
            date2: "",
            date3: "",
            city1: "",
            city2: "",
            city3: ""      
        }
        this.onCity1Change = this.onCity1Change.bind(this)
        this.onCity2Change = this.onCity2Change.bind(this)
        this.onCity3Change = this.onCity3Change.bind(this)
    } 
    onCity1Change(e) {
      this.setState({city1: e.value});
    }
    onCity2Change(e) {
      this.setState({city2: e.value});
    }
    onCity3Change(e) {
      this.setState({city3: e.value});
    }    
    render() {
        const cities = [
          {name: 'Crosin'},
          {name: 'Blood Sugar'},
          {name: 'Blood Pressure'},
          {name: 'vitamin D'},
          {name: 'Eye Checkup'}
      ];
        return (
          <div>                
            <div className="content-section implementation" >    
              <br/>                
              <TabView style={{width:"700px"}} activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
                <TabPanel header="Healing Plan" className="MedicalAssistant">                       
                <label>Enter Plan Name:</label>
                <InputText value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />                        
                <br /><br />  
                <label>Select Medicine/Measurements/Events:</label>                       
                <br />                 
                <Dropdown value={this.state.city1} options={cities} onChange={this.onCity1Change}  optionLabel="name"/>    
                <br />  <br /> 
                <label>Select Date Time:</label>
                <br />                          
                <Calendar showTime={true} hourFormat="12" value={this.state.date1} onChange={(e) => this.setState({date1: e.value})}></Calendar>
                <br /><br />  
                <div className="content-section implementation button-demo">
                  <Button label="Submit" className="p-button-rounded" onClick={this.handleClick} />
                </div>
                </TabPanel>                               
              </TabView>
            </div>
          </div>
        )
    }
}
