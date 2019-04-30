import React, {Component} from 'react'
import {InputText} from 'primereact/inputtext'
import {Password} from 'primereact/password'
import {Button} from 'primereact/button'
import axios from "axios"

export default class Registration extends Component {
        
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            password2: "",
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
            this.setState({url: "https://medicalassistance.herokuapp.com"})
        } 
    }
    getDataFromDb = (email,password) => {        
        axios.post(this.state.url+"/getUserData", {
                postemail: email,
                postpassword: password
            })             
        .then(res => this.setState({data: res.data.data}))
        .then(() => this.verifyUser(this.state.data))               
    };
    putDataToDB = (email, password) => {        
        console.log("inside putdatata react")
        axios.post(this.state.url+"/putUserData", {
            postemail: email,
            postpassword: password
        })
        .then(res => this.setState({success: res.data.success}))
        .then(() => this.handleUpdateStatus(this.state.success))      
    }
    handleUpdateStatus(success) {
        if (success) { 
            this.setState({status: "User added successfully, Please login to proceed."})
        } else {
            this.setState({status: "Error during user updation"})
        }                      
    }
    verifyUser = (data) => {
        if ((data.length) <= 0) {    
            this.putDataToDB(this.state.email,this.state.password) 
        } else {
            this.setState({status: "User already exists"})
        }       
    }   
    handleClick () {
        const email = this.state.email
        const password = this.state.password
        const password2 = this.state.password2        
        if ((email === "" ) || (email === null ) || (email === undefined ) || (password === "" ) || (password === null ) || (password === undefined )) {
            this.setState({status: "Please enter email and password"})
        } else if (password !== password2) {        
            this.setState({status: "The two passwords do not match"})
        } else {
            this.getDataFromDb(email, password)
        }
    }
    render() {       
        return (     
            <div>      
                <div className="content-section implementation">                   
                    <h3 className="first">Enter email address</h3>
                    <InputText value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />                      
                    <h3 className="first">Enter Password</h3>
                    <Password value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
                    <h3 className="first">Re-enter Password</h3>
                    <Password feedback={false} value={this.state.password2} onChange={(e) => this.setState({password2: e.target.value})}/>                    
                </div>
                <br />
                <div className="content-section implementation button-demo">
                    <Button label="Submit" className="p-button-rounded" onClick={this.handleClick}/>                  
                </div>
                <br />
                <div>Info: {this.state.status}</div>
            </div>
        )
    }
}
