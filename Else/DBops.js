
import { Component } from "react"
import axios from "axios"

export class DBops extends Component {
    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            data: null,               
            intervalIsSet: false,
            idToDelete: null,
            idToUpdate: null,
            objectToUpdate: null,
            success: null
        };
        
      
    }  
    componentDidMount() {
      console.log("DBOPS component did mount")
  }

    // componentDidMount() {
    //   console.log("componentDidMount DBOps")
    //   this.getDataFromDb()     
    // }
    getDataFromDb = () => {
      let arr = null
        arr = fetch("http://localhost:3001/api/getData") 
          .then(data => data.json())
     //     .then(res => this.setState({ data: res.data },() => console.log(this.state.data)));
     console.log("arr "+JSON.stringify(arr))
    return this.state.data   

    };  


      // fetch("http://localhost:3001/api/getData")
      //     .then(data => data.json())
      //     .then(res => this.setState({ data: res.data }));
      //     console.log("getDataFromDb")
      //     console.log("data   "+this.state.data)          
        // var l_success
    // var self = this
    // dummy(){
    //   console.log("insite dummy")
    // }
    // getDataFromDb = (email,password) => {
    //   axios.post("http://localhost:3001/api/getData", {
    //   postemail: email,
    //   postpassword: password
    //   }).then(data => data.json())
    //     .then(res => this.setState({ data: res.data },() => console.log(this.state.data)));          
    // }

        // if (res.data.data.length) {         
        //     let kr = JSON.parse(JSON.stringify(res.data.data[0].email));
        //     console.log("kr    " + kr)  
        //     return JSON.parse(JSON.stringify(res.data.data[0].email));        
        // } else {               
        //   return null
        //   }            
        // console.log("get datafrom db" + l_success)  
        // this.response = res
        // console.log(this.response)  
        // })
        //  arr = JSON.stringify(arr.data);
        // console.log("get datafrom db outside" + arr)
        // return l_success        
    // };
    putDataToDB = (email, password) => {
      // let currentIds = this.state.data.map(data => data.id);
      // let idToBeAdded = 0;
      // while (currentIds.includes(idToBeAdded)) {
      //   ++idToBeAdded;
      // }
      console.log("inside putdatatobe")
      axios.post("http://localhost:3001/api/putData", {
        postemail: email,
        postpassword: password
      });
    };
  // our delete method that uses our backend api 
  // to remove existing database information
  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("http://localhost:3001/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("http://localhost:3001/api/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };


  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
  render() {return null}
         
}
