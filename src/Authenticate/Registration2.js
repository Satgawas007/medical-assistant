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
            intervalIsSet: false,
            idToDelete: null,
            idToUpdate: null,
            objectToUpdate: null,
            status: null
            
        };
        this.handleClick = this.handleClick.bind(this)
        
    }   
    componentDidMount() {
        console.log("Registration2 component did mount")   
   //     this.getDataFromDb()         
    }
    // setStatus(data) {
    //     console.log("inside setStatus")
    //     this.setState({data},console.log(this.state.data))
    // }
    getDataFromDb = (email,password) => {
        console.log("I am here")
        axios.get("http://localhost:3001/getData")
        .then(res => this.setState({data: res.data.data}, () => console.log(this.state.data)))
       // .then(res => this.setState({res.data}),console.log(this.state.data))

        // fetch("http://localhost:3001/getData")
        //   .then(data => data.json())
        //   .then(res => this.setState({ data: res.data },() => console.log(this.state.data)));
    }  
            
            // fetch("http://localhost:3001/getData")
            // .then(res => res.json())
            // .then((result) => {this.setStatus(result.data);})};

    putDataToDB = (email, password) => {        
        console.log("inside putdatatobe")
        axios.post("http://localhost:3001/putData", {
        postemail: email,
        postpassword: password
        });
    }
    verifyUser = (email, password) => {
        console.log("in verify user")        
        const usersdata = this.state.data    
        var insertData = this.state.insertData

        if ((usersdata === null) || (usersdata === undefined)) {     
            insertData = false
            } else {
                console.log("Inside verifyuser --email>"+email)    
                const l_email = usersdata.find(o => o.email === email);
                const l_password = usersdata.find(o => o.password === password);
                console.log("Inside verifyuser -->"+l_email)    
                if ((l_email === undefined) || (l_password === undefined)) {
                    insertData = true       
                    console.log("userfound"+insertData)            
                } else {
                    insertData = false     
                    console.log("usernotfound"+insertData)              
                }
            }           
        return insertData
    }   
   handleClick () {
    this.getDataFromDb(this.state.email,this.state.password);
    //    const email = this.state.email
    //    const password = this.state.password
    //    const password2 = this.state.password2
    //     if ((email !== "") && (password !== "")) {
    //         if (password !== password2) {
    //             this.setState({status: "The two passwords do not match"})
    //         } else {
    //             console.log("inside if"+email)       
    //             if (this.verifyUser(email, password) === true) {
    //                 console.log("inside if and verify user"+email)  
    //                 this.putDataToDB(email,password)
    //                 this.setState({status: "User added successfully"})
    //                 console.log(this.state.data)       
    //                 const newArr = [{id: 1, email: email, password: password}]
    //                 this.setState({ data: [...this.state.data, ...newArr] },() => console.log(this.state.data));  

    //             } else {
    //                 this.setState({status: "User already exists"})
    //             } 
    //         }             
    //     } else {
    //         this.setState({status: "Enter email and password"})
    //     }
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
