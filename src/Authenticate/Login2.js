import React, {Component} from 'react'
import {InputText} from 'primereact/inputtext'
import {Password} from 'primereact/password'
import {Button} from 'primereact/button'

export default class Login extends Component {
        
    constructor() {
        super();
        this.state = {
            value: null,
            success: null,
            email: "",
            password: "",
            data: null,
            status: ""
        };

        this.handleClick = this.handleClick.bind(this)
      
    }   
    componentDidMount() {
       this.getDataFromDb()     
    }
    
    getDataFromDb = () => {
        console.log("inside login2")
        fetch("http://localhost:3001/api/getData")                 
    };

    handleClick () {      
        console.log("in handleclick")        
        const usersdata = this.state.data    
        var success = this.state.success

        if (usersdata !== null) {     
            const email = usersdata.find(o => o.email === this.state.email);
            const password = usersdata.find(o => o.password === this.state.password);
            if ((email !== undefined) && (password !== undefined)) {
                success = true           
            } else {
                success = false            
            }
        }
        if (success === true) {
            this.setState({status: "Login Successful"},() => console.log(this.state.status))            
        } else if (success === false) {
            this.setState({status: "User does not exist"},() => console.log(this.state.status))
        } else {
            this.setState({status: ""},() => console.log(this.state.status))
        }
    }                  
        
    render() {
        return (     
            <div>      
                <div className="content-section implementation">                   
                    <h3 className="first">Enter email address</h3>
                    <InputText value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />                      
                    <h3 className="first">Enter Password</h3>
                    <Password feedback={false} value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>                   
                </div>
                <br />
                <div className="content-section implementation button-demo">
                    <Button label="Login" className="p-button-rounded" onClick={this.handleClick} />
                </div>
                <br />
                <div>Info: {this.state.status}</div>
            </div>
        )
    }
}
