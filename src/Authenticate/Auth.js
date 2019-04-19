import React, {Component} from 'react'
import {TabView,TabPanel} from 'primereact/tabview'
import Registration from './Registration'
import Login from './Login'
import Guest from './Guest'
import Unregister from './Unregister'
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

export default class Auth extends Component {
    constructor() {
        super()
        this.state = {
            activeIndex: 0        
        }
    } 

    render() {
        return (
            <div>                
                <div className="content-section implementation" >    
                    <br/>                
                    <TabView style={{width:"700px"}} activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
                        <TabPanel header="Register" >
                            <Registration />
                        </TabPanel>
                        <TabPanel header="Login" >
                            <Login />
                        </TabPanel>
                        <TabPanel header="Guest" >
                            <Guest />
                        </TabPanel>      
                        <TabPanel header="Unregister" >
                            <Unregister />
                        </TabPanel>                  
                    </TabView>
                </div>
            </div>
        )
    }
}
