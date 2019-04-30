import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Menubar} from 'primereact/menubar';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import HealingPlan from './HealingPlan';
import MyPlanList from './MyPlanList'
import Auth from '../Authenticate/Auth'
import HealingPlanDetails from './HealingPlanDetails'
import { connect } from 'react-redux';
import AddNew from './AddNew'

class Nav extends Component {

    constructor(props) {
        super(props);

        this.state = {           
            items:[
                {
                   label:'Healing Plan',
                   command:()=>{window.location = "/healingplan"},
                   disabled: !this.props.isLoggedIn 
                },
                {
                   label:'My plan list',   
                   command:()=>{window.location = "/myplanlist"},
                   disabled: !this.props.isLoggedIn                 
                },
                {
                   label:'Add new',
                   disabled: !this.props.isLoggedIn,                              
                   items:[
                      {
                         label:'Medicine',
                         command:()=>{window.location = "/addnew/medicine"},
                                                      
                      },
                      {
                         label:'Measurement', 
                         command:()=>{window.location = "/addnew/measurement"},
                       
                      },
                      {
                         label:'Event',       
                         command:()=>{window.location = "/addnew/event"},
                                 
                      }
                   ]
                },
                {
                    label:'Admin',   
                    command:()=>{window.location = "/"}                
                 },
                {
                   separator:true
                }               
             ]
        };              
    }
    componentWillReceiveProps(nextProps) {    
        if (this.props.state !== nextProps.isLoggedIn) {
        console.log("componentWillReceiveProps")
        console.log(nextProps)
        let itemList = this.state.items
        let isLoggedIn = !nextProps.isLoggedIn
        console.log(isLoggedIn)
        console.log("itemList")
        for (let i=0 ; i < 3 ; i++) {
            itemList[i].disabled = isLoggedIn
        }
        console.log(itemList)
         
        this.setState({ itemList });
    }
    }
    render() {
        var url = ""
            if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                url = "http://localhost:3001"
            
            } else {
                url = "https://medicalassistance.herokuapp.com"
        
            }   
             console.log("inside nav")
            console.log(url)   
         //   console.log(this.state)          
        return (
            
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h3>Medical Assistant</h3>                     
                    </div>
                </div>
                <div className="content-section implementation">
                    <Menubar model={this.state.items}></Menubar>                                     
                </div>
                <div>
                    <Route path="/healingplan" render={()=><HealingPlan url={url} />}/> 
                    <Route exact path="/myplanlist" render={()=><MyPlanList url={url} />}/> 
                    <Route exact path="/" component={Auth} /> 
               
                    <Route exact path="/myplanlist/details/:id" render={()=><HealingPlanDetails url={url} />}/>   
                   
                    <Route path="/addnew/medicine" render={()=><AddNew medType="Medicine" url={url} />}/>
                    <Route path="/addnew/measurement" render={()=><AddNew medType="Measurement" url={url}/>}/>
                    <Route path="/addnew/event" render={()=><AddNew medType="Event" url={url}/>}/>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {    
    console.log("in Nav mapstates")
    console.log(state.isLoggedIn)
   // console.log(this.state)       
    return {  isLoggedIn: state.isLoggedIn, email: state.email }
}
export default connect(mapStateToProps)(Nav);