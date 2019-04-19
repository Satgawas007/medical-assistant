import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Menubar} from 'primereact/menubar';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import HealingPlan from './HealingPlan';
import MyPlanList from './MyPlanList'
import Auth from '../Authenticate/Auth'

import Medicine from './Medicine'
import Measurement from './Measurement'
import Event from './Event'

export default class Nav extends Component {

    constructor() {
        super();

        this.state = {
            items:[
                {
                   label:'Healing Plan',
                   command:()=>{window.location = "/healingplan"}
                },
                {
                   label:'My plan list',   
                   command:()=>{window.location = "/myplanlist"}                
                },
                {
                   label:'Add new',                             
                   items:[
                      {
                         label:'Medicine',
                         command:()=>{window.location = "/addnew/medicine"}        
                      },
                      {
                         label:'Measurement', 
                         command:()=>{window.location = "/addnew/measurement"}   
                      },
                      {
                         label:'Event',       
                         command:()=>{window.location = "/addnew/event"}                   
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

    render() {
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
                    <Route path="/healingplan" component={HealingPlan} />
                    <Route path="/myplanlist" component={MyPlanList} />                 
                    <Route exact path="/" component={Auth} /> 
                    
                    <Route path="/addnew/medicine" component={Medicine} />
                    <Route path="/addnew/measurement" component={Measurement} />
                    <Route path="/addnew/event" component={Event} />
                </div>
            </div>
        );
    }
}