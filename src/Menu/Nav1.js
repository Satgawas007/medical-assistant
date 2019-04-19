import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom'
import Auth from '../Authenticate/Auth'
import HealingPlan from '../Menu/HealingPlan'
import MyPlanList from '../Menu/MyPlanList'
import AddNew from '../Menu/AddNew'
import Courses from '../Menu/Courses'

const Sep = () => <span> | </span>;

class Nav extends Component {
    render() {
        return (
        <div>
            <div>
            <Link to="/healingplan">Healing Plan</Link> <Sep />
            <Link to="/myplanlist">My plan list</Link> <Sep />
            <Link to="/addnew">Add new</Link> <Sep />
            <Link to="/courses">Courses</Link> <Sep /> 
            <Link to="/">Admin</Link>  
            <hr/>
            </div>
            <Route path="/healingplan" component={HealingPlan} />
            <Route path="/myplanlist" component={MyPlanList} />
            <Route path="/addnew" component={AddNew} />
            <Route path="/courses" component={Courses} />  
            <Route exact path="/" component={Auth} />      
        </div>
    )}
}
export default Nav;
