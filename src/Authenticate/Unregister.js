import React, {Component} from 'react'
import {Password} from 'primereact/password'
import {Button} from 'primereact/button'
import axios from "axios"
import { connect } from 'react-redux';
import { setLogin } from '../Redux/actions'
import '../MedicalAssistant.css'

class Unregister extends Component {
        
    constructor() {
        super();
        this.state = {        
            success: null,
            email: "",
            password: "",
            data: [],
            status: "",
            url: ""
        };

        this.handleClick = this.handleClick.bind(this)      
    }   
    componentDidMount() {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            this.setState({url: "http://localhost:3001"})
        } else {
            this.setState({url: "https://medicalassistance.herokuapp.com"})
        } 
        this.setState({email: this.props.email})
    }
    getDataFromDb = (email,password) => {        
        axios.post(this.state.url+"/getUserData", {
                postemail: email,
                postpassword: password
            })             
        .then(res => this.setState({data: res.data.data}))
        .then(() => this.verifyUser(this.state.data))               
    }
    deleteFromDb = (email,password) => {      
        axios.delete(this.state.url+"/deleteUserData", {
            data: {
                email: email,
                password: password                
            }
        })
        .then(res => this.setState({success: res.data.success}))
        .then(() => this.handleUpdateStatus(this.state.success))     
    }
    handleUpdateStatus(success) {
        if (success) { 
            this.setState({status: "Successfully Unregistered"})
            this.props.setLogin(false,"")
        } else {
            this.setState({status: "Error during user unregistration"})
        }                      
    }
    verifyUser = (data) => {
        if ((data.length) <= 0) {    
            this.setState({status: "User does not exist"})
        } else {
            this.deleteFromDb(this.state.email,this.state.password)            
        }       
    }   
    handleClick () {
        const email = this.state.email
        const password = this.state.password
            
        if ((email === "" ) || (email === null ) || (email === undefined ) || (password === "" ) || (password === null ) || (password === undefined )) {
            this.setState({status: "Please enter email and password"})        
        } else {
            this.getDataFromDb(email, password)
        }
    }        
    render() {
        return (     
            <div>  
                <div className="content-section implementation">                   
                    <h3 className="first">Email address</h3>
                    <label id="unregisterEmail" >{this.state.email}</label>                   
                    <h3 className="first">Enter Password</h3>
                    <Password feedback={false} value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>                   
                </div>
                <br />
                <div className="content-section implementation button-demo">
                    <Button label="Submit" className="p-button-rounded" onClick={this.handleClick} disabled={!this.props.isLoggedIn} />
                </div>
                <br />
                <div>Info: {this.state.status}</div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => { 
    return {
      setLogin: (isLoggedIn,email) => {
        dispatch(setLogin(isLoggedIn,email))
      }
    };
  };
  function mapStateToProps(state) {     
      return {  isLoggedIn: state.isLoggedIn, email: state.email }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Unregister);