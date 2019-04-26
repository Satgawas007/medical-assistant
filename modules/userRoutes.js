const User = require('../Schemas/User');

module.exports = function(router) {
    router.post("/getUserData", (req, res) => { 
        console.log("inside getData")
        const { postemail, postpassword } = req.body
        User.find({email: postemail, password: postpassword}, (err, data) => {             
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, data: data });
        });
    });      
   
    // this method removes existing data in our database
    router.delete("/deleteUserData", (req, res) => {
        const { email, password } = req.body;  
        User.findOneAndDelete({email: email}, {password: password}, err => {    
            if (err) return res.send(err);
            return res.json({ success: true });
        });
    });
    
       // this method adds new data in our database
    router.post("/putUserData", (req, res) => {
        console.log("inside putData")
        let user = new User();
        
        const { postemail, postpassword } = req.body;  
        if (!postemail || !postpassword) {
            return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
        } 
        console.log("postemail"+postemail)
        user.password = postpassword;
        user.email = postemail;
        user.save(err => {    
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true });
        });
    });
}
