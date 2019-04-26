import React, {Component} from 'react'
import {TabView,TabPanel} from 'primereact/tabview'
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import '../MedicalAssistant.css'
import axios from "axios"
import {Link} from 'react-router-dom';


export default class MyPlanList extends Component {
    constructor(props) {
        super(props)
        this.state = {         
            healingPlanData: [],          
            activeIndex: 0      
        }
      }   
    componentDidMount() {
      console.log("component did mount")   
      this.getAllDataFromDb()
      console.log(this.props)
    }
    getAllDataFromDb = () => {         
       axios.get(this.props.url+"/getDistinctMHealingMaster") 
      .then(res => this.setState({healingPlanData: res.data.data}, () => console.log(this.state.healingPlanData)))    
      .then(() => this.verifyHealingPlanData(this.state.healingPlanData)) 
    };     
    verifyHealingPlanData = (data) => {
      if ((data.length) <= 0) {    
        this.setState({status: `Do Plans available`}) 
      } 
    }     
    
    render() {    
     
        let healingPlanData = this.state.healingPlanData   
        console.log(healingPlanData)
        return (
          <div>                
            <div className="content-section implementation" >    
              <br/>                
              <TabView style={{width:"800px"}} activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
                <TabPanel header="Healing Plan List" className="MedicalAssistant">                       
                <br/>
                <h3 style={{textDecoration: "underLine" }} id="myHeader"  >Healing Plan List</h3>
                 
                <div> 
                  {healingPlanData.map((val,idx) => (            
                  <div key={idx} >                 
                             
                  <Link to={`/myplanlist/details/${val}`} > {val} </Link> 
                   </div>
                  ))
                  }                              
                </div> 
               
                <br /><br />               
                <br/>
                <div>{this.state.status}</div>
                </TabPanel>                               
              </TabView>
            </div>
          </div>
        )
    }
}
