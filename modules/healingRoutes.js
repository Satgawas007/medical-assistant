
const Healing = require('../Schemas/healing');

module.exports = function(router) {  
  router.get("/getDistinctMHealingMaster", (req, res) => { 
    console.log("inside getData")     
    console.log(req.body)   
    Healing.distinct("planName",(err, data) => {    
      console.log(err)             
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });
  router.post("/getMHealingMaster", (req, res) => { 
      console.log("inside getData")     
      console.log(req.body)  
      planName = decodeURI(req.body.planName)
      console.log(planName)
      Healing.find({planName: planName}, (err, data) => {    
        console.log(err)             
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
      });
    });  

 // Insert into Healing schema
  router.post("/putHealingMaster", (req, res) => {
    console.log("inside putData")
    let healing = new Healing();
    console.log(req.body)
    const { planName, typeAndDesc, onDate, addEmail } = req.body;  
    if (!planName || !typeAndDesc || !onDate) {
      return res.json({
        success: false,
        error: "INVALID INPUTS"
      });
    } 
    console.log("desc"+typeAndDesc)
    healing.planName = planName;
    healing.typeAndDesc = typeAndDesc;
    healing.onDate = onDate;
    healing.addEmail = addEmail;
    healing.save(err => {    
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
  router.post("/deleteHealingData", (req, res) => {
    const { id, typeAndDesc, onDate } = req.body;  
    console.log("Inside deletee")
    console.log("ID"+id)
    Healing.findByIdAndRemove({_id: id}, err => {    
      if (err) return res.send(err);
      return res.json({ success: true });
    });
  });
  router.post("/updateHealingData", (req, res) => {
    const { id, typeAndDesc, onDate, updateEmail } = req.body;   
    Healing.findByIdAndUpdate({_id: id}, {$set: {typeAndDesc: typeAndDesc, updateEmail: updateEmail}}, err => {
      console.log(err)
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
}