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
import { withRouter } from 'react-router'
import '../MedicalAssistant.css'
import {Button} from 'primereact/button'
import { setLogin } from '../Redux/actions'

class Nav extends Component {    
    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }
    
    navigateToPage = (path) => {
        console.log('Navigate to path ' + path);
        this.props.history.push(path);
       
    }
    handleClick(e) {
        this.props.setLogin(false,"")     
        this.props.history.push('/'); 
        window.location.reload()
      
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
        
         var items=[
            {
               label:'Healing Plan',
               command:()=>{ this.navigateToPage('/healingplan')},
               disabled: !this.props.isLoggedIn 
            },
            {
               label:'My plan list',   
               command:()=>{ this.navigateToPage('/myplanlist')},            
               disabled: !this.props.isLoggedIn                 
            },
            {
               label:'Add new',
               disabled: !this.props.isLoggedIn,                              
               items:[
                  {
                     label:'Medicine',                  
                     command:()=>{ this.navigateToPage('/addnew/medicine')},                                     
                  },
                  {
                     label:'Measurement', 
                     command:()=>{ this.navigateToPage('/addnew/measurement')},                   
                  },
                  {
                     label:'Event', 
                     command:()=>{ this.navigateToPage('/addnew/event')},                
                  }
               ]
            },
            {
                label:'Admin', 
                command:()=>{ this.navigateToPage('/')},                      
             },
            {
               separator:true
            }               
         ]                 
        
        return (
            
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h3>Medical Assistant</h3>                     
                    </div>
                </div>
                <h3 style={{textAlign: 'right'}} id="loginHeader" >Welcome {this.props.email}</h3>  
                <Button disabled={!this.props.isLoggedIn} style={{marginLeft: 10}} label="Logout" className="p-button-rounded" onClick={ this.handleClick }/>                               
                <div className="content-section implementation">                   
                    <Menubar model={items}></Menubar>                                   
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
const mapDispatchToProps = dispatch => { 
    return {
      setLogin: (isLoggedIn,email) => {
        dispatch(setLogin(isLoggedIn,email))
      }
    };
  };
//export default connect(mapStateToProps)(Nav);
Nav = withRouter(connect(mapStateToProps,mapDispatchToProps)(Nav))

export default Nav