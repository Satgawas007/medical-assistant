
const Medic = require('../Schemas/Medic');

module.exports = function(router) {  
  router.get("/getMedicMasterAll", (req, res) => { 
    console.log("inside getData")    
    console.log(req.body)  
    Medic.find((err, data) => {    
      console.log(data)        
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });

  router.post("/getMedicMaster", (req, res) => { 
      console.log("inside getData")
      const { medType } = req.body
      console.log(req.body)  
      Medic.find({medType: medType}, (err, data) => {    
        console.log(data)   
        console.log(medType)          
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
      });
    });
  
 // Get data from Medic schema
  router.post("/getMedicMaster", (req, res) => { 
    console.log("inside getData")
    const { medType, desc } = req.body
    Medic.find({medType: medType, desc: desc}, (err, data) => {             
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });
 // Insert into Medic schema
  router.post("/putMedicMaster", (req, res) => {
    console.log("inside putData")
    let medic = new Medic();
    console.log(req.body)
    const { medType, desc } = req.body;  
    if (!medType || !desc) {
      return res.json({
        success: false,
        error: "INVALID INPUTS"
      });
    } 
    console.log("desc"+desc)
    medic.medType = medType;
    medic.desc = desc;
    medic.save(err => {    
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
  router.post("/deleteMedicData", (req, res) => {
    const { id, medType, desc } = req.body;  
    console.log("Inside delete")
    console.log(id)
    Medic.findByIdAndRemove({_id: id}, err => {    
      if (err) return res.send(err);
      return res.json({ success: true });
    });
  });
  router.post("/updateMedicData", (req, res) => {
    const { id, medType, desc } = req.body;   
    Medic.findByIdAndUpdate({_id: id}, {$set: {desc: desc}}, err => {
      console.log(err)
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
}