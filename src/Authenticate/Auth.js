import React, {Component} from 'react'
import {TabView,TabPanel} from 'primereact/tabview'
import Registration from './Registration'
import Login from './Login'
import Guest from './Guest'
import Unregister from './Unregister'
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { connect } from 'react-redux';

class Auth extends Component {
    constructor() {
        super()
        this.state = {
            activeIndex: 1        
        }
    } 

    render() {
        console.log("in Auth")
        console.log(this.props.isLoggedIn)
        return (
            <div>                
                <div className="content-section implementation" >    
                    <br/>                
                    <TabView style={{width:"700px"}} activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
                        <TabPanel header="Register" disabled={this.props.isLoggedIn}>
                            <Registration />
                        </TabPanel>
                        <TabPanel header="Login" disabled={this.props.isLoggedIn && (this.props.email === "Guest")}>
                            <Login />
                        </TabPanel>
                        <TabPanel header="Guest" disabled={this.props.isLoggedIn} >
                            <Guest />
                        </TabPanel>      
                        <TabPanel header="Unregister" disabled={!this.props.isLoggedIn || (this.props.email === "Guest") }>
                            <Unregister />
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
export default connect(mapStateToProps)(Auth);